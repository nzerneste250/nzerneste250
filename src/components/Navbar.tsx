"use client";
import { useEffect, useRef, useState } from "react";
import { navigation, portfolio, sectionHref } from "@/data/portfolio";
import { ThemeToggle } from "./ThemeToggle";
import { sectionContent, sectionScrollTop } from "@/lib/section-navigation";
export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = navigation.map(item => sectionHref(item).slice(1));
    let observer: IntersectionObserver;
    let scrollFrame = 0;
    let navigationFrame = 0;
    let lockedUntil = 0;
    let disposed = false;
    const headerHeight = () => header.current?.getBoundingClientRect().height || 0;
    const track = () => {
      scrollFrame = 0;
      if (performance.now() < lockedUntil) return;
      const line = headerHeight() + 24;
      const visible = ids.map(id => ({ id, content: sectionContent(id) })).filter(item => item.content);
      // Select one section as its heading reaches the reading area.
      const atLine = visible.filter(({ content }) => {
        const rect = content!.section.getBoundingClientRect();
        return rect.top <= line && rect.bottom > line;
      });
      const visibleHeading = visible.find(({ content }) => {
        const top = content!.heading.getBoundingClientRect().top;
        return top >= line - 8 && top <= headerHeight() + (window.innerHeight - headerHeight()) * .45;
      });
      const next = visibleHeading?.id || atLine.at(-1)?.id || visible.find(({ content }) => content!.section.getBoundingClientRect().bottom > line)?.id || "contact";
      setActive(window.scrollY < 8 ? "home" : next);
    };
    const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(track); };
    const releaseLock = () => { lockedUntil = 0; onScroll(); };
    const measure = () => {
      const height = headerHeight();
      document.documentElement.style.setProperty("--header-height", `${height}px`);
      document.documentElement.style.setProperty("--header-offset", `${height + 16}px`);
      observer?.disconnect();
      observer = new IntersectionObserver(onScroll, { rootMargin: `-${height}px 0px -45% 0px`, threshold: [0, .15, .5, 1] });
      ids.forEach(id => { const section = document.getElementById(id); if (section) observer.observe(section); });
      onScroll();
    };
    const navigate = (id: string, smooth: boolean) => {
      if (!sectionContent(id)) return;
      setOpen(false);
      cancelAnimationFrame(navigationFrame);
      // React first closes the menu and its effect restores body scrolling.
      navigationFrame = requestAnimationFrame(() => {
        navigationFrame = requestAnimationFrame(() => {
          const top = sectionScrollTop(id, headerHeight());
          if (top === null) return;
          setActive(id);
          lockedUntil = performance.now() + (smooth ? 1100 : 100);
          window.scrollTo({ top, behavior: smooth && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant" });
        });
      });
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const id = anchor.hash.slice(1);
      if (!sectionContent(id) || id === "main") return;
      event.preventDefault();
      if (location.hash !== anchor.hash) history.pushState(null, "", anchor.hash);
      navigate(id, true);
    };
    const restore = () => navigate(location.hash.slice(1) || "home", false);
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const resize = new ResizeObserver(measure);
    if (header.current) resize.observe(header.current);
    measure();
    document.addEventListener("click", click);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", releaseLock);
    window.addEventListener("wheel", releaseLock, { passive: true });
    window.addEventListener("touchstart", releaseLock, { passive: true });
    window.addEventListener("popstate", restore);
    window.addEventListener("hashchange", restore);
    const initial = async () => {
      await document.fonts.ready;
      if (!disposed && location.hash) restore();
    };
    void initial();
    return () => {
      disposed = true; observer.disconnect(); resize.disconnect();
      cancelAnimationFrame(scrollFrame); cancelAnimationFrame(navigationFrame);
      document.removeEventListener("click", click); window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", releaseLock); window.removeEventListener("wheel", releaseLock); window.removeEventListener("touchstart", releaseLock);
      window.removeEventListener("popstate", restore); window.removeEventListener("hashchange", restore);
      history.scrollRestoration = previousRestoration;
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
    const closeOnDesktop = () => { if (window.innerWidth >= 1200) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape); window.addEventListener("resize", closeOnDesktop);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", closeOnEscape); window.removeEventListener("resize", closeOnDesktop); };
  }, [open]);
  return <header ref={header} className="header"><nav className="container nav" aria-label={"Main navigation"}>
    <a className="brand" href="#home" onClick={() => setOpen(false)} aria-label={`${portfolio.name} home`}><span className="monogram">E<span>.</span></span><span>NZAYISENGA<br/><strong>Erneste</strong></span></a>
    <div id="navigation" className={`nav-links ${open ? "is-open" : ""}`}>{navigation.filter(item => item !== "Contact").map(item => <a aria-current={active === sectionHref(item).slice(1) ? "location" : undefined} className={item === "IZO SERVICE QUICKY" ? "mobile-link" : undefined} key={item} href={sectionHref(item)} onClick={() => setOpen(false)}>{item}</a>)}<a className="mobile-link" aria-current={active === "contact" ? "location" : undefined} href="#contact" onClick={() => setOpen(false)}>Contact</a></div>
    <div className="nav-actions"><a className="nav-contact" href="#contact" aria-current={active === "contact" ? "location" : undefined} onClick={() => setOpen(false)}>Contact <span>↗</span></a><ThemeToggle/><button ref={menuButton} type="button" className={`menu-toggle ${open ? "is-open" : ""}`} aria-expanded={open} aria-controls="navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><span/><span/><span/></button></div>
  </nav></header>;
}
