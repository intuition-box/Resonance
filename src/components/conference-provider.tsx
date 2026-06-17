"use client";

import type { Conference } from "@/data/types";
import { type ReactNode, createContext, useContext } from "react";

const ConferenceContext = createContext<Conference | null>(null);

export function ConferenceProvider({
  conference,
  children,
}: {
  conference: Conference;
  children: ReactNode;
}) {
  return <ConferenceContext.Provider value={conference}>{children}</ConferenceContext.Provider>;
}

export function useConference(): Conference {
  const ctx = useContext(ConferenceContext);
  if (!ctx) throw new Error("useConference must be used within a ConferenceProvider");
  return ctx;
}
