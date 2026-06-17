import type { Bounties, ConferenceMeta, PartLabel } from "../../types";

export const slug = "semantic-delegation";
export const cover = "/media/conferences/semantic-delegation/cover.jpg";

export const meta: ConferenceMeta = {
  title: "Semantic Delegation",
  subtitle: "Intuition × MetaMask",
  platform: "X/Twitter audio Space",
  date: "June 15, 2026",
  durationLabel: "~67 min (33:41 + 33:11)",
  host: "Horus",
  oneLiner:
    "Three organizations (Intuition, the on-chain reputation knowledge graph; its developer sub-DAO Intuition Box; and the MetaMask/Consensys Delegation Framework team) present “Semantic Delegation” and launch 5 bounty missions.",
  idea: "Instead of delegating a literal permission (“this address may call this function”), you delegate a semantic, dynamic permission (“any entity with a reputation > 90 in this context may act on my behalf”), including AI agents acting safely and within bounds.",
  note: "Part 1 was cut short by a technical issue; part 2 is the resumption.",
  tags: ["Web3", "Delegation", "Governance", "AI agents"],
  sourceNote: "Transcribed from the 2 audio replays, then reconstructed and synthesized.",
  announcementUrl: "https://x.com/0xIntuition/status/2066584800182305065",
  sessions: [
    { label: "Part 1", url: "https://x.com/i/spaces/1RJZzzXydyNJB" },
    { label: "Part 2", url: "https://x.com/i/spaces/1qGvvvqbVjeGB" },
  ],
};

export const bounties: Bounties = {
  total: "$7,500 USDC",
  range: "Missions 9 to 13",
  applyUrl: "https://intuition.box/missions",
  sessionNote: "Discord session the next day · Zet & Saulo (~2 h)",
  sessionUrl: "https://discord.com/events/909531430881746974/1516583609044045905",
};

export const partLabels: PartLabel[] = [
  { part: 1, label: "Foundations & origin" },
  {
    part: 2,
    label: "Governance, agents & missions",
    note: "Resumption after the technical issue that cut off part 1.",
  },
];

export const followAccounts: string[] = [
  "@0xIntuition",
  "@Intuition_Box",
  "@MetaMaskDev",
  "@olivierjeremie",
  "@0xbilly",
  "@h0xrus",
  "@0xjordy",
  "@KamesGeraghty",
  "@McOso_",
  "@saulodigital",
];
