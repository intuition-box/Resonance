"use client";

import { locales } from "@/lib/i18n";
import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "./i18n-provider";

/** Bascule de langue : pointe vers le même chemin avec l'autre préfixe de locale. */
export function LangSwitch() {
  const { lang, dict } = useI18n();
  const pathname = usePathname() || `/${lang}`;
  const other = lang === "en" ? "fr" : "en";

  const segments = pathname.split("/");
  // segments[1] est la locale courante ; on la remplace.
  if (locales.includes(segments[1] as (typeof locales)[number])) {
    segments[1] = other;
  } else {
    segments.splice(1, 0, other);
  }
  const target = segments.join("/") || `/${other}`;

  return (
    <Link
      href={target}
      aria-label={`Switch language to ${dict.nav.switchTo}`}
      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white/90"
    >
      <Languages className="size-4" />
      <span className="uppercase">{other}</span>
    </Link>
  );
}
