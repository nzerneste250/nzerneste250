import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "./SectionTitle";
import { Icon } from "./Icon";
import { useI18n } from "@/i18n";
export function Education() {
  const {t}=useI18n();
  return <section id="education" className="section container background-grid"><div><SectionTitle number="07" eyebrow={t("EDUCATION")} title={t("Engineering the foundation.")}/><p className="eyebrow background-label">{t("ACADEMIC JOURNEY")}</p></div><div className="education-list">{portfolio.education.map(e => <article className="education-card" key={e.institution}><Icon name="code"/><div><p className="eyebrow">{e.status}</p><h3>{e.institution}</h3><p>{e.course}</p><span className="muted">{e.location}{e.date && ` · ${e.date}`}</span></div></article>)}</div></section>;
}
export function Credentials() {
  const {t}=useI18n(); return <>{portfolio.certifications.length > 0 && <section className="section container" aria-labelledby="credentials-title"><h2 id="credentials-title">{t("Certifications")}</h2><div className="skills-grid">{portfolio.certifications.map(c => <article className="skill-card" key={c.name}><h3>{c.name}</h3><p>{c.issuer} · {c.date}</p>{c.url && <a href={c.url} target="_blank" rel="noopener noreferrer">{t("View credential")}</a>}</article>)}</div></section>}<aside id="cv" className="cv-section container"><div><h3>{t("A little more about my background.")}</h3><p>{portfolio.cvUrl ? t("Explore my experience and skills in my CV.") : "My downloadable CV will be added here soon. Get in touch to request it."}</p></div>{portfolio.cvUrl ? <a href={portfolio.cvUrl} className="button secondary" download>{t("Download CV")} <Icon name="download"/></a> : <a className="text-link" href="#contact">{t("Request my CV")} <Icon name="arrow"/></a>}</aside></>;
}
