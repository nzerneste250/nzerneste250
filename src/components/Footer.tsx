import { portfolio } from "@/data/portfolio";
import { SocialLinks } from "./SocialLinks";
import { useI18n } from "@/i18n";
export function Footer() {
  const {t}=useI18n(); return <footer className="container footer"><div><a href="#home" className="footer-name">NZAYISENGA Erneste<span className="cyan">.</span></a><p>{portfolio.title}</p><a className="footer-founder" href="#entrepreneurship">{t(portfolio.founderLine)}</a></div><div className="footer-links"><a href="#about">{t("About")}</a><a href="#projects">{t("Projects")}</a><a href="#services">{t("Services")}</a><a href="#contact">{t("Contact")}</a><SocialLinks/></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NZAYISENGA Erneste</span><span>{t("Built with care. Based in Rwanda.")}</span><a href="#home">{t("Back to top ↑")}</a></div></footer>;
}
