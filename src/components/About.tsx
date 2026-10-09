import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "./SectionTitle";
import { useI18n } from "@/i18n";
export function About() {
  const {t}=useI18n(); return <section id="about" className="section container about-grid"><div><SectionTitle number="01" eyebrow={t("A LITTLE ABOUT ME")} title={t("Practical thinking. Creative perspective.")}/><div className="technical-visual" aria-hidden="true"><span>SOFTWARE</span><span>DESIGN</span><span>BUSINESS</span><i/></div></div><div className="about-copy">{portfolio.about.map(p => <p key={p}>{p}</p>)}<div className="about-notes"><span><small>{t("MY APPROACH")}</small>{t("Build for real people")}</span><span><small>{t("MY PERSPECTIVE")}</small>{t("Code + design + business")}</span></div><div className="language-list" aria-label={t("Language skills")}>{portfolio.languages.map(language => <span key={language.name}><strong>{language.name}</strong><small>{language.level}</small></span>)}</div></div></section>;
}
