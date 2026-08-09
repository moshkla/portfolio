"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Magnetic } from "@/components/shared/magnetic";
import { Button } from "@/components/ui/button";
import { blurIn, fadeUp } from "@/lib/motion";

export function ServicesSection() {
  return (
    <section id="services" className="section-padding relative">
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title="How I can help."
          description="Whether you need an app built from zero or an existing codebase rescued, these are the engagements I take on."
        />

        <StaggerGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3" gap={0.07} as="ul">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.id} as="li" variants={blurIn} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-7">
                  <span className="grid size-11 place-items-center rounded-xl border border-border bg-foreground/[0.03] text-accent transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-5" aria-hidden />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal variants={fadeUp} className="mt-14 flex justify-center">
          <Magnetic strength={0.3}>
            <Button asChild size="lg">
              <Link href="#contact">
                Start a conversation
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
