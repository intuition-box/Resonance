"use client";

import { dictionary as dict } from "@/lib/dictionaries";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConference } from "./conference-provider";
import { ShareToAI } from "./share-to-ai";

export function ConferenceChrome() {
  const conference = useConference();
  const pathname = usePathname() || "";
  const base = `/c/${conference.slug}`;

  const tabs = [
    { href: base, label: dict.conf.overview, exact: true, show: true },
    {
      href: `${base}/speakers`,
      label: dict.conf.speakers,
      show: conference.speakers.length > 0,
    },
    { href: `${base}/themes`, label: dict.conf.themes, show: conference.themes.length > 0 },
    {
      href: `${base}/missions`,
      label: dict.conf.missions,
      show: (conference.missions?.length ?? 0) > 0,
    },
    {
      href: `${base}/glossary`,
      label: dict.conf.glossary,
      show: (conference.glossary?.length ?? 0) > 0,
    },
  ].filter((t) => t.show);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/5 pb-3">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-caramel-200"
      >
        <ArrowLeft className="size-4" />
        {dict.conf.back}
      </Link>
      <span className="text-white/20">/</span>
      <span className="text-sm font-medium text-white/80">{conference.meta.title}</span>
      <ul className="ml-auto flex flex-wrap items-center gap-1 text-sm">
        {tabs.map((t) => {
          const active = t.exact ? pathname === t.href : pathname.startsWith(t.href);
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  active
                    ? "bg-caramel-500/15 text-caramel-200"
                    : "text-white/55 hover:bg-white/5 hover:text-white/90"
                }`}
              >
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <ShareToAI />
    </div>
  );
}
