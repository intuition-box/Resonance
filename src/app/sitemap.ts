import { getConferences } from "@/data/conferences/index";
import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

// Generated at build time. In production only real conferences are listed
// (the fake test ones are dev-only — see src/data/conferences/_fake.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/contribute`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const conferenceRoutes: MetadataRoute.Sitemap = getConferences().flatMap((c) => {
    const base = `${SITE_URL}/c/${c.slug}`;
    const parsed = Date.parse(c.meta.date);
    const lastModified = Number.isNaN(parsed) ? now : new Date(parsed);

    const subPaths = ["", "/speakers", "/themes"];
    if (c.missions?.length) subPaths.push("/missions");
    if (c.glossary?.length) subPaths.push("/glossary");

    return subPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 0.8 : 0.6,
    }));
  });

  return [...staticRoutes, ...conferenceRoutes];
}
