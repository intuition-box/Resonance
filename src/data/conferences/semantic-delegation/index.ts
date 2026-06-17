import type { Conference } from "../../types";
import { glossary } from "./glossary";
import { bounties, cover, followAccounts, meta, partLabels, slug } from "./meta";
import { missions } from "./missions";
import { orgs } from "./orgs";
import { speakers } from "./speakers";
import { themes } from "./themes";

// Conference assembled from dedicated modules (meta, orgs, speakers, themes,
// missions, glossary). Reference template for contributions: one folder
// per conference, one file per responsibility. Identical behavior to the
// original monolithic object.
export const semanticDelegation: Conference = {
  slug,
  cover,
  meta,
  bounties,
  partLabels,
  orgs,
  speakers,
  themes,
  missions,
  glossary,
  followAccounts,
};
