"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { experiences } from "@/data/experience";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/motion";

export function ExperienceSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  // The rail fills as the timeline scrolls past — a progress bar for a career.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-page">
        <SectionHeading
          eyebrow="Experience"
          title="Five years, three countries."
          description="From native Android freelance work to senior Flutter delivery on government-adjacent products."
        />

        <div ref={trackRef} className="relative mt-16 md:mt-20">
          {/* Rail */}
          <div
            aria-hidden
            className="absolute left-[15px] top-2 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2"
          />
          <m.div
            aria-hidden
            style={{ scaleY }}
            className="absolute left-[15px] top-2 h-full w-px origin-top bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="flex flex-col gap-8 md:gap-4">
            {experiences.map((exp, i) => {
              const alignRight = i % 2 === 1;

              return (
                <li key={exp.id} className="relative pl-12 md:pl-0">
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute left-2 top-7 z-10 grid size-3.5 place-items-center rounded-full border-2 border-background bg-primary md:left-1/2 md:-translate-x-1/2"
                  >
                    {exp.current && (
                      <span className="absolute inline-flex size-3.5 animate-ping rounded-full bg-primary opacity-60" />
                    )}
                  </span>

                  <div
                    className={
                      alignRight
                        ? "md:ml-auto md:w-[calc(50%-2.5rem)]"
                        : "md:mr-auto md:w-[calc(50%-2.5rem)]"
                    }
                  >
                    <Reveal variants={fadeUp}>
                      <SpotlightCard className="p-6 sm:p-7">
                        <div className="flex flex-wrap items-center gap-2">
                          {exp.showDates && (
                            <Badge variant="primary">
                              {exp.start} — {exp.end}
                            </Badge>
                          )}
                          {exp.current && <Badge variant="solid">Current</Badge>}
                          {exp.type && <Badge variant="outline">{exp.type}</Badge>}
                        </div>

                        <h3 className="mt-4 text-xl font-semibold tracking-tight">{exp.role}</h3>

                        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5 text-accent">
                            <Briefcase className="size-3.5" aria-hidden />
                            {exp.company}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="size-3.5" aria-hidden />
                            {exp.location}
                          </span>
                        </p>

                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {exp.description}
                        </p>

                        <ul className="mt-5 flex flex-col gap-2.5">
                          {exp.highlights.map((h) => (
                            <li key={h} className="flex gap-3 text-sm text-muted-foreground">
                              <span
                                aria-hidden
                                className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                              />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </SpotlightCard>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
