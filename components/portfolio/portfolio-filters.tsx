"use client";

import { cn } from "@/lib/utils";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/types/project";

interface PortfolioFiltersProps {
  active: Category | "All";
  onChange: (category: Category | "All") => void;
  counts: Partial<Record<Category | "All", number>>;
}

export function PortfolioFilters({ active, onChange, counts }: PortfolioFiltersProps) {
  const options: (Category | "All")[] = ["All", ...CATEGORIES];

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={isActive}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {option === "All" ? "Toate" : CATEGORY_LABELS[option]}
            {typeof counts[option] === "number" ? (
              <span className={cn("ml-1.5 tabular-nums", isActive ? "text-primary-foreground/70" : "text-muted-foreground/70")}>
                {counts[option]}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
