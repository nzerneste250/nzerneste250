import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "./SectionTitle";
import { Icon } from "./Icon";
export function Skills() { return <section id="skills" className="section container"><SectionTitle number="03" eyebrow={"THE TOOLKIT"} title={"The tools behind the work."} text={"From interface to infrastructure — and the visual details in between."}/><div className="skills-grid">{portfolio.skills.slice(0, 6).map((skill, i) => <article className="skill-card" key={skill.name}><div className="card-top"><span className="category-icon"><Icon name={skill.icon}/></span><span>0{i + 1}</span></div><h3>{skill.name}</h3><div className="tags">{skill.items.map(item => <span key={item}>{item}</span>)}</div></article>)}</div><div className="additional-skills">{portfolio.skills.slice(6).map(skill => <div key={skill.name}><Icon name={skill.icon}/><div><h3>{skill.name}</h3><p>{skill.items.join(" · ")}</p></div></div>)}</div></section>;
}
