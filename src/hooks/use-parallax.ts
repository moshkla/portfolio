"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll parallax without pulling an animation library into the above-the-fold
 * bundle. Writes a translate directly to the node inside rAF, so it never
 * triggers a React render and never runs more than once per frame.
 *
 * @param distance how far the element drifts, as a fraction of scroll distance.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(distance = 0.35) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      // Fade and drift only across the first viewport; past that it's off-screen.
      const progress = Math.min(y / window.innerHeight, 1);
      node.style.transform = `translate3d(0, ${y * distance}px, 0)`;
      node.style.opacity = String(1 - progress * 0.9);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [distance]);

  return ref;
}
