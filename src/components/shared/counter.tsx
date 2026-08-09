"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type CounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up to `value` the first time it scrolls into view.
 * Under reduced-motion the final value is rendered immediately.
 */
export function Counter({ value, suffix = "", prefix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = usePrefersReducedMotion();

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20, mass: 1 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);

  const shown = reduced ? value : display;

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

/** Non-numeric stat (e.g. "Millions+") that still fades in on view. */
export function TextStat({
  display,
  suffix = "",
  className,
}: {
  display: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <m.span
      className={cn(className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {display}
      {suffix}
    </m.span>
  );
}
