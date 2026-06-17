"use client";

import type { ThemeBlock } from "@/data/types";
import type { Locale } from "@/lib/i18n";
import { loc } from "@/lib/loc";
import { Card } from "@heroui/react";
import { useConference } from "../conference-provider";
import { useI18n } from "../i18n-provider";
import { PageHeader } from "../shared";

export function Themes() {
  const { themes, speakers, partLabels } = useConference();
  const { lang, dict } = useI18n();
  const nameOf = (id: string) => speakers.find((s) => s.id === id)?.name ?? id;

  const parts = [...new Set(themes.map((t) => t.part))].sort((a, b) => a - b);
  const labelFor = (part: number) => partLabels?.find((p) => p.part === part);
  const multiPart = parts.length > 1;

  return (
    <div>
      <PageHeader
        eyebrow={dict.themes.eyebrow}
        title={dict.themes.title}
        description={dict.themes.description}
      />

      {parts.map((part) => {
        const blocks = themes.filter((t) => t.part === part).sort((a, b) => a.order - b.order);
        const label = labelFor(part);
        return (
          <section key={part} className="mb-12">
            {multiPart && (
              <>
                <h2 className="mb-1 text-lg font-semibold text-white">
                  {dict.themes.part} {part}
                  {label && (
                    <span className="ml-2 text-sm font-normal text-white/40">
                      {loc(label.label, lang)}
                    </span>
                  )}
                </h2>
                {label?.note && (
                  <p className="mb-4 text-sm text-white/40">{loc(label.note, lang)}</p>
                )}
              </>
            )}
            <ol className="relative ml-3 mt-4 border-l border-white/10">
              {blocks.map((b) => (
                <ThemeItem key={`${b.part}-${b.order}`} block={b} lang={lang} nameOf={nameOf} />
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

function ThemeItem({
  block,
  lang,
  nameOf,
}: {
  block: ThemeBlock;
  lang: Locale;
  nameOf: (id: string) => string;
}) {
  return (
    <li className="mb-5 ml-6">
      <span className="absolute -left-[7px] mt-1.5 flex size-3.5 items-center justify-center rounded-full bg-caramel-500 ring-4 ring-[#13100c]" />
      <Card variant="default">
        <Card.Header>
          <Card.Title className="text-base">
            <span className="mr-2 text-caramel-400/70">{block.order}.</span>
            {loc(block.title, lang)}
          </Card.Title>
          <Card.Description>{loc(block.summary, lang)}</Card.Description>
        </Card.Header>
        <Card.Content className="flex flex-col gap-3">
          {block.points.length > 0 && (
            <ul className="flex flex-col gap-1.5">
              {block.points.map((p) => (
                <li key={p.en} className="flex gap-2 text-sm text-white/65">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-caramel-400/70" />
                  {loc(p, lang)}
                </li>
              ))}
            </ul>
          )}
          {block.speakers.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {block.speakers.map((id) => (
                <span key={id} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-white/50">
                  {nameOf(id)}
                </span>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>
    </li>
  );
}
