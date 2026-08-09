import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Generated favicon — the same "AA" mark used in the navbar. */
export default function Icon() {
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
          borderRadius: 14,
          color: "#FFFFFF",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        AA
      </div>
    ),
    size
  );
}
