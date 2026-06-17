import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getConference, getConferenceSlugs } from "@/data/conferences/index";
import { BRAND_COLOR } from "@/lib/site";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

// Conference data is static → we pre-generate all OG cards at build time (a single
// Satori pass per conference) instead of rendering on each request. `dynamicParams`
// stays true to render an unknown slug on demand.
export const dynamic = "force-static";
export function generateStaticParams() {
  return getConferenceSlugs().map((slug) => ({ slug }));
}

// Browser/CDN cache: the image only changes on redeploy (frozen data).
const CACHE_CONTROL = "public, max-age=86400, stale-while-revalidate=2592000";

const BG = "#13100c";
const CARAMEL = BRAND_COLOR;

// Brand font (Stack Sans Notch) for Satori — the entire OG card is in Notch.
// Satori does NOT support variable fonts → static instances per weight (400/600/700)
// generated from the variable font via `fonttools varLib.instancer`.
const notchFont = (file: string) => readFileSync(join(process.cwd(), "src/app/fonts", file));
const NOTCH_FONTS = [
  { name: "Stack Sans Notch", data: notchFont("StackSansNotch-Regular.ttf"), weight: 400 as const },
  {
    name: "Stack Sans Notch",
    data: notchFont("StackSansNotch-SemiBold.ttf"),
    weight: 600 as const,
  },
  { name: "Stack Sans Notch", data: notchFont("StackSansNotch-Bold.ttf"), weight: 700 as const },
];

/** Reads a file from /public and returns it as a data URI (required by Satori/next-og). */
function fileDataUri(publicPath: string, mime: string): string | null {
  try {
    const buf = readFileSync(join(process.cwd(), "public", publicPath.replace(/^\//, "")));
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

// Open Graph card generated on the fly from a conference's data.
// Social fallback when the conference has no official `cover`.
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getConference(slug);
  if (!c) return new Response("Not found", { status: 404 });

  const title = c.meta.title;
  const subtitle = c.meta.subtitle ?? "";
  const date = c.meta.date;
  const stage = c.speakers.filter((s) => s.stage);
  const bounty = c.bounties ? c.bounties.total : "";

  // Versatile meta: we only show what exists (optional bounty, etc.).
  const metaParts: { text: string; accent?: boolean }[] = [
    { text: date },
    ...(stage.length ? [{ text: `${stage.length} speakers` }] : []),
    ...(bounty ? [{ text: bounty, accent: true }] : []),
  ];

  const logo = fileDataUri("/brand/resonance/logo.svg", "image/svg+xml");
  const avatars = stage
    .filter((s) => s.avatar)
    .slice(0, 8)
    .map((s) => fileDataUri(s.avatar as string, "image/jpeg"))
    .filter((u): u is string => Boolean(u));

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        backgroundColor: BG,
        backgroundImage:
          "radial-gradient(1200px 500px at 100% 0%, rgba(224,168,106,0.18), transparent 60%)",
        padding: "70px 80px",
        fontFamily: "Stack Sans Notch",
      }}
    >
      {/* Header: Resonance brand lockup (logo + name in our typeface) */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {logo ? (
          // biome-ignore lint/a11y/useAltText: OG image (no accessible DOM)
          <img src={logo} width={52} height={52} />
        ) : null}
        <div style={{ display: "flex", fontSize: 44, fontWeight: 600, color: CARAMEL }}>
          Resonance
        </div>
      </div>

      {/* Title */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#fff",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div style={{ display: "flex", fontSize: 40, color: CARAMEL, marginTop: 16 }}>
            {subtitle}
          </div>
        ) : null}
      </div>

      {/* Footer: avatars + meta */}
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {avatars.length > 0 ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            {avatars.map((src, i) => (
              // biome-ignore lint/a11y/useAltText: OG image (no accessible DOM)
              <img
                key={src}
                src={src}
                width={74}
                height={74}
                style={{
                  borderRadius: 999,
                  border: `4px solid ${BG}`,
                  marginLeft: i === 0 ? 0 : -22,
                  objectFit: "cover",
                }}
              />
            ))}
          </div>
        ) : null}
        <div style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 28 }}>
          {metaParts.map((p, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static OG render list
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 22 }}>
              {i > 0 ? (
                <div style={{ display: "flex", color: "rgba(255,255,255,0.25)" }}>·</div>
              ) : null}
              <div
                style={{
                  display: "flex",
                  color: p.accent ? CARAMEL : "rgba(255,255,255,0.65)",
                  fontWeight: p.accent ? 600 : 400,
                }}
              >
                {p.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: NOTCH_FONTS,
      headers: { "Cache-Control": CACHE_CONTROL },
    },
  );
}
