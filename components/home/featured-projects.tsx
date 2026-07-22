import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/portfolio/project-card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

export function FeaturedProjects() {
  const projects = getFeaturedProjects(6);

  return (
    <section className="bg-muted/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Lucrări Selectate" title="Proiecte Recomandate" />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/portfolio">
              Vezi Toate Proiectele
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <AnimatedSection key={project.slug} delay={(index % 3) * 0.08}>
              <ProjectCard project={project} priority={index < 3} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
