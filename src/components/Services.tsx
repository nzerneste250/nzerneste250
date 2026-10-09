import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "./SectionTitle";
import { Icon } from "./Icon";
import { useI18n } from "@/i18n";
export function Services() {
  const {t}=useI18n(); return <section id="services" className="section container services-layout"><div><SectionTitle number="05" eyebrow={t("HOW I CAN HELP")} title={t("Good ideas deserve good execution.")}/><p className="section-description">{t("A considered approach to your next website, digital product, or visual identity.")}</p><a className="text-link cyan" href="#contact">{t("Let’s discuss your project")} <Icon name="arrow"/></a></div><div className="service-list">{portfolio.services.map((service, i) => <a className="service-row" href="#contact" key={service.name}><span className="service-number">0{i + 1}</span><span className="category-icon"><Icon name={service.icon}/></span><div><h3>{service.name}</h3><p>{service.description}</p></div><Icon name="arrow"/></a>)}</div></section>;
}
