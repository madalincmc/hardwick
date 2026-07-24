import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
  // Freshness is driven by Next's Data Cache + revalidateTag (see app/api/revalidate),
  // not Sanity's own CDN cache, so this stays off.
  useCdn: false,
});
