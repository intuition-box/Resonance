"use client";

import { type Dictionary, getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { type ReactNode, createContext, useContext, useMemo } from "react";

type I18nValue = { lang: Locale; dict: Dictionary };

const I18nContext = createContext<I18nValue | null>(null);

// Reçoit seulement `lang` (sérialisable) ; le dictionnaire — qui contient des
// fonctions — est résolu CÔTÉ CLIENT, jamais passé à travers la frontière RSC.
export function I18nProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  const value = useMemo<I18nValue>(() => ({ lang, dict: getDictionary(lang) }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n doit être utilisé dans un I18nProvider");
  return ctx;
}
