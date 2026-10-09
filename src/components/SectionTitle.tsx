export function SectionTitle({ number, eyebrow, title, text }: { number: string; eyebrow: string; title: string; text?: string }) {
  return <div className="section-title"><p className="eyebrow"><span>{number} /</span> {eyebrow}</p><h2>{title}</h2>{text && <p className="section-description">{text}</p>}</div>;
}
