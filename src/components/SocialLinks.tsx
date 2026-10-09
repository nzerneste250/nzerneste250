import { portfolio } from "@/data/portfolio";
import { Icon } from "./Icon";
export function SocialLinks({ compact = false }: { compact?: boolean }) {
  const links = compact ? portfolio.socials.filter(s => ["github", "instagram"].includes(s.icon)) : portfolio.socials;
  return <div className="social-links">{links.map(link => <a key={link.name} href={link.url} aria-label={link.name} target="_blank" rel="noopener noreferrer"><Icon name={link.icon}/></a>)}<a href={`mailto:${portfolio.email}`} aria-label="Email"><Icon name="mail"/></a></div>;
}
