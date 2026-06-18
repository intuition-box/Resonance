import { getConferences } from "@/data/conferences/index";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// /llms.txt — the AI-agent entry point (https://llmstxt.org). Auto-generated
// from the conference registry: every conference (and its raw transcript) is
// listed automatically, so adding a conference needs no edit here. Pre-rendered
// at build time; in production only real conferences are listed (the fake
// dev-only ones are excluded — see src/data/conferences/_fake.ts).
export const dynamic = "force-static";

const CACHE_CONTROL = "public, max-age=86400, stale-while-revalidate=2592000";

export function GET() {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    "> Recap hub for conferences of the Intuition ecosystem (X/Twitter audio Spaces). " +
      "Each conference has a synthesized recap and a raw verbatim transcript an agent can read directly.",
    "",
    "## Conferences",
    "",
  ];

  for (const c of getConferences()) {
    const base = `${SITE_URL}/c/${c.slug}`;
    lines.push(`- [${c.meta.title}](${base}): ${c.meta.oneLiner}`);
    if (c.transcriptPath) {
      lines.push(`  - [Raw transcript](${base}/transcript.txt)`);
    }
  }

  lines.push("");
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": CACHE_CONTROL },
  });
}
