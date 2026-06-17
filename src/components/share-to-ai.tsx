"use client";

import { conferenceToBrief, conferenceToMarkdown } from "@/lib/conference-markdown";
import { dictionary as dict } from "@/lib/dictionaries";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ClaudeIcon, MarkdownIcon, OpenAIIcon, PerplexityIcon } from "./brand-icons";
import { useConference } from "./conference-provider";

const CHATGPT = "https://chatgpt.com/?q=";
const CLAUDE = "https://claude.ai/new?q=";
const PERPLEXITY = "https://www.perplexity.ai/search?q=";

// Beyond this size, the `?q=` URL gets rejected with a 414 by ChatGPT /
// Perplexity. The brief stays well below it; this cap is only a
// safeguard for an abnormally large conference.
const MAX_QUERY_CHARS = 4000;

/** "Ask AI" button: copies the conference as full Markdown, or opens it in
 * an AI with a condensed summary (to avoid exceeding the URL limit). */
export function ShareToAI() {
  const conference = useConference();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const markdown = () => conferenceToMarkdown(conference);
  const prompt = () => {
    const raw = `Here is a recap of the "${conference.meta.title}" conference (Intuition ecosystem). Summarize the key points and help me discuss it. Open the source link or paste the full Markdown for the complete transcript.\n\n${conferenceToBrief(conference)}`;
    return raw.length > MAX_QUERY_CHARS ? `${raw.slice(0, MAX_QUERY_CHARS)}\n…(truncated)` : raw;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markdown());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable (non-secure context): silently ignore
    }
    setOpen(false);
  };

  const openIn = (base: string) => {
    window.open(`${base}${encodeURIComponent(prompt())}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title={dict.ai.hint}
        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
      >
        <Sparkles className="size-3.5 text-caramel-300" />
        <span>{dict.ai.button}</span>
        <ChevronDown
          className={`size-3.5 opacity-50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#181410] p-1 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8)]"
        >
          <MenuItem
            onClick={copy}
            icon={
              copied ? (
                <Check className="size-4 text-emerald-400" />
              ) : (
                <MarkdownIcon className="size-4" />
              )
            }
          >
            {copied ? dict.ai.copied : dict.ai.copyMarkdown}
          </MenuItem>
          <MenuItem onClick={() => openIn(CHATGPT)} icon={<OpenAIIcon className="size-4" />}>
            {dict.ai.chatgpt}
          </MenuItem>
          <MenuItem onClick={() => openIn(CLAUDE)} icon={<ClaudeIcon className="size-4" />}>
            {dict.ai.claude}
          </MenuItem>
          <MenuItem onClick={() => openIn(PERPLEXITY)} icon={<PerplexityIcon className="size-4" />}>
            {dict.ai.perplexity}
          </MenuItem>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  onClick,
  icon,
  children,
}: {
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
    >
      <span className="shrink-0 text-white/50">{icon}</span>
      {children}
    </button>
  );
}
