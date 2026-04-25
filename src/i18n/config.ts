export type Locale = "en" | "pl";

export const locales: Locale[] = ["en", "pl"];
export const defaultLocale: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  pl: "Polish",
};
