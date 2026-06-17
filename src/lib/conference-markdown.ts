import type { Conference } from "@/data/types";
import { SITE_URL } from "@/lib/site";

/**
 * Condensed version of a conference (titles, speakers, key idea, missions,
 * glossary + source link). Designed to fit in a `?q=` URL without triggering
 * a 414, unlike the full Markdown. The detail stays accessible via the
 * source link or "Copy as Markdown".
 */
export function conferenceToBrief(c: Conference): string {
  const { meta } = c;
  const out: string[] = [];

  out.push(`# ${meta.title}${meta.subtitle ? ` — ${meta.subtitle}` : ""}`);
  out.push([meta.platform, meta.date, meta.durationLabel].join(" · "));
  out.push(meta.oneLiner);
  if (meta.idea) out.push(`Key idea: ${meta.idea}`);
  if (c.bounties) out.push(`Bounties: ${c.bounties.total} (${c.bounties.range})`);
  if (meta.tags.length) out.push(`Tags: ${meta.tags.join(", ")}`);
  out.push(`Full transcript: ${SITE_URL}/c/${c.slug}`);

  if (c.speakers.length) {
    const list = c.speakers.map((s) => {
      const org = c.orgs.find((o) => o.id === s.org)?.name ?? s.org;
      return `${s.name} (${s.role}, ${org})`;
    });
    out.push("", `Speakers: ${list.join("; ")}`);
  }
  if (c.themes.length) {
    const sorted = [...c.themes].sort((a, b) => a.part - b.part || a.order - b.order);
    out.push("", `Timeline: ${sorted.map((t) => `${t.order}. ${t.title}`).join("; ")}`);
  }
  if (c.missions?.length) {
    const list = c.missions.map((m) => `#${m.id} ${m.title} (${m.complexity})`);
    out.push("", `Missions: ${list.join("; ")}`);
  }
  if (c.glossary?.length) {
    out.push("", `Glossary: ${c.glossary.map((g) => g.term).join(", ")}`);
  }

  return `${out.join("\n").trim()}\n`;
}

/**
 * Serializes a conference into clean Markdown, ready to paste into an AI
 * (ChatGPT, Claude, Codex, Cursor…). Built solely from the data.
 */
export function conferenceToMarkdown(c: Conference): string {
  const { meta } = c;
  const out: string[] = [];

  out.push(`# ${meta.title}`);
  if (meta.subtitle) out.push(`**${meta.subtitle}**`);
  out.push("");

  const facts = [
    `Platform: ${meta.platform}`,
    `Date: ${meta.date}`,
    `Duration: ${meta.durationLabel}`,
    meta.host ? `Host: ${meta.host}` : "",
  ].filter(Boolean);
  out.push(facts.join(" · "));
  out.push("", meta.oneLiner);
  if (meta.idea) out.push("", `**Key idea.** ${meta.idea}`);
  if (meta.tags.length) out.push("", `Tags: ${meta.tags.join(", ")}`);
  out.push("", `Source: ${SITE_URL}/c/${c.slug}`);
  if (meta.sessions?.length) {
    out.push(`Spaces: ${meta.sessions.map((s) => `${s.label} — ${s.url}`).join(" · ")}`);
  }

  if (c.bounties) {
    out.push("", "## Bounties", `${c.bounties.total} — ${c.bounties.range}`);
    if (c.bounties.applyUrl) out.push(`Apply: ${c.bounties.applyUrl}`);
  }

  if (c.orgs.length) {
    out.push("", "## Organizations");
    for (const o of c.orgs) {
      out.push(`- **${o.name}** (${o.tag})${o.x ? ` — ${o.x}` : ""}: ${o.description}`);
    }
  }

  if (c.speakers.length) {
    out.push("", "## Speakers");
    for (const s of c.speakers) {
      const org = c.orgs.find((o) => o.id === s.org)?.name ?? s.org;
      out.push("", `### ${s.name}${s.handle ? ` (${s.handle})` : ""}`, `${s.role} · ${org}`, s.bio);
      for (const h of s.highlights) out.push(`- ${h}`);
    }
  }

  if (c.themes.length) {
    out.push("", "## Timeline");
    const sorted = [...c.themes].sort((a, b) => a.part - b.part || a.order - b.order);
    for (const t of sorted) {
      out.push("", `### ${t.order}. ${t.title}`, t.summary);
      for (const p of t.points) out.push(`- ${p}`);
    }
  }

  if (c.missions?.length) {
    out.push("", "## Missions");
    for (const m of c.missions) {
      out.push("", `### #${m.id} — ${m.title} (${m.complexity})`, `Theme: ${m.theme}`, m.summary);
      for (const d of m.details) out.push(`- ${d}`);
    }
  }

  if (c.glossary?.length) {
    out.push("", "## Glossary");
    for (const g of c.glossary) out.push(`- **${g.term}**: ${g.definition}`);
  }

  return `${out.join("\n").trim()}\n`;
}
