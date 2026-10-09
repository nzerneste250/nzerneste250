import Image from "next/image";
import { portfolio, type Project } from "@/data/portfolio";
import { SectionTitle } from "./SectionTitle";
import { Icon } from "./Icon";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card">
      <div className={`project-art art-${index}`}>
        {project.imageReady && project.image ? <Image src={project.image} alt={`${project.name} project screenshot`} fill sizes="(max-width: 640px) 90vw, 33vw" className="project-screenshot" /> : <div className="project-art-placeholder" aria-hidden="true"><Icon name="code" /><span>Project details in progress</span></div>}
      </div>
      <div className="project-card-body">
        <p className="eyebrow">{project.category}</p><h3>{project.name}</h3><p>{project.description}</p>
        <div className="tags">{project.technologies.map(t => <span key={t}>{t}</span>)}</div>
        {project.placeholder && <span className="placeholder-label">Placeholder · project details to be added</span>}
        {(project.liveUrl || project.githubUrl) && <div className="project-actions">{project.liveUrl && <a className="text-link cyan" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo <Icon name="external" /></a>}{project.githubUrl && <a className="text-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <Icon name="github" /></a>}</div>}
      </div>
    </article>
  );
}

export function Projects() {
  const featured = portfolio.projects[0];
  return <section id="projects" className="section container">
    <SectionTitle number="04" eyebrow="SELECTED WORK" title="Ideas, brought to life." text="A closer look at the products I build and the problems they solve." />
    <article className="featured-project"><div className="featured-art"><div className="project-window-label"><span className="status-dot" /> LIVE PRODUCT / IKIZAME.RW <Icon name="external" /></div>{featured.imageReady && featured.image ? <a className="screenshot-link" href={featured.image} target="_blank" rel="noopener noreferrer" aria-label="Open full-size ikizame.rw screenshot"><Image src={featured.image} alt="ikizame.rw driving exam platform screenshot" fill sizes="(max-width: 1199px) 90vw, 55vw" className="project-screenshot" /></a> : <div className="project-art-placeholder" role="img" aria-label="Project preview in progress"><Icon name="code" /><span>Project preview in progress</span></div>}</div><div className="featured-content"><p className="eyebrow"><span className="status-dot" /> FEATURED PROJECT</p><h3>ikizame<span className="cyan">.rw</span></h3><p>{featured.description}</p><div className="project-actions">{featured.liveUrl && <a className="button primary" href={featured.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo <Icon name="external" /></a>}{featured.githubUrl && <a className="button secondary" href={featured.githubUrl} target="_blank" rel="noopener noreferrer">Source Code <Icon name="github" /></a>}</div><div className="feature-summary"><span><Icon name="check" /> Mobile-first practice</span><span><Icon name="check" /> MoMo &amp; Airtel Money</span><span><Icon name="check" /> Production VPS deployment</span></div><div className="tags">{featured.technologies.map(t => <span key={t}>{t}</span>)}</div><details className="project-details"><summary>My contribution <span aria-hidden="true">＋</span></summary><p>Designed, developed, deployed, and maintained the platform across its frontend, backend, database, payment integration, and production environment.</p></details></div></article>
    <div className="projects-grid">{portfolio.projects.slice(1).map((project, index) => <ProjectCard key={project.name} project={project} index={index + 1} />)}</div>
  </section>;
}