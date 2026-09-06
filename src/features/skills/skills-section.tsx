"use client";

import { skillCategories } from "@/data/skills";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { blurIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative">
      {/* Quiet texture so the section reads as its own surface. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-60 mask-fade-b" />

      <div className="container-page relative">
        {/* No visible heading: the section is a reference block, and the
            cards name themselves. The nav, the ⌘K menu and the scroll spy all
            target #skills, and screen readers need the section named, so the
            label stays in the accessibility tree rather than on screen. */}
        <h2 className="sr-only">Skills</h2>

        <StaggerGroup
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          gap={0.06}
          as="ul"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <StaggerItem key={category.id} as="li" variants={blurIn} className="h-full">
                <SpotlightCard className="h-full p-5">
                  {/* Accent wash, revealed on hover. */}
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      category.accent
                    )}
                  />

                  {/* The icon sits on the title's baseline rather than in a
                      44px block above it. That block plus its margin was ~64px
                      of height on every card, and the grid takes its row height
                      from the tallest card — so it cost the section twice. */}
                  <div className="relative flex h-full flex-col">
                    <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight">
                      <Icon className="size-4 shrink-0 text-accent" aria-hidden />
                      {category.title}
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-1">
                      {category.skills.map((skill) => (
                        <li key={skill}>
                          <Badge className="px-2 py-0.5 transition-colors duration-300 group-hover:border-primary/25 group-hover:text-foreground/80">
                            {skill}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
