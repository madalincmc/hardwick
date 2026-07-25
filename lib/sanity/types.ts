import type { Image } from "sanity";

// Raw shape returned by PROJECTS_QUERY / PROJECT_BY_SLUG_QUERY (lib/sanity/queries.ts),
// before mapping into the app-facing Project type (types/project.ts).
export interface SanityProjectDoc {
  title: string;
  slug: string;
  category: string;
  location: string;
  year: number;
  description: string;
  materials?: string[];
  featured?: boolean;
  clientRequirements?: string;
  highlights?: string[];
  coverImage: Image;
  gallery?: Image[];
  _updatedAt: string;
}
