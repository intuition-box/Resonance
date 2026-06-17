import assert from "node:assert/strict";
import { test } from "node:test";
import { validateConferences } from "../../src/data/conferences/validate";
import type { Conference } from "../../src/data/types";

// Minimal valid conference, cloned per case.
function makeValid(): Conference {
  return {
    slug: "demo-space",
    meta: {
      title: "Demo Space",
      platform: "X/Twitter audio Space",
      date: "June 1, 2026",
      durationLabel: "~10 min",
      oneLiner: "A one-line recap.",
      tags: ["Web3"],
    },
    orgs: [{ id: "o1", name: "Org One", tag: "Tag", color: "sky", description: "An org." }],
    speakers: [
      {
        id: "s1",
        name: "Speaker One",
        org: "o1",
        role: "Role",
        bio: "Bio",
        highlights: [],
        stage: true,
      },
    ],
    themes: [
      { part: 1, order: 1, title: "Block", speakers: ["s1"], summary: "Summary", points: [] },
    ],
  };
}

const clone = (c: Conference): Conference => structuredClone(c);

test("valid conference yields no errors", () => {
  assert.deepEqual(validateConferences([makeValid()]), []);
});

test("non-parseable date is rejected", () => {
  const c = clone(makeValid());
  c.meta.date = "not a date";
  const errors = validateConferences([c]);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /not parseable/);
});

test("non-kebab slug is rejected", () => {
  const c = clone(makeValid());
  c.slug = "Demo Space";
  assert.ok(validateConferences([c]).some((e) => /kebab-case/.test(e)));
});

test("duplicate slugs are detected", () => {
  assert.ok(validateConferences([makeValid(), makeValid()]).some((e) => /duplicate slug/.test(e)));
});

test("speaker referencing an unknown org is rejected", () => {
  const c = clone(makeValid());
  c.speakers[0].org = "ghost";
  assert.ok(validateConferences([c]).some((e) => /unknown org/.test(e)));
});

test("theme referencing an unknown speaker is rejected", () => {
  const c = clone(makeValid());
  c.themes[0].speakers = ["ghost"];
  assert.ok(validateConferences([c]).some((e) => /unknown speaker/.test(e)));
});

test("invalid org color is rejected", () => {
  const c = clone(makeValid());
  (c.orgs[0] as { color: string }).color = "turquoise";
  assert.ok(validateConferences([c]).some((e) => /invalid color/.test(e)));
});

test("invalid mission complexity is rejected", () => {
  const c = clone(makeValid());
  c.missions = [
    {
      id: 1,
      title: "M",
      theme: "T",
      complexity: "expert" as never,
      summary: "s",
      details: [],
    },
  ];
  assert.ok(validateConferences([c]).some((e) => /invalid complexity/.test(e)));
});

test("missing assets are reported when an existence check is provided", () => {
  const c = clone(makeValid());
  c.cover = "/media/conferences/demo-space/cover.jpg";
  c.speakers[0].avatar = "/media/speakers/s1.jpg";
  const errors = validateConferences([c], () => false);
  assert.ok(errors.some((e) => /cover not found/.test(e)));
  assert.ok(errors.some((e) => /avatar not found/.test(e)));
});

test("empty tags are rejected", () => {
  const c = clone(makeValid());
  c.meta.tags = [];
  assert.ok(validateConferences([c]).some((e) => /at least one tag/.test(e)));
});
