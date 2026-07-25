"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
}

// Fades/slides content in once it scrolls into view. Deliberately CSS-only (IntersectionObserver
// + a transition class swap) rather than framer-motion — this component is used on nearly every
// page section, and framer-motion's hydration cost across that many instances measurably delayed
// LCP (see git history for the Lighthouse investigation that prompted this).
export function AnimatedSection({ children, className, delay = 0, as = "div" }: AnimatedSectionProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = as;

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement> & React.Ref<HTMLElement>}
      style={visible ? { transitionDelay: `${delay}s` } : undefined}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      {children}
    </Component>
  );
}
