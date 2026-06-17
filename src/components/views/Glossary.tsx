"use client";

import { dictionary as dict } from "@/lib/dictionaries";
import { Card } from "@heroui/react";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useConference } from "../conference-provider";
import { PageHeader } from "../shared";

export function Glossary() {
  const { glossary = [] } = useConference();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return glossary;
    return glossary.filter(
      (e) => e.term.toLowerCase().includes(needle) || e.definition.toLowerCase().includes(needle),
    );
  }, [q, glossary]);

  return (
    <div>
      <PageHeader
        eyebrow={dict.glossary.eyebrow}
        title={dict.glossary.title}
        description={dict.glossary.description}
      />

      <div className="mb-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 focus-within:border-caramel-500/40">
        <Search className="size-4 text-white/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={dict.glossary.searchPlaceholder}
          className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
        />
        <span className="text-xs text-white/30">{filtered.length}</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((e) => (
          <Card key={e.term} variant="default">
            <Card.Header>
              <Card.Title className="text-base text-caramel-200">{e.term}</Card.Title>
            </Card.Header>
            <Card.Content>
              <p className="text-sm leading-relaxed text-white/70">{e.definition}</p>
            </Card.Content>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-white/40">{dict.glossary.empty}</p>
      )}
    </div>
  );
}
