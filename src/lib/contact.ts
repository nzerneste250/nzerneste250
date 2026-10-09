import { portfolio } from "@/data/portfolio";
export type ContactFields = { name: string; email: string; subject: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (fields.name.trim().length < 2) errors.name = "Enter your name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Enter a valid email address.";
  if (fields.subject.trim().length < 3) errors.subject = "Enter a subject (at least 3 characters).";
  if (fields.message.trim().length < 10) errors.message = "Write a message of at least 10 characters.";
  return errors;
}
export function whatsappUrl(fields: ContactFields): string {
  const number = portfolio.phone.replace(/\D/g, "");
  const message = `${"Hello Erneste"},\n\n${"You received a new message from your portfolio."}\n\n${"Name"}: ${fields.name.trim()}\n${"Email"}: ${fields.email.trim()}\n${"Subject"}: ${fields.subject.trim()}\n\n${"Message"}:\n${fields.message.trim()}\n\n${"Sent from NZAYISENGA Erneste’s portfolio."}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
