"use client";

import dynamicImport from "next/dynamic";

// `ssr: false` is only allowed inside a Client Component, hence this thin wrapper around
// studio-client.tsx — see the comment there for why server rendering must be skipped.
const StudioClient = dynamicImport(() => import("./studio-client").then((m) => m.StudioClient), {
  ssr: false,
});

export function StudioLoader() {
  return <StudioClient />;
}
