"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";

/**
 * Project visual. Uses the real store icon when we have one, and falls back to
 * generated art keyed to the project's accent colours so the grid still reads
 * as one designed set rather than a row of holes.
 */
export function AppArtwork({ project, priority = false }: { project: Project; priority?: boolean }) {
  const [from, to] = project.accent;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      {/* Ambient field, drawn from the project's own colours. */}
      <div
        aria-hidden
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          background: `radial-gradient(120% 120% at 20% 0%, ${from}33 0%, transparent 55%), radial-gradient(100% 100% at 90% 100%, ${to}2e 0%, transparent 55%), var(--card)`,
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-dots opacity-40" />

      <div className="absolute inset-0 grid place-items-center">
        {project.icon ? (
          <div className="relative transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-105">
            {/* Coloured bloom behind the icon. */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full opacity-50 blur-2xl"
              style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
            />
            <Image
              src={project.icon}
              alt={`${project.name} app icon`}
              width={112}
              height={112}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              sizes="112px"
              className="relative size-20 rounded-[22%] shadow-2xl ring-1 ring-white/10 sm:size-28"
            />
          </div>
        ) : (
          <div
            className="relative grid size-20 place-items-center rounded-[22%] text-2xl font-semibold text-white shadow-2xl ring-1 ring-white/10 transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-105 sm:size-28 sm:text-3xl"
            style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
            aria-hidden
          >
            {project.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Blend the artwork into the card body. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent"
      />
    </div>
  );
}
