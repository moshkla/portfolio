"use client";

import { useRef, useState, type ReactNode } from "react";
import { m, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  /** Layout + padding for the card's content. The glow layers are absolutely
   *  positioned, so anything passed here lands on the element that actually
   *  wraps `children` — `flex`, `justify-between` etc. behave as written. */
  className?: string;
  /** Escape hatch for sizing the outer shell (rarely needed). */
  wrapperClassName?: string;
  /** Hex colour for the cursor glow; defaults to the primary token. */
  glow?: string;
};

/**
 * Card with a cursor-tracking radial highlight on its border and surface.
 * Pointer position is written to motion values so tracking never re-renders.
 */
export function SpotlightCard({
  children,
  className,
  wrapperClassName,
  glow,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const color = glow ?? "var(--primary)";
  const background = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, color-mix(in oklab, ${color} 14%, transparent), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, color-mix(in oklab, ${color} 55%, transparent), transparent 75%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative isolate h-full overflow-hidden rounded-2xl border border-border bg-card",
        "transition-[transform,box-shadow] duration-500 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]",
        wrapperClassName
      )}
    >
      {/* Glowing border, painted only where the cursor is. */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
        style={{ background: border, opacity: hovered ? 1 : 0, padding: 1, WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}
      />
      {/* Soft interior glow. */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ background, opacity: hovered ? 1 : 0 }}
      />
      <div className={cn("relative z-10 h-full", className)}>{children}</div>
    </div>
  );
}
