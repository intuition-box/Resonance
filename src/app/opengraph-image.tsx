import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BRAND_COLOR } from "@/lib/site";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Resonance — Intuition conference hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#13100c";
const CARAMEL = BRAND_COLOR;
const notch = (file: string) => readFileSync(join(process.cwd(), "src/app/fonts", file));

function fileDataUri(publicPath: string, mime: string): string | null {
  try {
    const buf = readFileSync(join(process.cwd(), "public", publicPath.replace(/^\//, "")));
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

// Branded Open Graph card for the home page (and any route without its own image).
export default function Image() {
  const logo = fileDataUri("/brand/resonance/logo.svg", "image/svg+xml");

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: BG,
        backgroundImage:
          "radial-gradient(1200px 500px at 100% 0%, rgba(224,168,106,0.18), transparent 60%)",
        padding: "70px 80px",
        fontFamily: "Stack Sans Notch",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {logo ? (
          // biome-ignore lint/a11y/useAltText: OG image (no accessible DOM)
          <img src={logo} width={120} height={120} />
        ) : null}
        <div style={{ display: "flex", fontSize: 110, fontWeight: 700, color: CARAMEL }}>
          Resonance
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 46, color: "#fff", marginTop: 36 }}>
        The Intuition ecosystem, distilled.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 30,
          color: "rgba(255,255,255,0.6)",
          marginTop: 14,
        }}
      >
        Recaps of Spaces, talks & AMAs — context, speakers, themes & missions.
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Stack Sans Notch", data: notch("StackSansNotch-SemiBold.ttf"), weight: 600 },
        { name: "Stack Sans Notch", data: notch("StackSansNotch-Bold.ttf"), weight: 700 },
      ],
    },
  );
}
