"use client";

import type { Project } from "@/data/projects";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { AppArtwork } from "./app-artwork";
import { StoreButtons } from "./store-buttons";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  // The glow follows the page accent rather than `project.accent[0]`. Those
  // fifteen values are arbitrary Tailwind gradient pairs — Kanaf's is
  // blue→violet while its real store icon is ochre — so as card chrome they
  // put fifteen unrelated hues on one grid. They still key the generated
  // fallback artwork, which is where they belong.
  return (
    <SpotlightCard className="flex h-full flex-col">
      <AppArtwork project={project} priority={priority} />

      <div className="flex flex-1 flex-col p-6 pt-2 sm:p-7 sm:pt-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">{project.category}</Badge>
          {project.company && <Badge variant="outline">{project.company}</Badge>}
        </div>

        <h3 className="mt-4 flex flex-wrap items-baseline gap-2 text-xl font-semibold tracking-tight">
          {project.name}
          {project.nameAr && (
            <span lang="ar" dir="rtl" className="text-sm font-normal text-muted-foreground">
              {project.nameAr}
            </span>
          )}
        </h3>

        <p className="mt-1 text-sm text-accent">{project.tagline}</p>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-5">
          <span className="text-xs uppercase tracking-wide text-muted-foreground/60">Role</span>
          <p className="mt-1 text-sm text-foreground/90">{project.role}</p>
        </div>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>

        <StoreButtons links={project.links} className="mt-auto pt-6" />
      </div>
    </SpotlightCard>
  );
}
