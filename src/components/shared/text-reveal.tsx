"use client";

import { m } from "framer-motion";
import { revealChild, stagger, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  className?: string;
  /** Word-by-word reads better for headlines; character-by-character for short accents. */
  by?: "word" | "char";
  gap?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Staggered text reveal.
 *
 * Accessibility: the animated pieces are aria-hidden and the full string is
 * exposed once via aria-label, so screen readers read a sentence rather than a
 * stream of disconnected fragments.
 */
export function TextReveal({
  text,
  className,
  by = "word",
  gap = 0.045,
  delay = 0,
  as = "span",
}: TextRevealProps) {
  const Comp = m[as];
  const pieces = by === "word" ? text.split(" ") : Array.from(text);

  return (
    <Comp
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={stagger(gap, delay)}
      aria-label={text}
    >
      {pieces.map((piece, i) => (
        <span
          key={`${piece}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden="true"
        >
          <m.span className="inline-block will-change-transform" variants={revealChild}>
            {piece}
            {by === "word" && i < pieces.length - 1 ? " " : ""}
          </m.span>
        </span>
      ))}
    </Comp>
  );
}
