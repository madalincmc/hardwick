import { Hero } from "@/components/home/hero";
import { WhyHardwick } from "@/components/home/why-hardwick";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { WorkProcess } from "@/components/home/work-process";
import { Testimonials } from "@/components/home/testimonials";
import { ContactCta } from "@/components/home/contact-cta";

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
