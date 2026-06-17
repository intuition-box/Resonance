import type { Org } from "../../types";

export const orgs: Org[] = [
  {
    id: "intuition",
    name: "Intuition",
    tag: "Knowledge graph",
    color: "sky",
    logo: "/brand/intuition/mark.svg",
    x: "https://x.com/0xIntuition",
    description:
      "Host protocol. On-chain reputation knowledge graph (atoms, triples, trust). Provides the semantic “who/what is trustworthy” layer.",
  },
  {
    id: "box",
    name: "Intuition Box",
    tag: "Developer sub-DAO",
    color: "violet",
    logo: "/brand/intuition/mark.svg",
    x: "https://x.com/Intuition_Box",
    description:
      "Intuition's official developer sub-DAO. Author of the 5 missions and host of the follow-up Discord session.",
  },
  {
    id: "metamask",
    name: "MetaMask / Consensys",
    tag: "Delegation Framework",
    color: "caramel",
    logo: "/brand/metamask/fox.svg",
    x: "https://x.com/MetaMaskDev",
    description:
      "Delegation Framework / Smart Accounts team. Brings the programmable permissions (caveat enforcers, transitive delegation).",
  },
];
