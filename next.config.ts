import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sanity Studio's client bundle (createContext calls, etc. at module scope) breaks when
  // Next's RSC build tries to resolve it under the "react-server" condition; treating it as
  // an external package makes Next require() it normally instead of bundling it into the
  // server component graph. See app/studio/[[...tool]]/page.tsx.
  serverExternalPackages: ["sanity", "@sanity/vision"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
