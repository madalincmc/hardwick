import { Ruler, Gem, Factory, Wrench } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

const pillars = [
  {
    icon: Ruler,
    title: "Design Personalizat",
    description: "Fiecare piesă este proiectată de la zero, în jurul spațiului, obiceiurilor și gustului tău.",
  },
  {
    icon: Gem,
    title: "Materiale Premium",
    description: "Alegem lemn masiv, piatră naturală și metale selectate pentru cum îmbătrânesc, nu doar pentru cum arată în prima zi.",
  },
  {
    icon: Factory,
    title: "Producție Proprie",
    description: "Nimic nu este subcontractat. Atelierul nostru construiește fiecare piesă la toleranțe stricte.",
  },
  {
    icon: Wrench,
    title: "Instalare Profesională",
    description: "Echipele noastre de instalare tratează casa ta ca pe a lor, livrând un finisaj impecabil, fără remedieri ulterioare.",
  },
];

export function WhyHardwick() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionHeading eyebrow="De ce Hardwick" title="Meșteșug, de la un capăt la altul" />

      <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, index) => (
          <AnimatedSection key={pillar.title} delay={index * 0.08}>
            <pillar.icon className="size-6 text-gold" strokeWidth={1.25} aria-hidden />
            <h3 className="mt-5 text-lg font-medium">{pillar.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
