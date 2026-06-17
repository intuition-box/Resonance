import type { Localized } from "@/lib/loc";

// Modèle de données générique et bilingue. RÈGLE : tout champ descriptif est
// `Localized` ({ en, fr }, anglais d'abord). Les noms propres (organisations,
// intervenants, handles) restent des chaînes simples.

export type OrgColor = "sky" | "violet" | "caramel" | "emerald" | "rose" | "amber";

export type Org = {
  id: string;
  name: string;
  tag: Localized;
  color: OrgColor;
  description: Localized;
  /** Chemin d'un logo/icône (ex. "/brand/metamask-fox.svg"). */
  logo?: string;
};

export type Speaker = {
  id: string;
  name: string;
  /** id d'une Org de la même conférence (ou libre si aucune org déclarée). */
  org: string;
  role: Localized;
  handle?: string;
  bio: Localized;
  highlights: Localized[];
  aliases?: string[];
  stage: boolean;
};

export type ThemeBlock = {
  part: number;
  order: number;
  title: Localized;
  speakers: string[];
  summary: Localized;
  points: Localized[];
};

export type MissionComplexity = "beginner" | "intermediate" | "advanced";

export type Mission = {
  id: number;
  title: Localized;
  theme: Localized;
  complexity: MissionComplexity;
  summary: Localized;
  details: Localized[];
  recommended?: boolean;
};

export type GlossaryEntry = { term: string; definition: Localized };

export type PartLabel = { part: number; label: Localized; note?: Localized };

export type ConferenceMeta = {
  title: string;
  subtitle?: string;
  platform: Localized;
  date: Localized;
  durationLabel: Localized;
  host?: string;
  oneLiner: Localized;
  idea?: Localized;
  note?: Localized;
  tags: Localized[];
  sourceNote?: Localized;
};

export type Bounties = {
  total: Localized;
  range: Localized;
  applyUrl?: string;
  sessionNote?: Localized;
};

export type Conference = {
  /** Identifiant d'URL, unique. */
  slug: string;
  meta: ConferenceMeta;
  orgs: Org[];
  speakers: Speaker[];
  partLabels?: PartLabel[];
  themes: ThemeBlock[];
  bounties?: Bounties;
  missions?: Mission[];
  glossary?: GlossaryEntry[];
  followAccounts?: string[];
};
