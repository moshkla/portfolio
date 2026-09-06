import Link from "next/link";
import { ArrowDown, Download, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { marqueeSkills } from "@/data/skills";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { Magnetic } from "@/components/shared/magnetic";
import { Marquee } from "@/components/shared/marquee";
import { Button } from "@/components/ui/button";

/**
 * The hero is a server component and its entrance is pure CSS.
 *
 * Three rules here are load-bearing for Largest Contentful Paint. Please don't
 * "tidy" them back into Framer Motion without re-measuring:
 *
 *  1. No JS-driven entrance. Framer Motion ships these elements as opacity:0
 *     and only reveals them after hydration — that cost ~2.9s of LCP render
 *     delay on throttled mobile.
 *  2. Never fade an LCP candidate from opacity:0. Chrome excludes such elements
 *     entirely; doing so left the page with *no* eligible LCP element at all.
 *     Hence `animate-rise-solid` (transform only) on the headline.
 *  3. The intro paragraph — the actual LCP element — is not animated at all.
 *     Even a transform-only animation deferred its LCP candidate by ~500ms
 *     (measured: 3.1s → 2.6s, Lighthouse mobile 92 → 95).
 */
const STEP = 0.08;
const delay = (i: number) => ({ animationDelay: `${0.12 + i * STEP}s` });

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-32 pb-16"
    >
      <AuroraBackground />

      <div className="container-page relative">
        <div className="flex flex-col items-center text-center">
          {/* Availability pill */}
          <div className="animate-rise" style={delay(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur">
              {/* A steady dot, not a pinging one. Bright emerald on the
                  juniper ground read as an acid accent, and the ping was a
                  fourth ambient loop on a page that now has one. Availability
                  is a fact; it does not need to pulse to be believed. */}
              <span className="relative flex size-2">
                <span className="relative inline-flex size-2 rounded-full bg-[#4E8A66]" />
              </span>
              {profile.availability}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-rise-solid mt-8 text-balance text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]"
            style={delay(1)}
          >
            <span className="block text-3xl font-normal text-muted-foreground/80 sm:text-4xl lg:text-5xl">
              Hi, I&apos;m
            </span>
            <span className="text-gradient mt-2 block">{profile.name}.</span>
          </h1>

          {/* Roles */}
          <div
            className="animate-rise mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-lg sm:text-2xl"
            style={delay(2)}
          >
            <span className="font-medium text-foreground/90">{profile.title}</span>
            {/* Hidden once the two roles wrap onto separate lines, so the
                separator never dangles at the end of a line. */}
            <span className="hidden text-muted-foreground/40 sm:inline" aria-hidden>
              ·
            </span>
            <span className="text-gradient-primary inline-flex items-center gap-2 font-medium">
              <Sparkles className="size-4 text-accent" aria-hidden />
              {profile.subtitle}
            </span>
          </div>

          {/* Intro — the LCP element. Intentionally un-animated (see rule 3). */}
          <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.intro}
          </p>

          {/* Location */}
          <p
            className="animate-rise mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground/80"
            style={delay(4)}
          >
            <MapPin className="size-3.5" aria-hidden />
            {profile.location}
          </p>

          {/* CTAs */}
          <div
            className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            style={delay(5)}
          >
            <Magnetic strength={0.3}>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="#contact">Let&apos;s work together</Link>
              </Button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <a href={profile.links.resume} download>
                  <Download aria-hidden />
                  Download résumé
                </a>
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Skill ticker */}
      <div className="animate-fade-in relative mt-20" style={{ animationDelay: "0.9s" }}>
        <Marquee items={marqueeSkills} duration={55} />
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="animate-fade-in absolute inset-x-0 bottom-6 mx-auto hidden w-fit text-muted-foreground/60 transition-colors hover:text-foreground lg:block"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="animate-bob block">
          <ArrowDown className="size-5" aria-hidden />
        </span>
      </a>
    </section>
  );
}
