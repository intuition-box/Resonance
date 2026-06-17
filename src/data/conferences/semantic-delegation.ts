import type { Conference } from "../types";

export const semanticDelegation: Conference = {
  slug: "semantic-delegation",
  meta: {
    title: "Semantic Delegation",
    subtitle: "Intuition × MetaMask",
    platform: { en: "X/Twitter audio Space", fr: "Space audio X/Twitter" },
    date: { en: "June 15, 2026", fr: "15 juin 2026" },
    durationLabel: { en: "~67 min (33:41 + 33:11)", fr: "~67 min (33’41 + 33’11)" },
    host: "Matt",
    oneLiner: {
      en: "Three organizations — Intuition (on-chain reputation knowledge graph), its developer sub-DAO Intuition Box, and the MetaMask/Consensys Delegation Framework team — present “Semantic Delegation” and launch 5 bounty missions.",
      fr: "Trois organisations — Intuition (knowledge graph de réputation on-chain), son sub-DAO développeur Intuition Box, et l'équipe Delegation Framework de MetaMask/Consensys — présentent la « Semantic Delegation » et lancent 5 missions à bounties.",
    },
    idea: {
      en: "Instead of delegating a literal permission (“this address may call this function”), you delegate a semantic, dynamic permission (“any entity with a reputation > 90 in this context may act on my behalf”) — including AI agents acting safely and within bounds.",
      fr: "Plutôt que de déléguer une permission littérale (« cette adresse peut appeler cette fonction »), on délègue une permission sémantique et dynamique (« toute entité avec une réputation > 90 dans tel contexte peut agir en mon nom ») — y compris pour des agents IA agissant de façon sûre et bornée.",
    },
    note: {
      en: "Part 1 was cut short by a technical issue; part 2 is the resumption.",
      fr: "La partie 1 a été coupée par un incident technique ; la partie 2 est la reprise.",
    },
    tags: [
      { en: "Web3", fr: "Web3" },
      { en: "Delegation", fr: "Délégation" },
      { en: "Governance", fr: "Gouvernance" },
      { en: "AI agents", fr: "Agents IA" },
    ],
    sourceNote: {
      en: "Local transcription (faster-whisper GPU) of the 2 audio replays, then reconstructed and synthesized.",
      fr: "Transcription locale (faster-whisper GPU) des 2 replays audio, puis reconstituée et synthétisée.",
    },
  },
  bounties: {
    total: { en: "$7,500", fr: "7 500 $" },
    range: { en: "Missions 9 to 13", fr: "Missions 9 à 13" },
    applyUrl: "[intuition].box/missions",
    sessionNote: {
      en: "Discord session the next day · Zett & Saulo (~2 h)",
      fr: "Session Discord le lendemain · Zett & Saulo (~2 h)",
    },
  },
  partLabels: [
    { part: 1, label: { en: "Foundations & origin", fr: "Fondations & origine" } },
    {
      part: 2,
      label: { en: "Governance, agents & missions", fr: "Gouvernance, agents & missions" },
      note: {
        en: "Resumption after the technical issue that cut off part 1.",
        fr: "Reprise après l'incident technique qui a coupé la partie 1.",
      },
    },
  ],
  orgs: [
    {
      id: "intuition",
      name: "Intuition",
      tag: { en: "Knowledge graph", fr: "Knowledge graph" },
      color: "sky",
      logo: "/brand/intuition-mark.svg",
      description: {
        en: "Host protocol. On-chain reputation knowledge graph (atoms, triples, trust). Provides the semantic “who/what is trustworthy” layer.",
        fr: "Protocole hôte. Knowledge graph de réputation on-chain (atoms, triples, trust). Fournit la couche sémantique « qui/quoi est digne de confiance ».",
      },
    },
    {
      id: "box",
      name: "Intuition Box",
      tag: { en: "Developer sub-DAO", fr: "Sub-DAO dev" },
      color: "violet",
      logo: "/brand/intuition-mark.svg",
      description: {
        en: "Intuition's official developer sub-DAO. Author of the 5 missions and host of the follow-up Discord session.",
        fr: "Sub-DAO développeur officiel d'Intuition. Auteur des 5 missions présentées et hôte de la session Discord de suivi.",
      },
    },
    {
      id: "metamask",
      name: "MetaMask / Consensys",
      tag: { en: "Delegation Framework", fr: "Delegation Framework" },
      color: "caramel",
      logo: "/brand/metamask-fox.svg",
      description: {
        en: "Delegation Framework / Smart Accounts team. Brings the programmable permissions (caveat enforcers, transitive delegation).",
        fr: "Équipe Delegation Framework / Smart Accounts. Apporte les permissions programmables (caveat enforcers, délégation transitive).",
      },
    },
  ],
  speakers: [
    {
      id: "matt",
      name: "Matt",
      org: "box",
      role: { en: "Emcee (host)", fr: "Emcee (animateur)" },
      bio: {
        en: "Hosts the whole Space and carries the thread. Calls himself the “least technical” of the panel — relay and pedagogy role.",
        fr: "Anime tout le Space et en assure le fil conducteur. Se présente comme « le moins technique » du panel — rôle de relance et de pédagogie.",
      },
      highlights: [
        {
          en: "Drives the flow, the prompts and the timing",
          fr: "Gère le déroulé, les relances et le temps",
        },
        {
          en: "Introduces the consumer use cases (ticketing, agents)",
          fr: "Introduit les cas d'usage grand public (billetterie, agents)",
        },
        { en: "Leads the tour of the 5 missions", fr: "Pilote le tour des 5 missions" },
      ],
      stage: true,
    },
    {
      id: "billy",
      name: "Billy Lidke",
      org: "intuition",
      role: { en: "CEO & founder of Intuition", fr: "CEO & fondateur d'Intuition" },
      bio: {
        en: "Founder and CEO of Intuition. Led the early DevRel efforts at ConsenSys, very early in Ethereum's history.",
        fr: "Fondateur et CEO d'Intuition. A mené les premiers efforts DevRel chez ConsenSys, très tôt dans l'histoire d'Ethereum.",
      },
      highlights: [
        {
          en: "Met Jordan via a panel at ECC Brussels (full circle)",
          fr: "A connu Jordan via un panel à l'ECC Brussels (la boucle est bouclée)",
        },
        {
          en: "Carries the vision of fluid, reputation-based delegations",
          fr: "Porte la vision des délégations fluides fondées sur la réputation",
        },
        {
          en: "Preparing a consumer app launch (buttery-smooth onboarding)",
          fr: "Prépare le lancement d'une app grand public (onboarding « buttery smooth »)",
        },
      ],
      stage: true,
    },
    {
      id: "kames",
      name: "Kames",
      org: "intuition",
      role: { en: "Lead smart contracts & engineering", fr: "Lead smart contracts & engineering" },
      bio: {
        en: "Leads the smart contracts / engineering side at Intuition. Historical co-creator of the Delegation Framework with Ryan, even before MetaMask.",
        fr: "Dirige le côté smart contracts / ingénierie chez Intuition. Co-créateur historique du Delegation Framework avec Ryan, avant même MetaMask.",
      },
      highlights: [
        {
          en: "Introduced the open-source Delegatable project to Ryan",
          fr: "A fait découvrir le projet open-source Delegatable à Ryan",
        },
        {
          en: "“The man at the intersection of both worlds”",
          fr: "« L'homme à l'intersection des deux mondes »",
        },
        {
          en: "Pushes viral growth loops (onboarding, invite links)",
          fr: "Pousse les boucles de croissance virales (onboarding, invite links)",
        },
      ],
      aliases: ["Games", "Cainz", "Keynes"],
      stage: true,
    },
    {
      id: "zett",
      name: "Zett",
      org: "box",
      role: { en: "Lead author of the missions", fr: "Auteur principal des missions" },
      bio: {
        en: "Member of Intuition Box. CS background, web3 for several years, passionate about decentralized governance.",
        fr: "Membre d'Intuition Box. Background informatique, web3 depuis plusieurs années, passionné de gouvernance décentralisée.",
      },
      highlights: [
        { en: "Lead author of the 5 missions", fr: "Auteur principal des 5 missions" },
        {
          en: "Carries liquid democracy (missions 10 & 11) and the caveat enforcer registry (13)",
          fr: "Porte la liquid democracy (missions 10 & 11) et le registre de caveat enforcers (13)",
        },
        {
          en: "Co-hosts the follow-up Discord session",
          fr: "Co-anime la session Discord de suivi",
        },
      ],
      aliases: ["Zet", "Zep"],
      stage: true,
    },
    {
      id: "saulo",
      name: "Saulo",
      org: "box",
      role: { en: "Education & evaluation", fr: "Éducation & évaluation" },
      bio: {
        en: "Member of Intuition Box, Zett's partner. Introduced as a “phenomenal educational resource” and one of the application reviewers.",
        fr: "Membre d'Intuition Box, binôme de Zett. Présenté comme « ressource éducative phénoménale » et l'un des évaluateurs des candidatures.",
      },
      highlights: [
        {
          en: "Co-hosts the follow-up Discord session (~2 h)",
          fr: "Co-anime la session Discord de suivi (~2 h)",
        },
        {
          en: "Used as an example in the liquid democracy demo (contextualized delegation)",
          fr: "Sert d'exemple dans la démo de liquid democracy (délégation contextualisée)",
        },
      ],
      aliases: ["Salo", "Saolo"],
      stage: true,
    },
    {
      id: "ryan",
      name: "Ryan McPeck",
      org: "metamask",
      role: { en: "Lead Smart Accounts @ MetaMask", fr: "Lead Smart Accounts @ MetaMask" },
      handle: "@McOso",
      bio: {
        en: "Leads Smart Accounts at MetaMask. Co-creator of the Delegation Framework, which he productized from the open-source Delegatable project.",
        fr: "Dirige les Smart Accounts chez MetaMask. Co-créateur du Delegation Framework, qu'il a productisé depuis le projet open-source Delegatable.",
      },
      highlights: [
        {
          en: "Origin story: 2020 → ETHDenver 2023 → Dan Finlay",
          fr: "Origin story : 2020 → ETHDenver 2023 → Dan Finlay",
        },
        {
          en: "Brought the framework into the wallet then 100% open-sourced it",
          fr: "A intégré le framework au wallet puis l'a 100 % open-sourcé",
        },
        {
          en: "Roadmap: EIP-7715, EIP-7710, X402, agent wallet, CLI",
          fr: "Roadmap : EIP-7715, EIP-7710, X402, agent wallet, CLI",
        },
      ],
      aliases: ["Makoso", "Mocoso", "Micoso"],
      stage: true,
    },
    {
      id: "jordan",
      name: "Jordan Andrews",
      org: "metamask",
      role: {
        en: "Ecosystem manager @ Consensys / MetaMask",
        fr: "Ecosystem manager @ Consensys / MetaMask",
      },
      handle: "@Jordi",
      bio: {
        en: "Ecosystem manager for the Delegation Framework and the Smart Accounts Kit. Partnerships and go-to-market.",
        fr: "Ecosystem manager pour le Delegation Framework et le Smart Accounts Kit. Partenariats et go-to-market.",
      },
      highlights: [
        {
          en: "Moderated the ECC Brussels panel where he met Billy",
          fr: "A modéré le panel ECC Brussels où il a rencontré Billy",
        },
        {
          en: "Frames the stakes: trust + permissions = a safer way to enable automation",
          fr: "Cadre l'enjeu : trust + permissions = activation plus sûre de l'automatisation",
        },
      ],
      aliases: ["Jordy"],
      stage: true,
    },
    {
      id: "ayush",
      name: "Ayush",
      org: "metamask",
      role: { en: "MetaMask side (X402 to come)", fr: "Côté MetaMask (X402 à venir)" },
      handle: "@Ayush",
      bio: {
        en: "Joins the Space late (audience then stage). Tipped for the upcoming X402 discussions.",
        fr: "Arrive tard dans le Space (audience puis scène). Pressenti pour les futures discussions autour de X402.",
      },
      highlights: [
        {
          en: "Teased for the next topic: X402 (payments for agents)",
          fr: "Teasé pour le prochain sujet : X402 (paiements pour agents)",
        },
      ],
      stage: false,
    },
    {
      id: "jp",
      name: "JP / GP",
      org: "intuition",
      role: { en: "Author of the Intuition skill", fr: "Auteur de l'Intuition skill" },
      bio: {
        en: "In the audience. Author of the “Intuition skill” (separate repo), referenced in mission 12.",
        fr: "Dans l'audience. Auteur de l'« Intuition skill » (repo séparé), référencé dans la mission 12.",
      },
      highlights: [
        {
          en: "Intuition skill repo = basis of mission 12",
          fr: "Repo Intuition skill = base de la mission 12",
        },
      ],
      stage: false,
    },
  ],
  themes: [
    {
      part: 1,
      order: 1,
      title: { en: "Opening & introductions", fr: "Ouverture & présentations" },
      speakers: ["matt", "zett", "billy", "kames", "ryan", "jordan"],
      summary: {
        en: "Matt opens, brings the speakers on stage and introduces the trio of organizations. Quick round of intros.",
        fr: "Matt ouvre, fait monter les intervenants et présente le trio d'organisations. Tour de table express.",
      },
      points: [
        {
          en: "MetaMask, Intuition (core) and Intuition Box together",
          fr: "MetaMask, Intuition (core) et Intuition Box réunis",
        },
        {
          en: "Front-end glitches inviting speakers",
          fr: "Soucis techniques front-end pour inviter les speakers",
        },
        { en: "Everyone introduces themselves in 30 s", fr: "Chacun se présente en 30 s" },
      ],
    },
    {
      part: 1,
      order: 2,
      title: {
        en: "Why delegation needs semantics",
        fr: "Pourquoi la délégation a besoin de sémantique",
      },
      speakers: ["matt", "jordan"],
      summary: {
        en: "Pivot question: why does delegated authority need semantic understanding from the knowledge graph?",
        fr: "Question-pivot : pourquoi l'autorité déléguée a-t-elle besoin d'une compréhension sémantique issue du knowledge graph ?",
      },
      points: [
        {
          en: "Delegations = letting dApps/agents act on the user's behalf",
          fr: "Délégations = laisser dApps/agents agir au nom de l'utilisateur",
        },
        {
          en: "The knowledge graph decides who and what is trustworthy",
          fr: "Le knowledge graph décide qui et quoi est digne de confiance",
        },
      ],
    },
    {
      part: 1,
      order: 3,
      title: {
        en: "Origin story of the Delegation Framework",
        fr: "Origin story du Delegation Framework",
      },
      speakers: ["ryan", "kames"],
      summary: {
        en: "From Delegatable (Dan Finlay) to an audited framework, integrated in the wallet, then fully open-sourced.",
        fr: "De Delegatable (Dan Finlay) à un framework audité, intégré au wallet, puis entièrement open-sourcé.",
      },
      points: [
        {
          en: "2020: Kames introduces Delegatable to Ryan",
          fr: "2020 : Kames fait découvrir Delegatable à Ryan",
        },
        {
          en: "ETHDenver 2023: Dan Finlay's talk → the spark",
          fr: "ETHDenver 2023 : talk de Dan Finlay → déclic",
        },
        {
          en: "Delegatable → audited Delegation Framework → 100% open-source",
          fr: "Delegatable → Delegation Framework audité → 100 % open-source",
        },
      ],
    },
    {
      part: 1,
      order: 4,
      title: {
        en: "Object capabilities & caveat enforcers",
        fr: "Object capabilities & caveat enforcers",
      },
      speakers: ["ryan"],
      summary: {
        en: "Technical deep dive: the signed-postcard metaphor, and the composable caveat enforcers.",
        fr: "Plongée technique : la métaphore de la carte postale signée, et les caveat enforcers composables.",
      },
      points: [
        {
          en: "Object capabilities (CS concept ~1970) → chain of trust",
          fr: "Object capabilities (concept CS ~1970) → chaîne de confiance",
        },
        {
          en: "Caveat enforcers = contracts with before/after hooks, composable",
          fr: "Caveat enforcers = contrats à hooks before/after, composables",
        },
        {
          en: "E.g.: “100 USDC/day for 7 days” (ERC-20 + expiration)",
          fr: "Ex. : « 100 USDC/jour pendant 7 jours » (ERC-20 + expiration)",
        },
        {
          en: "Transitive delegation with attenuation; intent-based permissions; enforced simulations",
          fr: "Délégation transitive avec atténuation ; permissions intent-based ; enforced simulations",
        },
      ],
    },
    {
      part: 1,
      order: 5,
      title: { en: "Viral growth loops", fr: "Boucles de croissance virales" },
      speakers: ["kames"],
      summary: {
        en: "Using delegations to reward usage and onboard friends, provable on-chain.",
        fr: "Utiliser les délégations pour récompenser l'usage et onboarder ses amis, prouvable on-chain.",
      },
      points: [
        {
          en: "5 deposits → 5 free deposits via caveat enforcer",
          fr: "5 dépôts → 5 dépôts gratuits via caveat enforcer",
        },
        {
          en: "Onboarding friends with a bounded deposit right + sponsor reward",
          fr: "Onboarding d'amis avec droit de dépôt borné + récompense du parrain",
        },
        {
          en: "Red Balloon Challenge (ECC Brussels): forced cooperation",
          fr: "Red Balloon Challenge (ECC Brussels) : coopération forcée",
        },
      ],
    },
    {
      part: 1,
      order: 6,
      title: {
        en: "Mission 13 introduced: caveat enforcer registry",
        fr: "Mission 13 introduite : registre de caveat enforcers",
      },
      speakers: ["zett", "kames"],
      summary: {
        en: "Who maintains the list of trustable/auditable enforcers? Intuition and community self-organization.",
        fr: "Qui maintient la liste des enforcers fiables/auditables ? Intuition et l'auto-organisation communautaire.",
      },
      points: [
        {
          en: "Idea born from a Zett × MetaMask discussion at ECC",
          fr: "Idée née d'une discussion Zett × MetaMask à l'ECC",
        },
        {
          en: "MetaMask maintains a “bare bones” list",
          fr: "MetaMask maintient une liste « bare bones »",
        },
        {
          en: "Intuition enables community curation via an ontology",
          fr: "Intuition permet la curation communautaire via une ontologie",
        },
      ],
    },
    {
      part: 2,
      order: 7,
      title: { en: "Resumption after the issue", fr: "Reprise après l'incident" },
      speakers: ["matt"],
      summary: {
        en: "The Space had crashed; Matt resumes in part 2. “The show goes on.”",
        fr: "Le Space avait planté ; Matt reprend en partie 2. « Le show continue. »",
      },
      points: [
        { en: "~3 min gap between the two parts", fr: "~3 min de coupure entre les deux parties" },
      ],
    },
    {
      part: 2,
      order: 8,
      title: {
        en: "Liquid democracy (missions 10 & 11)",
        fr: "Liquid democracy (missions 10 & 11)",
      },
      speakers: ["zett"],
      summary: {
        en: "Going beyond plutocracy: liquid governance with delegation chains and contextualized voting.",
        fr: "Dépasser la plutocratie : gouvernance liquide avec chaînes de délégation et vote contextualisé.",
      },
      points: [
        {
          en: "Direct + delegative democracy, multi-level",
          fr: "Démocratie directe + délégative, multi-niveaux",
        },
        {
          en: "Governance contracts stay simple; complexity in the framework",
          fr: "Contrats de gouvernance simples ; complexité dans le framework",
        },
        {
          en: "Voting contextualized by expertise (design → 3D re-delegated)",
          fr: "Vote contextualisé par compétence (design → 3D re-délégué)",
        },
        {
          en: "Delegation revocable by on-chain reputation",
          fr: "Délégation révocable par la réputation on-chain",
        },
      ],
    },
    {
      part: 2,
      order: 9,
      title: {
        en: "Fluid, reputation-based delegations",
        fr: "Délégations fluides fondées sur la réputation",
      },
      speakers: ["billy"],
      summary: {
        en: "Moving from literal delegations to generalized ones based on a reputation score.",
        fr: "Passer de délégations littérales à des délégations généralisées fondées sur un score de réputation.",
      },
      points: [
        {
          en: "“Interact with anything with a reputation > 90”",
          fr: "« Interagir avec tout ce qui a une réputation > 90 »",
        },
        {
          en: "Intuition = a graph of reputation about everything",
          fr: "Intuition = un graphe de réputation à propos de tout",
        },
        {
          en: "Unlocks AI agents acting over broad scopes, trustfully",
          fr: "Débloque des agents IA agissant sur de larges périmètres en confiance",
        },
      ],
    },
    {
      part: 2,
      order: 10,
      title: { en: "Sets of actors & attestations", fr: "Ensembles d'acteurs & attestations" },
      speakers: ["billy"],
      summary: {
        en: "Expressing “any MetaMask team member” via on-chain attestations and trust anchors.",
        fr: "Exprimer « tout membre de l'équipe MetaMask » via des attestations on-chain et des trust anchors.",
      },
      points: [
        {
          en: "Centralized aggregator or decentralized attestation state",
          fr: "Agrégateur centralisé ou état décentralisé d'attestations",
        },
        {
          en: "Permission = sets of actors × sets of actions",
          fr: "Permission = ensembles d'acteurs × ensembles d'actions",
        },
      ],
    },
    {
      part: 2,
      order: 11,
      title: {
        en: "Consumer use case: ticketing & agents",
        fr: "Cas d'usage grand public : billetterie & agents",
      },
      speakers: ["matt", "ryan"],
      summary: {
        en: "Delegate a bounded budget to several competing agents to land a ticket, never overpaying.",
        fr: "Déléguer un budget borné à plusieurs agents concurrents pour décrocher un billet, sans jamais sur-payer.",
      },
      points: [
        {
          en: "High-demand concert/sports, sniping and resale",
          fr: "Concert/sport très demandés, sniping et revente",
        },
        {
          en: "3 agents + X402, you never pay more than delegated",
          fr: "3 agents + X402, on ne paie jamais plus que délégué",
        },
        {
          en: "Flip the wallet logic: the app requests, the user expresses",
          fr: "Renverser la logique du wallet : l'app demande, l'utilisateur exprime",
        },
      ],
    },
    {
      part: 2,
      order: 12,
      title: { en: "AI agents & real-world finance", fr: "Agents IA & finance réelle" },
      speakers: ["ryan"],
      summary: {
        en: "Permission an agent: “spend $50 at this vendor, at this X402 address, it expires.”",
        fr: "Permissionner un agent : « 50 $ chez ce vendeur, à cette adresse X402, ça expire ».",
      },
      points: [
        {
          en: "X402 as a payment medium for agents",
          fr: "X402 comme medium de paiement pour agents",
        },
        {
          en: "Analogy: the user sets the guardrails like Anthropic around a model",
          fr: "Analogie : l'utilisateur pose les garde-fous comme Anthropic autour d'un modèle",
        },
      ],
    },
    {
      part: 2,
      order: 13,
      title: { en: "Mission tour & closing", fr: "Tour des missions & clôture" },
      speakers: ["matt", "zett", "ryan", "billy"],
      summary: {
        en: "Complexity gradient, advice to applicants, MetaMask roadmap and the next-day Discord session.",
        fr: "Gradient de complexité, conseils aux candidats, roadmap MetaMask et session Discord du lendemain.",
      },
      points: [
        { en: "Easy entry points: missions 9 & 12", fr: "Entrées faciles : missions 9 & 12" },
        {
          en: "Advice: re-listen to the Space; they select “those who get the vision”",
          fr: "Conseil : ré-écouter le Space ; on sélectionne « ceux qui comprennent la vision »",
        },
        {
          en: "Roadmap: 7715, 7710, X402, agent wallet, CLI",
          fr: "Roadmap : 7715, 7710, X402, agent wallet, CLI",
        },
        {
          en: "Discord session the next day (Zett & Saulo, ~2 h)",
          fr: "Session Discord le lendemain (Zett & Saulo, ~2 h)",
        },
      ],
    },
  ],
  missions: [
    {
      id: 9,
      title: { en: "Delegation tutorial", fr: "Delegation tutorial" },
      theme: { en: "Education / builder onboarding", fr: "Pédagogie / onboarding builders" },
      complexity: "beginner",
      recommended: true,
      summary: {
        en: "Educate the Intuition community's builders on the Delegation Framework.",
        fr: "Éduquer les builders de la communauté Intuition au Delegation Framework.",
      },
      details: [
        {
          en: "Open deliverable: a simple, accessible demo",
          fr: "Livrable ouvert : une démo simple et accessible",
        },
        {
          en: "Show what's possible at the Intuition × Delegation Framework intersection",
          fr: "Montrer ce qu'on peut faire à l'intersection Intuition × Delegation Framework",
        },
        {
          en: "Recommended entry point to get started",
          fr: "Point d'entrée recommandé pour débuter",
        },
      ],
    },
    {
      id: 10,
      title: { en: "Liquid democracy — POC", fr: "Liquid democracy — POC" },
      theme: { en: "Governance (proof of concept)", fr: "Gouvernance (preuve de concept)" },
      complexity: "intermediate",
      summary: {
        en: "Prove liquid governance is possible with the framework + Intuition.",
        fr: "Prouver qu'on peut faire de la gouvernance liquide avec le framework + Intuition.",
      },
      details: [
        {
          en: "Delegable and re-delegable voting on-chain",
          fr: "Vote délégable et re-délégable on-chain",
        },
        {
          en: "Contextualized voting (design → 3D re-delegated)",
          fr: "Vote contextualisé (design → 3D re-délégué)",
        },
        {
          en: "Not expected production-ready: it's a POC",
          fr: "Pas attendu production-ready : c'est un POC",
        },
      ],
    },
    {
      id: 11,
      title: { en: "Liquid democracy — Production", fr: "Liquid democracy — Production" },
      theme: { en: "Governance (production)", fr: "Gouvernance (mise en production)" },
      complexity: "advanced",
      summary: {
        en: "Logical follow-up to the POC: bring contextualized governance to production.",
        fr: "Suite logique du POC : amener la gouvernance contextualisée en production.",
      },
      details: [
        { en: "Sequenced after mission 10", fr: "Séquencée après la mission 10" },
        {
          en: "⚠️ The sequencing does not apply to applying — apply right now",
          fr: "⚠️ Le séquencement ne s'applique pas à la candidature — postuler dès maintenant",
        },
        {
          en: "Part of Intuition Box's progressive decentralization into a DAO",
          fr: "S'inscrit dans la décentralisation progressive d'Intuition Box en DAO",
        },
      ],
    },
    {
      id: 12,
      title: {
        en: "Extending the Intuition skill with delegation",
        fr: "Extending the Intuition skill with delegation",
      },
      theme: { en: "Agents / tooling", fr: "Agents / tooling" },
      complexity: "beginner",
      recommended: true,
      summary: {
        en: "Add delegation capability to the “Intuition skill” (JP/GP's repo).",
        fr: "Ajouter la capacité de déléguer à l'« Intuition skill » (repo de JP/GP).",
      },
      details: [
        {
          en: "Many builders already use the Intuition skill",
          fr: "Beaucoup de builders utilisent déjà l'Intuition skill",
        },
        {
          en: "Problem: giving your key to an agent dilutes your reputation",
          fr: "Problème : donner sa clé à un agent dilue sa réputation",
        },
        {
          en: "Solution: agent with its own wallet + a strictly bounded delegation",
          fr: "Solution : agent avec son wallet + délégation au périmètre strictement borné",
        },
        {
          en: "E.g.: research agent allowed only bounded automatic deposits",
          fr: "Ex. : agent de recherche autorisé à des dépôts automatiques bornés",
        },
      ],
    },
    {
      id: 13,
      title: { en: "Community caveat enforcer registry", fr: "Community caveat enforcer registry" },
      theme: { en: "Ontology / community curation", fr: "Ontologie / curation communautaire" },
      complexity: "intermediate",
      summary: {
        en: "Build a community registry of caveat enforcers + its ontology.",
        fr: "Construire un registre communautaire de caveat enforcers + l'ontologie associée.",
      },
      details: [
        {
          en: "Who decides which enforcers are trustable/auditable/fit for context?",
          fr: "Qui décide quels enforcers sont fiables/auditables/adaptés au contexte ?",
        },
        {
          en: "Intuition lets the community self-organize",
          fr: "Intuition permet à la communauté de s'auto-organiser",
        },
        {
          en: "Deliverable: an app + an ontology to discover the framework's possibilities",
          fr: "Livrable : une app + une ontologie pour découvrir les possibilités du framework",
        },
        {
          en: "Idea born from a Zett × MetaMask discussion at ECC",
          fr: "Idée née d'une discussion Zett × MetaMask à l'ECC",
        },
      ],
    },
  ],
  glossary: [
    {
      term: "Delegation Framework",
      definition: {
        en: "MetaMask's programmable permissions framework (derived from Delegatable). Productized, audited, integrated into the wallet, then fully open-sourced.",
        fr: "Framework de permissions programmables de MetaMask (dérivé de Delegatable). Productisé, audité, intégré au wallet, puis entièrement open-sourcé.",
      },
    },
    {
      term: "Object capabilities",
      definition: {
        en: "CS concept (~1970): the signed-postcard metaphor. A signed permission, re-signable from one party to the next → chain of trust.",
        fr: "Concept CS (~1970) : métaphore de la carte postale signée. Une permission signée, re-signable de proche en proche → chaîne de confiance.",
      },
    },
    {
      term: "Caveat enforcer",
      definition: {
        en: "Arbitrary contract with before/after hooks meeting a common interface. Composable to express a precise permission.",
        fr: "Contrat arbitraire à hooks before/after respectant une interface commune. Composable pour exprimer une permission précise.",
      },
    },
    {
      term: "Transitive delegation",
      definition: {
        en: "Re-delegating a received permission while attenuating it (100 tokens → 20 tokens before Sunday → …).",
        fr: "Re-déléguer une permission reçue en l'atténuant (100 tokens → 20 tokens avant dimanche → …).",
      },
    },
    {
      term: "Intent-based permission",
      definition: {
        en: "Permission conditioned on a result via an after hook: “100 tokens if and only if I receive this NFT”.",
        fr: "Permission conditionnée à un résultat via after hook : « 100 tokens si et seulement si je reçois ce NFT ».",
      },
    },
    {
      term: "Enforced simulations",
      definition: {
        en: "A transaction wrapped in a delegation happens exactly as expected, or the whole thing reverts.",
        fr: "La transaction enveloppée dans une délégation se produit exactement comme prévu, sinon revert total.",
      },
    },
    {
      term: "Knowledge graph (Intuition)",
      definition: {
        en: "Intuition's data graph (atoms, triples, markets, trust). “A graph of reputation about everything.”",
        fr: "Graphe de données d'Intuition (atoms, triples, markets, trust). « Un graphe de réputation à propos de tout. »",
      },
    },
    {
      term: "Atom / Triple",
      definition: {
        en: "Building blocks of the knowledge graph. Atom = an entity; triple = a subject-predicate-object relation. You stake on them to express trust.",
        fr: "Briques du knowledge graph. Atom = une entité ; triple = une relation sujet-prédicat-objet. On stake dessus pour exprimer la confiance.",
      },
    },
    {
      term: "Ontology",
      definition: {
        en: "The definition of a knowledge graph: which triples and structure to organize data semantically (mission 13).",
        fr: "Définition d'un knowledge graph : quels triples et quelle structure pour organiser les données sémantiquement (mission 13).",
      },
    },
    {
      term: "Semantic Delegation",
      definition: {
        en: "Combining Delegation Framework + knowledge graph: moving from literal delegations to semantic, dynamic ones based on reputation.",
        fr: "Combiner Delegation Framework + knowledge graph : passer de délégations littérales à des délégations sémantiques et dynamiques fondées sur la réputation.",
      },
    },
    {
      term: "Liquid democracy",
      definition: {
        en: "Governance mixing direct and delegated voting, with multi-level delegation chains and voting contextualized by expertise. Opposes plutocracy.",
        fr: "Gouvernance mêlant vote direct et délégué, avec chaînes de délégation multi-niveaux et vote contextualisé par compétence. S'oppose à la plutocratie.",
      },
    },
    {
      term: "Plutocracy",
      definition: {
        en: "Governance where voting power is weighted by the amount of tokens held. The limit liquid democracy overcomes.",
        fr: "Gouvernance où le pouvoir de vote est pondéré par la quantité de tokens détenus. La limite que la liquid democracy dépasse.",
      },
    },
    {
      term: "Intuition skill",
      definition: {
        en: "Repo/tool (JP/GP) packaging Intuition's context to accelerate builders and agents. Target of mission 12.",
        fr: "Repo/outil (JP/GP) packageant le contexte d'Intuition pour accélérer builders et agents. Cible de la mission 12.",
      },
    },
    {
      term: "X402",
      definition: {
        en: "Payment standard for agents (payments at the real-world intersection). A building block of the agent use cases.",
        fr: "Standard de paiement pour agents (paiements à l'intersection du monde réel). Brique des cas d'usage agents.",
      },
    },
    {
      term: "EIP-7715",
      definition: {
        en: "Advanced permissions: requesting fine-grained permissions directly from the MetaMask extension.",
        fr: "Advanced permissions : demander des permissions fine-grained directement depuis l'extension MetaMask.",
      },
    },
    {
      term: "EIP-7710",
      definition: {
        en: "Standard related to the Delegation Framework (on-chain delegation / smart accounts).",
        fr: "Standard lié au Delegation Framework (délégation on-chain / smart accounts).",
      },
    },
    {
      term: "Red Balloon Challenge",
      definition: {
        en: "Demo (ECC Brussels): 10 balloons impossible to collect alone → forced cooperation by sharing delegations.",
        fr: "Démo (ECC Brussels) : 10 ballons impossibles à collecter seul → coopération forcée via partage de délégations.",
      },
    },
    {
      term: "Delegatable",
      definition: {
        en: "Dan Finlay's open-source project, origin of the Delegation Framework (2020 → ETHDenver 2023).",
        fr: "Projet open-source de Dan Finlay, origine du Delegation Framework (2020 → ETHDenver 2023).",
      },
    },
  ],
  followAccounts: [
    "@McOso (Ryan / Makoso)",
    "@Ayush",
    "@Jordi (Jordan)",
    "@MetaMaskDev",
    "@Intuition_Box",
    "Intuition (main account)",
  ],
};
