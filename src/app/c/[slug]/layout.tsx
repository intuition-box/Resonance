import { ConferenceShell } from "@/components/conference-shell";
import { getConference, getConferenceSlugs } from "@/data/conferences/index";
import { SITE_NAME } from "@/lib/site";
import { conferenceJsonLd } from "@/lib/structured-data";
import type { Metadata } from "next";
import type { ReactNode } from "react";

// Static pre-render of all conferences (and their sub-pages) at build time,
// instead of server-rendering on each request. An unknown slug is still rendered
// on demand (dynamicParams by default).
export function generateStaticParams() {
  return getConferenceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const conference = getConference(slug);
  if (!conference) {
    return { title: `Not found · ${SITE_NAME}` };
  }
  const title = `${conference.meta.title} · ${SITE_NAME}`;
  const description = conference.meta.oneLiner;
  // Social preview = OG card generated on the fly by default (automatic, no image
  // to provide). Can be overridden via `meta.ogImage` to force a specific image.
  const images = [conference.meta.ogImage ?? `/api/og/${slug}`];

  return {
    title,
    description,
    openGraph: { title, description, images, type: "article" },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function ConferenceLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const conference = getConference(slug);

  return (
    <>
      {conference && (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted JSON-LD built from our own static data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(conferenceJsonLd(conference)) }}
        />
      )}
      <ConferenceShell>{children}</ConferenceShell>
    </>
  );
}
