"use client";

import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";

/**
 * Ambient hero backdrop: hairline grid + drifting colour fields, with a slow
 * parallax drift tied to scroll.
 *
 * Deliberately free of any animation library — this renders above the fold, and
 * keeping Framer Motion out of the hero keeps it off the LCP critical path.
 * The drift is CSS keyframes; the parallax is a single rAF scroll handler.
 */
export function AuroraBackground({ className }: { className?: string }) {
  const parallaxRef = useParallax<HTMLDivElement>(0.3);

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
        {/* Hairline grid, faded toward the bottom of the hero. */}
        <div className="bg-grid mask-fade-b absolute inset-0" />

        {/* Two static fields, down from three drifting ones. The third was a
            hard-coded #8B5CF6 violet that belonged to no token and clashed
            with the juniper ground; the drift was ambient motion nobody
            asked for. Large-radius blur is expensive to rasterise, so phones
            get one modest field and the full treatment starts at md. */}
        <div
          className="animate-aurora absolute -top-40 left-1/2 size-[26rem] -translate-x-1/2 rounded-full opacity-50 blur-[70px] md:size-[46rem] md:blur-[120px]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 42%, transparent), transparent 65%)",
            ["--aurora-duration" as string]: "22s",
          }}
        />
        <div
          className="animate-aurora absolute -left-32 top-32 hidden size-[34rem] rounded-full opacity-40 blur-[110px] md:block"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--accent) 38%, transparent), transparent 65%)",
            ["--aurora-duration" as string]: "18s",
            animationDelay: "-6s",
          }}
        />
      </div>

      {/* Vignette so the type always sits on a calm field. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_92%)]" />
    </div>
  );
}
