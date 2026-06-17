// Prompt ready to paste into an AI agent to add a conference to the repository.
// Shown via the "Copy agent prompt" button on the Contribute page. Keep in
// sync with the `.claude/skills/add-conference` skill (same procedure).
export const AGENT_CONFERENCE_PROMPT = `You are adding a NEW conference to the "Resonance" repository — a Next.js (App Router) hub of recap pages for conferences of the Intuition ecosystem. Follow the existing conventions EXACTLY; mirror the reference conference at \`src/data/conferences/semantic-delegation/\`.

GOAL
From a source recording/transcript, create one new conference and wire it into the site.

1) DATA — create a folder \`src/data/conferences/<slug>/\` (kebab-case slug), one file per responsibility:
- meta.ts     → exports \`slug\`, optional \`cover\`, \`meta: ConferenceMeta\`, and optionally \`bounties\`, \`partLabels\`, \`followAccounts\`
- orgs.ts     → \`orgs: Org[]\` (the teams involved)
- speakers.ts → \`speakers: Speaker[]\`
- themes.ts   → \`themes: ThemeBlock[]\` (the event, block by block, in real chronological order)
- missions.ts → \`missions: Mission[]\` (optional — bounties launched after the event)
- glossary.ts → \`glossary: GlossaryEntry[]\` (optional — key technical terms)
- index.ts    → assembles \`export const <camelCaseSlug>: Conference = { slug, cover, meta, bounties, partLabels, orgs, speakers, themes, missions, glossary, followAccounts }\`

All types live in \`src/data/types.ts\`. Key shapes:
- ConferenceMeta: title, subtitle?, platform, date, durationLabel, host?, oneLiner, idea?, note?, tags[], sourceNote?, announcementUrl?, ogImage?
- Org: id, name, tag, color (one of: sky | violet | caramel | emerald | rose | amber), description, logo?, x?
- Speaker: id, name, org (an Org id), role, handle?, x?, avatar?, bio, highlights[], stage (boolean — was on stage)
- ThemeBlock: part, order, title, speakers (Speaker ids), summary, points[]
- Mission: id, title, theme, complexity (beginner | intermediate | advanced), summary, details[], recommended?
- GlossaryEntry: term, definition

2) REGISTER — import the conference in \`src/data/conferences/index.ts\` and add it to the \`real\` array.

3) ASSETS (under \`public/\`)
- Speaker avatars: \`public/media/speakers/<handle>.jpg\` → referenced as \`/media/speakers/<handle>.jpg\`
- Optional cover: \`public/media/conferences/<slug>/cover.jpg\` → \`/media/conferences/<slug>/cover.jpg\`
- Org logos: \`public/brand/<org>/...\`
You do NOT design a social image: a branded Open Graph card is auto-generated at \`/api/og/<slug>\` from your data. Set \`cover\` ONLY to override the visual in the UI.

CONVENTIONS (must respect)
- English only: every text field is a plain English string (no i18n / translation objects). Browsers handle translation.
- \`meta.date\` MUST be the format "Month D, YYYY" (e.g. "June 15, 2026"). The hub sorts conferences by this date (most recent first), so it MUST be parseable.
- Keep files small and single-responsibility. Reuse \`semantic-delegation/\` as the template.
- Everything is required EXCEPT bounties, missions, glossary, cover, avatars, and links — the page and the OG card adapt to what you provide.

4) VALIDATE before opening the PR
- \`pnpm validate\`  (data integrity: date format, org/speaker refs, missing assets, unique slugs/ids)
- \`pnpm check\`     (Biome lint + format)
- \`pnpm build\`     (must succeed — the conference and its pages are statically generated)
- \`pnpm test:e2e\`  (Playwright end-to-end)

Then open a pull request; a maintainer reviews and merges. If you run Claude Code inside the repo, the \`add-conference\` project skill has the full step-by-step.`;
