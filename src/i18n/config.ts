export type Locale = "en" /* | "pl" */;

export const locales: Locale[] = ["en" /*, "pl" */];
export const defaultLocale: Locale = "en";

export const LOCALE_META: Record<Locale, { label: string; og: string }> = {
  en: { label: "English", og: "en_US" },
  // pl: { label: "Polish", og: "pl_PL" },
};
