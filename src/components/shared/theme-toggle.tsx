"use client";

import { useTheme } from "next-themes";
import { m, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      className={cn(
        "relative grid size-10 place-items-center rounded-full border border-border",
        "text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
        className
      )}
    >
      {/* Render nothing until mounted — the server can't know the resolved theme. */}
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <m.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute grid place-items-center"
          >
            {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </m.span>
        )}
      </AnimatePresence>
    </button>
  );
}
