# Anas Abd Elazim — Portfolio

**Live:** https://portfolio-sigma-ten-69.vercel.app

A premium personal portfolio for a Senior Flutter Developer & AI Native Engineer.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Radix/shadcn-style primitives · Lucide

## Lighthouse

Measured against a production build (`next build && next start`), median of three runs:

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | 97 | 100 | 100 | 100 |
| Mobile | 95 | 100 | 100 | 100 |

FCP 0.9s · CLS 0 · TBT ~40ms (mobile). Observed (unthrottled) FCP and LCP are both ~187ms.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run typecheck            # tsc --noEmit
npm run lint
```

## Environment

Copy `.env.example` to `.env.local`. Every variable is optional for local development.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used by metadata, `sitemap.xml`, `robots.txt` and JSON-LD. **Set this on Vercel** — it currently falls back to a placeholder domain. |
| `RESEND_API_KEY` | Enables server-side delivery for the contact form. Without it the form still works (see below). |
| `CONTACT_TO_EMAIL` | Where messages are delivered. Defaults to the address in `src/data/profile.ts`. |
| `CONTACT_FROM_EMAIL` | Verified sender for Resend. |

Analytics and Speed Insights only mount when `VERCEL_ENV` is present, so they never 404 off-platform.

## Deploying to Vercel

1. Push this directory to a Git repository.
2. Import it on Vercel — the framework preset is detected automatically, no build config needed.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Optionally add `RESEND_API_KEY` + `CONTACT_TO_EMAIL` to turn on contact-form delivery.

## Project structure

```
src/
  app/            routes, metadata, sitemap/robots/manifest, generated OG + icons, contact API
  components/
    ui/           shadcn-style primitives (button, card, badge, dialog, command, …)
    layout/       navbar, footer, ⌘K menu, loading screen, site shell
    shared/       reusable animation + effect components
  features/       one folder per page section (hero, about, skills, …)
  data/           all content — profile, experience, projects, skills, services, stats
  hooks/          use-magnetic, use-parallax, use-active-section, …
  lib/            utils, shared motion language, structured data, validation
  i18n/           locale config + en/ar dictionaries
```

**All copy lives in `src/data/`.** Editing your experience, projects or skills means editing a typed object, never JSX.

## Contact form

Validation is a single zod schema (`src/lib/contact-schema.ts`) shared by the client form and the API route, so the two can't drift.

- **With `RESEND_API_KEY`** — delivered server-side via Resend.
- **Without it** — the API answers `503 {fallback: true}` and the client opens a prefilled mail draft. A message is never silently dropped.
- A honeypot field and a per-IP rate limit (6/min) sit in front of both paths. A tripped honeypot returns `200 {ok:true}` — identical to success — so a bot learns nothing.

The rate limiter is in-memory and resets on cold start; swap it for Vercel KV/Upstash if this ever needs to be durable.

## Performance notes (please read before "tidying")

A few things look odd but are deliberate and were measured. Undoing them regresses LCP:

1. **The hero is a server component animated with CSS, not Framer Motion.** Driving it from JS shipped the text as `opacity: 0` until hydration — about 2.9s of LCP render delay on throttled mobile.
2. **Never fade an LCP candidate from `opacity: 0`.** Chrome excludes such elements from LCP entirely; at one point this left the page with *no* eligible LCP element at all. The headline uses a transform-only animation (`animate-rise-solid`).
3. **The hero intro paragraph — the actual LCP element — is not animated at all.** Even a transform-only animation deferred its candidate (3.1s → 2.6s, mobile 92 → 95).
4. **Framer Motion is loaded via `LazyMotion` + `domAnimation`.** Components import `m`, not `motion`. Importing `motion` directly pulls in every feature and roughly doubles the bytes.
5. **`content-visibility: auto` was tried and removed.** It helped slightly, but no single `contain-intrinsic-size` estimate works across breakpoints — when a skipped section rendered, its real height shifted everything below and anchor jumps from the navbar and ⌘K landed on the wrong section.
6. **`.text-gradient` re-applies its gradient to descendant spans.** `background-clip: text` only paints an element's own text nodes, and `TextReveal`/`Counter` nest their text in child spans — without this, headings render invisible.
7. **`--primary-strong` exists for a reason.** The brand blue `#3B82F6` is only 3.7:1 against white — below WCAG AA. It stays in use for glows, borders and text on dark (5.4:1); filled surfaces carrying white text use the deeper `#2563EB` (5.2:1).

## Content accuracy

Everything is drawn from the résumé and from live App Store / Play Store listings — the store URLs were extracted from the résumé PDF's hyperlinks and the app icons in `public/apps/` are the real store artwork.

A few items are worth reviewing:

- **"Millions+ Users Reached"** (`src/data/stats.ts`) is the one figure not verifiable from the résumé.
- **IT Cores** has no dates on the résumé, so its timeline entry renders without a date range (`showDates: false` in `src/data/experience.ts`).
- **Delisted apps.** Diet Watchers, Almajdyah Residence, PurenesS, No7, Smart Minds, Saladbar and Wakkt returned 404/no-results on both stores. Their `links` are intentionally empty so no dead store button ever renders; the card shows "Store listing retired by the client" instead.
- **Tech stacks per project** are grounded in the store listing where it evidenced them (Kanaf's AI document parsing and face recognition are described in its own listing) and otherwise inferred from résumé skills applied to the app's domain. Worth a skim.

## Extending

- **Blog** — add entries to `src/data/posts.ts` (or swap it for an MDX/CMS loader); `/blog` renders them with no other changes.
- **Localisation** — copy already lives outside JSX and `src/i18n/` holds `en`/`ar` dictionaries plus RTL direction handling. Adding a locale means wrapping routes in `app/[locale]`, not rewriting components.
- **Projects** — add to `src/data/projects.ts`. Drop a matching icon in `public/apps/`, or leave `icon: null` and the card falls back to generated art keyed to the project's accent colours.
