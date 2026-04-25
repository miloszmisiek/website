import { dicts, type TranslationKey } from "./dictionaries";
import { detectLocale, toLocale } from "./locale";

export function getTranslations(locale?: string) {
  const lang = locale ? toLocale(locale) : detectLocale();

  return (key: TranslationKey): string =>
    dicts[lang]?.[key] ?? dicts.en[key] ?? key;
}
