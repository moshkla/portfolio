"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Scroll-triggered reveal. Fires once, respects the shared motion language.
 * The default `fadeUp` covers most cases; pass `variants` for anything else.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "section";
};

/** Parent wrapper that staggers any <Reveal>-style children beneath it. */
export function StaggerGroup({
  children,
  className,
  gap = 0.08,
  delay = 0,
  as = "div",
}: StaggerGroupProps) {
  const Comp = m[as];
  return (
    <Comp
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={stagger(gap, delay)}
    >
      {children}
    </Comp>
  );
}

/** Child of <StaggerGroup>. Inherits the parent's stagger timing. */
export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "article";
}) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}
