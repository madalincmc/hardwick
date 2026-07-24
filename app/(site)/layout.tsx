import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ScrollToTopButton } from "@/components/layout/scroll-to-top-button";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus-visible:translate-y-0"
      >
        Sari la conținut
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="min-h-svh">
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
