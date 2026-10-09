import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "./SectionTitle";
import { useI18n } from "@/i18n";
export function Experience() {
  const {t}=useI18n();
  return <section id="experience" className="section container background-grid"><div><SectionTitle number="06" eyebrow={t("EXPERIENCE")} title={t("Learning through building.")}/><p className="eyebrow background-label">{t("HANDS-ON EXPERIENCE")}</p><div className="experience-indicator"><span>01</span><p>{t("Turning knowledge into products.")}</p></div></div><div className="timeline">{portfolio.experience.map(item => <article key={item.project}><div className="timeline-meta"><span className="eyebrow">{t("INDEPENDENT PROJECT")}</span>{item.date && <p>{item.date}</p>}</div><h3>{item.role} <span className="muted">—</span> {item.project}</h3><p>{item.description}</p><ul className="responsibilities">{item.responsibilities.map(r => <li key={r}>{r}</li>)}</ul></article>)}</div></section>;
}
