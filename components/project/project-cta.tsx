import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";

export function ProjectCta() {
  return (
    <AnimatedSection className="rounded-2xl bg-primary px-8 py-16 text-center sm:px-16">
      <h2 className="mx-auto max-w-xl text-2xl font-medium tracking-tight text-primary-foreground text-balance sm:text-3xl">
        Interesat de un proiect similar?
      </h2>
      <Button asChild size="lg" variant="secondary" className="mt-7">
        <Link href="/contact">
          Solicită o Ofertă
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Button>
    </AnimatedSection>
  );
}
