# Reference — full conference template

A **minimal yet complete, copy-paste** example of a fictional conference `example-space`.
Create `src/data/conferences/example-space/`, then adapt each file. Optional fields
are annotated; remove them if you don't have the info.

## `meta.ts`
```ts
import type { Bounties, ConferenceMeta, PartLabel } from "../../types";

export const slug = "example-space"; // kebab-case, unique

export const meta: ConferenceMeta = {
  title: "Example Space",
  subtitle: "Org A × Org B", // optional
  platform: "X/Twitter audio Space",
  date: "March 12, 2026", // "Month D, YYYY" — used for sorting (recent → old), must be parseable
  durationLabel: "~45 min",
  host: "Alice", // optional
  oneLiner: "A short recap of what the Space covered, in one sentence.",
  idea: "The single key idea the conversation revolved around.", // optional
  note: "Optional caveat about the recording (e.g. part 1 was cut off).", // optional
  tags: ["Web3", "Reputation"],
  sourceNote: "Transcribed from the audio replay, then synthesized.", // optional
  announcementUrl: "https://x.com/0xIntuition/status/123", // optional
  sessions: [
    // optional — replayable audio Space links; add several if the event
    // spanned multiple Spaces (e.g. a cut forced a part 2). Rendered as CTA
    // buttons under the banner, alongside a "Copy transcription" button.
    { label: "Part 1", url: "https://x.com/i/spaces/1RJZ..." },
  ],
};

export const bounties: Bounties = {
  // optional — remove this export (and its import in index.ts) if there is no bounty
  total: "$5,000 USDC",
  range: "Missions 1 to 3",
  applyUrl: "https://intuition.box/missions", // optional
};

export const partLabels: PartLabel[] = [
  // optional — only if the event is split into parts
  { part: 1, label: "Foundations" },
];

export const followAccounts: string[] = ["@0xIntuition", "@alice"]; // optional
```

> Cover: by default, **none** → the OG card is generated automatically.
> To force a visual, drop `public/media/conferences/example-space/cover.jpg`
> and add `export const cover = "/media/conferences/example-space/cover.jpg";`
> (then import `cover` in `index.ts`).

## `orgs.ts`
```ts
import type { Org } from "../../types";

export const orgs: Org[] = [
  {
    id: "org-a",
    name: "Org A",
    tag: "Knowledge graph",
    color: "sky", // sky | violet | caramel | emerald | rose | amber
    description: "What Org A is and its role in the conversation.",
    logo: "/brand/org-a/mark.svg", // optional
    x: "https://x.com/orga", // optional
  },
  {
    id: "org-b",
    name: "Org B",
    tag: "Delegation",
    color: "caramel",
    description: "What Org B is and its role.",
  },
];
```

## `speakers.ts`
```ts
import type { Speaker } from "../../types";

export const speakers: Speaker[] = [
  {
    id: "alice",
    name: "Alice",
    org: "org-a", // MUST match an id present in orgs.ts
    role: "Founder",
    handle: "@alice", // optional
    x: "https://x.com/alice", // optional
    avatar: "/media/speakers/alice.jpg", // optional; file in public/media/speakers/
    bio: "One or two sentences about who Alice is.",
    highlights: ["A notable point she made", "Another takeaway"],
    stage: true, // true = on air (counted in "on stage" + OG card)
  },
  {
    id: "bob",
    name: "Bob",
    org: "org-b",
    role: "Engineer",
    bio: "Short bio.",
    highlights: ["Key point from Bob"],
    stage: false, // present but not on air
  },
];
```

## `themes.ts`
```ts
import type { ThemeBlock } from "../../types";

// The event block by block, in the REAL order of the conversation.
export const themes: ThemeBlock[] = [
  {
    part: 1,
    order: 1,
    title: "Opening & intros",
    speakers: ["alice", "bob"], // Speaker ids
    summary: "What happened in this block.",
    points: ["Bullet point", "Another bullet"],
  },
  {
    part: 1,
    order: 2,
    title: "The core idea",
    speakers: ["alice"],
    summary: "Summary of the second block.",
    points: ["Point A", "Point B"],
  },
];
```

## `missions.ts` (optional)
```ts
import type { Mission } from "../../types";

export const missions: Mission[] = [
  {
    id: 1,
    title: "Build a demo",
    theme: "Education",
    complexity: "beginner", // beginner | intermediate | advanced
    summary: "What the mission asks for.",
    details: ["Deliverable 1", "Deliverable 2"],
    recommended: true, // optional
  },
];
```

## `glossary.ts` (optional)
```ts
import type { GlossaryEntry } from "../../types";

export const glossary: GlossaryEntry[] = [
  { term: "Delegation", definition: "Letting a dApp or agent act on your behalf." },
  { term: "Attestation", definition: "A signed claim recorded on the knowledge graph." },
];
```

## `index.ts` (assembly)
```ts
import type { Conference } from "../../types";
import { glossary } from "./glossary";
import { bounties, followAccounts, meta, partLabels, slug } from "./meta";
import { missions } from "./missions";
import { orgs } from "./orgs";
import { speakers } from "./speakers";
import { themes } from "./themes";

export const exampleSpace: Conference = {
  slug,
  meta,
  bounties,
  partLabels,
  orgs,
  speakers,
  themes,
  missions,
  glossary,
  followAccounts,
  // cover: "/media/conferences/example-space/cover.jpg", // optional (see meta.ts)
};
```

## Registration — `src/data/conferences/index.ts`
```ts
import { exampleSpace } from "./example-space";
// …
const real: Conference[] = [semanticDelegation, exampleSpace];
```

---

## Field table (constraints)

| Field | Type | Constraint |
|---|---|---|
| `slug` | `string` | kebab-case, unique, = folder name |
| `meta.date` | `string` | `"Month D, YYYY"` format — **parseable** (date sorting) |
| `meta.tags` | `string[]` | at least 1 |
| `org.color` | enum | `sky` \| `violet` \| `caramel` \| `emerald` \| `rose` \| `amber` |
| `org.id` | `string` | unique within the conf; referenced by `speaker.org` |
| `speaker.org` | `string` | must match an existing `org.id` |
| `speaker.stage` | `boolean` | `true` = on air |
| `theme.speakers` | `string[]` | ids of existing speakers |
| `theme.part` / `theme.order` | `number` | order the timeline |
| `mission.complexity` | enum | `beginner` \| `intermediate` \| `advanced` |
| `avatar` / `cover` / `logo` | `string` | absolute path under `/media/…` or `/brand/…` |

## Common pitfalls
- **Non-parseable `meta.date`** → the conference sinks to the bottom of the sort. Always `"Month D, YYYY"`.
- **`speaker.org` or `theme.speakers` pointing to a non-existent id** → display inconsistency.
- **Non-English text** → every text field is plain English (no i18n object).
- **Forgetting registration** in `src/data/conferences/index.ts` → the conference won't appear.
- **Referenced asset missing** from `public/` → broken image (a missing avatar also breaks the OG card).
- **Folder slug ≠ exported `slug`** → inconsistent routes.
