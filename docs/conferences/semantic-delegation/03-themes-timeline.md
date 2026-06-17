# 03 · Themes & timeline

Thematic walkthrough of the two parts. The blocks follow the actual order of the conversation.

## Part 1: Foundations & origin

### 1. Opening & introductions
- Horus opens, brings the speakers up on stage (a few front-end technical hiccups while inviting them).
- Introduction of the trio of organizations: MetaMask, Intuition (core), Intuition Box.
- Quick round of introductions: Zet, Billy, Kames, Ryan, Jordan introduce themselves.

### 2. Why delegation needs semantics
- Pivotal question raised by Horus: *why does delegated authority need a semantic understanding / additional parameters drawn from the structured data of the knowledge graph?*
- Jordan sets the frame: delegations = letting dApps/agents act on the user's behalf; the knowledge graph decides **who and what** is trustworthy.

### 3. The origin story of the Delegation Framework (Ryan)
- 2020: Kames introduces Ryan to Dan Finlay's open-source **Delegatable** project.
- **ETHDenver 2023**: talk by Dan Finlay on delegation → the lightbulb moment.
- Dan builds a dedicated Smart Accounts team at MetaMask, Ryan leads it.
- Delegatable → **audited Delegation Framework**, integrated into the wallet, then **100% open-source**. Described as a major open-source contribution that « everyone is sleeping on ».

### 4. Technical deep dive: object capabilities & caveat enforcers
- **Object capabilities** (CS concept ~1970): the « signed postcard » metaphor that passes along a permission, re-signable from one hand to the next → **chain of trust / chain of permissions**.
- **Caveat enforcers** (Ryan): arbitrary contracts respecting an interface (`before` / `after` hooks), composable. Examples: ERC-20 transfer, timestamp expiration → « transfer 100 USDC/day for 7 days ».
- **Transitive delegation**: re-delegating while **attenuating** (100 → 20 tokens, before Sunday…).
- **Intent-based permissions** (after hooks): « 100 tokens if and only if I receive this NFT in return ».
- **Enforced simulations** (coming to the wallet): the transaction happens exactly as simulated, otherwise a full revert.

### 5. Viral growth loops (Kames)
- Granting delegations that **reward usage** (5 deposits → 5 free deposits).
- **Onboarding friends**: delegating a bounded deposit right (a single atom/triple), provable on-chain, that also rewards the referrer.
- A nod to the **Red Balloon Challenge** (ECC Brussels): 10 balloons impossible to collect alone → cooperation forced through sharing delegations.
- « I sense a partnership opportunity » → an idea to be formalized.

### 6. Mission 13 introduced: community registry of caveat enforcers
- An idea born out of a discussion between Zet × MetaMask at ECC.
- MetaMask currently maintains a « bare bones » list of caveat enforcers; but **who maintains the list of recommended / auditable / reliable enforcers depending on context?**
- The answer: **Intuition** and its ability to let the community **self-organize** (curation, community lists, **ontology**).

> End of part 1 (cut off by the technical incident in the middle of a point about composability, around mission 10).

---

## Part 2: Governance, agents & missions

### 7. Resuming
- Horus picks back up after the crash: « the show goes on ».

### 8. Liquid democracy (Zet): missions 10 & 11
- Observation: many DAOs remain in **plutocracy** (token-weighted voting).
- **Liquid democracy** = blending direct democracy (voting yourself) and delegative democracy (electing a voter), with **delegation chains** (I delegate, my delegate re-delegates…).
- The Delegation Framework's strength: governance contracts stay **simple**, all the sub-delegation complexity lives in the framework.
- What Intuition adds: **voting contextualized by competence/expertise**. E.g.: I delegate everything design-related to Saulo; Saulo re-delegates 3D to a better expert.
- Delegation **revocable by reputation**: delegating to someone who has a sufficiently staked/trusted atom; if trust is withdrawn on-chain, that person can no longer vote on my behalf.

### 9. Fluid reputation-based delegations (Billy)
- Moving from **literal** delegations (« Kames can use 100 USDC in this specific contract ») to **generalized** delegations: « can interact with anything that has a reputation score > 90 ».
- Intuition = « a reputation graph about everything ».
- Unlocks **AI agents** acting over broad scopes, in trust, without hand-compiling the list of authorized contracts.

### 10. Actor sets & attestations (Billy)
- « Authorize any member of the MetaMask team to vote on my behalf » → where do these addresses live? A centralized aggregator **or** a decentralized state of attestations + trust anchors.
- The expression of the permission then relies on **on-chain state**: sets of actors × sets of actions.

### 11. Consumer use case (Horus): ticketing & agents
- Highly sought-after concert / auction / sports tickets, sniping and resale.
- With agents + **X402**: delegate $100 to 3 competing agents to land a seat; you never pay more than what you delegate; no server or sniping service to stand up.
- Ryan: the goal = **flipping the wallet's logic**. Today the dApp builds the transaction and the wallet parses/hopes. Tomorrow: the app/agent **asks**, the user **expresses** precisely, and grants a strictly bounded capability.

### 12. AI agents & real-world finance
- Permissioning an agent: « you can spend $50 at this vendor, at this X402 address, it expires ».
- Analogy: the user becomes « like Anthropic » setting the safety guardrails around the model.

### 13. Tour of the missions (complexity gradient)
- Missions **9 to 13** open, with a difficulty gradient.
- Easy entry points: **9** (delegation tutorial) and **12** (extending the Intuition skill).
- **13** (caveat enforcers registry), **10/11** (liquid democracy POC → prod, sequenced).
- Zet's advice: **re-listen to the Space**; the selected candidates will be « those who understand the vision ».

### 14. Closing
- Announcement of the Discord session the following day (Zet & Saulo, ~2 h).
- MetaMask roadmap: **7715**, **7710**, **X402**, agent wallet, CLI.
- Billy: « the start of a boom of things built at the Intuition × Delegation Framework intersection ». Teasing X402 for what's next.
- Reminders: apply to the 5 missions, follow the accounts, join the Discord.
