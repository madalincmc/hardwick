import type { Metadata } from "next";
import type { Project } from "@/types/project";
import { siteConfig } from "@/lib/site";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function buildMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? `${siteConfig.url}/og-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: "website",
      locale: "ro_RO",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  // Only the Luni–Vineri entry has a fixed open/close time — "Cu programare" (Saturday) and
  // "Închis" (Sunday) don't map to schema.org's opens/closes format, so they're left out.
  const weekdayHours = siteConfig.hours.find((slot) => slot.day === "Luni – Vineri");
  const openingHoursSpecification = weekdayHours
    ? [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: weekdayHours.time.split("–")[0].trim(),
          closes: weekdayHours.time.split("–")[1].trim(),
        },
      ]
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.county,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.lat,
      longitude: siteConfig.address.lng,
    },
    areaServed: [
      { "@type": "City", name: "Baia Mare" },
      { "@type": "AdministrativeArea", name: "Maramureș" },
    ],
    openingHoursSpecification,
    sameAs: Object.values(siteConfig.social),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: [project.coverImage, ...project.gallery],
    dateCreated: String(project.year),
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    keywords: [project.category, ...project.materials].join(", "),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
