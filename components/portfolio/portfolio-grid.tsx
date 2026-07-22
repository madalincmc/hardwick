"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types/project";
import { CATEGORIES, type Category } from "@/types/project";
import { PortfolioFilters } from "@/components/portfolio/portfolio-filters";
import { SearchBar } from "@/components/portfolio/search-bar";
import { ProjectCard } from "@/components/portfolio/project-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

type SortOption = "newest" | "oldest" | "az";

const PAGE_SIZE = 9;

interface PortfolioGridProps {
  projects: Project[];
  initialCategory: Category | "All";
  initialSearch: string;
  initialSort: SortOption;
}

export function PortfolioGrid({ projects, initialCategory, initialSearch, initialSort }: PortfolioGridProps) {
  const router = useRouter();

  const [category, setCategory] = React.useState<Category | "All">(initialCategory);
  const [search, setSearch] = React.useState(initialSearch);
  const [sort, setSort] = React.useState<SortOption>(initialSort);
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);

  const updateUrl = React.useCallback(
    (next: { category?: Category | "All"; q?: string; sort?: SortOption }) => {
      const merged = { category, q: search, sort, ...next };
      const params = new URLSearchParams();

      if (merged.category && merged.category !== "All") params.set("category", merged.category);
      if (merged.q) params.set("q", merged.q);
      if (merged.sort && merged.sort !== "newest") params.set("sort", merged.sort);

      const query = params.toString();
      router.replace(query ? `/portfolio?${query}` : "/portfolio", { scroll: false });
    },
    [category, search, sort, router]
  );

  const counts = React.useMemo(() => {
    const result: Partial<Record<Category | "All", number>> = { All: projects.length };
    for (const c of CATEGORIES) {
      result[c] = projects.filter((p) => p.category === c).length;
    }
    return result;
  }, [projects]);

  const filtered = React.useMemo(() => {
    let list = projects;

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    const sorted = [...list];
    if (sort === "newest") sorted.sort((a, b) => b.year - a.year);
    else if (sort === "oldest") sorted.sort((a, b) => a.year - b.year);
    else sorted.sort((a, b) => a.title.localeCompare(b.title));

    return sorted;
  }, [projects, category, search, sort]);

  React.useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category, search, sort]);

  const visibleProjects = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const sentinelRef = useInfiniteScroll(
    React.useCallback(() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length)), [filtered.length]),
    hasMore
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PortfolioFilters
          active={category}
          onChange={(next) => {
            setCategory(next);
            updateUrl({ category: next });
          }}
          counts={counts}
        />

        <div className="flex items-center gap-3">
          <SearchBar
            value={search}
            onChange={(next) => {
              setSearch(next);
              updateUrl({ q: next });
            }}
          />
          <Select
            value={sort}
            onValueChange={(next: SortOption) => {
              setSort(next);
              updateUrl({ sort: next });
            }}
          >
            <SelectTrigger className="w-36" aria-label="Sortează proiectele">
              <SelectValue placeholder="Sortare" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Cele mai noi</SelectItem>
              <SelectItem value="oldest">Cele mai vechi</SelectItem>
              <SelectItem value="az">A–Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "proiect" : "proiecte"}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title="Niciun proiect găsit"
          description="Încearcă o altă categorie sau un alt termen de căutare."
          action={
            <Button
              variant="outline"
              onClick={() => {
                setCategory("All");
                setSearch("");
                updateUrl({ category: "All", q: "" });
              }}
            >
              Șterge filtrele
            </Button>
          }
        />
      ) : (
        <>
          <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {visibleProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectCard project={project} showDetails />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {hasMore ? <div ref={sentinelRef} className="h-1 w-full" aria-hidden /> : null}
        </>
      )}
    </div>
  );
}
