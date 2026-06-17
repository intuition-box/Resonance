# 05 · Technical glossary

### Delegation Framework (MetaMask)
MetaMask's **programmable permissions** framework, derived from the open-source **Delegatable** project (Dan Finlay). Productized, audited, integrated into the wallet, then fully open-sourced. It lets you delegate to a dApp or an agent the right to act on the user's behalf, in a strictly bounded way.

### Object capabilities
A computer science concept (~1970) at the foundation of the framework. The **"signed postcard"** metaphor: I sign a permission for someone ("you can withdraw $10, but only at the full moon / if the price of ETH exceeds X"). The recipient can **re-sign** that permission to a third party → **chain of trust**.

### Delegation
A signed permission object. It notably contains:
- the **delegate** (who you give the permission to),
- the **delegator** (who gives it),
- some **caveat enforcers** (the conditions).

**Gasless** signing via **EIP-712 signed typed data**.

### Caveat enforcer
An **arbitrary** contract respecting a common interface with `before` and/or `after` **hooks**. **Composable**: you combine several enforcers to express a precise permission.
- E.g.: `ERC-20 transfer enforcer` + `expiration timestamp enforcer` = "transfer 100 USDC/day for 7 days".

### Transitive delegation (re-delegation / attenuation)
The delegate can **re-delegate** a permission they received, **attenuating** it: "you can transfer 100 tokens" → re-delegated as "you can transfer 20 tokens, before Sunday" → and so on.

### Intent-based permission (after hooks)
A permission conditioned on an outcome: "100 tokens **if and only if** I receive this NFT (or a million of these tokens) in return". More guardrails, an exact expression of intent.

### Enforced simulations
An upcoming feature in the wallet: the transaction is wrapped in a delegation and **happens exactly as planned, otherwise a full revert**. It's no longer a "best effort" simulation.

### Knowledge graph (Intuition)
Intuition's massive data graph: **atoms**, **triples**, **markets**, **trust/reputation** scores. "A reputation graph about everything." It provides the semantic layer of "who/what is trustworthy".

### Atom / Triple
The building blocks of Intuition's knowledge graph. An **atom** = an entity/an item. A **triple** = a structured relationship (subject-predicate-object) between atoms. You **stake/deposit** on them to express/reinforce trust.

### Ontology
The **definition** of a knowledge graph: which types of triples and what structure to use to organize data in a **semantic** and meaningful way (cf. mission 13).

### Semantic Delegation
The subject of the Space: combining the Delegation Framework + the knowledge graph to move from **literal** delegations (specific address/function/contract) to **semantic and dynamic** delegations grounded in reputation and context ("anything with a reputation > 90 in this domain").

### Liquid democracy
Governance blending **direct** democracy (voting yourself) and **delegative** democracy (delegating your vote), with multi-level **delegation chains** and **contextualized voting** by area of expertise. It stands in opposition to **plutocracy** (token-weighted voting).

### Plutocracy
Governance where voting power is **weighted by the amount of tokens** held. Presented as the limitation that liquid democracy seeks to overcome.

### Intuition skill
A repo/tool (created by **JP/GP**) packaging Intuition's usage and design context to accelerate builders and agents. The target of **mission 12** (adding delegation to it).

### X402
A standard/medium for **agent payments** (payments at the intersection with the real world). Cited as a building block for agent use cases (ticketing, bounded spending "$50 at this vendor"). The subject of an upcoming Space.

### EIP-7715
**Advanced permissions** in the wallet: requesting **fine-grained** permissions directly from the MetaMask extension (extension today; mobile to come).

### EIP-7710
A standard related to the **Delegation Framework** (on-chain delegation / smart accounts), cited in the MetaMask roadmap.

### Smart Accounts / Smart Accounts Kit
MetaMask smart accounts (team led by Ryan McPeck); the **Smart Accounts Kit** is the focus of Jordan's go-to-market work.

### Red Balloon Challenge
A historic demo (ECC Brussels): 10 red balloons impossible to collect alone (time/location constraints) → **forced cooperation** via the sharing of delegations ("I'll lend you my balloon if I get 10% of the winnings").

### Delegatable
**Dan Finlay's open-source project** (the origin of the Delegation Framework). Kames introduced it to Ryan; the starting point of the whole story (2020 → ETHDenver 2023).
