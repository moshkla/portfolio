"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Command, Menu, X } from "lucide-react";
import { navItems, sectionIds } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-active-section";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Above-the-fold chrome, deliberately free of any animation library: the
 * entrance is a CSS keyframe and the active pill is a CSS transition. Framer
 * Motion here would land in the critical bundle and delay first paint.
 */
export function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape, matching the ⌘K menu's behaviour.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className="animate-drop fixed inset-x-0 top-0 z-50 px-4 pt-4"
        style={{ animationDelay: "0.1s" }}
      >
        <nav
          aria-label="Main"
          className={cn(
            "container-page flex h-16 items-center justify-between rounded-2xl px-4 transition-all duration-500 md:px-6",
            scrolled ? "glass shadow-[0_8px_32px_-16px_rgba(0,0,0,0.6)]" : "border border-transparent"
          )}
        >
          <Link
            href="#hero"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-primary-strong text-primary-foreground">
              <span className="text-xs font-bold">AA</span>
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-0 rounded-full bg-foreground/[0.07] transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCommand}
              aria-label="Open command menu"
              className="hidden items-center gap-2 rounded-full border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground md:flex"
            >
              <Command className="size-3.5" />
              <span className="tracking-wide">K</span>
            </button>

            <ThemeToggle />

            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="#contact">Let&apos;s talk</Link>
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet — kept mounted and toggled with CSS so it animates both
          ways; `invisible` also takes it out of the tab order when closed. */}
      <div
        className={cn(
          "fixed inset-0 z-[70] transition-opacity duration-300 lg:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={cn(
            "relative flex h-full flex-col p-6 transition-transform duration-300 ease-out",
            mobileOpen ? "translate-y-0" : "-translate-y-4"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{profile.name}</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <ul className="mt-12 flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  tabIndex={mobileOpen ? undefined : -1}
                  className="block border-b border-border py-4 text-3xl font-semibold tracking-tight text-foreground/90 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3">
            <Button asChild size="lg" className="w-full">
              <Link href="#contact" onClick={() => setMobileOpen(false)}>
                Let&apos;s work together
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full">
              <a href={profile.links.resume} download>
                Download résumé
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
