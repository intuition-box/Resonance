"use client";

import { getConferences } from "@/data/conferences/index";
import type { Conference } from "@/data/types";
import { loc } from "@/lib/loc";
import { Card, Chip } from "@heroui/react";
import { ArrowRight, CalendarDays, Mic, Plus, Radio, Search, Trophy } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useI18n } from "../i18n-provider";

export function Hub() {
  const { lang, dict } = useI18n();
  const [q, setQ] = useState("");
  const conferences = getConferences();

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return conferences;
    return conferences.filter((c) => {
      const hay = [
        c.meta.title,
        c.meta.subtitle ?? "",
        loc(c.meta.oneLiner, lang),
        ...c.meta.tags.map((t) => loc(t, lang)),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [q, conferences, lang]);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <Chip color="accent" variant="soft" size="sm">
          <Radio className="size-3" />
          <Chip.Label>{dict.hub.eyebrow}</Chip.Label>
        </Chip>
        <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
          <img
            src="/brand/intuition-wordmark.svg"
            alt="Intuition"
            className="h-10 w-auto sm:h-12"
          />
          <span className="pb-1 text-2xl font-light text-caramel-300 sm:text-3xl">
            {dict.hub.brandSuffix}
          </span>
        </div>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{dict.hub.tagline}</p>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 focus-within:border-caramel-500/40">
          <Search className="size-4 text-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={dict.hub.searchPlaceholder}
            className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
          />
          <span className="text-xs text-white/30">
            {filtered.length}/{conferences.length}
          </span>
        </div>
        <Link
          href={`/${lang}/ajouter`}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-caramel-500/15 px-4 py-2 text-sm font-medium text-caramel-200 transition-colors hover:bg-caramel-500/25"
        >
          <Plus className="size-4" />
          {dict.hub.add}
        </Link>
      </section>

      {filtered.length === 0 ? (
        <EmptyState hasAny={conferences.length > 0} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2">
          {filtered.map((c) => (
            <ConferenceCard key={c.slug} conference={c} />
          ))}
        </section>
      )}
    </div>
  );
}

function ConferenceCard({ conference }: { conference: Conference }) {
  const { lang, dict } = useI18n();
  const { meta } = conference;
  const onStage = conference.speakers.filter((s) => s.stage).length;
  return (
    <Link href={`/${lang}/c/${conference.slug}`} className="group">
      <Card
        variant="default"
        className="h-full border border-transparent transition-colors group-hover:border-caramel-500/30"
      >
        <Card.Header>
          <div className="flex items-start justify-between gap-2">
            <div>
              <Card.Title className="text-lg">{meta.title}</Card.Title>
              {meta.subtitle && (
                <p className="mt-0.5 text-sm font-medium text-caramel-200/90">{meta.subtitle}</p>
              )}
            </div>
            <ArrowRight className="size-4 shrink-0 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-caramel-300" />
          </div>
          <Card.Description className="mt-2 line-clamp-3">
            {loc(meta.oneLiner, lang)}
          </Card.Description>
        </Card.Header>
        <Card.Content className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {meta.tags.map((t) => (
              <span key={t.en} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-white/55">
                {loc(t, lang)}
              </span>
            ))}
          </div>
        </Card.Content>
        <Card.Footer className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/45">
          <span className="flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {loc(meta.date, lang)}
          </span>
          <span className="flex items-center gap-1">
            <Mic className="size-3.5" />
            {onStage} {dict.hub.onStage}
          </span>
          {conference.bounties && (
            <span className="flex items-center gap-1 text-caramel-300/80">
              <Trophy className="size-3.5" />
              {loc(conference.bounties.total, lang)}
            </span>
          )}
        </Card.Footer>
      </Card>
    </Link>
  );
}

function EmptyState({ hasAny }: { hasAny: boolean }) {
  const { lang, dict } = useI18n();
  return (
    <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
      <p className="text-white/50">{hasAny ? dict.hub.emptySearch : dict.hub.emptyNone}</p>
      {!hasAny && (
        <Link
          href={`/${lang}/ajouter`}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-caramel-500/15 px-4 py-2 text-sm font-medium text-caramel-200 hover:bg-caramel-500/25"
        >
          <Plus className="size-4" />
          {dict.hub.addFirst}
        </Link>
      )}
    </div>
  );
}
