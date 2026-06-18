// Site data model (English only). Every text field is a plain
// English string; non-English-speaking visitors rely on the browser's
// automatic translation (the document is served as `lang="en"`).

export type OrgColor = "sky" | "violet" | "caramel" | "emerald" | "rose" | "amber";

export type Org = {
  id: string;
  name: string;
  tag: string;
  color: OrgColor;
  description: string;
  /** Path to a logo/icon (e.g. "/brand/metamask/fox.svg"). */
  logo?: string;
  /** URL of the organization's X/Twitter profile. */
  x?: string;
};

export type Speaker = {
  id: string;
  name: string;
  /** id of an Org from the same conference (or free-form if no org declared). */
  org: string;
  role: string;
  handle?: string;
  /** URL of the X/Twitter profile (verified identity). */
  x?: string;
  /** Path to the local avatar (e.g. "/media/speakers/handle.jpg"), committed in /public. */
  avatar?: string;
  bio: string;
  highlights: string[];
  stage: boolean;
};

export type ThemeBlock = {
  part: number;
  order: number;
  title: string;
  speakers: string[];
  summary: string;
  points: string[];
};

export type MissionComplexity = "beginner" | "intermediate" | "advanced";

export type Mission = {
  id: number;
  title: string;
  theme: string;
  complexity: MissionComplexity;
  summary: string;
  details: string[];
  recommended?: boolean;
};

export type GlossaryEntry = { term: string; definition: string };

export type PartLabel = { part: number; label: string; note?: string };

export type ConferenceMeta = {
  title: string;
  subtitle?: string;
  platform: string;
  date: string;
  durationLabel: string;
  host?: string;
  oneLiner: string;
  idea?: string;
  note?: string;
  tags: string[];
  sourceNote?: string;
  /** Link to the event's official announcement (e.g. announcement tweet). */
  announcementUrl?: string;
  /** Replayable audio Space sessions. An event can span several Spaces (e.g.
   * a mid-talk cut forced a part 2); each entry is one listenable session. */
  sessions?: { label: string; url: string }[];
  /** Optional override of the social OG image. Default: card generated on
   * the fly (/api/og/<slug>). Only set this to force a specific image. */
  ogImage?: string;
};

export type Bounties = {
  total: string;
  range: string;
  applyUrl?: string;
  sessionNote?: string;
  /** Link to the event (e.g. Discord event for the follow-up session). */
  sessionUrl?: string;
};

export type Conference = {
  /** URL identifier, unique. */
  slug: string;
  /** 16:9 cover image (hub card, banner, social OG image). */
  cover?: string;
  /** Repo-relative path to the raw verbatim transcript (.txt) source file,
   * co-located with the conference data (not under public/). Served only via
   * the /c/<slug>/transcript.txt route — no duplicate public URL. */
  transcriptPath?: string;
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
