"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { profile } from "@/data/profile";

/**
 * First-paint curtain. Shown only on the very first visit of a session so
 * repeat navigation never pays for it, and dismissed as soon as the window
 * load event fires (with a short floor so it doesn't flash).
 */
export function LoadingScreen() {
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("intro-played")) return;

    // The page now paints before hydration. If loading already finished there
    // is nothing to cover — dropping a curtain over content the visitor can
    // already read would be a regression, not a flourish.
    if (document.readyState === "complete") {
      sessionStorage.setItem("intro-played", "1");
      return;
    }

    setDone(false);
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, 900 - elapsed);
      window.setTimeout(() => {
        sessionStorage.setItem("intro-played", "1");
        setDone(true);
      }, wait);
    };

    // Loading is still in flight (the "complete" case returned above).
    window.addEventListener("load", finish, { once: true });

    // Hard ceiling — never trap the visitor behind the curtain.
    const bail = window.setTimeout(finish, 2500);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(bail);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <m.div
          key="loading"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-background"
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading</span>

          <div className="flex flex-col items-center gap-6">
            <m.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid size-14 place-items-center rounded-2xl bg-primary-strong text-lg font-bold text-primary-foreground"
            >
              AA
            </m.span>

            <m.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-sm tracking-tight text-muted-foreground"
              aria-hidden
            >
              {profile.name}
            </m.span>

            <div className="h-px w-40 overflow-hidden bg-border">
              <m.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
                className="h-full w-full bg-gradient-to-r from-transparent via-accent to-transparent"
              />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
