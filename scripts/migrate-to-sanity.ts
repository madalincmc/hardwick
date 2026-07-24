/**
 * One-time migration: recreates the seed projects from data/projects.ts as Sanity
 * documents, uploading each Unsplash placeholder image as a real Sanity asset.
 *
 * Run once, after `npx sanity init` (Phase 0) and after adding SANITY_MIGRATION_TOKEN
 * (an Editor-permission token from manage.sanity.io -> API -> Tokens) to .env.local:
 *
 *   npx tsx --env-file=.env.local scripts/migrate-to-sanity.ts
 *
 * Safe to re-run for the document data itself (documents use a deterministic _id derived
 * from the project slug via createOrReplace), but each run re-uploads image assets, so
 * it's meant to run once against a fresh dataset rather than repeatedly.
 */
import { createClient } from "next-sanity";
import { projects } from "../data/projects";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_MIGRATION_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_MIGRATION_TOKEN in .env.local"
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const uploadedAssets = new Map<string, string>();

async function uploadImage(url: string) {
  const cached = uploadedAssets.get(url);
  if (cached) return { _type: "image" as const, asset: { _type: "reference" as const, _ref: cached } };

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = new URL(url).pathname.split("/").pop() || "image.jpg";

  const asset = await client.assets.upload("image", buffer, { filename });
  uploadedAssets.set(url, asset._id);

  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

async function migrateProject(project: (typeof projects)[number]) {
  console.log(`Migrating: ${project.title}`);

  const coverImage = await uploadImage(project.coverImage);
  const gallery = await Promise.all(project.gallery.map((url) => uploadImage(url)));

  await client.createOrReplace({
    _id: `project-${project.slug}`,
    _type: "project",
    title: project.title,
    slug: { _type: "slug", current: project.slug },
    category: project.category,
    location: project.location,
    year: project.year,
    description: project.description,
    materials: project.materials,
    coverImage,
    gallery,
    featured: project.featured,
    clientRequirements: project.clientRequirements,
    highlights: project.highlights,
  });

  console.log(`  -> done (${gallery.length + 1} images)`);
}

async function main() {
  for (const project of projects) {
    await migrateProject(project);
  }
  console.log(`\nMigrated ${projects.length} projects, ${uploadedAssets.size} unique images uploaded.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
