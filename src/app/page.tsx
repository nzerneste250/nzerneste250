"use client";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Experience } from "@/components/Experience";
import { Education, Credentials } from "@/components/Education";
import { Entrepreneurship } from "@/components/Entrepreneurship";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
export default function Home() {
  return <><a className="skip-link" href="#main">Skip to content</a><Navbar/><main id="main"><div className="hero-stage"><Hero/></div><div className="section-band band-about"><About/></div><div className="section-band band-company"><Entrepreneurship/></div><div className="section-band band-skills"><Skills/></div><div className="section-band band-projects"><Projects/></div><div className="section-band band-services"><Services/></div><div className="section-band band-experience"><Experience/></div><div className="section-band band-education"><Education/><Credentials/></div><div className="section-band band-contact"><Contact/></div></main><Footer/></>;
}
