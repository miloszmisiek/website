import type { TimelineEntry, Publication, Product } from "../data/schema";
import type { Locale } from "./config";
import { toLocale } from "./locale";
import enExperience from "./en/experience.json";
import plExperience from "./pl/experience.json";
import enPublications from "./en/publications.json";
import plPublications from "./pl/publications.json";
import enProducts from "./en/products.json";
import plProducts from "./pl/products.json";

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
  const publications = publicationsData[toLocale(locale)] ?? publicationsData.en;
  return [...publications].sort((a, b) => b.year - a.year);
}

export function getProducts(locale?: string): Product[] {
  return productsData[toLocale(locale)] ?? productsData.en;
}
