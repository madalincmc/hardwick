import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <AnimatedSection className="relative overflow-hidden rounded-2xl bg-primary px-8 py-20 text-center sm:px-16">
        <p className="text-xs font-medium tracking-[0.3em] text-primary-foreground/60 uppercase">Începe Acum</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-medium tracking-tight text-primary-foreground text-balance sm:text-4xl">
          Ești gata să construiești ceva care rezistă o viață întreagă?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/70">
          Povestește-ne despre spațiul tău și te vom contacta pentru a stabili o consultație.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-8">
          <Link href="/contact">
            Solicită o Ofertă
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
      </AnimatedSection>
    </section>
  );
}
