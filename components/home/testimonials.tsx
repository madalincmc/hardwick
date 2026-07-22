import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

export function Testimonials() {
  return (
    <section className="bg-muted/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Testimoniale" title="De încredere pentru clienți exigenți" align="center" className="mx-auto" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection
              key={testimonial.name}
              delay={(index % 2) * 0.1}
              className="rounded-lg border border-border bg-background p-8"
            >
              <Quote className="size-6 text-gold" strokeWidth={1.25} aria-hidden />
              <p className="mt-5 text-base text-pretty">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-6">
                <p className="text-sm font-medium">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
