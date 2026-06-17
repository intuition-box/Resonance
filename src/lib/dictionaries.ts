import type { Locale } from "./i18n";

// RÈGLE DU PROJET : toute chaîne d'UI vit ici, en `en` ET `fr`, l'anglais d'abord.
// `en` est la référence (le type Dictionary en est dérivé), `fr` doit la couvrir.

const en = {
  nav: {
    brandSuffix: "Resonance",
    add: "Contribute",
    addShort: "Contribute",
    switchTo: "Français",
  },
  hub: {
    eyebrow: "Conference hub",
    brandSuffix: "Resonance",
    tagline:
      "The recap portal for Spaces, talks and AMAs across the Intuition ecosystem: context, speakers, themes and missions — one space per event.",
    searchPlaceholder: "Search a conference, a theme…",
    add: "Contribute",
    emptySearch: "No conference matches your search.",
    emptyNone: "No conference yet.",
    addFirst: "Add the first one",
    onStage: "on stage",
    footer: "Resonance · Conference hub of the Intuition ecosystem",
  },
  conf: {
    back: "Hub",
    overview: "Overview",
    speakers: "Speakers",
    themes: "Themes",
    missions: "Missions",
    glossary: "Glossary",
  },
  home: {
    statDate: "Date",
    statDuration: "Duration",
    statSpeakers: "Speakers",
    statBounties: "Bounties",
    onStage: "on stage",
    missionsCount: "missions",
    keyIdea: "The key idea",
    cardSpeakers: "Speakers",
    cardSpeakersDesc: "Full roster: who speaks, for which organization, in which role.",
    cardThemes: "Themes & timeline",
    cardThemesDesc: "The event, block by block.",
    cardMissions: "Missions",
    cardMissionsDesc: "The open missions.",
    cardMissionsBountyDesc: (range: string, total: string) =>
      `${range} · ${total} in bounties to share.`,
    cardGlossary: "Technical glossary",
    cardGlossaryDesc: "The key concepts of the conference.",
  },
  speakers: {
    eyebrow: "Roster",
    title: "Speakers",
    description:
      "Who speaks, for which organization, in which role. Handles are inferred from mentions during the event.",
    audience: "(audience)",
    asrVariants: "ASR variants:",
    others: "Others",
  },
  themes: {
    eyebrow: "Timeline",
    title: "Themes & timeline",
    description: "The event block by block, in the real order of the conversation.",
    part: "Part",
  },
  missions: {
    eyebrowBounties: (total: string) => `${total} in bounties`,
    eyebrowPlain: "Missions",
    title: "Missions",
    descBounty: (range: string) =>
      `${range}. One individual or team selected per mission; multiple applications accepted.`,
    descPlain: "Missions opened following the event.",
    howToApply: "How to apply",
    applyAt: "Apply at",
    recommended: "Recommended start",
    complexityBeginner: "Beginner",
    complexityIntermediate: "Intermediate",
    complexityAdvanced: "Advanced",
  },
  glossary: {
    eyebrow: "Reference",
    title: "Technical glossary",
    description: "The key concepts covered during the conference.",
    searchPlaceholder: "Search a term…",
    empty: "No term matches.",
  },
  contribute: {
    eyebrow: "Open source",
    title: "Contribute a conference",
    intro:
      "Conferences are hardcoded and contributed via GitHub pull request — no account, no database. Maintainer review keeps the quality high.",
    step1: "Transcribe the audio/video and synthesize the content.",
    step2Pre: "Create ",
    step2Mid: " exporting a bilingual ",
    step2End: " object.",
    step3Pre: "Register it in ",
    step3End: ".",
    step4: "Open a pull request — a maintainer reviews and merges.",
    rulePre: "Rule: every text field is ",
    rulePost: ", English first.",
    exampleNote: "Use the existing Semantic Delegation conference as a reference.",
    colorsNote:
      "Org colors: sky, violet, caramel, emerald, rose, amber. Mission complexity: beginner, intermediate, advanced.",
    repoButton: "Open the repository",
    repoSoon: "Repository link coming soon.",
  },
  notFound: {
    title: "Page not found",
    message: "This page does not exist.",
    confTitle: "Conference not found",
    confMessage: (slug: string) => `No conference matches “${slug}”.`,
    back: "← Back to hub",
  },
};

const fr: Dictionary = {
  nav: {
    brandSuffix: "Resonance",
    add: "Contribuer",
    addShort: "Contribuer",
    switchTo: "English",
  },
  hub: {
    eyebrow: "Hub des conférences",
    brandSuffix: "Resonance",
    tagline:
      "Le portail de synthèse des Spaces, talks et AMA de l'écosystème Intuition : contexte, intervenants, thèmes et missions — un espace par événement.",
    searchPlaceholder: "Rechercher une conférence, un thème…",
    add: "Contribuer",
    emptySearch: "Aucune conférence ne correspond à la recherche.",
    emptyNone: "Aucune conférence pour l'instant.",
    addFirst: "Ajouter la première",
    onStage: "sur scène",
    footer: "Resonance · Hub des conférences de l'écosystème Intuition",
  },
  conf: {
    back: "Hub",
    overview: "Aperçu",
    speakers: "Intervenants",
    themes: "Thèmes",
    missions: "Missions",
    glossary: "Glossaire",
  },
  home: {
    statDate: "Date",
    statDuration: "Durée",
    statSpeakers: "Intervenants",
    statBounties: "Bounties",
    onStage: "sur scène",
    missionsCount: "missions",
    keyIdea: "L'idée-force",
    cardSpeakers: "Intervenants",
    cardSpeakersDesc: "Roster complet : qui parle, pour quelle organisation, avec quel rôle.",
    cardThemes: "Thèmes & chronologie",
    cardThemesDesc: "L'événement, bloc par bloc.",
    cardMissions: "Missions",
    cardMissionsDesc: "Les missions ouvertes.",
    cardMissionsBountyDesc: (range: string, total: string) =>
      `${range} · ${total} de bounties à se partager.`,
    cardGlossary: "Glossaire technique",
    cardGlossaryDesc: "Les concepts clés de la conférence.",
  },
  speakers: {
    eyebrow: "Roster",
    title: "Intervenants",
    description:
      "Qui parle, pour quelle organisation, avec quel rôle. Les handles sont déduits des mentions de l'événement.",
    audience: "(audience)",
    asrVariants: "Variantes ASR :",
    others: "Autres",
  },
  themes: {
    eyebrow: "Déroulé",
    title: "Thèmes & chronologie",
    description: "L'événement bloc par bloc, dans l'ordre réel de la conversation.",
    part: "Partie",
  },
  missions: {
    eyebrowBounties: (total: string) => `${total} de bounties`,
    eyebrowPlain: "Missions",
    title: "Les missions",
    descBounty: (range: string) =>
      `${range}. Un individu ou une équipe sélectionné par mission ; candidatures multiples acceptées.`,
    descPlain: "Les missions ouvertes à la suite de l'événement.",
    howToApply: "Comment postuler",
    applyAt: "Candidatures sur",
    recommended: "Entrée conseillée",
    complexityBeginner: "Entrée",
    complexityIntermediate: "Moyenne",
    complexityAdvanced: "Avancée",
  },
  glossary: {
    eyebrow: "Référence",
    title: "Glossaire technique",
    description: "Les concepts clés abordés pendant la conférence.",
    searchPlaceholder: "Rechercher un terme…",
    empty: "Aucun terme ne correspond.",
  },
  contribute: {
    eyebrow: "Open source",
    title: "Contribuer une conférence",
    intro:
      "Les conférences sont codées en dur et contribuées via pull request GitHub — pas de compte, pas de base de données. La review d'un mainteneur garantit la qualité.",
    step1: "Transcris l'audio/vidéo et synthétise le contenu.",
    step2Pre: "Crée ",
    step2Mid: " exportant un objet bilingue ",
    step2End: ".",
    step3Pre: "Référence-la dans ",
    step3End: ".",
    step4: "Ouvre une pull request — un mainteneur review et merge.",
    rulePre: "Règle : chaque champ texte est ",
    rulePost: ", l'anglais d'abord.",
    exampleNote: "Prends la conférence Semantic Delegation existante comme référence.",
    colorsNote:
      "Couleurs d'organisation : sky, violet, caramel, emerald, rose, amber. Complexité de mission : beginner, intermediate, advanced.",
    repoButton: "Ouvrir le dépôt",
    repoSoon: "Lien du dépôt bientôt disponible.",
  },
  notFound: {
    title: "Page introuvable",
    message: "Cette page n'existe pas.",
    confTitle: "Conférence introuvable",
    confMessage: (slug: string) => `Aucune conférence ne correspond à « ${slug} ».`,
    back: "← Retour au hub",
  },
};

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
