"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useIsTouch, usePrefersReducedMotion } from "./use-media-query";

type MagneticResult<T extends HTMLElement> = {
  ref: React.RefObject<T | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
};

/**
 * Pulls an element toward the cursor while hovered, then springs back.
 * Disabled on touch devices and when the OS asks for reduced motion.
 *
 * @param strength 0–1; how far the element travels relative to cursor offset.
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  strength = 0.35
): MagneticResult<T> {
  const ref = useRef<T>(null);
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const disabled = isTouch || reduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    rawY.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { ref, x, y, onMouseMove, onMouseLeave };
}
