"use client";

import { featuredProjects, otherProjects } from "@/data/projects";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { blurIn, fadeUp } from "@/lib/motion";
import { ProjectCard } from "./project-card";
import { StoreButtons } from "./store-buttons";

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Shipped, not shelved."
          description="Real applications with real users — from a Ministry of Justice custody platform to consumer finance and marketplaces."
        />

        {/* Featured */}
        <StaggerGroup className="mt-16 grid gap-6 lg:grid-cols-2" gap={0.09} as="ul">
          {featuredProjects.map((project, i) => (
            <StaggerItem key={project.slug} as="li" variants={blurIn} className="h-full">
              {/* First two cards are above the fold on desktop — load eagerly. */}
              <ProjectCard project={project} priority={i < 2} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* More work */}
        <Reveal variants={fadeUp} className="mt-24">
          <div className="flex flex-col gap-3 text-center">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">More shipped work</h3>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
              A selection of the other applications and open-source projects I&apos;ve built and
              published.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05} as="ul">
          {otherProjects.map((project) => {
            const [from, to] = project.accent;
            return (
              <StaggerItem key={project.slug} as="li" variants={fadeUp} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-6" glow={from}>
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl text-sm font-semibold text-white ring-1 ring-white/10"
                      style={{
                        background: project.icon
                          ? undefined
                          : `linear-gradient(135deg, ${from}, ${to})`,
                      }}
                    >
                      {project.icon ? (
                        // Small decorative thumbnail; the heading carries the name.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.icon}
                          alt=""
                          width={44}
                          height={44}
                          loading="lazy"
                          decoding="async"
                          className="size-11 object-cover"
                        />
                      ) : (
                        project.name.charAt(0)
                      )}
                    </span>

                    <div className="min-w-0">
                      <h4 className="truncate text-base font-semibold tracking-tight">
                        {project.name}
                      </h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">{project.category}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>

                  <StoreButtons links={project.links} className="mt-auto pt-5" />
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
