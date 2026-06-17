import type { Conference } from "../types";
import { semanticDelegation } from "./semantic-delegation";

// Conférences codées en dur. Contribution = PR uniquement (pas de DB, pas d'import web).
// Pour en ajouter une : créer `./<slug>.ts` exportant un `Conference`, puis l'ajouter ici.
const conferences: Conference[] = [semanticDelegation];

const sorted = [...conferences].sort((a, b) => a.meta.title.localeCompare(b.meta.title, "en"));

export function getConferences(): Conference[] {
  return sorted;
}

export function getConference(slug: string | undefined): Conference | undefined {
  if (!slug) return undefined;
  return sorted.find((c) => c.slug === slug);
}

/** Slugs — pour generateStaticParams. */
export function getConferenceSlugs(): string[] {
  return sorted.map((c) => c.slug);
}
