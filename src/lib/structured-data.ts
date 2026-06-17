import type { Conference } from "@/data/types";
import { SITE_URL } from "@/lib/site";

// schema.org `Event` JSON-LD for a conference (an online, recorded talk/Space).
// Injected per conference page for richer search results and social previews.
export function conferenceJsonLd(conference: Conference) {
  const { meta } = conference;
  const url = `${SITE_URL}/c/${conference.slug}`;
  const parsed = Date.parse(meta.date);
  const stage = conference.speakers.filter((s) => s.stage);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: meta.title,
    description: meta.oneLiner,
    url,
    image: `${SITE_URL}/api/og/${conference.slug}`,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "VirtualLocation", url },
    ...(Number.isNaN(parsed) ? {} : { startDate: new Date(parsed).toISOString() }),
    ...(conference.orgs.length
      ? {
          organizer: conference.orgs.map((o) => ({
            "@type": "Organization",
            name: o.name,
            ...(o.x ? { sameAs: o.x } : {}),
          })),
        }
      : {}),
    ...(stage.length
      ? {
          performer: stage.map((s) => ({
            "@type": "Person",
            name: s.name,
            ...(s.x ? { sameAs: s.x } : {}),
          })),
        }
      : {}),
  };
}
