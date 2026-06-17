"use client";

import { dictionary as dict } from "@/lib/dictionaries";
import { Card, Chip } from "@heroui/react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  ExternalLink,
  Radio,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useConference } from "../conference-provider";
import { OrgTag } from "../shared";

export function ConferenceHome() {
  const conference = useConference();
  const { meta, orgs, speakers, missions, glossary, bounties } = conference;
  const base = `/c/${conference.slug}`;
  // Banner = static cover if provided, otherwise the OG card generated on the fly
  // (/api/og/<slug>). The automatic generation thus also serves as the UI visual.
  const coverSrc = conference.cover ?? `/api/og/${conference.slug}`;

  const stats = [
    { icon: CalendarDays, label: dict.home.statDate, value: meta.date },
    { icon: Clock, label: dict.home.statDuration, value: meta.durationLabel },
    {
      icon: Users,
      label: dict.home.statSpeakers,
      value: `${speakers.filter((s) => s.stage).length} ${dict.home.onStage}`,
    },
    ...(bounties
      ? [
          {
            icon: Target,
            label: dict.home.statBounties,
            value: `${bounties.total} · ${missions?.length ?? 0} ${dict.home.missionsCount}`,
          },
        ]
      : []),
  ];

  const navCards = [
    {
      href: `${base}/speakers`,
      title: dict.home.cardSpeakers,
      desc: dict.home.cardSpeakersDesc,
      show: speakers.length > 0,
    },
    {
      href: `${base}/themes`,
      title: dict.home.cardThemes,
      desc: dict.home.cardThemesDesc,
      show: conference.themes.length > 0,
    },
    {
      href: `${base}/missions`,
      title: dict.home.cardMissions,
      desc: bounties
        ? dict.home.cardMissionsBountyDesc(bounties.range, bounties.total)
        : dict.home.cardMissionsDesc,
      show: (missions?.length ?? 0) > 0,
    },
    {
      href: `${base}/glossary`,
      title: dict.home.cardGlossary,
      desc: dict.home.cardGlossaryDesc,
      show: (glossary?.length ?? 0) > 0,
    },
  ].filter((c) => c.show);

  return (
    <div className="flex flex-col gap-12">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
        <Image
          src={coverSrc}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />
      </div>
      <section>
        <Chip color="accent" variant="soft" size="sm">
          <Radio className="size-3" />
          <Chip.Label>{meta.platform}</Chip.Label>
        </Chip>
        {/* The banner (cover or OG card) already carries the title → visual h1 hidden, kept for a11y. */}
        <h1 className="sr-only">{meta.title}</h1>
        {meta.subtitle && (
          <p className="mt-3 text-xl font-medium text-caramel-200">{meta.subtitle}</p>
        )}
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{meta.oneLiner}</p>

        {orgs.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {orgs.map((o) => (
              <OrgTag key={o.id} name={o.name} color={o.color} logo={o.logo} />
            ))}
          </div>
        )}

        {meta.announcementUrl && (
          <a
            href={meta.announcementUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-caramel-200 transition-colors hover:text-caramel-100"
          >
            {dict.home.announcement}
            <ExternalLink className="size-3.5 opacity-60" />
          </a>
        )}
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} variant="default" className="gap-2">
            <s.icon className="size-5 text-caramel-300" />
            <div>
              <p className="text-xs uppercase tracking-wide text-white/40">{s.label}</p>
              <p className="mt-0.5 font-semibold text-white">{s.value}</p>
            </div>
          </Card>
        ))}
      </section>

      {meta.idea && (
        <section>
          <Card variant="secondary" className="border border-caramel-500/20">
            <Card.Header>
              <div className="flex items-center gap-2 text-caramel-300">
                <Sparkles className="size-5" />
                <Card.Title className="text-caramel-200">{dict.home.keyIdea}</Card.Title>
              </div>
            </Card.Header>
            <Card.Content>
              <p className="text-lg leading-relaxed text-white/85">{meta.idea}</p>
            </Card.Content>
          </Card>
        </section>
      )}

      {navCards.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-2">
          {navCards.map((c) => (
            <Link key={c.href} href={c.href} className="group">
              <Card
                variant="default"
                className="h-full border border-transparent transition-colors group-hover:border-caramel-500/30"
              >
                <Card.Header>
                  <Card.Title className="flex items-center justify-between">
                    {c.title}
                    <ArrowRight className="size-4 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-caramel-300" />
                  </Card.Title>
                  <Card.Description>{c.desc}</Card.Description>
                </Card.Header>
              </Card>
            </Link>
          ))}
        </section>
      )}

      {(meta.note || meta.sourceNote) && (
        <p className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm text-white/50">
          {[meta.note, meta.sourceNote].filter(Boolean).join(" ")}
        </p>
      )}
    </div>
  );
}
