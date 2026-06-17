import { defineI18n } from "fumadocs-core/i18n";
import { defaultLocale, locales } from "./i18n";

// i18n Fumadocs — aligné sur l'i18n du portail (anglais par défaut, français en plus).
export const fumadocsI18n = defineI18n({
  defaultLanguage: defaultLocale,
  languages: [...locales],
});
