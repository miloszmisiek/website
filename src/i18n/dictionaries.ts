import type { Locale } from "./config";
import enTranslations from "./en/translations.json";
import plTranslations from "./pl/translations.json";

export type TranslationKey = keyof typeof enTranslations;

export const dicts: Record<Locale, Record<string, string>> = {
  en: enTranslations,
  pl: plTranslations,
};
