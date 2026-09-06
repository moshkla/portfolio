import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { MotionProvider } from "@/components/shared/motion-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { profile, siteConfig } from "@/data/profile";
import { buildStructuredData } from "@/lib/structured-data";
import "./globals.css";

/**
 * One family for the whole page, Latin and Arabic alike.
 *
 * The previous face carried `subsets: ["latin"]` only, so the ten Arabic
 * project names in `data/projects.ts` — كَنَف, آركو للخدمات, عيادات حياتنا —
 * fell through to whatever the visitor's OS happened to pick. On a page whose
 * readers are in the Gulf, that was the one piece of text nobody had set.
 */
const plex = IBM_Plex_Sans_Arabic({
  variable: "--font-plex",
  subsets: ["latin", "arabic"],
  /* 400/500/600/700 only — nothing on the page sets a lighter weight,
     and each unused weight is four more subset files on the critical path. */
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${profile.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: profile.name,
  applicationName: `${profile.name} — Portfolio`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: profile.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0D1F19" },
    { media: "(prefers-color-scheme: light)", color: "#EFF1EC" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={plex.variable}>
      <head>
        {/* JSON-LD for rich results — generated from the same data the page renders. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData()) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>
            <MotionProvider>{children}</MotionProvider>
            <Toaster
              position="bottom-right"
              toastOptions={{
                classNames: {
                  toast: "glass !rounded-xl !text-foreground",
                  description: "!text-muted-foreground",
                },
              }}
            />
          </TooltipProvider>
        </ThemeProvider>

        {/* Only mount on Vercel — off-platform these scripts 404, which shows
            up as console errors in audits and tells the visitor nothing. */}
        {process.env.VERCEL_ENV && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
