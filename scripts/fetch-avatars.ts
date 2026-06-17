import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { getConferences } from "../src/data/conferences/index";

// Downloads missing speaker avatars from their X handle via unavatar.io into
// public/media/speakers/, so they live as local files (the site, OG card and
// validator all expect committed files — see the avatars note in the docs).
//
// Only fetches when a speaker DECLARES an `avatar` path whose file is missing,
// so it pairs with `pnpm validate`. Existing files are never overwritten.
// The public unavatar.io instance is rate-limited (25 req/day/IP) — fine for a
// handful of speakers per conference, run occasionally.

const PUBLIC_DIR = join(process.cwd(), "public");

// Extracts an X username from `@handle` or an x.com / twitter.com URL.
function xUsername(handle?: string, x?: string): string | null {
  if (handle) return handle.replace(/^@/, "");
  if (x) {
    const m = x.match(/(?:x\.com|twitter\.com)\/(@?[A-Za-z0-9_]+)/);
    if (m) return m[1].replace(/^@/, "");
  }
  return null;
}

async function main() {
  // Unique speakers by declared avatar path (fakes reuse the same paths).
  const byPath = new Map<string, { avatar: string; handle?: string; x?: string; name: string }>();
  for (const c of getConferences()) {
    for (const s of c.speakers) {
      if (s.avatar && !byPath.has(s.avatar)) {
        byPath.set(s.avatar, { avatar: s.avatar, handle: s.handle, x: s.x, name: s.name });
      }
    }
  }

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const s of byPath.values()) {
    const abs = join(PUBLIC_DIR, s.avatar.replace(/^\//, ""));
    if (existsSync(abs)) {
      skipped++;
      continue;
    }

    const username = xUsername(s.handle, s.x);
    if (!username) {
      console.warn(`- ${s.name}: no handle/X to fetch from → ${s.avatar} (add it manually)`);
      failed++;
      continue;
    }

    const url = `https://unavatar.io/x/${username}?fallback=false`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`- ${s.name}: unavatar returned ${res.status} for @${username}`);
        failed++;
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, buf);
      console.log(`✓ ${s.name} → ${s.avatar} (${Math.round(buf.length / 1024)} KB)`);
      downloaded++;
    } catch (err) {
      console.warn(`- ${s.name}: fetch error — ${err instanceof Error ? err.message : err}`);
      failed++;
    }
  }

  console.log(
    `\nAvatars: ${downloaded} downloaded, ${skipped} already present, ${failed} unresolved.`,
  );
  if (failed > 0) {
    console.log("Unresolved avatars must be added manually, or remove the `avatar` field.");
  }
}

main();
