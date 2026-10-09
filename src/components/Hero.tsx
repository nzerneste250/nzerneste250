import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { Icon } from "./Icon";
import { SocialLinks } from "./SocialLinks";
export function Hero() {
  return <section id="home" className="hero container"><div className="hero-copy">
    <p className="eyebrow hero-eyebrow"><span className="status-dot"/> {portfolio.heroEyebrow}</p>
    <h1><span>NZAYISENGA</span><br/>Erneste<span className="cyan">.</span></h1>
    <p className="hero-role">{portfolio.heroIdentity}</p><p className="hero-description">{portfolio.intro}</p><a className="founder-line" href="#entrepreneurship"><span className="founder-mark" aria-hidden="true">↗</span>{portfolio.founderLine}</a>
    <div className="hero-actions"><a className="button primary" href="#projects">View My Projects <Icon name="arrow"/></a>{portfolio.cvUrl ? <a className="button secondary" href={portfolio.cvUrl} download>Download CV <Icon name="download"/></a> : <a className="button secondary" href="#cv">Download CV <Icon name="download"/></a>}</div>
    <div className="hero-social"><SocialLinks compact/><span className="separator"/><a href="#contact">Contact Me <Icon name="arrow"/></a></div>
  </div><div className="hero-visual"><div className="visual-top"><span>CREATIVITY MEETS ENGINEERING</span><span>01 — NE</span></div><div className="portrait-area">{portfolio.profileImageReady ? <Image src={portfolio.profileImage} alt="Portrait of NZAYISENGA Erneste" fill priority sizes="(max-width: 767px) 90vw, 45vw" className="portrait"/> : <div className="portrait-placeholder" role="img" aria-label="Monogram placeholder for Erneste's profile photo"><div className="orbital orbital-one"/><div className="orbital orbital-two"/><span className="big-monogram">ne<span>.</span></span><span className="portrait-note">A THOUGHTFUL APPROACH.<br/>A PRACTICAL OUTCOME.</span></div>}<div className="code-label"><Icon name="code"/><span>Ideas into<br/><strong>working products.</strong></span></div></div><div className="visual-bottom"><span><Icon name="pin"/> Based in Rwanda</span><span className="cyan">Design → Build → Deliver</span></div></div>
    <div className="hero-bottom"><span>Engineering with purpose. Designing with clarity.</span><a href="#about">EXPLORE THE PORTFOLIO <span>↓</span></a></div>
  </section>;
}
