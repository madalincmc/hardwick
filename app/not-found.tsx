import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center px-4 pt-16 text-center lg:pt-20">
      <Compass className="size-10 text-muted-foreground/50" strokeWidth={1.25} aria-hidden />
      <p className="mt-6 text-xs font-medium tracking-[0.3em] text-gold uppercase">404</p>
      <h1 className="mt-3 text-3xl font-medium tracking-tight text-balance sm:text-4xl">Pagina nu a fost găsită</h1>
      <p className="mt-4 text-base text-muted-foreground text-pretty">
        Pagina pe care o cauți nu există sau s-a mutat între timp. Hai să te aducem înapoi pe drumul cel bun.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/">Înapoi Acasă</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/portfolio">Vezi Portofoliul</Link>
        </Button>
      </div>
    </div>
  );
}
