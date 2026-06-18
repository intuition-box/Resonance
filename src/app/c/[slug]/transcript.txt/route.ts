import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getConference, getConferences } from "@/data/conferences/index";

export const runtime = "nodejs";

// Canonical, agent-friendly URL for the raw verbatim transcript, served right
// next to the conference page (/c/<slug>/transcript.txt) and linked from
// /llms.txt. The source file lives in the conference data folder (not public/),
// so this route is the single public URL for it. Pre-rendered at build time
// (the data is frozen); only known transcripts exist → dynamicParams off.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getConferences()
    .filter((c) => c.transcriptPath)
    .map((c) => ({ slug: c.slug }));
}

// Browser/CDN cache: the transcript only changes on redeploy (frozen data).
const CACHE_CONTROL = "public, max-age=86400, stale-while-revalidate=2592000";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const conference = getConference(slug);
  if (!conference?.transcriptPath) {
    return new Response("Not found", { status: 404 });
  }

  // transcriptPath is repo-relative (e.g. src/data/conferences/<slug>/transcript.txt).
  const text = readFileSync(join(process.cwd(), conference.transcriptPath), "utf8");
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": CACHE_CONTROL },
  });
}
