import { existsSync } from "node:fs";
import { join } from "node:path";
import { getConferences } from "../src/data/conferences/index";
import { validateConferences } from "../src/data/conferences/validate";

// Resolves a public path (e.g. "/media/speakers/x.jpg") to a file on disk.
const assetExists = (publicPath: string) =>
  existsSync(join(process.cwd(), "public", publicPath.replace(/^\//, "")));

// Resolves a repo-relative path (e.g. "src/data/conferences/<slug>/transcript.txt").
const fileExists = (repoRelativePath: string) => existsSync(join(process.cwd(), repoRelativePath));

const conferences = getConferences();
const errors = validateConferences(conferences, assetExists, fileExists);

if (errors.length > 0) {
  console.error(`\n✖ Conference data validation failed (${errors.length} issue(s)):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error("");
  process.exit(1);
}

console.log(`✓ Conference data is valid (${conferences.length} conferences checked).`);
