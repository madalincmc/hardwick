import { MessageSquare, PenTool, Factory, HardHat } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  {
    icon: MessageSquare,
    title: "Consultație",
    description: "Vizităm spațiul tău, ascultăm cum trăiești și lucrezi și înțelegem cum arată succesul pentru tine.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Desenele detaliate și vizualizările 3D rafinează fiecare dimensiune, material și finisaj înainte să tăiem prima placă.",
  },
  {
    icon: Factory,
    title: "Producție",
    description: "Piesele tale sunt construite în atelierul nostru de către meșterii noștri, cu verificări de calitate la fiecare etapă.",
  },
  {
    icon: HardHat,
    title: "Instalare",
    description: "Echipele noastre livrează și instalează cu grijă, lăsând spațiul tău exact cum l-au găsit — doar mai bun.",
  },
];

export function WorkProcess() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <SectionHeading eyebrow="Cum Lucrăm" title="Un proces construit pe precizie" align="center" className="mx-auto" />

      <div className="relative mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div
          className="absolute top-6 left-0 right-0 hidden h-px bg-border lg:block"
          aria-hidden
        />
        {steps.map((step, index) => (
          <AnimatedSection key={step.title} delay={index * 0.1} className="relative text-center lg:text-left">
            <div className="relative z-10 mx-auto flex size-12 items-center justify-center rounded-full border border-border bg-background lg:mx-0">
              <step.icon className="size-5 text-gold" strokeWidth={1.25} aria-hidden />
            </div>
            <p className="mt-5 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-lg font-medium">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
