import type { Conference, Speaker } from "../types";
import { semanticDelegation as template } from "./semantic-delegation";

// ⚠️ FAKE conferences — TEST DATA ONLY.
// Purpose: fill the hub to develop the front end (card variety, future
// pagination, loading perf). They clone the real conference as a
// template, varying the fields that affect card rendering.
//
// Activation: see `index.ts` (shown in dev, hidden in prod unless
// NEXT_PUBLIC_FAKE_CONFERENCES=1). To remove everything: delete this file and
// its import in `index.ts`.

type Topic = { title: string; subtitle?: string; tags: string[] };

// 20 plausible topics in the Intuition / Web3 universe, titles of varied lengths.
const TOPICS: Topic[] = [
  {
    title: "Onchain Reputation Primitives",
    subtitle: "Intuition × Gitcoin",
    tags: ["Web3", "Reputation", "Identity"],
  },
  {
    title: "Agentic Wallets",
    subtitle: "Autonomous signing",
    tags: ["AI agents", "Wallets", "Security", "UX"],
  },
  { title: "The Knowledge Graph at Scale", tags: ["Data", "Graph", "Infra"] },
  {
    title: "Trust Minimized Delegation Patterns for Multi-Agent Systems",
    subtitle: "Deep dive",
    tags: ["Delegation", "AI agents", "Governance", "Security", "Research"],
  },
  { title: "Attestations 101", subtitle: "From zero to graph", tags: ["Attestations", "Beginner"] },
  {
    title: "DAO Tooling Roundtable",
    subtitle: "Builders AMA",
    tags: ["DAO", "Governance", "Tooling"],
  },
  { title: "Semantic Permissions in Practice", tags: ["Delegation", "Security", "DX"] },
  {
    title: "Composable Identity",
    subtitle: "Intuition × ENS",
    tags: ["Identity", "ENS", "Web3", "Naming"],
  },
  { title: "Bounties & Builders", subtitle: "How missions work", tags: ["Bounties", "Community"] },
  { title: "Reputation Oracles", tags: ["Oracles", "Reputation", "DeFi", "Research"] },
  {
    title: "Privacy-Preserving Claims with Zero-Knowledge Proofs on the Knowledge Graph",
    subtitle: "ZK track",
    tags: ["ZK", "Privacy", "Research", "Cryptography", "Graph", "Advanced"],
  },
  { title: "Intuition Box Office Hours", subtitle: "Dev Q&A", tags: ["Dev", "AMA"] },
  { title: "Graph Indexing Deep Dive", tags: ["Infra", "Indexing", "Performance"] },
  {
    title: "From Tweets to Triples",
    subtitle: "Ingesting social data",
    tags: ["Data", "Social", "Pipelines"],
  },
  { title: "Governance Without Tokens", tags: ["Governance", "Reputation", "Experiment"] },
  {
    title: "MetaMask Delegation Toolkit Walkthrough",
    subtitle: "Hands-on",
    tags: ["MetaMask", "Delegation", "Tutorial", "DX"],
  },
  {
    title: "Reputation in DeFi Lending",
    subtitle: "Undercollateralized?",
    tags: ["DeFi", "Lending", "Reputation", "Risk"],
  },
  { title: "The Future of Verifiable Credentials", tags: ["Credentials", "Identity", "Standards"] },
  {
    title: "Community Curation Mechanics",
    subtitle: "Signal vs noise",
    tags: ["Community", "Curation", "Incentives"],
  },
  {
    title: "Building Your First Intuition App",
    subtitle: "Workshop",
    tags: ["Workshop", "Beginner", "DX", "SDK"],
  },
];

// One-liners of very different lengths to stress the cards' `line-clamp-3`.
const ONE_LINERS = [
  "A short recap Space on the topic.",
  "A focused conversation between builders on how this primitive works in practice, what tradeoffs it introduces, and where it is headed next.",
  "An in-depth, multi-part session covering the motivation, the architecture, several concrete integration paths, the open research questions that remain, the security considerations teams keep running into, and a long live Q&A with the community that went well past the scheduled hour.",
];

const PLATFORMS = ["X/Twitter audio Space", "Discord Stage", "YouTube Live", "Telegram AMA"];
const HOSTS = ["Horus", "Billy", "Jordy", "Kames", "Saulo", undefined];
const BOUNTY_TOTALS = ["$2,000 USDC", "$5,000 USDC", "$7,500 USDC", "$12,000 USDC"];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function makeFake(i: number): Conference {
  const topic = TOPICS[i % TOPICS.length];
  const n = i + 1;
  const slug = `demo-${String(n).padStart(2, "0")}-${slugify(topic.title)}`;

  // Deterministic variety (no randomness → stable static builds).
  const stageCount = 1 + (i % template.speakers.length); // 1..N speakers "on stage"
  const tagCount = 1 + (i % topic.tags.length); // 1..tags
  const hasSubtitle = !!topic.subtitle && i % 3 !== 0;
  const hasBounties = i % 2 === 0;

  // We keep ALL speakers (the themes reference them) but vary the number
  // shown "on stage" via the `stage` flag.
  const speakers: Speaker[] = template.speakers.map((s, idx) => ({
    ...s,
    stage: idx < stageCount,
  }));

  const month = (i % 12) + 1;
  const day = ((i * 7) % 27) + 1;
  const date = new Date(Date.UTC(2026, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return {
    slug,
    // No static cover: these confs exercise the on-the-fly generated OG card
    // (/api/og/<slug>), shown as a thumbnail/banner by the front end.
    cover: undefined,
    meta: {
      title: topic.title,
      subtitle: hasSubtitle ? topic.subtitle : undefined,
      platform: PLATFORMS[i % PLATFORMS.length],
      date,
      durationLabel: `~${30 + ((i * 5) % 60)} min`,
      host: HOSTS[i % HOSTS.length],
      oneLiner: ONE_LINERS[i % ONE_LINERS.length],
      tags: topic.tags.slice(0, tagCount),
      sourceNote: "Demo data — generated for front-end testing.",
    },
    orgs: template.orgs,
    speakers,
    partLabels: template.partLabels,
    themes: template.themes,
    bounties: hasBounties
      ? { total: BOUNTY_TOTALS[i % BOUNTY_TOTALS.length], range: `Missions ${n} to ${n + 4}` }
      : undefined,
    missions: template.missions,
    glossary: template.glossary,
    followAccounts: template.followAccounts,
  };
}

/** Generates `count` fake conferences (20 by default). */
export function fakeConferences(count = 20): Conference[] {
  return Array.from({ length: count }, (_, i) => makeFake(i));
}
