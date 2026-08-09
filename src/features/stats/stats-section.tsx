"use client";

import { stats } from "@/data/stats";
import { Counter, TextStat } from "@/components/shared/counter";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { blurIn } from "@/lib/motion";

export function StatsSection() {
  return (
    <section aria-label="Career statistics" className="relative border-y border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_9%,transparent),transparent_70%)]"
      />

      <div className="container-page relative py-20">
        <StaggerGroup className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4" gap={0.1} as="ul">
          {stats.map((stat) => (
            <StaggerItem key={stat.id} as="li" variants={blurIn}>
              <div className="flex flex-col items-center text-center">
                <span className="text-gradient-primary text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  {stat.value !== null ? (
                    <Counter value={stat.value} suffix={stat.suffix} />
                  ) : (
                    <TextStat display={stat.display ?? ""} suffix={stat.suffix} />
                  )}
                </span>

                <span className="mt-3 text-sm font-medium text-foreground">{stat.label}</span>
                <span className="mt-1 max-w-44 text-xs leading-relaxed text-muted-foreground">
                  {stat.hint}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
