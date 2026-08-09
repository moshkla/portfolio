import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, PenLine } from "lucide-react";
import { posts } from "@/data/posts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on Flutter, mobile architecture and AI-native engineering.",
};

export default function BlogPage() {
  return (
    <main className="relative min-h-[100svh] pt-32 pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-b" />

      <div className="container-page relative max-w-3xl">
        <Button asChild variant="ghost" size="sm" className="-ml-3">
          <Link href="/">
            <ArrowLeft aria-hidden />
            Back to portfolio
          </Link>
        </Button>

        <h1 className="text-gradient mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
          Writing
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          Notes on Flutter, mobile architecture and building software in an AI-native way.
        </p>

        {posts.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-border p-12 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-xl border border-border bg-foreground/[0.03] text-accent">
              <PenLine className="size-5" aria-hidden />
            </span>
            <p className="mt-5 text-sm text-muted-foreground">
              First post in progress. Check back soon.
            </p>
          </div>
        ) : (
          <ul className="mt-14 flex flex-col gap-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight">{post.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground/70">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {" · "}
                    {post.readingTime}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
