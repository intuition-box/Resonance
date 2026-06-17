"use client";

import { getConferences } from "@/data/conferences/index";
import type { Conference } from "@/data/types";
import { dictionary as dict } from "@/lib/dictionaries";
import { Card, Chip } from "@heroui/react";
import {
  ArrowDownAZ,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mic,
  Plus,
  Radio,
  Search,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 10;

type SortMode = "date" | "title";

export function Hub() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortMode>("date");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const conferences = getConferences();

  // Unique tags across all conferences, most frequent first.
  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of conferences)
      for (const t of c.meta.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
  }, [conferences]);

  const toggleTag = (tag: string) =>
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = conferences;
    if (needle) {
      list = list.filter((c) => {
        const hay = [c.meta.title, c.meta.subtitle ?? "", c.meta.oneLiner, ...c.meta.tags]
          .join(" ")
          .toLowerCase();
        return hay.includes(needle);
      });
    }
    // OR semantics: a conference matches if it carries any of the active tags.
    if (activeTags.length) {
      list = list.filter((c) => c.meta.tags.some((t) => activeTags.includes(t)));
    }
    // `conferences` is already date-desc; only re-sort for the alphabetical mode.
    return sort === "title"
      ? [...list].sort((a, b) => a.meta.title.localeCompare(b.meta.title, "en"))
      : list;
  }, [q, conferences, activeTags, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const tagKey = activeTags.join("|");
  // Any change to the query, tags or sort resets to page 1 (and clamps the page).
  // biome-ignore lint/correctness/useExhaustiveDependencies: resync on the active filters
  useEffect(() => setPage(1), [q, tagKey, sort]);
  const current = Math.min(page, pageCount);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <Chip color="accent" variant="soft" size="sm">
          <Radio className="size-3" />
          <Chip.Label>{dict.hub.eyebrow}</Chip.Label>
        </Chip>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {dict.hub.heroTitle}
        </h1>
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
          href="/contribute"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-caramel-500/15 px-4 py-2 text-sm font-medium text-caramel-200 transition-colors hover:bg-caramel-500/25"
        >
          <Plus className="size-4" />
          {dict.hub.add}
        </Link>
      </section>

      {allTags.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-white/35">
              {dict.hub.sortLabel}
            </span>
            <div className="flex items-center gap-0.5 rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
              <SortButton
                active={sort === "date"}
                onClick={() => setSort("date")}
                icon={Clock}
                label={dict.hub.sortRecent}
              />
              <SortButton
                active={sort === "title"}
                onClick={() => setSort("title")}
                icon={ArrowDownAZ}
                label={dict.hub.sortAZ}
              />
            </div>
            {activeTags.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTags([])}
                className="ml-auto text-xs text-white/50 transition-colors hover:text-white/80"
              >
                {dict.hub.clearTags}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((t) => {
              const active = activeTags.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleTag(t)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    active
                      ? "border-caramel-500/40 bg-caramel-500/15 text-caramel-200"
                      : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:text-white/80"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {filtered.length === 0 ? (
        <EmptyState hasAny={conferences.length > 0} />
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2">
            {pageItems.map((c) => (
              <ConferenceCard key={c.slug} conference={c} />
            ))}
          </section>
          {pageCount > 1 && <Pagination current={current} pageCount={pageCount} onPage={setPage} />}
        </>
      )}
    </div>
  );
}

function SortButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
        active ? "bg-caramel-500/15 text-caramel-200" : "text-white/55 hover:text-white/80"
      }`}
    >
      <Icon className="size-3.5" />
      {label}
    </button>
  );
}

function Pagination({
  current,
  pageCount,
  onPage,
}: {
  current: number;
  pageCount: number;
  onPage: (page: number) => void;
}) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const btn =
    "flex size-9 items-center justify-center rounded-lg border text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40";
  const idle =
    "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:text-white";
  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        className={`${btn} ${idle}`}
        onClick={() => onPage(current - 1)}
        disabled={current === 1}
        aria-label={dict.hub.prevPage}
      >
        <ChevronLeft className="size-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          aria-label={dict.hub.goToPage(p)}
          aria-current={p === current ? "page" : undefined}
          onClick={() => onPage(p)}
          className={`${btn} ${
            p === current
              ? "border-caramel-500/40 bg-caramel-500/15 font-medium text-caramel-200"
              : idle
          }`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className={`${btn} ${idle}`}
        onClick={() => onPage(current + 1)}
        disabled={current === pageCount}
        aria-label={dict.hub.nextPage}
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}

function ConferenceCard({ conference }: { conference: Conference }) {
  const { meta } = conference;
  const onStage = conference.speakers.filter((s) => s.stage).length;
  // Thumbnail = static cover if provided, otherwise the OG card generated on the fly.
  const coverSrc = conference.cover ?? `/api/og/${conference.slug}`;
  return (
    <Link href={`/c/${conference.slug}`} className="group">
      <Card
        variant="default"
        className="h-full overflow-hidden border border-transparent transition-colors group-hover:border-caramel-500/30"
      >
        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg ring-1 ring-white/10">
          <Image
            src={coverSrc}
            alt=""
            fill
            sizes="(min-width: 640px) 512px, 100vw"
            className="object-cover"
          />
        </div>
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
          <Card.Description className="mt-2 line-clamp-3">{meta.oneLiner}</Card.Description>
        </Card.Header>
        <Card.Content className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {meta.tags.map((t) => (
              <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-white/55">
                {t}
              </span>
            ))}
          </div>
        </Card.Content>
        <Card.Footer className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/45">
          <span className="flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {meta.date}
          </span>
          <span className="flex items-center gap-1">
            <Mic className="size-3.5" />
            {onStage} {dict.hub.onStage}
          </span>
          {conference.bounties && (
            <span className="flex items-center gap-1 text-caramel-300/80">
              <Trophy className="size-3.5" />
              {conference.bounties.total}
            </span>
          )}
        </Card.Footer>
      </Card>
    </Link>
  );
}

function EmptyState({ hasAny }: { hasAny: boolean }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
      <p className="text-white/50">{hasAny ? dict.hub.emptySearch : dict.hub.emptyNone}</p>
      {!hasAny && (
        <Link
          href="/contribute"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-caramel-500/15 px-4 py-2 text-sm font-medium text-caramel-200 hover:bg-caramel-500/25"
        >
          <Plus className="size-4" />
          {dict.hub.addFirst}
        </Link>
      )}
    </div>
  );
}
