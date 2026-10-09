import { portfolio } from "@/data/portfolio";
export type ContactFields = { name: string; email: string; subject: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
export function validateContact(fields: ContactFields, t: (key: string) => string = key => key): ContactErrors {
  const errors: ContactErrors = {};
  if (fields.name.trim().length < 2) errors.name = t("Enter your name (at least 2 characters).");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = t("Enter a valid email address.");
  if (fields.subject.trim().length < 3) errors.subject = t("Enter a subject (at least 3 characters).");
  if (fields.message.trim().length < 10) errors.message = t("Write a message of at least 10 characters.");
  return errors;
}
export function whatsappUrl(fields: ContactFields, t: (key: string) => string = key => key): string {
  const number = portfolio.phone.replace(/\D/g, "");
  const message = `${t("Hello Erneste")},\n\n${t("You received a new message from your portfolio.")}\n\n${t("Name")}: ${fields.name.trim()}\n${t("Email")}: ${fields.email.trim()}\n${t("Subject")}: ${fields.subject.trim()}\n\n${t("Message")}:\n${fields.message.trim()}\n\n${t("Sent from NZAYISENGA Erneste’s portfolio.")}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
