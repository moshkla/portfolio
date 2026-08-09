import { Apple, Github } from "lucide-react";
import type { ProjectLinks } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Google Play has no Lucide glyph, so this is the official mark simplified. */
function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M3.6 1.8a1 1 0 0 0-.5.9v18.6a1 1 0 0 0 .5.9l10-10.2-10-10.2Zm11.1 9.1 2.6-2.6-9.4-5.4 6.8 8Zm0 2.2-6.8 8 9.4-5.4-2.6-2.6Zm4-3.6-2.4 2.5 2.4 2.5 2.6-1.5c.8-.5.8-1.6 0-2l-2.6-1.5Z" />
    </svg>
  );
}

const linkClass =
  "inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3.5 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground";

/**
 * Renders only the links we verified are live, so a retired store listing
 * never ships as a dead button.
 */
export function StoreButtons({ links, className }: { links: ProjectLinks; className?: string }) {
  const hasAny = links.ios || links.android || links.github;
  if (!hasAny) {
    return (
      <p className={cn("text-xs text-muted-foreground/70", className)}>
        Store listing retired by the client
      </p>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.ios && (
        <a href={links.ios} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Apple className="size-3.5" />
          App Store
        </a>
      )}
      {links.android && (
        <a href={links.android} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <GooglePlayIcon className="size-3.5" />
          Google Play
        </a>
      )}
      {links.github && (
        <a href={links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Github className="size-3.5" />
          GitHub
        </a>
      )}
    </div>
  );
}
