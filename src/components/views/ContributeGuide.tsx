"use client";

import { REPO_URL } from "@/lib/site";
import { Card } from "@heroui/react";
import { ExternalLink, GitPullRequest } from "lucide-react";
import { useI18n } from "../i18n-provider";
import { PageHeader } from "../shared";

function Code({ children }: { children: string }) {
  return <code className="rounded bg-white/10 px-1 text-white/80">{children}</code>;
}

export function ContributeGuide() {
  const { dict } = useI18n();
  const c = dict.contribute;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.intro} />

      <Card variant="default">
        <Card.Content>
          <ol className="flex flex-col gap-4 text-sm text-white/70">
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-caramel-500/15 text-xs font-bold text-caramel-200">
                1
              </span>
              <span>{c.step1}</span>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-caramel-500/15 text-xs font-bold text-caramel-200">
                2
              </span>
              <span>
                {c.step2Pre}
                <Code>src/data/conferences/&lt;slug&gt;.ts</Code>
                {c.step2Mid}
                <Code>Conference</Code>
                {c.step2End}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-caramel-500/15 text-xs font-bold text-caramel-200">
                3
              </span>
              <span>
                {c.step3Pre}
                <Code>src/data/conferences/index.ts</Code>
                {c.step3End}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-caramel-500/15 text-xs font-bold text-caramel-200">
                4
              </span>
              <span>{c.step4}</span>
            </li>
          </ol>
        </Card.Content>
      </Card>

      <Card variant="transparent" className="border border-white/10">
        <Card.Content className="flex flex-col gap-2 text-sm text-white/60">
          <p>
            {c.rulePre}
            <Code>{"{ en, fr }"}</Code>
            {c.rulePost}
          </p>
          <p>{c.exampleNote}</p>
          <p className="text-xs text-white/40">{c.colorsNote}</p>
        </Card.Content>
      </Card>

      <div>
        {REPO_URL ? (
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-caramel-500/15 px-4 py-2.5 text-sm font-medium text-caramel-200 transition-colors hover:bg-caramel-500/25"
          >
            <GitPullRequest className="size-4" />
            {c.repoButton}
            <ExternalLink className="size-3.5 opacity-60" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/40">
            <GitPullRequest className="size-4" />
            {c.repoSoon}
          </span>
        )}
      </div>
    </div>
  );
}
