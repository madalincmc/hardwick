import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "@/components/contact/contact-form";
import { AnimatedSection } from "@/components/shared/animated-section";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Ia legătura cu Hardwick pentru a solicita o ofertă pentru proiectul tău de mobilier custom.",
  path: "/contact",
});

export default function ContactPage() {
  const mapQuery = encodeURIComponent(
    `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.county}, ${siteConfig.address.postalCode}`
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:px-8 lg:pt-36 lg:pb-32">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-medium tracking-[0.2em] text-gold uppercase">Contact</p>
        <h1 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">Solicită o ofertă</h1>
        <p className="mt-4 text-base text-muted-foreground text-pretty">
          Povestește-ne puțin despre proiectul tău și te vom contacta pentru a stabili o consultație.
        </p>
      </div>

      <div className="mt-14 grid gap-16 lg:grid-cols-5">
        <AnimatedSection className="lg:col-span-3">
          <ContactForm />
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="lg:col-span-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Studio</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.county}
                    <br />
                    {siteConfig.address.postalCode}, {siteConfig.address.country}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 shrink-0 text-gold" aria-hidden />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="size-4 shrink-0 text-gold" aria-hidden />
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
                    {siteConfig.phone}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-muted-foreground">
                <Clock className="size-4 text-gold" aria-hidden />
                Program de Lucru
              </h2>
              <ul className="mt-4 space-y-2">
                {siteConfig.hours.map((slot) => (
                  <li key={slot.day} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{slot.day}</span>
                    <span>{slot.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <iframe
                title="Locația studioului Hardwick"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-56 w-full grayscale-25"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
