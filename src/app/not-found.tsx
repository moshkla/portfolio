import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-b" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_35%,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_70%)]"
      />

      <div className="relative flex flex-col items-center text-center">
        <p className="text-gradient-primary text-[7rem] font-semibold leading-none tracking-tight sm:text-[10rem]">
          404
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          This page doesn&apos;t exist.
        </h1>

        <p className="mt-4 max-w-md text-balance leading-relaxed text-muted-foreground">
          The link may be broken, or the page may have moved. Everything worth seeing is on the home
          page.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Home aria-hidden />
              Back home
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/#projects">
              <ArrowLeft aria-hidden />
              View projects
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
