"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/lib/motion";
import { TextReveal } from "./text-reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** The one heading treatment used by every section, so rhythm stays consistent. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <m.span
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={fadeUp}
        className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-accent uppercase"
      >
        <span className="size-1.5 rounded-full bg-accent" />
        {eyebrow}
      </m.span>

      <TextReveal
        as="h2"
        text={title}
        className="text-gradient text-balance text-4xl font-semibold sm:text-5xl lg:text-6xl"
      />

      {description && (
        <m.p
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className={cn(
            "text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" ? "max-w-2xl" : "max-w-xl"
          )}
        >
          {description}
        </m.p>
      )}
    </div>
  );
}
