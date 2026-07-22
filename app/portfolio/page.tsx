import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { buildMetadata } from "@/lib/metadata";
import { CATEGORIES, type Category } from "@/types/project";

export const metadata: Metadata = buildMetadata({
  title: "Portofoliu",
  description:
    "Explorează portofoliul Hardwick de bucătării, dulapuri, camere de zi, dormitoare, băi, birouri și mobilier comercial la comandă.",
  path: "/portfolio",
});

interface PortfolioPageProps {
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
}

const SORT_OPTIONS = ["newest", "oldest", "az"] as const;

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const params = await searchParams;
  const projects = getAllProjects();

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
