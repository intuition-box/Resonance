"use client";

import { ConferenceChrome } from "@/components/conference-chrome";
import { ConferenceProvider } from "@/components/conference-provider";
import { useI18n } from "@/components/i18n-provider";
import { NotFound } from "@/components/views/NotFound";
import { getConference } from "@/data/conferences/index";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";

export default function ConferenceLayout({ children }: { children: ReactNode }) {
  const params = useParams();
  const slug = String(params.slug ?? "");
  const conference = getConference(slug);
  const { dict } = useI18n();

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
