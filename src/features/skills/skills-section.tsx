"use client";

import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/shared/section-heading";
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
        <SectionHeading
          eyebrow="Skills"
          title="The toolkit, honestly stated."
          description="Everything here is something I've shipped with — not a list of things I've read about."
        />

        <StaggerGroup
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          gap={0.06}
          as="ul"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <StaggerItem key={category.id} as="li" variants={blurIn} className="h-full">
                <SpotlightCard className="h-full p-6">
                  {/* Accent wash, revealed on hover. */}
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      category.accent
                    )}
                  />

                  <div className="relative flex h-full flex-col">
                    <span className="grid size-11 place-items-center rounded-xl border border-border bg-foreground/[0.03] text-accent transition-transform duration-500 group-hover:scale-110">
                      <Icon className="size-5" aria-hidden />
                    </span>

                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{category.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <li key={skill}>
                          <Badge className="transition-colors duration-300 group-hover:border-primary/25 group-hover:text-foreground/80">
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
