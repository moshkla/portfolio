import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3B82F6, #60A5FA)",
          color: "#FFFFFF",
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: -3,
        }}
      >
        AA
      </div>
    ),
    size
  );
}
