import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fir de ariadnă" className="flex items-center flex-wrap gap-1.5 text-sm text-muted-foreground">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.name} className="flex items-center gap-1.5">
            {index > 0 ? <ChevronRight className="size-3.5 text-muted-foreground/60" aria-hidden /> : null}
            {item.href && !isLast ? (
              <Link href={item.href} className="transition-colors hover:text-foreground">
                {item.name}
              </Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-foreground" : undefined}>
                {item.name}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
