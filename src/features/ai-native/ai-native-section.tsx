"use client";

import { m } from "framer-motion";
import { Sparkles } from "lucide-react";
import { aiPractices, aiTools } from "@/data/ai-native";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { blurIn, fadeUp, VIEWPORT } from "@/lib/motion";

export function AiNativeSection() {
  return (
    <section id="ai-native" className="section-padding relative overflow-hidden">
      {/* Distinct backdrop — this is the section meant to be remembered. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-70 mask-fade-b" />

      <div className="container-page relative">
        <SectionHeading
          eyebrow="AI Native"
          title="Not AI-curious. AI-native."
          description="Most engineers have tried an AI tool. I've rebuilt my workflow around them — and shipped LLM features into production for real users."
        />

        {/* Tool strip */}
        <Reveal variants={fadeUp} className="mt-12">
          <ul className="flex flex-wrap items-center justify-center gap-2.5">
            {aiTools.map((tool) => (
              <li key={tool}>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-2 text-sm text-foreground/90 backdrop-blur">
                  <Sparkles className="size-3.5 text-accent" aria-hidden />
                  {tool}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Practices */}
        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" gap={0.07} as="ul">
          {aiPractices.map((practice) => {
            const Icon = practice.icon;
            return (
              <StaggerItem key={practice.id} as="li" variants={blurIn} className="h-full">
                <SpotlightCard className="h-full p-7">
                  <span className="grid size-11 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-accent transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-5" aria-hidden />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{practice.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {practice.description}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Closing statement */}
        <m.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="mx-auto mt-16 max-w-3xl text-balance text-center text-xl font-medium leading-snug tracking-tight text-foreground/90 sm:text-2xl"
        >
          &ldquo;The models handle the mechanical work. The architecture, the trade-offs and the
          responsibility for what ships stay with the engineer.&rdquo;
        </m.blockquote>
      </div>
    </section>
  );
}
