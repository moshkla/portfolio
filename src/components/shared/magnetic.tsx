"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

/**
 * Wraps any element so it drifts toward the cursor on hover.
 * No-ops on touch devices and under prefers-reduced-motion.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic<HTMLDivElement>(strength);

  return (
    <m.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </m.div>
  );
}
