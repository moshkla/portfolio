import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // There are other lockfiles above this directory; pin the trace root here so
  // Next doesn't infer the home directory as the workspace root.
  outputFileTracingRoot: __dirname,

  images: {
    // Modern formats first; all project artwork is local so no remote patterns.
    formats: ["image/avif", "image/webp"],
  },

  // Ship smaller client bundles by tree-shaking these barrel imports.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Store artwork is immutable — cache it hard.
        source: "/apps/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
