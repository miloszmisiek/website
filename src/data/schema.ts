/**
 * TypeScript Type Definitions for Portfolio Data
 * Ensures type safety across all data files and components
 */

import { ExperienceTypeEnum, PublicationStatusEnum } from "./types";
export { ExperienceTypeEnum, PublicationStatusEnum };

export type TimelineEntry = {
  id: string;
  period: {
    start: string; // YYYY-MM-DD or "present"
    end: string; // YYYY-MM-DD or "present"
  };
  duration: string; // e.g., "1+ years", "2 years"
  role: string;
  company: string;
  description: string;
  highlights: string[];
  technologies: string[];
  type: ExperienceTypeEnum;
  focus?: string; // Optional: main focus area
};

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  status: PublicationStatusEnum;
  year: number;
  date?: string; // YYYY-MM-DD
  topics: string[];
  tldr?: string; // Short teaser text shown on card
  excerpt?: string;
  readTime?: string; // e.g., "8 min read"
  link?: string;
  doi?: string;
};

export type TechLogo = {
  name: string;
  slug: string; // Simple Icons slug, e.g. "react", "nextdotjs"
};

export type Product = {
  id: string;
  name: string;
  role: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
  image_mobile?: string;
  year?: number;
  featured?: boolean;
  nda?: boolean;
};
