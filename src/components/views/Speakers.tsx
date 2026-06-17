"use client";

import type { Speaker } from "@/data/types";
import type { Locale } from "@/lib/i18n";
import { loc } from "@/lib/loc";
import { Card, Chip } from "@heroui/react";
import { AtSign, Mic, Quote } from "lucide-react";
import { useConference } from "../conference-provider";
import { useI18n } from "../i18n-provider";
import { OrgTag, PageHeader } from "../shared";

export function Speakers() {
  const { orgs, speakers } = useConference();
  const { lang, dict } = useI18n();

  const groups = orgs.map((org) => ({
    org,
    members: speakers.filter((s) => s.org === org.id),
  }));
  const orphanMembers = speakers.filter((s) => !orgs.some((o) => o.id === s.org));

  return (
    <div>
      <PageHeader
        eyebrow={dict.speakers.eyebrow}
        title={dict.speakers.title}
        description={dict.speakers.description}
      />

      {groups.map(
        ({ org, members }) =>
          members.length > 0 && (
            <section key={org.id} className="mb-10">
              <div className="mb-4 flex items-center gap-3">
                <OrgTag name={org.name} color={org.color} logo={org.logo} />
                <span className="text-sm text-white/40">{loc(org.tag, lang)}</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {members.map((s) => (
                  <SpeakerCard
                    key={s.id}
                    speaker={s}
                    lang={lang}
                    audience={dict.speakers.audience}
                    asrLabel={dict.speakers.asrVariants}
                  />
                ))}
              </div>
            </section>
          ),
      )}

      {orphanMembers.length > 0 && (
        <section className="mb-10">
          <div className="mb-4 text-sm font-medium text-white/50">{dict.speakers.others}</div>
          <div className="grid gap-4 sm:grid-cols-2">
            {orphanMembers.map((s) => (
              <SpeakerCard
                key={s.id}
                speaker={s}
                lang={lang}
                audience={dict.speakers.audience}
                asrLabel={dict.speakers.asrVariants}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SpeakerCard({
  speaker,
  lang,
  audience,
  asrLabel,
}: {
  speaker: Speaker;
  lang: Locale;
  audience: string;
  asrLabel: string;
}) {
  return (
    <Card variant="default" className="h-full">
      <Card.Header>
        <div className="flex items-start justify-between gap-2">
          <div>
            <Card.Title className="flex items-center gap-2">
              {speaker.name}
              {speaker.stage ? (
                <Mic className="size-3.5 text-caramel-300" />
              ) : (
                <span className="text-xs text-white/30">{audience}</span>
              )}
            </Card.Title>
            <p className="mt-0.5 text-sm font-medium text-caramel-200/90">
              {loc(speaker.role, lang)}
            </p>
          </div>
          {speaker.handle && (
            <Chip size="sm" variant="soft" color="accent">
              <AtSign className="size-3" />
              <Chip.Label>{speaker.handle.replace("@", "")}</Chip.Label>
            </Chip>
          )}
        </div>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-white/70">{loc(speaker.bio, lang)}</p>
        {speaker.highlights.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {speaker.highlights.map((h) => (
              <li key={h.en} className="flex gap-2 text-sm text-white/60">
                <Quote className="mt-0.5 size-3 shrink-0 text-caramel-400/60" />
                {loc(h, lang)}
              </li>
            ))}
          </ul>
        )}
        {speaker.aliases && speaker.aliases.length > 0 && (
          <p className="text-xs text-white/30">
            {asrLabel} {speaker.aliases.join(", ")}
          </p>
        )}
      </Card.Content>
    </Card>
  );
}
