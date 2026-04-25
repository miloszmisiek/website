import { defaultLocale, locales, type Locale } from "./config";

export function toLocale(raw: string | undefined): Locale {
  return (locales.includes(raw as Locale) ? raw : defaultLocale) as Locale;
}

export function detectLocale(): Locale {
  if (typeof document !== "undefined") {
    return toLocale(document.documentElement.lang);
  }

  return defaultLocale;
}
