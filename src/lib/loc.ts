import type { Locale } from "./i18n";

/**
 * Chaîne traduite. RÈGLE DU PROJET : tout texte de contenu doit fournir `en` ET
 * `fr`, l'anglais d'abord. `en` est la source de vérité ; `fr` est la traduction.
 */
export type Localized = { en: string; fr: string };

/** Résout une chaîne localisée vers la locale demandée (fallback EN). */
export function loc(value: Localized | undefined, lang: Locale): string {
  if (!value) return "";
  return value[lang] ?? value.en;
}

/** Résout une liste de chaînes localisées. */
export function locList(values: Localized[] | undefined, lang: Locale): string[] {
  if (!values) return [];
  return values.map((v) => loc(v, lang));
}
