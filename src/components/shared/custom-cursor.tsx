"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Two-part cursor: a precise dot plus a lagging ring that swells over
 * interactive targets. Desktop pointers only — never rendered on touch, and
 * never when the OS asks for reduced motion.
 */
export function CustomCursor() {
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  const enabled = !isTouch && !reduced;

  useEffect(() => {
    if (!enabled) return;

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      setActive(Boolean((e.target as HTMLElement)?.closest?.(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      <m.div
        className="absolute size-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
      <m.div
        className="absolute rounded-full border border-accent/50"
        animate={{ width: active ? 44 : 28, height: active ? 44 : 28, opacity: visible ? (active ? 1 : 0.55) : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
}
