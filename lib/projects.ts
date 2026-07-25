import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { PROJECTS_QUERY, PROJECT_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import type { SanityProjectDoc } from "@/lib/sanity/types";
import type { Category, Project } from "@/types/project";

function toProject(doc: SanityProjectDoc): Project {
  return {
    title: doc.title,
    slug: doc.slug,
    category: doc.category as Category,
    location: doc.location,
    year: doc.year,
    description: doc.description,
    metaDescription: doc.metaDescription,
    materials: doc.materials ?? [],
    coverImage: urlFor(doc.coverImage).width(1600).fit("max").auto("format").url(),
    gallery: (doc.gallery ?? []).map((image) => urlFor(image).width(1600).fit("max").auto("format").url()),
    featured: doc.featured ?? false,
    clientRequirements: doc.clientRequirements,
    highlights: doc.highlights,
    updatedAt: doc._updatedAt,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const docs = await client.fetch<SanityProjectDoc[]>(PROJECTS_QUERY, {}, { next: { tags: ["project"], revalidate: 3600 } });
  return docs.map(toProject);
}

export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const doc = await client.fetch<SanityProjectDoc | null>(
    PROJECT_BY_SLUG_QUERY,
    { slug },
    { next: { tags: ["project", `project:${slug}`], revalidate: 3600 } }
  );
  return doc ? toProject(doc) : undefined;
}

export async function getRelatedProjects(project: Project, limit = 3): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, limit);
}
