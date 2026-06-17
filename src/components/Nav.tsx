"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "./i18n-provider";
import { LangSwitch } from "./lang-switch";

export function Nav() {
  const { lang, dict } = useI18n();
  const pathname = usePathname() || "";
  const addActive = pathname === `/${lang}/ajouter`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#13100c]/80 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2.5"
          aria-label="Resonance — Intuition conference hub"
        >
          <img src="/brand/intuition-wordmark.svg" alt="Intuition" className="h-5 w-auto" />
          <span className="hidden h-4 w-px bg-white/15 sm:block" />
          <span className="hidden text-sm font-medium text-white/55 sm:inline">
            {dict.nav.brandSuffix}
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <Link
            href={`/${lang}/ajouter`}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
              addActive
                ? "bg-caramel-500/15 text-caramel-200"
                : "text-white/60 hover:bg-white/5 hover:text-white/90"
            }`}
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">{dict.nav.add}</span>
            <span className="sm:hidden">{dict.nav.addShort}</span>
          </Link>
          <LangSwitch />
        </div>
      </nav>
    </header>
  );
}
