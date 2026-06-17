"use client";

import type { Speaker } from "@/data/types";
import { dictionary as dict } from "@/lib/dictionaries";
import { Card, Chip } from "@heroui/react";
import { AtSign, ExternalLink, Mic, Quote } from "lucide-react";
import Image from "next/image";
import { useConference } from "../conference-provider";
import { OrgTag, PageHeader } from "../shared";

export function Speakers() {
  const { orgs, speakers } = useConference();

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
                <span className="text-sm text-white/40">{org.tag}</span>
                {org.x && (
                  <a
                    href={org.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/30 transition-colors hover:text-caramel-200"
                    aria-label={`${org.name} on X`}
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {members.map((s) => (
                  <SpeakerCard key={s.id} speaker={s} audience={dict.speakers.audience} />
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
              <SpeakerCard key={s.id} speaker={s} audience={dict.speakers.audience} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SpeakerCard({
  speaker,
  audience,
}: {
  speaker: Speaker;
  audience: string;
}) {
  return (
    <Card variant="default" className="h-full">
      <Card.Header>
        <div className="flex items-start gap-3">
          {speaker.avatar && (
            <Image
              src={speaker.avatar}
              alt={speaker.name}
              width={88}
              height={88}
              className="size-11 shrink-0 rounded-full object-cover ring-1 ring-white/10"
            />
          )}
          <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
            <div className="min-w-0">
              <Card.Title className="flex items-center gap-2">
                {speaker.name}
                {speaker.stage ? (
                  <Mic className="size-3.5 shrink-0 text-caramel-300" />
                ) : (
                  <span className="text-xs text-white/30">{audience}</span>
                )}
              </Card.Title>
              <p className="mt-0.5 text-sm font-medium text-caramel-200/90">{speaker.role}</p>
            </div>
            {speaker.handle &&
              (speaker.x ? (
                <a
                  href={speaker.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 transition-opacity hover:opacity-80"
                  aria-label={`${speaker.name} on X`}
                >
                  <Chip size="sm" variant="soft" color="accent">
                    <AtSign className="size-3" />
                    <Chip.Label>{speaker.handle.replace("@", "")}</Chip.Label>
                  </Chip>
                </a>
              ) : (
                <Chip size="sm" variant="soft" color="accent">
                  <AtSign className="size-3" />
                  <Chip.Label>{speaker.handle.replace("@", "")}</Chip.Label>
                </Chip>
              ))}
          </div>
        </div>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-white/70">{speaker.bio}</p>
        {speaker.highlights.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {speaker.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-white/60">
                <Quote className="mt-0.5 size-3 shrink-0 text-caramel-400/60" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </Card.Content>
    </Card>
  );
}
