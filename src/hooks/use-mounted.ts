"use client";

import { useEffect, useState } from "react";

/**
 * True only after hydration. Guards anything that would otherwise produce a
 * server/client mismatch (theme, matchMedia, portals).
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
