import assert from "node:assert/strict";
import { test } from "node:test";
import type { Conference } from "../../src/data/types";
import { conferenceToBrief, conferenceToMarkdown } from "../../src/lib/conference-markdown";

const conf: Conference = {
  slug: "demo-space",
  meta: {
    title: "Demo Space",
    subtitle: "Org One × Org Two",
    platform: "X/Twitter audio Space",
    date: "June 1, 2026",
    durationLabel: "~10 min",
    host: "Alice",
    oneLiner: "A one-line recap.",
    idea: "The key idea.",
    tags: ["Web3", "Reputation"],
  },
  orgs: [{ id: "o1", name: "Org One", tag: "Graph", color: "sky", description: "An org." }],
  speakers: [
    {
      id: "s1",
      name: "Alice",
      org: "o1",
      role: "Founder",
      handle: "@alice",
      bio: "Bio of Alice.",
      highlights: ["Made a point"],
      stage: true,
    },
  ],
  themes: [
    { part: 1, order: 2, title: "Second", speakers: ["s1"], summary: "B", points: ["p2"] },
    { part: 1, order: 1, title: "First", speakers: ["s1"], summary: "A", points: ["p1"] },
  ],
  glossary: [{ term: "Delegation", definition: "Acting on behalf." }],
};

test("brief contains the essentials and the source link", () => {
  const md = conferenceToBrief(conf);
  assert.match(md, /# Demo Space — Org One × Org Two/);
  assert.match(md, /A one-line recap\./);
  assert.match(md, /Alice \(Founder, Org One\)/); // org id resolved to name
  assert.match(md, /\/c\/demo-space/);
});

test("markdown has sectioned headings and resolves org names", () => {
  const md = conferenceToMarkdown(conf);
  assert.match(md, /^# Demo Space/m);
  assert.match(md, /## Organizations/);
  assert.match(md, /## Speakers/);
  assert.match(md, /### Alice \(@alice\)/);
  assert.match(md, /Founder · Org One/);
  assert.match(md, /## Glossary/);
});

test("timeline is ordered by part then order", () => {
  const md = conferenceToMarkdown(conf);
  assert.ok(md.indexOf("### 1. First") < md.indexOf("### 2. Second"));
});

test("optional sections are omitted when absent", () => {
  const md = conferenceToMarkdown(conf);
  assert.doesNotMatch(md, /## Bounties/); // no bounties on this fixture
  assert.doesNotMatch(md, /## Missions/); // no missions
});
