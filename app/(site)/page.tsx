import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { WhyHardwick } from "@/components/home/why-hardwick";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { WorkProcess } from "@/components/home/work-process";
import { Testimonials } from "@/components/home/testimonials";
import { ContactCta } from "@/components/home/contact-cta";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Mobilă la Comandă Baia Mare",
  description:
    "Mobilă la comandă în Baia Mare și Maramureș — design, producție proprie în atelier și instalare profesională. Bucătării, dulapuri, birouri și mobilier comercial la comandă.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <WhyHardwick />
      <FeaturedProjects />
      <WorkProcess />
      <Testimonials />
      <ContactCta />
    </>
  );
}
