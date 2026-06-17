import type { GlossaryEntry } from "../../types";

export const glossary: GlossaryEntry[] = [
  {
    term: "Delegation Framework",
    definition:
      "MetaMask's programmable permissions framework (derived from Delegatable). Productized, audited, integrated into the wallet, then fully open-sourced.",
  },
  {
    term: "Object capabilities",
    definition:
      "CS concept (~1970): the signed-postcard metaphor. A signed permission, re-signable from one party to the next → chain of trust.",
  },
  {
    term: "Caveat enforcer",
    definition:
      "Arbitrary contract with before/after hooks meeting a common interface. Composable to express a precise permission.",
  },
  {
    term: "Transitive delegation",
    definition:
      "Re-delegating a received permission while attenuating it (100 tokens → 20 tokens before Sunday → …).",
  },
  {
    term: "Intent-based permission",
    definition:
      "Permission conditioned on a result via an after hook: “100 tokens if and only if I receive this NFT”.",
  },
  {
    term: "Enforced simulations",
    definition:
      "A transaction wrapped in a delegation happens exactly as expected, or the whole thing reverts.",
  },
  {
    term: "Knowledge graph (Intuition)",
    definition:
      "Intuition's data graph (atoms, triples, markets, trust). “A graph of reputation about everything.”",
  },
  {
    term: "Atom / Triple",
    definition:
      "Building blocks of the knowledge graph. Atom = an entity; triple = a subject-predicate-object relation. You stake on them to express trust.",
  },
  {
    term: "Ontology",
    definition:
      "The definition of a knowledge graph: which triples and structure to organize data semantically (mission 13).",
  },
  {
    term: "Semantic Delegation",
    definition:
      "Combining Delegation Framework + knowledge graph: moving from literal delegations to semantic, dynamic ones based on reputation.",
  },
  {
    term: "Liquid democracy",
    definition:
      "Governance mixing direct and delegated voting, with multi-level delegation chains and voting contextualized by expertise. Opposes plutocracy.",
  },
  {
    term: "Plutocracy",
    definition:
      "Governance where voting power is weighted by the amount of tokens held. The limit liquid democracy overcomes.",
  },
  {
    term: "Intuition skill",
    definition:
      "Repo/tool (JP/GP) packaging Intuition's context to accelerate builders and agents. Target of mission 12.",
  },
  {
    term: "X402",
    definition:
      "Payment standard for agents (payments at the real-world intersection). A building block of the agent use cases.",
  },
  {
    term: "EIP-7715",
    definition:
      "Advanced permissions: requesting fine-grained permissions directly from the MetaMask extension.",
  },
  {
    term: "EIP-7710",
    definition:
      "Standard related to the Delegation Framework (on-chain delegation / smart accounts).",
  },
  {
    term: "Red Balloon Challenge",
    definition:
      "Demo (ECC Brussels): 10 balloons impossible to collect alone → forced cooperation by sharing delegations.",
  },
  {
    term: "Delegatable",
    definition:
      "Dan Finlay's open-source project, origin of the Delegation Framework (2020 → ETHDenver 2023).",
  },
];
