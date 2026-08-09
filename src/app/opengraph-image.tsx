import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card. Kept to plain divs and system-weight text so it renders fast at
 * the edge without shipping a font binary.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090B",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: 320,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(59,130,246,0.42), transparent 65%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #3B82F6, #60A5FA)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            AA
          </div>
          <div style={{ display: "flex", color: "#A1A1AA", fontSize: 26 }}>
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              color: "#FAFAFA",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>

          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ display: "flex", color: "#FAFAFA", fontSize: 36 }}>{profile.title}</div>
            <div style={{ display: "flex", color: "#3F3F46", fontSize: 36 }}>·</div>
            <div style={{ display: "flex", color: "#60A5FA", fontSize: 36 }}>{profile.subtitle}</div>
          </div>

          <div
            style={{
              display: "flex",
              color: "#A1A1AA",
              fontSize: 26,
              maxWidth: 900,
              lineHeight: 1.45,
            }}
          >
            5+ years building cross-platform mobile products · 20+ apps shipped to the App Store and
            Google Play
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["Flutter", "Dart", "Clean Architecture", "LLMs", "Bloc"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 9999,
                border: "1px solid rgba(250,250,250,0.12)",
                color: "#A1A1AA",
                fontSize: 22,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
