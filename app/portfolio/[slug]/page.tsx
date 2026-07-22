import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import { buildMetadata, projectJsonLd, breadcrumbJsonLd } from "@/lib/metadata";
import { CATEGORY_LABELS } from "@/types/project";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectInfo } from "@/components/project/project-info";
import { ProjectGallery } from "@/components/project/project-gallery";
import { ProjectCta } from "@/components/project/project-cta";
import { ProjectCard } from "@/components/portfolio/project-card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/portfolio/${project.slug}`,
    image: project.coverImage,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(project, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:px-8 lg:pt-36 lg:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Acasă", path: "/" },
              { name: "Portofoliu", path: "/portfolio" },
              { name: project.title, path: `/portfolio/${project.slug}` },
            ])
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { name: "Acasă", href: "/" },
          { name: "Portofoliu", href: "/portfolio" },
          { name: project.title },
        ]}
      />

      <div className="mt-6">
        <ProjectHero image={project.coverImage} title={project.title} />
      </div>

      <div className="mt-12">
        <ProjectInfo project={project} />
      </div>

      <div className="mt-16">
        <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Galerie</h2>
        <div className="mt-4">
          <ProjectGallery images={[project.coverImage, ...project.gallery]} title={project.title} />
        </div>
      </div>

      {related.length > 0 ? (
        <div className="mt-24">
          <SectionHeading eyebrow="Similare" title={`Mai multe din ${CATEGORY_LABELS[project.category]}`} />
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedProject, index) => (
              <AnimatedSection key={relatedProject.slug} delay={index * 0.08}>
                <ProjectCard project={relatedProject} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-24">
        <ProjectCta />
      </div>
    </div>
  );
}
