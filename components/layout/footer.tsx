import Link from "next/link";
import { navLinks } from "@/data/nav";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="text-lg font-heading font-semibold tracking-[0.15em]">
              HARDWICK
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{siteConfig.description}</p>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">Navigare</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">Studio</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>{siteConfig.address.street}</li>
              <li>
                {siteConfig.address.city}, {siteConfig.address.county}
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-foreground">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-foreground">
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. Toate drepturile rezervate.
          </p>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
