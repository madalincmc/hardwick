import type { Metadata } from "next";
import Link from "next/link";
import { PenTool, Factory, HardHat, Check, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { services } from "@/data/services";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = buildMetadata({
  title: "Servicii",
  description: "Serviciile complete Hardwick: design de mobilier custom, producție proprie și instalare profesională.",
  path: "/services",
});

const icons = [PenTool, Factory, HardHat];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:px-8 lg:pt-36 lg:pb-32">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-medium tracking-[0.2em] text-gold uppercase">Servicii</p>
        <h1 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          Un singur studio, de la schiță până la instalare
        </h1>
        <p className="mt-4 text-base text-muted-foreground text-pretty">
          Gestionăm fiecare etapă intern, astfel încât nimic să nu se piardă între designer, atelier și șantier.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = icons[index];
          return (
            <AnimatedSection key={service.title} delay={index * 0.1}>
              <Card className="h-full border-border">
                <CardHeader>
                  <div className="flex size-12 items-center justify-center rounded-full border border-border">
                    <Icon className="size-5 text-gold" strokeWidth={1.25} aria-hidden />
                  </div>
                  <CardTitle className="mt-5 text-xl font-medium">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          );
        })}
      </div>

      <AnimatedSection className="mt-20 rounded-2xl bg-primary px-8 py-16 text-center sm:px-16">
        <h2 className="mx-auto max-w-xl text-2xl font-medium tracking-tight text-primary-foreground text-balance sm:text-3xl">
          Povestește-ne despre proiectul tău și ne ocupăm noi de restul.
        </h2>
        <Button asChild size="lg" variant="secondary" className="mt-7">
          <Link href="/contact">
            Solicită o Ofertă
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
      </AnimatedSection>
    </div>
  );
}
