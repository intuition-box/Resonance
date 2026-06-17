// Product name. "Resonance": the ideas from Spaces that resonate and
// spread through the Intuition community. Brand (locale-independent).
export const SITE_NAME = "Resonance";

// "Resonance" brand color (single source on the JS side, e.g. OG/Satori card).
// Must stay in sync with --color-brand in globals.css.
export const BRAND_COLOR = "#e6ad5f";

// GitHub repository that receives the contributions (PR only).
export const REPO_URL = "https://github.com/intuition-box/Resonance";

// Production URL (Zet / Intuition Box's Coolify).
export const SITE_URL = "https://resonance.intuition.box";

// External links (Intuition ecosystem / project). Centralized here so they
// can be fixed without touching the Footer component.
export const LINKS = {
  repo: REPO_URL,
  githubOrg: "https://github.com/intuition-box",
  intuitionBox: "https://intuition.box",
  intuitionBoxX: "https://x.com/Intuition_Box",
  license: `${REPO_URL}/blob/main/LICENSE`,
} as const;
