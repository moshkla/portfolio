"use client";

import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. The list is duplicated once and translated -50%,
 * which makes the loop seamless without measuring anything at runtime.
 */
export function Marquee({
  items,
  className,
  duration = 45,
  reverse = false,
}: {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("relative w-full overflow-hidden mask-fade-x", className)} aria-hidden>
      <div
        className="animate-marquee flex w-max items-center gap-3"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-3 rounded-full border border-border bg-foreground/[0.03] px-4 py-2 text-sm text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
