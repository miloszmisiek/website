/**
 * TypeScript Type Definitions for Portfolio Data
 * Ensures type safety across all data files and components
 */

export interface TimelineEntry {
  id: string;
  period: {
    start: string; // YYYY-MM-DD or "present"
    end: string;   // YYYY-MM-DD or "present"
  };
  duration: string; // e.g., "1+ years", "2 years"
  role: string;
  company: string;
  focus?: string; // Optional: main focus area
  description: string;
  highlights: string[];
  technologies: string[];
  type: "work" | "academic";
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  status: "Published" | "Under Review" | "Preprint";
  year: number;
  date?: string; // YYYY-MM-DD
  topics: string[];
  excerpt?: string;
  excerpt_pl?: string;
  readTime?: string; // e.g., "8 min read"
  readTime_pl?: string;
  link?: string;
  doi?: string;
}

export interface TechLogo {
  name: string;
  slug: string; // Simple Icons slug, e.g. "react", "nextdotjs"
}

export interface Product {
  id: string;
  name: string;
  role: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
  year?: number;
  featured?: boolean;
}

export interface PortfolioData {
  experience: TimelineEntry[];
  publications: Publication[];
  techStack: TechLogo[];
  products: Product[];
}
