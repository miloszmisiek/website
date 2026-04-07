/**
 * Lightweight i18n — no external packages.
 *
 * UI strings:
 *   const t = getTranslations(Astro.currentLocale)  // Astro SSR
 *   const t = getTranslations()                     // React client island
 *   t('hero.typewriter')
 *
 * Content data:
 *   getExperience(Astro.currentLocale)   → TimelineEntry[]
 *   getProducts(Astro.currentLocale)     → Product[]
 *   getPublications(Astro.currentLocale) → Publication[]
 *
 * Locale is never prop-drilled. Each component resolves it independently:
 *   - Astro: passes Astro.currentLocale directly (not from props)
 *   - React: reads document.documentElement.lang set by Layout.astro
 */

import en from "./en/translations.json";
import pl from "./pl/translations.json";
import enExperience from "./en/experience.json";
import plExperience from "./pl/experience.json";
import enProducts from "./en/products.json";
import plProducts from "./pl/products.json";
import enPublications from "./en/publications.json";
import plPublications from "./pl/publications.json";
import type { TimelineEntry, Product, Publication } from "../data/schema";

export type Locale = "en" | "pl";
const locales: Locale[] = ["en", "pl"];
const defaultLocale: Locale = "en";

export type TranslationKey = keyof typeof en;
type TranslationDict = Record<TranslationKey, string>;

const dicts: Record<Locale, TranslationDict> = { en, pl };

function toLocale(raw: string | undefined): Locale {
  return (locales.includes(raw as Locale) ? raw : defaultLocale) as Locale;
}

/**
 * Returns a typed translation lookup function.
 *
 * @param locale - Pass `Astro.currentLocale` in .astro files.
 *                 Omit in React client islands — locale is read from the DOM.
 */
export function getTranslations(locale?: string) {
  const lang =
    locale !== undefined
      ? toLocale(locale) // Astro SSR
      : toLocale(
          typeof document !== "undefined" // React client
            ? document.documentElement.lang
            : defaultLocale,
        );

  const dict = dicts[lang];
  return (key: TranslationKey): string => dict[key] ?? en[key] ?? key;
}

const experienceByLocale: Record<Locale, TimelineEntry[]> = {
  en: enExperience as unknown as TimelineEntry[],
  pl: plExperience as unknown as TimelineEntry[],
};

const productsByLocale: Record<Locale, Product[]> = {
  en: enProducts as unknown as Product[],
  pl: plProducts as unknown as Product[],
};

const publicationsByLocale: Record<Locale, Publication[]> = {
  en: enPublications as unknown as Publication[],
  pl: plPublications as unknown as Publication[],
};

/** Returns localized experience timeline entries. */
export function getExperience(locale?: string): TimelineEntry[] {
  return experienceByLocale[toLocale(locale)];
}

/** Returns localized products. */
export function getProducts(locale?: string): Product[] {
  return productsByLocale[toLocale(locale)];
}

/** Returns localized publications sorted by year descending. */
export function getPublications(locale?: string): Publication[] {
  return [...publicationsByLocale[toLocale(locale)]].sort(
    (a, b) => (b.year ?? 0) - (a.year ?? 0),
  );
}
