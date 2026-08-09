"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "./navbar";
import { LoadingScreen } from "./loading-screen";

/**
 * Cursor and progress bar are pure decoration and desktop-only, so they're
 * deferred out of the initial bundle rather than competing with hydration.
 */
const CustomCursor = dynamic(
  () => import("@/components/shared/custom-cursor").then((m) => m.CustomCursor),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import("@/components/shared/scroll-progress").then((m) => m.ScrollProgress),
  { ssr: false }
);

/**
 * The ⌘K menu pulls in cmdk and a Radix dialog. Most visitors never open it, so
 * it isn't mounted until the first time it's needed — the keyboard shortcut is
 * owned by this shell so the chunk only loads on the keypress, not on load.
 */
const CommandMenu = dynamic(
  () => import("./command-menu").then((m) => m.CommandMenu),
  { ssr: false }
);

export function SiteShell({ children }: { children: ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);
  // Sticks once true, so closing the menu doesn't unmount (and re-fetch) it.
  const [commandMounted, setCommandMounted] = useState(false);

  const openCommand = useCallback(() => {
    setCommandMounted(true);
    setCommandOpen(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandMounted(true);
        setCommandOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-primary-strong focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Navbar onOpenCommand={openCommand} />
      {commandMounted && <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />}

      <main id="main">{children}</main>
    </>
  );
}
