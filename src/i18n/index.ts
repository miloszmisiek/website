/**
 * Lightweight i18n — no external packages.
 * Usage:
 *   const t = getTranslations(lang)
 *   t('hero.typewriter')
 */

import type { TimelineEntry, Publication, Product } from "../data/schema";
import enTranslations from "./en/translations.json";
import plTranslations from "./pl/translations.json";
import enExperience from "./en/experience.json";
import plExperience from "./pl/experience.json";
import enPublications from "./en/publications.json";
import plPublications from "./pl/publications.json";
import enProducts from "./en/products.json";
import plProducts from "./pl/products.json";

export type Locale = "en" | "pl";
export const locales: Locale[] = ["en", "pl"];
export const defaultLocale: Locale = "en";
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  pl: "Polish",
};

export type TranslationKey = keyof typeof enTranslations;

function toLocale(raw: string | undefined): Locale {
  return (locales.includes(raw as Locale) ? raw : defaultLocale) as Locale;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
const dicts: Record<Locale, Record<string, string>> = {
  en: enTranslations,
  pl: plTranslations,
};

export function getTranslations(locale?: string) {
  const lang = toLocale(locale);
  return (key: TranslationKey): string =>
    dicts[lang]?.[key] ?? dicts.en[key] ?? key;
}

// ---------------------------------------------------------------------------
// Data loaders
// ---------------------------------------------------------------------------
const experienceData: Record<Locale, TimelineEntry[]> = {
  en: enExperience as TimelineEntry[],
  pl: plExperience as TimelineEntry[],
};

const publicationsData: Record<Locale, Publication[]> = {
  en: enPublications as Publication[],
  pl: plPublications as Publication[],
};

const productsData: Record<Locale, Product[]> = {
  en: enProducts as Product[],
  pl: plProducts as Product[],
};

export function getExperience(locale?: string): TimelineEntry[] {
  return experienceData[toLocale(locale)] ?? experienceData.en;
}

export function getPublications(locale?: string): Publication[] {
  return publicationsData[toLocale(locale)] ?? publicationsData.en;
}

export function getProducts(locale?: string): Product[] {
  return productsData[toLocale(locale)] ?? productsData.en;
}
