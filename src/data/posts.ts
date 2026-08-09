export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  /** Markdown/MDX body, or a CMS id once one is wired up. */
  body?: string;
};

/**
 * Blog is scaffolded and routed but intentionally empty — add entries here (or
 * swap this module for an MDX/CMS loader) and /blog starts working with no
 * other changes.
 */
export const posts: Post[] = [];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
