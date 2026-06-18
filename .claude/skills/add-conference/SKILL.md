---
name: add-conference
description: >-
  Add a new conference to the Resonance hub (Next.js App Router). Use when
  creating/contributing a conference: create the data folder
  src/data/conferences/<slug>/, fill in meta/orgs/speakers/themes/(missions/glossary),
  register it in the registry, handle assets (avatars, cover) and validate
  (build, biome, e2e). Covers the data model, the conventions (English only,
  date format, slug) and the auto-generated OG card.
---

# Add a conference to Resonance

Resonance is a hub of **conference recaps** for the Intuition ecosystem.
Conferences are **hardcoded** (no DB), one per folder, one file per responsibility.
Reference to copy: `src/data/conferences/semantic-delegation/`.

> 📄 **Full copy-paste template** (every file of an example conference, field
> table and pitfalls): [`references/conference-template.md`](references/conference-template.md).
> Start from that ready-to-adapt skeleton.

## Procedure

### 1. Create the data folder
`src/data/conferences/<slug>/` (slug in **kebab-case**, unique), with:

| File | Exports | Required |
|---|---|---|
| `meta.ts` | `slug`, `cover?`, `transcriptPath?`, `meta: ConferenceMeta`, `bounties?`, `partLabels?`, `followAccounts?` | ✅ (except the optional ones) |
| `orgs.ts` | `orgs: Org[]` | ✅ |
| `speakers.ts` | `speakers: Speaker[]` | ✅ |
| `themes.ts` | `themes: ThemeBlock[]` (the event block by block, in real order) | ✅ |
| `missions.ts` | `missions: Mission[]` | ❌ optional |
| `glossary.ts` | `glossary: GlossaryEntry[]` | ❌ optional |
| `transcript.txt` | raw verbatim transcript (a plain `.txt`, not a module) | ❌ optional |
| `index.ts` | `export const <camelCaseSlug>: Conference = { … }` | ✅ |

For a small conference, a single `src/data/conferences/<slug>.ts` file exporting
a `Conference` also works.

### 2. Register it
In `src/data/conferences/index.ts`: import the conference and add it to the
`real` array.

### 3. Assets (under `public/`)
- Speaker avatars → `public/media/speakers/<handle>.jpg`, referenced as `/media/speakers/<handle>.jpg`
- Optional cover → `public/media/conferences/<slug>/cover.jpg`, referenced as `/media/conferences/<slug>/cover.jpg`
- Org logos → `public/brand/<org>/…`

**No social image to design**: a branded Open Graph card is generated automatically
at `/api/og/<slug>` from the data (title, subtitle, avatars, date, bounty). Set
`cover` ONLY to override the visual in the UI.

### 3b. Raw transcript (optional)
To make the full verbatim available to AI agents, drop it as a plain `.txt`
**inside the data folder** (NOT under `public/`):
`src/data/conferences/<slug>/transcript.txt`, then in `meta.ts` add
`export const transcriptPath = "src/data/conferences/<slug>/transcript.txt";`
and wire `transcriptPath` into `index.ts`.

It is then served at the single canonical URL **`/c/<slug>/transcript.txt`**
(text/plain, prerendered) and **auto-listed in `/llms.txt`** — no edit needed
there. The "Copy transcription" button copies it too (falling back to the
synthesized Markdown when no transcript is provided). Keep it co-located with the
data; do not put it under `public/` (that would create a duplicate public URL).

### 4. Validate
```bash
pnpm validate   # data integrity: date format, org/speaker refs, missing assets, unique slugs/ids
pnpm check      # Biome lint + format
pnpm build      # must succeed — the conference and its pages are statically generated (SSG)
pnpm test:e2e   # Playwright
```

## Data model (`src/data/types.ts`)

```ts
type ConferenceMeta = {
  title: string; subtitle?: string; platform: string;
  date: string;            // "Month D, YYYY" — see conventions
  durationLabel: string; host?: string;
  oneLiner: string; idea?: string; note?: string;
  tags: string[]; sourceNote?: string; announcementUrl?: string; ogImage?: string;
};
type Org = { id: string; name: string; tag: string;
  color: "sky"|"violet"|"caramel"|"emerald"|"rose"|"amber";
  description: string; logo?: string; x?: string };
type Speaker = { id: string; name: string; org: string /* an Org id */;
  role: string; handle?: string; x?: string; avatar?: string;
  bio: string; highlights: string[]; stage: boolean };
type ThemeBlock = { part: number; order: number; title: string;
  speakers: string[] /* Speaker ids */; summary: string; points: string[] };
type Mission = { id: number; title: string; theme: string;
  complexity: "beginner"|"intermediate"|"advanced";
  summary: string; details: string[]; recommended?: boolean };
type GlossaryEntry = { term: string; definition: string };
type PartLabel = { part: number; label: string; note?: string };
type Bounties = { total: string; range: string; applyUrl?: string;
  sessionNote?: string; sessionUrl?: string };
type Conference = { slug: string; cover?: string;
  transcriptPath?: string /* repo-relative .txt, e.g. src/data/conferences/<slug>/transcript.txt */;
  meta: ConferenceMeta;
  orgs: Org[]; speakers: Speaker[]; partLabels?: PartLabel[]; themes: ThemeBlock[];
  bounties?: Bounties; missions?: Mission[]; glossary?: GlossaryEntry[];
  followAccounts?: string[] };
```

### Assembling `index.ts` (template)
```ts
import type { Conference } from "../../types";
import { glossary } from "./glossary";
import { bounties, cover, followAccounts, meta, partLabels, slug, transcriptPath } from "./meta";
import { missions } from "./missions";
import { orgs } from "./orgs";
import { speakers } from "./speakers";
import { themes } from "./themes";

export const myConference: Conference = {
  slug, cover, transcriptPath, meta, bounties, partLabels, orgs, speakers, themes,
  missions, glossary, followAccounts,
};
```

## Conventions (must follow)

- **English only**: every text field is a plain English string (no i18n object).
  The document is served `lang="en"`, the browser handles translation.
- **`meta.date` in `"Month D, YYYY"` format** (e.g. `"June 15, 2026"`). The hub
  **sorts conferences by this date, most recent first**, so it must be parseable
  by `Date.parse`.
- **Links** to X for orgs/speakers via `x` (full URL); `handle` = `@name`.
- **`stage`** of a speaker = `true` if they were on air (counted in "on stage"
  and shown in the OG card).
- Keep files **small and single-responsibility**. Copy `semantic-delegation/`
  as a living template.
- **Avatars & transcription**: transcription/synthesis happen upstream (outside
  the repo) — write the result into the data files. Speaker avatars are optional
  and degrade gracefully; if you add one, commit the image under
  `public/media/speakers/` (don't hotlink X/Discord — those URLs rotate). Tip:
  declare the `avatar` path, then run `pnpm fetch-avatars` to download it from the
  speaker's X handle (via unavatar) into the right place.

## Final checklist
- [ ] Folder `src/data/conferences/<slug>/` complete (meta, orgs, speakers, themes required)
- [ ] `index.ts` assembles and exports a `Conference`
- [ ] Conference added to the `real` array in `src/data/conferences/index.ts`
- [ ] Avatars (and cover if provided) dropped into `public/media/…`
- [ ] Raw transcript, if any, at `src/data/conferences/<slug>/transcript.txt` with `transcriptPath` set (NOT under `public/`)
- [ ] All text in English, `meta.date` in `"Month D, YYYY"` format
- [ ] `pnpm validate && pnpm check && pnpm build && pnpm test:e2e` all green
