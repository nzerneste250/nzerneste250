"use client";
import { useState, type FormEvent } from "react";
import { portfolio } from "@/data/portfolio";
import { validateContact, whatsappUrl, type ContactFields, type ContactErrors } from "@/lib/contact";
import { SectionTitle } from "./SectionTitle";
import { Icon } from "./Icon";
import { useI18n } from "@/i18n";
export function Contact() {
  const { t } = useI18n();
  const [errors, setErrors] = useState<ContactErrors>({});
  const [prepared, setPrepared] = useState("");
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form)) as ContactFields;
    const nextErrors = validateContact(fields, t);
    setErrors(nextErrors); setPrepared(""); setStatus("");
    const first = Object.keys(nextErrors)[0];
    if (first) { (form.elements.namedItem(first) as HTMLElement)?.focus(); return; }
    const url = whatsappUrl(fields, t);
    setPrepared(url);
    try {
      const opened = window.open(url, "_blank", "noopener,noreferrer");
      setStatus(opened ? t("WhatsApp opened with your message ready to send.") : t("Your message is ready. If WhatsApp did not open, use the link below."));
    } catch { setStatus(t("Your message is ready. Use the link below to open WhatsApp.")); }
  }
  const cards = [
    { name: "Email", value: portfolio.email, url: `mailto:${portfolio.email}`, icon: "mail" },
    { name: "Phone", value: portfolio.phone, url: `tel:${portfolio.phone.replace(/\s/g, "")}`, icon: "phone" },
    { name: "GitHub", value: "nzerneste250", url: portfolio.github, icon: "github" },
    { name: "Location", value: portfolio.location, url: "", icon: "pin" }
  ];
  function error(field: keyof ContactFields) { return errors[field] && <span id={`${field}-error`} className="field-error">{errors[field]}</span>; }
  function changed() { setPrepared(""); setStatus(""); }
  return <section id="contact" className="section container contact-grid">
    <div className="contact-intro"><SectionTitle number="08" eyebrow={t("LET’S CONNECT")} title={t("Have something in mind?")} text={t("A product idea, a design challenge, or a conversation about technology — I'd love to hear from you.")}/></div>
    <div className="contact-information"><div className="contact-cards">{cards.map(card => <div className="contact-card" key={card.name}><Icon name={card.icon}/><div><small>{card.name}</small>{card.url ? <a href={card.url} target={card.icon === "github" ? "_blank" : undefined} rel="noopener noreferrer">{card.value} <Icon name="external"/></a> : <span>{card.value}</span>}</div></div>)}</div><div className="contact-socials"><p className="eyebrow">FOLLOW / CONNECT</p><div className="social-mini-grid">{portfolio.socials.map(s => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"><Icon name={s.icon}/><span><strong>{s.name}</strong><small>{s.handle}</small></span><Icon name="external"/></a>)}</div></div></div>
    <form className="contact-form" onSubmit={submit} onChange={changed} noValidate>
      <div className="form-heading"><Icon name="whatsapp"/><div><h3>{t("Start a conversation.")}</h3><p>{t("A few details to help me understand your idea.")}</p></div></div>
      <div className="form-row"><label htmlFor="name">{t("Name")} *<input id="name" name="name" placeholder={t("Your name")} autoComplete="name" required minLength={2} maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}/>{error("name")}</label><label htmlFor="email">{t("Email")} *<input id="email" name="email" type="email" placeholder={t("you@example.com")} autoComplete="email" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}/>{error("email")}</label></div>
      <label htmlFor="subject">{t("Subject")} *<input id="subject" name="subject" placeholder={t("What would you like to discuss?")} required minLength={3} maxLength={200} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined}/>{error("subject")}</label>
      <label htmlFor="message">{t("Message")} *<textarea id="message" name="message" placeholder={t("Tell me a little about your idea...")} rows={6} required minLength={10} maxLength={5000} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined}/>{error("message")}</label>
      <p className="form-note">{t("Your message will open in WhatsApp, ready to send.")}</p>
      <button className="button primary" type="submit"><Icon name="whatsapp"/>{t("Send via WhatsApp")}<Icon name="arrow"/></button>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
      {prepared && <a className="text-link whatsapp-fallback" href={prepared} target="_blank" rel="noopener noreferrer">{t("Continue in WhatsApp")} <Icon name="external"/></a>}
      <p className="email-option">{t("Prefer email?")} <a href={`mailto:${portfolio.email}`}>{t("Email me")} <Icon name="arrow"/></a></p>
    </form>
  </section>;
}
