"use client";

import { m } from "framer-motion";
import { GraduationCap, Languages, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { scaleIn } from "@/lib/motion";

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-page">
        <SectionHeading
          eyebrow="About"
          title="Engineering that outlives the sprint."
          description="Five years, three countries, and a long list of apps that made it to production — here's the shape of it."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* Story */}
          <Reveal className="lg:col-span-7">
            <SpotlightCard className="h-full p-8 sm:p-10">
              <div className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  I started in native Android in 2019, writing Java for freelance clients and
                  learning the hard way what happens when structure is an afterthought. A year
                  later I moved to Flutter, and I&apos;ve spent every year since building
                  cross-platform products that ship — first as an intern in Egypt, then across
                  teams in the UAE and Saudi Arabia.
                </p>
                <p>
                  The work has ranged widely: consumer finance, investment platforms, car rental
                  marketplaces, telehealth, and a Ministry of Justice–affiliated custody platform.
                  What stays constant is the approach —{" "}
                  <span className="text-foreground">clean architecture</span>, honest state
                  management, and interfaces that hold up on a cheap Android phone as well as they
                  do on a new iPhone.
                </p>
                <p>
                  Today I work <span className="text-foreground">AI-native</span>. Large language
                  models are part of my daily loop, not a novelty: they draft, review, document and
                  automate, while the architectural calls and the judgement stay mine. It&apos;s the
                  single biggest change in how I build software in five years.
                </p>
              </div>

              <dl className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
                <div className="flex flex-col gap-1.5">
                  <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground/70">
                    <GraduationCap className="size-3.5" aria-hidden />
                    Education
                  </dt>
                  <dd className="text-sm text-foreground">
                    {profile.education.major}
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {profile.education.school}, {profile.education.year}
                    </span>
                  </dd>
                </div>

                <div className="flex flex-col gap-1.5">
                  <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground/70">
                    <Languages className="size-3.5" aria-hidden />
                    Languages
                  </dt>
                  <dd className="text-sm text-foreground">
                    {profile.languages.map((l) => (
                      <span key={l.name} className="mt-0.5 block">
                        {l.name}
                        <span className="text-xs text-muted-foreground"> — {l.level}</span>
                      </span>
                    ))}
                  </dd>
                </div>

                <div className="flex flex-col gap-1.5">
                  <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground/70">
                    <MapPin className="size-3.5" aria-hidden />
                    Based
                  </dt>
                  <dd className="text-sm text-foreground">
                    {profile.location}
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {profile.availability}
                    </span>
                  </dd>
                </div>
              </dl>
            </SpotlightCard>
          </Reveal>

          {/* Pillars */}
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2" gap={0.07}>
            {profile.pillars.map((pillar, i) => (
              <StaggerItem key={pillar} variants={scaleIn} className="h-full">
                <SpotlightCard className="flex h-full min-h-32 flex-col justify-between p-6">
                  <span
                    className="font-mono text-xs text-muted-foreground/50"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <m.span className="mt-4 block text-lg font-medium leading-snug tracking-tight text-foreground">
                    {pillar}
                  </m.span>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
