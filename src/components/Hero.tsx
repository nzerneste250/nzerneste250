import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { Icon } from "./Icon";
import { SocialLinks } from "./SocialLinks";
import { useI18n } from "@/i18n";
export function Hero() {
  const { t } = useI18n();
  return <section id="home" className="hero container"><div className="hero-copy">
    <p className="eyebrow hero-eyebrow"><span className="status-dot"/> {t(portfolio.heroEyebrow)}</p>
    <h1><span>NZAYISENGA</span><br/>Erneste<span className="cyan">.</span></h1>
    <p className="hero-role">{t(portfolio.heroIdentity)}</p><p className="hero-description">{t(portfolio.intro)}</p><a className="founder-line" href="#entrepreneurship"><span className="founder-mark" aria-hidden="true">↗</span>{t(portfolio.founderLine)}</a>
    <div className="hero-actions"><a className="button primary" href="#projects">{t("View My Projects")} <Icon name="arrow"/></a>{portfolio.cvUrl ? <a className="button secondary" href={portfolio.cvUrl} download>{t("Download CV")} <Icon name="download"/></a> : <a className="button secondary" href="#cv">{t("Download CV")} <Icon name="download"/></a>}</div>
    <div className="hero-social"><SocialLinks compact/><span className="separator"/><a href="#contact">{t("Contact Me")} <Icon name="arrow"/></a></div>
  </div><div className="hero-visual"><div className="visual-top"><span>{t("CREATIVITY MEETS ENGINEERING")}</span><span>01 — NE</span></div><div className="portrait-area">{portfolio.profileImageReady ? <Image src={portfolio.profileImage} alt={t("Portrait of NZAYISENGA Erneste")} fill priority sizes="(max-width: 767px) 90vw, 45vw" className="portrait"/> : <div className="portrait-placeholder" role="img" aria-label={t("Portrait of NZAYISENGA Erneste")}><div className="orbital orbital-one"/><div className="orbital orbital-two"/><span className="big-monogram">ne<span>.</span></span></div>}<div className="code-label"><Icon name="code"/><span>{t("Ideas into")}<br/><strong>{t("working products.")}</strong></span></div></div><div className="visual-bottom"><span><Icon name="pin"/> {t("Based in Rwanda")}</span><span className="cyan">{t("Design → Build → Deliver")}</span></div></div>
    <div className="hero-bottom"><span>{t("Engineering with purpose. Designing with clarity.")}</span><a href="#about">{t("EXPLORE THE PORTFOLIO ↓")}</a></div>
  </section>;
}
