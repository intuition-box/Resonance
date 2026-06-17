<div align="center">

# Resonance

**Conference hub for the Intuition ecosystem's Spaces, talks and AMAs**

_The ideas from each Space, distilled — so they resonate beyond the live room._

One space per event: context, speakers, themes/timeline, missions and glossary.
Bilingual (English-first, French toggle). First conference: *Semantic Delegation* (Intuition × MetaMask).

`Next.js 15` · `React 19` · `HeroUI v3` · `Tailwind v4` · `i18n EN/FR` · `Fumadocs-ready` · `Biome`

</div>

---

## What it is

A Next.js (App Router) portal that synthesizes recorded & locally-transcribed conferences. Per
conference: context, speakers, themes, bounty missions, glossary — fully **bilingual** (English
default, French via a toggle).

## i18n — the rule

> **Every user-facing string must exist in both `en` and `fr`, English first.**

- **UI strings** live in `src/lib/dictionaries.ts` (`en` is the source of truth, `Dictionary` is
  derived from it; `fr` must cover it — enforced by the type system).
- **Content** uses the `Localized = { en, fr }` type (`src/lib/loc.ts`). Resolve with `loc(value, lang)`.
- Routing is locale-prefixed: `/[lang]/…` with `middleware.ts` redirecting `/` → `/en`.
  The language toggle (`src/components/lang-switch.tsx`) swaps the locale segment of the current path.

## Routes

| Route | Content |
|-------|---------|
| `/[lang]` | **Hub**: all conferences (cards + search) |
| `/[lang]/ajouter` | **Contribute** guide (how to open a PR) |
| `/[lang]/c/[slug]` | Conference overview |
| `/[lang]/c/[slug]/{intervenants,themes,missions,glossaire}` | Sections (rendered if data present) |

## Contributing — PR only

Conferences are **hardcoded** and contributed via **GitHub pull request** at
[intuition-box/Resonance](https://github.com/intuition-box/Resonance) — no account, no database,
no web import. Maintainer review is the quality/anti-spam gate.

1. Transcribe the audio/video and synthesize the content.
2. Create `src/data/conferences/<slug>.ts` exporting a bilingual `Conference` (`{ en, fr }`).
3. Register it in the array in `src/data/conferences/index.ts`.
4. Open a PR. Use `semantic-delegation.ts` as the reference.

## Deployment

Containerized via `output: "standalone"` (`next.config.mjs`). Built for **Coolify**, deployed at
**[resonance.intuition.box](https://resonance.intuition.box)**. No environment variables required.
Coolify can build with Nixpacks (Next.js)
or a standard standalone Dockerfile.

## Fumadocs

The docs content pipeline is wired (`source.config.ts`, `content/docs/*.mdx` + `*.fr.mdx`,
`createMDX` in `next.config.mjs`, `.source` generation). The final route mounting (UI) is
documented in **[FUMADOCS.md](./FUMADOCS.md)**.

## Development

```bash
pnpm install        # also runs `fumadocs-mdx` (generates .source)
pnpm dev            # http://localhost:3000
pnpm build          # production build
pnpm lint           # Biome
```

## Sources (Semantic Delegation)

- Data: `src/data/conferences/semantic-delegation.ts` (bilingual).
- Docs content: `content/docs/`.

> ⚠️ Speaker names were normalized from the audio transcription: Ryan McPeck · Kames · Zett · Saulo · Jordan.
