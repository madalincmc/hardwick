import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { buildMetadata } from "@/lib/metadata";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/types/project";

interface PortfolioPageProps {
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
}

const SORT_OPTIONS = ["newest", "oldest", "az"] as const;

// Only `category` gets its own canonical/indexable URL — it's a fixed, finite facet worth
// ranking for (e.g. "custom kitchens Baia Mare"). `q`/`sort` are dropped from the canonical
// so search and sort variations consolidate onto the category (or root) page instead of
// generating thin duplicate-content URLs.
export async function generateMetadata({ searchParams }: PortfolioPageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = CATEGORIES.includes(params.category as Category) ? (params.category as Category) : undefined;

  if (!category) {
    return buildMetadata({
      title: "Portofoliu",
      description:
        "Explorează portofoliul Hardwick de bucătării, dulapuri, camere de zi, dormitoare, băi, birouri și mobilier comercial la comandă.",
      path: "/portfolio",
    });
  }

  const label = CATEGORY_LABELS[category];
  return buildMetadata({
    title: `${label} — Portofoliu`,
    description: `Descoperă proiectele Hardwick de ${label.toLowerCase()} la comandă — design, producție și instalare.`,
    path: `/portfolio?${new URLSearchParams({ category }).toString()}`,
  });
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const params = await searchParams;
  const projects = await getAllProjects();

  const initialCategory: Category | "All" = CATEGORIES.includes(params.category as Category)
    ? (params.category as Category)
    : "All";
  const initialSort = SORT_OPTIONS.includes(params.sort as (typeof SORT_OPTIONS)[number])
    ? (params.sort as (typeof SORT_OPTIONS)[number])
    : "newest";

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:px-8 lg:pt-36 lg:pb-32">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-medium tracking-[0.2em] text-gold uppercase">Portofoliu</p>
        <h1 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          O colecție construită proiect cu proiect
        </h1>
        <p className="mt-4 text-base text-muted-foreground text-pretty">
          Fiecare piesă din acest portofoliu a fost proiectată, produsă și instalată de Hardwick — filtrează după tip
          de încăpere sau caută pentru a explora.
        </p>
      </div>

      <div className="mt-12">
        <PortfolioGrid
          projects={projects}
          initialCategory={initialCategory}
          initialSearch={params.q ?? ""}
          initialSort={initialSort}
        />
      </div>
    </div>
  );
}
