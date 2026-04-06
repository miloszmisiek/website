/**
 * Lightweight i18n — no external packages.
 * Usage:
 *   const t = useTranslations(lang)
 *   t('hconst publicationsData = await Promise.all(PUBLICATION_DOIS.map(pub => {
	const data = getPublicationData(pub);
	return data;
}));ero.typewriter')
 */

export type Locale = "en" | "pl";
export const locales: Locale[] = ["en", "pl"];
export const defaultLocale: Locale = "en";

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------
const en = {
  // Layout
  "layout.title": "Milosz Misiek | Software Engineer",

  // Navigation
  "nav.work": "WORK",
  "nav.research": "RESEARCH",
  "nav.contact": "CONTACT",

  // Hero
  "hero.typewriter": "Engineering calm, precision-driven digital experiences.",
  "hero.bio.first":
    "I am a software engineer based in Poland. I blend deep technical architecture with severe design restraint to build interfaces that feel deliberate, fast, and timeless.",
  "hero.bio.second":
    "Specializing in high-performance frontends, complex state management, and motion systems for teams that care about refined details.",
  "hero.cta.viewWork": "VIEW_WORK",
  "hero.cta.contact": "CONTACT",
  "hero.stats.experience.label": "Experience",
  "hero.stats.experience.value": "5+ Years",
  "hero.stats.focus.label": "Focus",
  "hero.stats.focus.value": "Frontend / UX",
  "hero.stats.status.label": "Status",
  "hero.stats.status.value": "Available",

  // Footer
  "footer.github": "GITHUB",
  "footer.linkedin": "LINKEDIN",

  // Section headings
  "section.experience": "EXPERIENCE",
  "section.publications": "PUBLICATIONS",

  "section.products": "FEATURED PRODUCTS",
  "section.howICanHelp": "HOW I CAN HELP",

  // Capabilities
  "capabilities.product.title": "Product & UX",
  "capabilities.product.item1": "Journey mapping",
  "capabilities.product.item2": "State diagrams",
  "capabilities.product.item3": "Interaction flows",
  "capabilities.frontend.title": "Frontend Engineering",
  "capabilities.frontend.item1": "React / Next.js / Astro",
  "capabilities.frontend.item2": "Framer Motion & animations",
  "capabilities.frontend.item3": "Design systems",
  "capabilities.fullstack.title": "Full-Stack & APIs",
  "capabilities.fullstack.item1": "Node.js / GraphQL",
  "capabilities.fullstack.item2": "Database design",
  "capabilities.fullstack.item3": "AI / ML integration",

  // Timeline
  "timeline.present": "Present",

  // Tech proficiency labels
  "tech.level.expert": "Expert",
  "tech.level.advanced": "Advanced",
  "tech.level.intermediate": "Intermediate",
  "tech.level.basic": "Basic",
  "tech.year": "year",
  "tech.years": "years",

  // Publication
  "publication.viewPaper": "VIEW PAPER",
  "publication.status.Published": "Published",
  "publication.status.Under Review": "Under Review",
  "publication.status.Preprint": "Preprint",

  // Product
  "product.viewProduct": "VIEW PRODUCT",
  "product.imagePlaceholder": "Product Image",
} as const;

// ---------------------------------------------------------------------------
// Polish
// ---------------------------------------------------------------------------
const pl: Record<keyof typeof en, string> = {
  // Layout
  "layout.title": "Milosz Misiek | Inżynier Oprogramowania",

  // Navigation
  "nav.work": "PRACA",
  "nav.research": "BADANIA",
  "nav.contact": "KONTAKT",

  // Hero
  "hero.typewriter": "Buduję spokojne, precyzyjne doświadczenia cyfrowe.",
  "hero.bio.first":
    "Jestem inżynierem oprogramowania z Polski. Łączę głęboką architekturę techniczną z rygorem projektowym, tworząc interfejsy, które są przemyślane, szybkie i ponadczasowe.",
  "hero.bio.second":
    "Specjalizuję się w wysoko wydajnych frontendach, złożonym zarządzaniu stanem i systemach animacji dla zespołów dbających o dopracowane detale.",
  "hero.cta.viewWork": "MOJE PRACE",
  "hero.cta.contact": "KONTAKT",
  "hero.stats.experience.label": "Doświadczenie",
  "hero.stats.experience.value": "5+ lat",
  "hero.stats.focus.label": "Specjalizacja",
  "hero.stats.focus.value": "Frontend / UX",
  "hero.stats.status.label": "Status",
  "hero.stats.status.value": "Dostępny",

  // Footer
  "footer.github": "GITHUB",
  "footer.linkedin": "LINKEDIN",

  // Section headings
  "section.experience": "DOŚWIADCZENIE",
  "section.publications": "PUBLIKACJE",

  "section.products": "WYRÓŻNIONE PROJEKTY",
  "section.howICanHelp": "JAK MOGĘ POMÓC",

  // Capabilities
  "capabilities.product.title": "Produkt i UX",
  "capabilities.product.item1": "Mapowanie podróży użytkownika",
  "capabilities.product.item2": "Diagramy stanów",
  "capabilities.product.item3": "Przepływy interakcji",
  "capabilities.frontend.title": "Inżynieria Frontend",
  "capabilities.frontend.item1": "React / Next.js / Astro",
  "capabilities.frontend.item2": "Framer Motion i animacje",
  "capabilities.frontend.item3": "Systemy projektowania",
  "capabilities.fullstack.title": "Full-Stack i API",
  "capabilities.fullstack.item1": "Node.js / GraphQL",
  "capabilities.fullstack.item2": "Projektowanie baz danych",
  "capabilities.fullstack.item3": "Integracja AI / ML",

  // Timeline
  "timeline.present": "Obecnie",

  // Tech proficiency labels
  "tech.level.expert": "Ekspert",
  "tech.level.advanced": "Zaawansowany",
  "tech.level.intermediate": "Średnio zaawansowany",
  "tech.level.basic": "Podstawowy",
  "tech.year": "rok",
  "tech.years": "lata",

  // Publication
  "publication.viewPaper": "CZYTAJ ARTYKUŁ",
  "publication.status.Published": "Opublikowano",
  "publication.status.Under Review": "W recenzji",
  "publication.status.Preprint": "Preprint",

  // Product
  "product.viewProduct": "PRZEJDŹ DO PROJEKTU",
  "product.imagePlaceholder": "Zdjęcie produktu",
};

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
const dicts: Record<Locale, Record<string, string>> = { en, pl };

export function useTranslations(lang: Locale) {
  return (key: keyof typeof en): string =>
    dicts[lang]?.[key] ?? dicts.en[key] ?? key;
}
