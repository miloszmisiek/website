/**
 * Lightweight i18n — no external packages.
 *
 * Usage:
 *   // Astro components (SSR / build time):
 *   const t = getTranslations(Astro.currentLocale)
 *
 *   // React client islands (locale auto-detected from <html lang>):
 *   const t = getTranslations()
 *
 *   t('hero.typewriter')
 *
 * Locale is never prop-drilled. Each component resolves it independently:
 *   - Astro: passes Astro.currentLocale directly (not from props)
 *   - React: reads document.documentElement.lang set by Layout.astro
 */

import en from "./en/translations.json";
import pl from "./pl/translations.json";

export type Locale = "en" | "pl";
export const locales: Locale[] = ["en", "pl"];
export const defaultLocale: Locale = "en";

export type TranslationKey = keyof typeof en;
export type TranslationDict = Record<TranslationKey, string>;

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
