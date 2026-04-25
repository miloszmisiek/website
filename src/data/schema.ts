import { ExperienceTypeEnum, PublicationStatusEnum } from "./types";
export { ExperienceTypeEnum, PublicationStatusEnum };

export type TimelineEntry = {
  id: string;
  period: {
    start: string;
    end: string;
  };
  duration: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  technologies: string[];
  type: ExperienceTypeEnum;
  focus?: string;
};

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  status: PublicationStatusEnum;
  year: number;
  date?: string;
  topics: string[];
  tldr?: string;
  excerpt?: string;
  readTime?: string;
  link?: string;
  doi?: string;
};

export type TechLogo = {
  name: string;
  slug: string;
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
