import { projects } from "@/data/projects";
import type { Category, Project } from "@/types/project";

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => b.year - a.year);
}

export function getFeaturedProjects(limit = 6): Project[] {
  return getAllProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  return getAllProjects()
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, limit);
}

export function getCategoryCounts(): Record<Category, number> {
  return projects.reduce(
    (acc, project) => {
      acc[project.category] = (acc[project.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<Category, number>
  );
}
