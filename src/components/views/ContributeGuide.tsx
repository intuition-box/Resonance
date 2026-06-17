"use client";

import { AGENT_CONFERENCE_PROMPT } from "@/lib/contribute-prompt";
import { dictionary as dict } from "@/lib/dictionaries";
import { REPO_URL } from "@/lib/site";
import { Card } from "@heroui/react";
import {
  Bot,
  Check,
  ClipboardCheck,
  Copy,
  ExternalLink,
  FileCode2,
  FileText,
  GitPullRequest,
  Plus,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { PageHeader } from "../shared";

function CopyPromptButton() {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(AGENT_CONFERENCE_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context): silently ignored.
    }
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={dict.contribute.promptButton}
      className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-caramel-500/15 px-4 py-2.5 text-sm font-medium text-caramel-200 transition-colors hover:bg-caramel-500/25"
    >
      {copied ? <ClipboardCheck className="size-4" /> : <Copy className="size-4" />}
      {copied ? dict.contribute.promptCopied : dict.contribute.promptButton}
    </button>
  );
}

function Code({ children }: { children: string }) {
  return <code className="rounded bg-white/10 px-1 text-white/80">{children}</code>;
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-wider text-white/40">{children}</h2>
  );
}

function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-caramel-500/15 text-xs font-bold text-caramel-200">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

export function ContributeGuide() {
  const c = dict.contribute;

  return (
    <div className="flex flex-col gap-10">
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.intro} />

      {/* AI shortcut: prompt ready to paste into an agent */}
      <Card variant="transparent" className="border border-caramel-500/20 bg-caramel-500/[0.04]">
        <Card.Content className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Bot className="mt-0.5 size-5 shrink-0 text-caramel-300" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-white/85">{c.promptTitle}</p>
              <p className="text-sm leading-relaxed text-white/55">{c.promptDesc}</p>
            </div>
          </div>
          <CopyPromptButton />
        </Card.Content>
      </Card>

      {/* Steps */}
      <section className="flex flex-col gap-4">
        <SectionTitle>{c.stepsTitle}</SectionTitle>
        <Card variant="default">
          <Card.Content>
            <ol className="flex flex-col gap-4 text-sm text-white/70">
              <Step n={1}>{c.step1}</Step>
              <Step n={2}>
                {c.step2Pre}
                <Code>src/data/conferences/&lt;slug&gt;/</Code>
                {c.step2Mid}
                <Code>Conference</Code>
                {c.step2End}
              </Step>
              <Step n={3}>
                {c.step3Pre}
                <Code>src/data/conferences/index.ts</Code>
                {c.step3End}
              </Step>
              <Step n={4}>{c.step4}</Step>
            </ol>
          </Card.Content>
        </Card>
      </section>

      {/* Anatomy of a conference */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <SectionTitle>{c.modelTitle}</SectionTitle>
          <p className="text-sm leading-relaxed text-white/55">{c.modelIntro}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {c.modules.map((m) => (
            <div key={m.file} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2">
                <FileCode2 className="size-4 text-caramel-300" />
                <code className="text-sm font-medium text-white/90">{m.file}</code>
              </div>
              <p className="mt-2 text-sm font-medium text-white/75">{m.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/45">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Required vs optional */}
      <section className="flex flex-col gap-4">
        <SectionTitle>{c.fieldsTitle}</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card variant="default">
            <Card.Content className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-caramel-300/90">
                {c.requiredLabel}
              </span>
              <ul className="flex flex-col gap-2 text-sm text-white/70">
                {c.required.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-caramel-300" />
                    {r}
                  </li>
                ))}
              </ul>
            </Card.Content>
          </Card>
          <Card variant="transparent" className="border border-white/10">
            <Card.Content className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/35">
                {c.optionalLabel}
              </span>
              <ul className="flex flex-col gap-2 text-sm text-white/55">
                {c.optional.map((o) => (
                  <li key={o} className="flex items-start gap-2">
                    <Plus className="mt-0.5 size-4 shrink-0 text-white/30" />
                    {o}
                  </li>
                ))}
              </ul>
            </Card.Content>
          </Card>
        </div>
        <p className="text-sm leading-relaxed text-white/50">{c.fieldsNote}</p>
      </section>

      {/* Automatically generated OG card */}
      <Card variant="transparent" className="border border-caramel-500/20 bg-caramel-500/[0.04]">
        <Card.Content className="flex items-start gap-3">
          <Sparkles className="mt-0.5 size-5 shrink-0 text-caramel-300" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-white/85">{c.ogTitle}</p>
            <p className="text-sm leading-relaxed text-white/55">{c.ogDesc}</p>
          </div>
        </Card.Content>
      </Card>

      {/* Assets & content sourcing */}
      <section className="flex flex-col gap-4">
        <SectionTitle>{c.sourcingTitle}</SectionTitle>
        <Card variant="transparent" className="border border-white/10">
          <Card.Content className="flex flex-col gap-3 text-sm leading-relaxed text-white/60">
            <p className="flex items-start gap-2.5">
              <FileText className="mt-0.5 size-4 shrink-0 text-white/40" />
              {c.transcriptionNote}
            </p>
            <p className="flex items-start gap-2.5">
              <UserRound className="mt-0.5 size-4 shrink-0 text-white/40" />
              {c.avatarsNote}
            </p>
            <p className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-caramel-300" />
              {c.validateNote}
            </p>
          </Card.Content>
        </Card>
      </section>

      {/* Rules */}
      <Card variant="transparent" className="border border-white/10">
        <Card.Content className="flex flex-col gap-2 text-sm text-white/60">
          <p>
            {c.rulePre}
            <Code>string</Code>
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
