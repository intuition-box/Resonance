"use client";

import { ConferenceChrome } from "@/components/conference-chrome";
import { ConferenceProvider } from "@/components/conference-provider";
import { NotFound } from "@/components/views/NotFound";
import { getConference } from "@/data/conferences/index";
import { dictionary as dict } from "@/lib/dictionaries";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";

/** Client shell for the conference route: resolves the slug, handles the 404,
 * provides the conference context and the sub-navigation. */
export function ConferenceShell({ children }: { children: ReactNode }) {
  const params = useParams();
  const slug = String(params.slug ?? "");
  const conference = getConference(slug);

  if (!conference) {
    return <NotFound title={dict.notFound.confTitle} message={dict.notFound.confMessage(slug)} />;
  }

  return (
    <ConferenceProvider conference={conference}>
      <ConferenceChrome />
      {children}
    </ConferenceProvider>
  );
}
