"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

// sanity.config.ts's schema includes functions (e.g. field `validation` rules), which can't
// cross the Server -> Client Component boundary via RSC serialization. Importing it here,
// inside a Client Component, keeps it entirely within the client module graph instead of
// being constructed server-side and passed down as a prop. This component is also loaded
// via next/dynamic with ssr:false (see studio-loader.tsx) — Sanity Studio's bundle crashes
// if React attempts to render it on the server at all.
export function StudioClient() {
  return <NextStudio config={config} />;
}
