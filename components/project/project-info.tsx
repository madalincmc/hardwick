import { MapPin, Calendar, Layers } from "lucide-react";
import type { Project } from "@/types/project";
import { CATEGORY_LABELS } from "@/types/project";

export function ProjectInfo({ project }: { project: Project }) {
  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <p className="text-xs font-medium tracking-[0.2em] text-gold uppercase">{CATEGORY_LABELS[project.category]}</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-balance sm:text-4xl">{project.title}</h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">{project.description}</p>

        {project.clientRequirements ? (
          <div className="mt-8">
            <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Cerințele Clientului</h2>
            <p className="mt-2 text-base text-pretty">{project.clientRequirements}</p>
          </div>
        ) : null}

        {project.highlights?.length ? (
          <div className="mt-8">
            <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Detalii Cheie</h2>
            <ul className="mt-3 space-y-2">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5 text-base">
                  <span className="mt-2.5 size-1 shrink-0 rounded-full bg-gold" aria-hidden />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <dl className="h-fit space-y-6 rounded-lg border border-border p-6">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
          <div>
            <dt className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Locație</dt>
            <dd className="mt-0.5 text-sm">{project.location}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
          <div>
            <dt className="text-xs font-medium tracking-wide uppercase text-muted-foreground">An</dt>
            <dd className="mt-0.5 text-sm">{project.year}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Layers className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
          <div>
            <dt className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Materiale</dt>
            <dd className="mt-0.5 flex flex-wrap gap-1.5 text-sm">
              {project.materials.map((material) => (
                <span key={material} className="rounded-full bg-muted px-2.5 py-1 text-xs">
                  {material}
                </span>
              ))}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
}
