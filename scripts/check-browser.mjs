// Optional browser smoke check. Run against a running development/production server.
// Usage: node scripts/check-browser.mjs [http://localhost:3000]
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const browserPath = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
if (!existsSync(browserPath)) throw new Error('Set CHROME_PATH to an installed Chrome or Chromium executable.');
const base = process.argv[2] || 'http://localhost:3000';
const artifacts = resolve('.browser-check');
mkdirSync(artifacts, { recursive: true });
const browser = spawn(browserPath, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=9337', `--user-data-dir=${resolve(artifacts, 'profile')}`, 'about:blank'], { stdio: 'ignore', windowsHide: true });
let socket;
const errors = [];
try {
  let tabs;
  for (let i = 0; i < 60; i++) {
    try { tabs = await (await fetch('http://localhost:9337/json')).json(); break; } catch { await new Promise(r => setTimeout(r, 500)); }
  }
  const tab = tabs?.find(t => t.type === 'page');
  if (!tab) throw new Error('Browser did not start.');
  socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let sequence = 0;
  const pending = new Map();
  socket.onmessage = e => {
    const data = JSON.parse(e.data);
    if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails.exception?.description || data.params.exceptionDetails.text);
    if (data.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(data.params.type)) errors.push(data.params.args.map(a => a.value || a.description).join(' '));
    if (data.method === 'Log.entryAdded' && data.params.entry.level === 'error') errors.push(data.params.entry.text);
    if (data.id && pending.has(data.id)) { const { resolve, reject } = pending.get(data.id); pending.delete(data.id); data.error ? reject(new Error(data.error.message)) : resolve(data.result); }
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const response = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
    return response.result.value;
  };
  await call('Page.enable');
  await call('Runtime.enable');
  await call('Log.enable');
  await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
  await call('Page.addScriptToEvaluateOnNewDocument', { source: `document.addEventListener('DOMContentLoaded',()=>{window.__firstTheme=document.documentElement.dataset.theme;});` });
  await call('Page.navigate', { url: base });
  async function ready() {
    for (let i = 0; i < 60; i++) { if (await evaluate('document.querySelector(".contact-form") !== null && document.readyState === "complete"')) break; await new Promise(r => setTimeout(r, 500)); }
    await evaluate('document.fonts.ready.then(()=>true)');
    await new Promise(r => setTimeout(r, 350));
    for (let i=0;i<40;i++) {
      if (await evaluate(`document.querySelector('.theme-toggle')?.getAttribute('aria-label') === 'Switch to '+(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark')+' mode'`)) break;
      await new Promise(r=>setTimeout(r,100));
    }
  }
  await ready();
  if (process.argv.includes('--navigation')) {
    const ids = ['home','about','skills','projects','services','experience','education','contact'];
    const results = [];
    async function settled(id) {
      for (let i=0;i<40;i++) {
        if (await evaluate(`location.hash === '#${id}' && document.querySelector('.nav-links a[href="#${id}"]')?.getAttribute('aria-current') === 'location' && document.body.style.overflow !== 'hidden'`)) break;
        await new Promise(r=>setTimeout(r,50));
      }
      await new Promise(r=>setTimeout(r,140));
      const result = await evaluate(`(()=>{
        const section=document.getElementById('${id}');
        const target=section.querySelector('.section-title,#education-title') || section;
        const header=document.querySelector('header').getBoundingClientRect().bottom;
        return {id:'${id}',width:innerWidth,hash:location.hash,top:target.getBoundingClientRect().top,header,scrollY,active:document.querySelector('.nav-links a[aria-current="location"]')?.getAttribute('href'),overflow:document.documentElement.scrollWidth>innerWidth,menuOpen:document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true',locked:document.body.style.overflow==='hidden'};
      })()`);
      if (result.hash!==`#${id}` || result.active!==`#${id}` || result.overflow || result.menuOpen || result.locked) throw new Error(JSON.stringify(result));
      if (id==='home' ? result.scrollY>1 : result.top<result.header+7 || result.top>result.header+(id==='about'||id==='education'?420:24)) throw new Error(`Section position: ${JSON.stringify(result)}`);
      return result;
    }
    async function clickSection(id,width) {
      if (width<1200) {
        await evaluate('document.querySelector(".menu-toggle").click()');
        await new Promise(r=>setTimeout(r,70));
      }
      await evaluate(`document.querySelector('.nav-links a[href="#${id}"]').click()`);
      return settled(id);
    }
    for(const width of [320,360,390,412,430,768,1024,1366,1440,1920]) {
      await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});
      await new Promise(r=>setTimeout(r,150));
      for(const id of ids) results.push({...await clickSection(id,width),action:'click'});
      for(const id of ids) {
        await call('Page.navigate',{url:`${base}/#${id}`}); await ready();
        results.push({...await settled(id),action:'direct-hash'});
        await call('Page.reload'); await ready();
        results.push({...await settled(id),action:'reload'});
      }
      for(const id of ['about','projects','services']) await clickSection(id,width);
      await evaluate('history.back()'); results.push({...await settled('projects'),action:'back'});
      await evaluate('history.forward()'); results.push({...await settled('services'),action:'forward'});
      // Direct user scrolling must update the active item independently of the URL.
      await evaluate(`(()=>{const h=document.querySelector('header').getBoundingClientRect().height;const t=document.querySelector('#skills .section-title').getBoundingClientRect().top+scrollY;scrollTo({top:t-h-16,behavior:'instant'})})()`);
      await new Promise(r=>setTimeout(r,250));
      if (await evaluate(`document.querySelector('.nav-links a[aria-current="location"]')?.getAttribute('href')`)!=='#skills') throw new Error(`Scroll spy failed at ${width}`);
      if(width>=1200) {
        await evaluate('document.querySelector(".nav-contact").click()'); await settled('contact');
      }
      console.log(`Navigation passed at ${width}px: clicks, direct hashes, reloads, history, and scroll spy.`);
    }
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
    for(const width of [390,1440]) {
      await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});
      await evaluate(`scrollTo({top:0,behavior:'instant'});window.__scrollOptions=[];window.__originalScrollTo=window.__originalScrollTo||window.scrollTo;window.scrollTo=function(options){window.__scrollOptions.push(options);return window.__originalScrollTo.call(window,options)}`);
      if(width<1200){await evaluate('document.querySelector(".menu-toggle").click()');await new Promise(r=>setTimeout(r,100));}
      await evaluate(`document.querySelector('.nav-links a[href="#projects"]').click()`);
      await new Promise(r=>setTimeout(r,1300)); await settled('projects');
      if(!await evaluate(`window.__scrollOptions.some(o=>o.behavior==='smooth')`)) throw new Error('Navigation did not request smooth scrolling');
      const screenshot=await call('Page.captureScreenshot',{format:'png'});
      writeFileSync(resolve(artifacts,`navigation-${width}.png`),Buffer.from(screenshot.data,'base64'));
    }
    if(errors.length) throw new Error(`Browser console: ${JSON.stringify(errors)}`);
    writeFileSync(resolve(artifacts,'navigation-results.json'),JSON.stringify(results,null,2));
    console.log('All navigation, positioning, history, reduced-motion and smooth-scroll checks passed without console errors.');
  } else {
  await evaluate(`localStorage.removeItem('erneste-theme')`);
  await call('Page.reload'); await ready();
  if (await evaluate('document.documentElement.dataset.theme') !== 'dark') throw new Error('OS dark preference was not respected');
  await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
  await new Promise(r => setTimeout(r, 150));
  if (await evaluate('document.documentElement.dataset.theme') !== 'light') throw new Error('OS light preference was not respected');
  await call('Page.reload'); await ready();
  if (await evaluate('window.__firstTheme') !== 'light') throw new Error('Initial theme did not follow the OS before hydration');
  const results = [];
  for (const theme of ['dark','light']) {
    if (await evaluate('document.documentElement.dataset.theme') !== theme) {
      await evaluate('document.querySelector(".theme-toggle").focus()');
      await call('Page.bringToFront');
      await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r' });
      await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
      await new Promise(r => setTimeout(r, 150));
    }
    if (await evaluate('document.documentElement.dataset.theme') !== theme) throw new Error(`Keyboard theme toggle failed: ${JSON.stringify(await evaluate('({theme:document.documentElement.dataset.theme, active:document.activeElement.className, label:document.querySelector(".theme-toggle").getAttribute("aria-label")})'))}; console: ${JSON.stringify(errors)}`);
    await call('Page.reload'); await ready();
    if (await evaluate('document.documentElement.dataset.theme') !== theme || await evaluate('window.__firstTheme') !== theme) throw new Error('Theme did not persist on reload');
    for (const width of [320, 360, 390, 412, 430, 768, 1024, 1280, 1366, 1440, 1536, 1920]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 768 });
    await new Promise(r => setTimeout(r, 120));
    const result = await evaluate(`(() => ({ theme:document.documentElement.dataset.theme, width:innerWidth, contentWidth:document.documentElement.scrollWidth, headings:document.querySelectorAll('h1').length, missingSections:['home','about','entrepreneurship','skills','projects','services','experience','education','contact'].filter(id=>!document.getElementById(id)), clipped:Array.from(document.querySelectorAll('h1,h2,h3,h4,p,input,textarea,.button,.hero-visual,.skill-card,.company-card,.service-row')).filter(e=>e.getClientRects().length && (e.getBoundingClientRect().right>innerWidth+1 || e.getBoundingClientRect().left< -1)).map(e=>e.className || e.tagName) }))()`);
    if (result.contentWidth > width || result.headings !== 1 || result.missingSections.length || result.clipped.length) throw new Error(JSON.stringify(result));
    for (const id of ['experience','education','contact']) {
      if(width<1200) { await evaluate('document.querySelector(".menu-toggle").click()'); await new Promise(r=>setTimeout(r,60)); }
      await evaluate(`document.querySelector('.nav-links a[href="#${id}"]').click()`);
      for(let attempt=0;attempt<40;attempt++) {
        await new Promise(r=>setTimeout(r,60));
        if(await evaluate(`document.querySelector('.nav-links a[aria-current="location"]')?.hash==='#${id}' && Math.abs(document.querySelector('#${id} .section-title').getBoundingClientRect().top-document.querySelector('header').getBoundingClientRect().bottom-16)<2`)) break;
      }
      await new Promise(r=>setTimeout(r,120));
      const nav = await evaluate(`(()=>{const h=document.querySelector('header').getBoundingClientRect().bottom;const top=document.querySelector('#${id} .section-title').getBoundingClientRect().top;const active=Array.from(document.querySelectorAll('.nav-links a[aria-current="location"]')).map(a=>a.hash);return {h,top,active,nested:document.querySelector('#experience #education')!==null}})()`);
      if(nav.nested || nav.active.length!==1 || nav.active[0]!==`#${id}` || nav.top<nav.h+7 || nav.top>nav.h+24) throw new Error(`Independent section navigation ${theme}/${width}/${id}: ${JSON.stringify(nav)}`);
    }
    results.push(result);
    }
    await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
    for (const id of ['home','about','entrepreneurship','skills','projects','services','experience','education','cv','contact','footer']) {
      const selector = id === 'footer' ? 'document.querySelector("footer")' : `document.getElementById('${id}')`;
      await evaluate(`${selector}.scrollIntoView({behavior:'instant'})`);
      await new Promise(r => setTimeout(r, 200));
      await evaluate(`Promise.all(Array.from(${selector}.querySelectorAll('img')).map(img=>img.decode().catch(()=>{}))).then(()=>true)`);
      const clip = await evaluate(`(()=>{const r=${selector}.getBoundingClientRect();return {x:r.left,y:r.top+scrollY,width:r.width,height:r.height,scale:1}})()`);
      const shot = await call('Page.captureScreenshot', { format:'png', captureBeyondViewport:true, clip });
      writeFileSync(resolve(artifacts, `${theme}-${id}.png`), Buffer.from(shot.data,'base64'));
    }
  }
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate('document.querySelector(".menu-toggle").click()');
  await new Promise(r => setTimeout(r, 200));
  if (!await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded") === "true" && getComputedStyle(document.querySelector(".nav-links")).display === "grid"')) throw new Error('Mobile menu did not open');
  if (!await evaluate('document.body.style.overflow === "hidden"')) throw new Error('Mobile menu did not lock body scroll');
  await evaluate(`document.querySelector('.nav-links a[href="#projects"]').click()`);
  await new Promise(r => setTimeout(r, 200));
  const navigationState = await evaluate('({ expanded: document.querySelector(".menu-toggle").getAttribute("aria-expanded"), hash: location.hash, url: location.href })');
  if (navigationState.expanded !== 'false' || navigationState.hash !== '#projects') throw new Error(`Mobile navigation failed: ${JSON.stringify(navigationState)}`);
  if (await evaluate('document.body.style.overflow') === 'hidden') throw new Error('Mobile menu left body scroll locked');
  const anchors = await evaluate(`Array.from(document.querySelectorAll('a[href^="#"]')).map(a=>a.getAttribute('href'))`);
  for (const href of new Set(anchors)) if (!await evaluate(`document.getElementById(${JSON.stringify(href.slice(1))}) !== null`)) throw new Error(`Broken anchor ${href}`);
  for (const href of ['#home','#about','#entrepreneurship','#skills','#projects','#services','#experience','#education','#contact']) {
    await evaluate('document.querySelector(".menu-toggle").click()'); await new Promise(r => setTimeout(r, 80));
    await evaluate(`document.querySelector('.nav-links a[href="${href}"]').click()`); await new Promise(r => setTimeout(r, 100));
    if (await evaluate('location.hash') !== href) throw new Error(`Anchor navigation failed: ${href}`);
  }
  await evaluate('document.querySelector(".menu-toggle").click()'); await new Promise(r => setTimeout(r, 100));
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  await new Promise(r => setTimeout(r, 100));
  if (await evaluate('document.querySelector(".menu-toggle").getAttribute("aria-expanded")') !== 'false') throw new Error('Escape did not close menu');
  await evaluate('document.querySelector(".project-details summary").click()');
  if (!await evaluate('document.querySelector(".project-details").open')) throw new Error('Project details did not open');
  if (!await evaluate('!document.querySelector(".contact-form").checkValidity()')) throw new Error('Empty form passed validation');
  await evaluate('document.querySelector(".contact-form").requestSubmit()');
  await new Promise(r=>setTimeout(r,100));
  if(await evaluate('document.querySelectorAll(".field-error").length')!==4) throw new Error('Inline required validation missing');
  const fields={name:'Test User',email:'test@example.com',subject:'Website project',message:'Hello Erneste, I would like to discuss developing a website.'};
  for(const blocked of [false,true]) {
    await evaluate(`window.open=(url,target,features)=>{window.__whatsapp={url,target,features};return ${blocked ? 'null' : '{}'}}`);
    await evaluate(`(()=>{for(const [name,value] of Object.entries(${JSON.stringify(fields)})) document.querySelector('[name="'+name+'"]').value=value;document.querySelector('.contact-form').requestSubmit()})()`);
    await new Promise(r=>setTimeout(r,100));
    const state=await evaluate(`({opened:window.__whatsapp,status:document.querySelector('.form-status').textContent,errors:document.querySelectorAll('.field-error').length,message:document.querySelector('[name="message"]').value,fallback:document.querySelector('.whatsapp-fallback')?.href,phoneField:!!document.querySelector('input[name="phone"]')})`);
    const url=new URL(state.opened.url);const text=url.searchParams.get('text');
    if(url.origin!=='https://wa.me' || url.pathname!=='/250789245524' || !Object.values(fields).every(v=>text.includes(v)) || state.errors || state.phoneField || state.message!==fields.message || state.fallback!==state.opened.url || state.opened.features!=='noopener,noreferrer' || /sent successfully/i.test(state.status) || (blocked && /opened with/.test(state.status))) throw new Error(`WhatsApp preparation: ${JSON.stringify(state)}`);
  }
  const punctuation={subject:'A & B / design?',message:'Unicode: caf\u00e9, symbols & + # and new\nline.'};
  await evaluate(`(()=>{for(const [name,value] of Object.entries(${JSON.stringify(punctuation)}))document.querySelector('[name="'+name+'"]').value=value;document.querySelector('.contact-form').requestSubmit()})()`);
  await new Promise(r=>setTimeout(r,100));
  const encoded=await evaluate('window.__whatsapp.url');
  if(!Object.values(punctuation).every(value=>new URL(encoded).searchParams.get('text').includes(value))) throw new Error('Punctuation encoding failed');
  const socials=await evaluate(`Array.from(document.querySelectorAll('.social-mini-grid a')).map(a=>({href:a.href,target:a.target,rel:a.rel}))`);
  if(socials.length!==4 || socials.some(s=>s.target!=='_blank'||!s.rel.includes('noopener'))) throw new Error('Social links missing protections');
  await evaluate('document.getElementById("projects").scrollIntoView({behavior:"instant"})');
  for (let i = 0; i < 60; i++) {
    if (await evaluate('Array.from(document.querySelectorAll("main img")).every(img => img.complete && img.naturalWidth > 0)')) break;
    await new Promise(r => setTimeout(r, 500));
  }
  if (!await evaluate('Array.from(document.querySelectorAll("main img")).every(img => img.complete && img.naturalWidth > 0)')) throw new Error('An image did not load');
  const cv = await evaluate(`document.querySelector('.hero-actions a[download]')?.getAttribute('href')`);
  if (cv) {
    const response = await fetch(new URL(cv, base));
    if (!response.ok || !response.headers.get('content-type')?.includes('pdf')) throw new Error('CV download did not return a PDF');
  }
  const links = await evaluate(`Array.from(document.querySelectorAll('.featured-project .project-actions a')).map(a=>a.href)`);
  if (!links.includes('https://ikizame.rw/') || !links.includes('https://github.com/nzerneste250/ikizame-app')) throw new Error('Featured project links changed');
  if (!await evaluate(`document.querySelector('.founder-line').textContent.includes('IZO SERVICE QUICKY') && document.querySelector('.entrepreneurship h2').textContent.includes('IZO SERVICE QUICKY')`)) throw new Error('Founder identity missing');
  const numbers = await evaluate(`Array.from(document.querySelectorAll('.section-title .eyebrow>span')).map(e=>e.textContent.trim())`);
  if (JSON.stringify(numbers)!==JSON.stringify(['01 /','02 /','03 /','04 /','05 /','06 /','07 /','08 /'])) throw new Error(`Inconsistent section numbering: ${JSON.stringify(numbers)}`);
  if (errors.length) throw new Error(`Browser console errors: ${JSON.stringify(errors)}`);
  await evaluate('scrollTo({top:0,behavior:"instant"})');
  await new Promise(r => setTimeout(r, 200));
  const mobileScreenshot = await call('Page.captureScreenshot', { format: 'png' });
  writeFileSync(resolve(artifacts, 'mobile.png'), Buffer.from(mobileScreenshot.data, 'base64'));
  await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await evaluate('scrollTo({top:0,behavior:"instant"})');
  await new Promise(r => setTimeout(r, 200));
  const screenshot = await call('Page.captureScreenshot', { format: 'png' });
  writeFileSync(resolve(artifacts, 'desktop.png'), Buffer.from(screenshot.data, 'base64'));
  writeFileSync(resolve(artifacts, 'results.json'), JSON.stringify(results, null, 2));
  console.log('Passed 12 widths in both themes, OS preference, theme persistence before hydration, keyboard theme control, mobile scroll lock and Escape, every navigation anchor, project disclosure/links, inline form validation, WhatsApp encoding and popup fallback, independent section navigation and social links, real image loading, CV PDF, founder identity, section numbering, and browser console.');
  }
} finally { socket?.close(); browser.kill(); }
