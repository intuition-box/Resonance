import type { Mission } from "../../types";

export const missions: Mission[] = [
  {
    id: 9,
    title: "Delegation tutorial",
    theme: "Education / builder onboarding",
    complexity: "beginner",
    recommended: true,
    summary: "Educate the Intuition community's builders on the Delegation Framework.",
    details: [
      "Open deliverable: a simple, accessible demo",
      "Show what's possible at the Intuition × Delegation Framework intersection",
      "Recommended entry point to get started",
    ],
  },
  {
    id: 10,
    title: "Liquid democracy: POC",
    theme: "Governance (proof of concept)",
    complexity: "intermediate",
    summary: "Prove liquid governance is possible with the framework + Intuition.",
    details: [
      "Delegable and re-delegable voting on-chain",
      "Contextualized voting (design → 3D re-delegated)",
      "Not expected production-ready: it's a POC",
    ],
  },
  {
    id: 11,
    title: "Liquid democracy: Production",
    theme: "Governance (production)",
    complexity: "advanced",
    summary: "Logical follow-up to the POC: bring contextualized governance to production.",
    details: [
      "Sequenced after mission 10",
      "⚠️ The sequencing does not apply to applying: apply right now",
      "Part of Intuition Box's progressive decentralization into a DAO",
    ],
  },
  {
    id: 12,
    title: "Extending the Intuition skill with delegation",
    theme: "Agents / tooling",
    complexity: "beginner",
    recommended: true,
    summary: "Add delegation capability to the “Intuition skill” (JP/GP's repo).",
    details: [
      "Many builders already use the Intuition skill",
      "Problem: giving your key to an agent dilutes your reputation",
      "Solution: agent with its own wallet + a strictly bounded delegation",
      "E.g.: research agent allowed only bounded automatic deposits",
    ],
  },
  {
    id: 13,
    title: "Community caveat enforcer registry",
    theme: "Ontology / community curation",
    complexity: "intermediate",
    summary: "Build a community registry of caveat enforcers + its ontology.",
    details: [
      "Who decides which enforcers are trustable/auditable/fit for context?",
      "Intuition lets the community self-organize",
      "Deliverable: an app + an ontology to discover the framework's possibilities",
      "Idea born from a Zet × MetaMask discussion at ECC",
    ],
  },
];
