"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/** Most listings are shot on modern iPhones; older ones are 9:16 (see below). */
const DEFAULT_SIZE = { w: 540, h: 1173 };

type Props = {
  screenshots: string[];
  appName: string;
  /** Small app icon floated over the artwork. */
  icon: string | null;
  accent: [string, string];
  /** Intrinsic size of these assets, so the reserved box matches and CLS stays 0. */
  size?: { w: number; h: number };
};

/**
 * Fanned row of real App Store screenshots, standing in the card's artwork area
 * and bleeding off its bottom edge.
 *
 * These assets are the clients' own marketing screenshots and already contain a
 * device frame, so they are deliberately NOT wrapped in another phone mockup.
 */
export function ScreenshotGallery({ screenshots, appName, icon, accent, size }: Props) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const [from, to] = accent;
  const { w: shotW, h: shotH } = size ?? DEFAULT_SIZE;
  // Shorter (9:16) assets would leave a band of dead space above them at the
  // same width as tall (9:19.5) ones, so they get a little more width to land
  // at a comparable height. Keeps all six featured cards reading as a set.
  const isShort = shotH / shotW < 2;

  const close = useCallback(() => setOpenAt(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenAt((i) => (i === null ? i : (i + delta + screenshots.length) % screenshots.length)),
    [screenshots.length]
  );

  useEffect(() => {
    if (openAt === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openAt, step]);

  return (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {/* Ambient field drawn from the project's own colours. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 120% at 20% 0%, ${from}33 0%, transparent 55%), radial-gradient(100% 100% at 90% 100%, ${to}2e 0%, transparent 55%), var(--card)`,
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-dots opacity-40" />

        {/* The screenshots themselves. */}
        <ul className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2.5 px-6 transition-transform duration-700 ease-out group-hover:-translate-y-1.5 sm:gap-3">
          {screenshots.slice(0, 3).map((src, i) => {
            const isCentre = i === 1;
            return (
              <li
                key={src}
                className={cn(
                  "translate-y-[14%]",
                  isShort ? "w-[31%] max-w-[152px]" : "w-[27%] max-w-[132px]",
                  isCentre && "z-10 -translate-y-[4%]"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenAt(i)}
                  aria-label={`View ${appName} screenshot ${i + 1} of ${screenshots.length}`}
                  className="block w-full overflow-hidden rounded-xl ring-1 ring-white/12 shadow-[0_12px_28px_-12px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Image
                    src={src}
                    alt={`${appName} — App Store screenshot ${i + 1}`}
                    width={shotW}
                    height={shotH}
                    loading="lazy"
                    sizes="(max-width: 640px) 30vw, 132px"
                    className="h-auto w-full"
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* App icon badge, so the brand still reads at a glance. */}
        {icon && (
          <Image
            src={icon}
            alt=""
            aria-hidden
            width={96}
            height={96}
            loading="lazy"
            sizes="44px"
            className="absolute left-4 top-4 size-11 rounded-[22%] shadow-lg ring-1 ring-white/15"
          />
        )}

        {/* Blend the artwork into the card body. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent"
        />
      </div>

      {/* Lightbox */}
      <Dialog open={openAt !== null} onOpenChange={(o) => !o && close()}>
        <DialogContent
          showClose={false}
          className="max-w-none border-none bg-transparent p-0 shadow-none"
        >
          <DialogTitle className="sr-only">{appName} screenshots</DialogTitle>
          <DialogDescription className="sr-only">
            Use the left and right arrow keys to move between screenshots, Escape to close.
          </DialogDescription>

          <div className="flex flex-col items-center gap-4">
            {openAt !== null && (
              <Image
                key={screenshots[openAt]}
                src={screenshots[openAt]}
                alt={`${appName} — App Store screenshot ${openAt + 1}`}
                width={shotW}
                height={shotH}
                priority
                sizes="(max-width: 640px) 80vw, 420px"
                className="max-h-[76vh] w-auto rounded-2xl ring-1 ring-white/15"
              />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous screenshot"
                className="grid size-10 place-items-center rounded-full glass text-foreground transition-colors hover:bg-foreground/10"
              >
                <ChevronLeft className="size-4" />
              </button>

              <span className="min-w-16 text-center text-xs tabular-nums text-muted-foreground">
                {openAt !== null ? openAt + 1 : 0} / {screenshots.length}
              </span>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next screenshot"
                className="grid size-10 place-items-center rounded-full glass text-foreground transition-colors hover:bg-foreground/10"
              >
                <ChevronRight className="size-4" />
              </button>

              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="ml-2 grid size-10 place-items-center rounded-full glass text-foreground transition-colors hover:bg-foreground/10"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
