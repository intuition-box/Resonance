import type { Conference } from "../types";
import { fakeConferences } from "./_fake";
import { semanticDelegation } from "./semantic-delegation";

// Hardcoded conferences. Contribution = PR only (no DB, no web import).
// To add one: create either `./<slug>.ts` or a `./<slug>/` folder
// (one file per responsibility, cf. `semantic-delegation/`) exporting a
// `Conference`, then add it here.
const real: Conference[] = [semanticDelegation];

// Fake test conferences (cf. `_fake.ts`): shown in dev to develop the
// front end (pagination, card variety), hidden in prod unless explicitly opted in
// via NEXT_PUBLIC_FAKE_CONFERENCES=1.
const showFake =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_FAKE_CONFERENCES === "1";

const conferences: Conference[] = showFake ? [...real, ...fakeConferences(20)] : real;

// Sorted by date, most recent first. `meta.date` is an English
// "Month D, YYYY" string parsable by Date.parse; invalid dates end up
// at the bottom of the list.
function dateValue(c: Conference): number {
  const t = Date.parse(c.meta.date);
  return Number.isNaN(t) ? Number.NEGATIVE_INFINITY : t;
}
const sorted = [...conferences].sort((a, b) => dateValue(b) - dateValue(a));

export function getConferences(): Conference[] {
  return sorted;
}

export function getConference(slug: string | undefined): Conference | undefined {
  if (!slug) return undefined;
  return sorted.find((c) => c.slug === slug);
}

/** Slugs for generateStaticParams. */
export function getConferenceSlugs(): string[] {
  return sorted.map((c) => c.slug);
}
