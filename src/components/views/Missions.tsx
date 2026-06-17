"use client";

import type { Mission, MissionComplexity } from "@/data/types";
import { dictionary as dict } from "@/lib/dictionaries";
import { Card, Chip } from "@heroui/react";
import { CheckCircle2, ExternalLink, MessageCircle, Trophy } from "lucide-react";
import { useConference } from "../conference-provider";
import { PageHeader } from "../shared";

const complexityColor: Record<MissionComplexity, "success" | "warning" | "danger"> = {
  beginner: "success",
  intermediate: "warning",
  advanced: "danger",
};

function complexityLabel(c: MissionComplexity): string {
  if (c === "beginner") return dict.missions.complexityBeginner;
  if (c === "intermediate") return dict.missions.complexityIntermediate;
  return dict.missions.complexityAdvanced;
}

export function Missions() {
  const { missions, bounties } = useConference();
  const list = missions ?? [];

  return (
    <div>
      <PageHeader
        eyebrow={
          bounties ? dict.missions.eyebrowBounties(bounties.total) : dict.missions.eyebrowPlain
        }
        title={dict.missions.title}
        description={bounties ? dict.missions.descBounty(bounties.range) : dict.missions.descPlain}
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
                    <a
                      href={bounties.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-caramel-200 underline-offset-2 hover:underline"
                    >
                      {bounties.applyUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </p>
                )}
              </div>
            </div>
            {bounties.sessionNote &&
              (bounties.sessionUrl ? (
                <a
                  href={bounties.sessionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white/90"
                >
                  <MessageCircle className="size-4 shrink-0 text-caramel-300" />
                  {bounties.sessionNote}
                  <ExternalLink className="size-3.5 shrink-0 opacity-50" />
                </a>
              ) : (
                <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-white/70">
                  <MessageCircle className="size-4 shrink-0 text-caramel-300" />
                  {bounties.sessionNote}
                </div>
              ))}
          </Card.Content>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        {list.map((m) => (
          <MissionCard key={m.id} mission={m} />
        ))}
      </div>
    </div>
  );
}

function MissionCard({ mission }: { mission: Mission }) {
  return (
    <Card variant="default">
      <Card.Header>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-caramel-500/15 font-bold text-caramel-200">
              {mission.id}
            </span>
            <div className="min-w-0">
              <Card.Title className="text-base">{mission.title}</Card.Title>
              <p className="text-xs text-white/40">{mission.theme}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2 pl-12 sm:pl-0">
            {mission.recommended && (
              <Chip size="sm" variant="soft" color="accent">
                <Chip.Label>{dict.missions.recommended}</Chip.Label>
              </Chip>
            )}
            <Chip size="sm" variant="primary" color={complexityColor[mission.complexity]}>
              <Chip.Label>{complexityLabel(mission.complexity)}</Chip.Label>
            </Chip>
          </div>
        </div>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3">
        <p className="text-sm text-white/75">{mission.summary}</p>
        {mission.details.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {mission.details.map((d) => (
              <li key={d} className="flex gap-2 text-sm text-white/60">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-caramel-400/70" />
                {d}
              </li>
            ))}
          </ul>
        )}
      </Card.Content>
    </Card>
  );
}
