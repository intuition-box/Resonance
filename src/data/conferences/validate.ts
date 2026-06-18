import type { Conference } from "../types";

// Data-integrity checks that TypeScript cannot catch (cross-references, date
// format, asset existence). Used by `pnpm validate` and CI to reject malformed
// conference contributions that would build fine but render wrong.

const ORG_COLORS = new Set(["sky", "violet", "caramel", "emerald", "rose", "amber"]);
const COMPLEXITIES = new Set(["beginner", "intermediate", "advanced"]);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Validates a list of conferences. Returns a list of human-readable error
 * messages (empty = all good). `assetExists`, when provided, checks that
 * referenced public assets (cover, avatars, logos) exist on disk. `fileExists`
 * checks repo-relative source files (e.g. the transcript, which lives in the
 * data folder, not under public/).
 */
export function validateConferences(
  conferences: Conference[],
  assetExists?: (publicPath: string) => boolean,
  fileExists?: (repoRelativePath: string) => boolean,
): string[] {
  const errors: string[] = [];
  const seenSlugs = new Set<string>();

  for (const c of conferences) {
    const where = `conference "${c.slug}"`;

    if (!SLUG_RE.test(c.slug)) errors.push(`${where}: slug is not kebab-case`);
    if (seenSlugs.has(c.slug)) errors.push(`${where}: duplicate slug`);
    seenSlugs.add(c.slug);

    if (!c.meta?.title?.trim()) errors.push(`${where}: empty meta.title`);
    if (!c.meta?.oneLiner?.trim()) errors.push(`${where}: empty meta.oneLiner`);
    if (!c.meta?.tags?.length) errors.push(`${where}: meta.tags must have at least one tag`);
    if (Number.isNaN(Date.parse(c.meta?.date ?? ""))) {
      errors.push(
        `${where}: meta.date "${c.meta?.date}" is not parseable (expected "Month D, YYYY")`,
      );
    }

    for (const [i, s] of (c.meta?.sessions ?? []).entries()) {
      if (!s.label?.trim()) errors.push(`${where}: meta.sessions[${i}] has an empty label`);
      if (!/^https?:\/\//.test(s.url ?? "")) {
        errors.push(`${where}: meta.sessions[${i}] url "${s.url}" must be an http(s) URL`);
      }
    }

    const orgIds = new Set<string>();
    for (const o of c.orgs) {
      if (orgIds.has(o.id)) errors.push(`${where}: duplicate org id "${o.id}"`);
      orgIds.add(o.id);
      if (!ORG_COLORS.has(o.color)) {
        errors.push(`${where}: org "${o.id}" has invalid color "${o.color}"`);
      }
      if (o.logo && assetExists && !assetExists(o.logo)) {
        errors.push(`${where}: org "${o.id}" logo not found: ${o.logo}`);
      }
    }

    const speakerIds = new Set<string>();
    for (const s of c.speakers) {
      if (speakerIds.has(s.id)) errors.push(`${where}: duplicate speaker id "${s.id}"`);
      speakerIds.add(s.id);
      if (!orgIds.has(s.org)) {
        errors.push(`${where}: speaker "${s.id}" references unknown org "${s.org}"`);
      }
      if (s.avatar && assetExists && !assetExists(s.avatar)) {
        errors.push(`${where}: speaker "${s.id}" avatar not found: ${s.avatar}`);
      }
    }

    for (const t of c.themes) {
      for (const sid of t.speakers) {
        if (!speakerIds.has(sid)) {
          errors.push(`${where}: theme "${t.title}" references unknown speaker "${sid}"`);
        }
      }
    }

    for (const m of c.missions ?? []) {
      if (!COMPLEXITIES.has(m.complexity)) {
        errors.push(`${where}: mission #${m.id} has invalid complexity "${m.complexity}"`);
      }
    }

    if (c.cover && assetExists && !assetExists(c.cover)) {
      errors.push(`${where}: cover not found: ${c.cover}`);
    }

    if (c.transcriptPath && fileExists && !fileExists(c.transcriptPath)) {
      errors.push(`${where}: transcript not found: ${c.transcriptPath}`);
    }
  }

  return errors;
}
