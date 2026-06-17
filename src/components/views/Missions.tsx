"use client";

import type { Mission, MissionComplexity } from "@/data/types";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { loc } from "@/lib/loc";
import { Card, Chip } from "@heroui/react";
import { CheckCircle2, MessageCircle, Trophy } from "lucide-react";
import { useConference } from "../conference-provider";
import { useI18n } from "../i18n-provider";
import { PageHeader } from "../shared";

const complexityColor: Record<MissionComplexity, "success" | "warning" | "danger"> = {
  beginner: "success",
  intermediate: "warning",
  advanced: "danger",
};

function complexityLabel(c: MissionComplexity, dict: Dictionary): string {
  if (c === "beginner") return dict.missions.complexityBeginner;
  if (c === "intermediate") return dict.missions.complexityIntermediate;
  return dict.missions.complexityAdvanced;
}

export function Missions() {
  const { missions, bounties } = useConference();
  const { lang, dict } = useI18n();
  const list = missions ?? [];

  return (
    <div>
      <PageHeader
        eyebrow={
          bounties
            ? dict.missions.eyebrowBounties(loc(bounties.total, lang))
            : dict.missions.eyebrowPlain
        }
        title={dict.missions.title}
        description={
          bounties ? dict.missions.descBounty(loc(bounties.range, lang)) : dict.missions.descPlain
        }
      />

      {bounties && (
        <Card variant="secondary" className="mb-8 border border-caramel-500/20">
          <Card.Content className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="size-6 text-caramel-300" />
              <div>
                <p className="font-semibold text-white">{dict.missions.howToApply}</p>
                {bounties.applyUrl && (
                  <p className="text-sm text-white/60">
                    {dict.missions.applyAt}{" "}
                    <span className="text-caramel-200">{bounties.applyUrl}</span>
                  </p>
                )}
              </div>
            </div>
            {bounties.sessionNote && (
              <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-white/70">
                <MessageCircle className="size-4 text-caramel-300" />
                {loc(bounties.sessionNote, lang)}
              </div>
            )}
          </Card.Content>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        {list.map((m) => (
          <MissionCard key={m.id} mission={m} lang={lang} dict={dict} />
        ))}
      </div>
    </div>
  );
}

function MissionCard({
  mission,
  lang,
  dict,
}: {
  mission: Mission;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <Card variant="default">
      <Card.Header>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-caramel-500/15 font-bold text-caramel-200">
              {mission.id}
            </span>
            <div>
              <Card.Title className="text-base">{loc(mission.title, lang)}</Card.Title>
              <p className="text-xs text-white/40">{loc(mission.theme, lang)}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {mission.recommended && (
              <Chip size="sm" variant="soft" color="accent">
                <Chip.Label>{dict.missions.recommended}</Chip.Label>
              </Chip>
            )}
            <Chip size="sm" variant="primary" color={complexityColor[mission.complexity]}>
              <Chip.Label>{complexityLabel(mission.complexity, dict)}</Chip.Label>
            </Chip>
          </div>
        </div>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3">
        <p className="text-sm text-white/75">{loc(mission.summary, lang)}</p>
        {mission.details.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {mission.details.map((d) => (
              <li key={d.en} className="flex gap-2 text-sm text-white/60">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-caramel-400/70" />
                {loc(d, lang)}
              </li>
            ))}
          </ul>
        )}
      </Card.Content>
    </Card>
  );
}
