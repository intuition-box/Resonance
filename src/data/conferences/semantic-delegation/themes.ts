import type { ThemeBlock } from "../../types";

export const themes: ThemeBlock[] = [
  {
    part: 1,
    order: 1,
    title: "Opening & introductions",
    speakers: ["horus", "zett", "billy", "kames", "ryan", "jordan"],
    summary:
      "Horus opens, brings the speakers on stage and introduces the trio of organizations. Quick round of intros.",
    points: [
      "MetaMask, Intuition (core) and Intuition Box together",
      "Front-end glitches inviting speakers",
      "Everyone introduces themselves in 30 s",
    ],
  },
  {
    part: 1,
    order: 2,
    title: "Why delegation needs semantics",
    speakers: ["horus", "jordan"],
    summary:
      "Pivot question: why does delegated authority need semantic understanding from the knowledge graph?",
    points: [
      "Delegations = letting dApps/agents act on the user's behalf",
      "The knowledge graph decides who and what is trustworthy",
    ],
  },
  {
    part: 1,
    order: 3,
    title: "Origin story of the Delegation Framework",
    speakers: ["ryan", "kames"],
    summary:
      "From Delegatable (Dan Finlay) to an audited framework, integrated in the wallet, then fully open-sourced.",
    points: [
      "2020: Kames introduces Delegatable to Ryan",
      "ETHDenver 2023: Dan Finlay's talk → the spark",
      "Delegatable → audited Delegation Framework → 100% open-source",
    ],
  },
  {
    part: 1,
    order: 4,
    title: "Object capabilities & caveat enforcers",
    speakers: ["ryan"],
    summary:
      "Technical deep dive: the signed-postcard metaphor, and the composable caveat enforcers.",
    points: [
      "Object capabilities (CS concept ~1970) → chain of trust",
      "Caveat enforcers = contracts with before/after hooks, composable",
      "E.g.: “100 USDC/day for 7 days” (ERC-20 + expiration)",
      "Transitive delegation with attenuation; intent-based permissions; enforced simulations",
    ],
  },
  {
    part: 1,
    order: 5,
    title: "Viral growth loops",
    speakers: ["kames"],
    summary: "Using delegations to reward usage and onboard friends, provable on-chain.",
    points: [
      "5 deposits → 5 free deposits via caveat enforcer",
      "Onboarding friends with a bounded deposit right + sponsor reward",
      "Red Balloon Challenge (ECC Brussels): forced cooperation",
    ],
  },
  {
    part: 1,
    order: 6,
    title: "Mission 13 introduced: caveat enforcer registry",
    speakers: ["zett", "kames"],
    summary:
      "Who maintains the list of trustable/auditable enforcers? Intuition and community self-organization.",
    points: [
      "Idea born from a Zet × MetaMask discussion at ECC",
      "MetaMask maintains a “bare bones” list",
      "Intuition enables community curation via an ontology",
    ],
  },
  {
    part: 2,
    order: 7,
    title: "Resumption after the issue",
    speakers: ["horus"],
    summary: "The Space had crashed; Horus resumes in part 2. “The show goes on.”",
    points: ["~3 min gap between the two parts"],
  },
  {
    part: 2,
    order: 8,
    title: "Liquid democracy (missions 10 & 11)",
    speakers: ["zett"],
    summary:
      "Going beyond plutocracy: liquid governance with delegation chains and contextualized voting.",
    points: [
      "Direct + delegative democracy, multi-level",
      "Governance contracts stay simple; complexity in the framework",
      "Voting contextualized by expertise (design → 3D re-delegated)",
      "Delegation revocable by on-chain reputation",
    ],
  },
  {
    part: 2,
    order: 9,
    title: "Fluid, reputation-based delegations",
    speakers: ["billy"],
    summary: "Moving from literal delegations to generalized ones based on a reputation score.",
    points: [
      "“Interact with anything with a reputation > 90”",
      "Intuition = a graph of reputation about everything",
      "Unlocks AI agents acting over broad scopes, trustfully",
    ],
  },
  {
    part: 2,
    order: 10,
    title: "Sets of actors & attestations",
    speakers: ["billy"],
    summary: "Expressing “any MetaMask team member” via on-chain attestations and trust anchors.",
    points: [
      "Centralized aggregator or decentralized attestation state",
      "Permission = sets of actors × sets of actions",
    ],
  },
  {
    part: 2,
    order: 11,
    title: "Consumer use case: ticketing & agents",
    speakers: ["horus", "ryan"],
    summary:
      "Delegate a bounded budget to several competing agents to land a ticket, never overpaying.",
    points: [
      "High-demand concert/sports, sniping and resale",
      "3 agents + X402, you never pay more than delegated",
      "Flip the wallet logic: the app requests, the user expresses",
    ],
  },
  {
    part: 2,
    order: 12,
    title: "AI agents & real-world finance",
    speakers: ["ryan"],
    summary: "Permission an agent: “spend $50 at this vendor, at this X402 address, it expires.”",
    points: [
      "X402 as a payment medium for agents",
      "Analogy: the user sets the guardrails like Anthropic around a model",
    ],
  },
  {
    part: 2,
    order: 13,
    title: "Mission tour & closing",
    speakers: ["horus", "zett", "ryan", "billy"],
    summary:
      "Complexity gradient, advice to applicants, MetaMask roadmap and the next-day Discord session.",
    points: [
      "Easy entry points: missions 9 & 12",
      "Advice: re-listen to the Space; they select “those who get the vision”",
      "Roadmap: 7715, 7710, X402, agent wallet, CLI",
      "Discord session the next day (Zet & Saulo, ~2 h)",
    ],
  },
];
