"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ onDarkHero = false }: { onDarkHero?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="size-9" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Comută la modul luminos" : "Comută la modul întunecat"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(onDarkHero && "text-white hover:bg-white/10 hover:text-white")}
    >
      <Sun className="size-4 scale-100 dark:scale-0 transition-transform" aria-hidden />
      <Moon className="absolute size-4 scale-0 dark:scale-100 transition-transform" aria-hidden />
    </Button>
  );
}
