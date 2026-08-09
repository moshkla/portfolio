"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only the Framer Motion features this site actually uses.
 *
 * Importing `motion` directly pulls in every feature (drag, layout projection,
 * gestures) — roughly double the bytes. We use animations, variants and exit
 * transitions only, which is exactly `domAnimation`, so components import `m`
 * instead of `motion` and this provider supplies the features.
 *
 * The feature bundle is imported synchronously on purpose. The async form would
 * render `m` components in their initial state until the bundle arrives, which
 * for our `whileInView` reveals means content sitting at opacity:0.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
