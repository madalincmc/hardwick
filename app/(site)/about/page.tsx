import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles, Target, HeartHandshake } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { blurDataURL } from "@/lib/placeholder";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { WorkProcess } from "@/components/home/work-process";

export const metadata: Metadata = buildMetadata({
  title: "Despre Noi",
  description:
    "Hardwick este un studio de mobilier custom construit în jurul designului, producției proprii și instalării profesionale.",
  path: "/about",
});

const values = [
  {
    icon: Sparkles,
    title: "Meșteșug",
    description: "Tratăm fiecare îmbinare, muchie și finisaj ca și cum ar fi singurul detaliu pe care cineva l-ar vedea vreodată.",
  },
  {
    icon: Target,
    title: "Atenție la Detalii",
    description: "Deciziile mici se adună. Ne concentrăm pe cele pe care majoritatea atelierelor le sar.",
  },
  {
    icon: HeartHandshake,
    title: "Încredere",
    description: "Spunem ce gândim, livrăm ce promitem și stăm în spatele fiecărei piese pe care o construim.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimatedSection>
            <p className="mb-3 text-xs font-medium tracking-[0.2em] text-gold uppercase">Povestea Noastră</p>
            <h1 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Mobilier construit să reziste trendurilor
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
              Hardwick a început ca un mic atelier cu o convingere simplă: mobilierul ar trebui proiectat exact pentru
              spațiul în care va trăi, construit la un standard pe care producția de masă nu îl poate atinge, și
              instalat de aceiași oameni care l-au făcut.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
              Astăzi proiectăm, producem și instalăm bucătării, dulapuri, spații de zi și interioare comerciale la
              comandă pentru clienți cărora le pasă de detalii la fel de mult ca și nouă. Fiecare proiect trece în
              continuare prin aceleași mâini, de la prima schiță până la montajul final.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe"
              alt="Detaliu al unei tâmplării personalizate"
              fill
              placeholder="blur"
              blurDataURL={blurDataURL(900, 1125)}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </AnimatedSection>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8 lg:mt-32">
        <SectionHeading
          eyebrow="Misiunea Noastră"
          title="Design cu intenție. Construcție fără compromis."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.1} className="text-center">
              <value.icon className="mx-auto size-6 text-gold" strokeWidth={1.25} aria-hidden />
              <h3 className="mt-5 text-lg font-medium">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <WorkProcess />
    </div>
  );
}
