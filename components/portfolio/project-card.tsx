import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { CATEGORY_LABELS } from "@/types/project";
import { blurDataURL } from "@/lib/placeholder";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  showDetails?: boolean;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({ project, showDetails = false, priority = false, className }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn("group block", className)}
      aria-label={`Vezi proiectul ${project.title}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority={priority}
          placeholder="blur"
          blurDataURL={blurDataURL()}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-background/90 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
          <ArrowUpRight className="size-4" aria-hidden />
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-medium tracking-tight transition-colors group-hover:text-muted-foreground">
            {project.title}
          </h3>
          {showDetails ? (
            <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>
          ) : null}
        </div>
        <span className="shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
          {CATEGORY_LABELS[project.category]}
        </span>
      </div>

      {showDetails ? (
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
      ) : null}
    </Link>
  );
}
