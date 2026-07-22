export const CATEGORIES = [
  "Kitchens",
  "Wardrobes",
  "Living Rooms",
  "Bedrooms",
  "Bathrooms",
  "Offices",
  "Commercial",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  Kitchens: "Bucătării",
  Wardrobes: "Dulapuri",
  "Living Rooms": "Camere de Zi",
  Bedrooms: "Dormitoare",
  Bathrooms: "Băi",
  Offices: "Birouri",
  Commercial: "Comercial",
};

export interface Project {
  title: string;
  slug: string;
  category: Category;
  location: string;
  year: number;
  description: string;
  materials: string[];
  coverImage: string;
  gallery: string[];
  featured: boolean;
  clientRequirements?: string;
  highlights?: string[];
}
