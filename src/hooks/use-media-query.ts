"use client";

import { useEffect, useState } from "react";

/** SSR-safe matchMedia. Returns false until mounted. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => setMatches(e.matches);

    onChange(mql);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Convenience wrappers used across the site. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
/** Coarse pointer = touch device; disables cursor + magnetic effects. */
export const useIsTouch = () => useMediaQuery("(pointer: coarse)");
