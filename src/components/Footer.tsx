import { portfolio } from "@/data/portfolio";
import { SocialLinks } from "./SocialLinks";
export function Footer() {
  return <footer className="container footer"><div><a href="#home" className="footer-name">NZAYISENGA Erneste<span className="cyan">.</span></a><p>{portfolio.title}</p><a className="footer-founder" href="#entrepreneurship">{portfolio.founderLine}</a></div><div className="footer-links"><a href="#about">About</a><a href="#projects">Projects</a><a href="#services">Services</a><a href="#contact">Contact</a><SocialLinks/></div><div className="footer-bottom"><span>© {new Date().getFullYear()} NZAYISENGA Erneste</span><span>Built with care. Based in Rwanda.</span><a href="#home">Back to top ↑</a></div></footer>;
}
