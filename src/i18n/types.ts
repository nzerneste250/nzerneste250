export const locales = ["en", "rw", "fr"] as const;
export type Locale = (typeof locales)[number];
export type TranslationKey = string;
export type Dictionary = Record<TranslationKey, string>;