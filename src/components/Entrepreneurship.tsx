import { portfolio } from "@/data/portfolio";
import { Icon } from "./Icon";
import { SectionTitle } from "./SectionTitle";
export function Entrepreneurship() {
  const company = portfolio.company;
  return <section id="entrepreneurship" className="section container entrepreneurship">
    <SectionTitle number="02" eyebrow={"ENTREPRENEURSHIP"} title={`${company.name}.`}/>
    <div className="company-intro"><div><p className="eyebrow company-label">{company.label}</p><h3>{company.heading}</h3></div><div><p>{company.description}</p><a className="text-link cyan" href="#contact">{"Let’s work on your next idea"} <Icon name="arrow"/></a></div></div>
    <div className="company-services">{company.services.map((service, i) => <article className="company-card" key={service.name}><div className="card-top"><span className="category-icon"><Icon name={service.icon}/></span><span>0{i + 1}</span></div><h3>{service.name}</h3><p>{service.description}</p><ul>{service.items.map(item => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul></article>)}</div>
  </section>;
}
