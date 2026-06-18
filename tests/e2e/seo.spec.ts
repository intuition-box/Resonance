import { expect, test } from "@playwright/test";

test.describe("SEO", () => {
  test("sitemap.xml lists conference URLs", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("xml");
    const body = await res.text();
    expect(body).toContain("/c/semantic-delegation");
  });

  test("robots.txt references the sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body.toLowerCase()).toContain("sitemap:");
  });

  test("llms.txt lists conferences and links their raw transcript", async ({ request }) => {
    const res = await request.get("/llms.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/plain");
    const body = await res.text();
    expect(body).toContain("# Resonance");
    expect(body).toContain("/c/semantic-delegation");
    expect(body).toContain("/c/semantic-delegation/transcript.txt");
  });

  test("the raw transcript is served as text at /c/<slug>/transcript.txt", async ({ request }) => {
    const res = await request.get("/c/semantic-delegation/transcript.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/plain");
    const body = await res.text();
    expect(body).toContain("# Part 1");
    expect(body).toContain("# Part 2");
  });

  test("conference page exposes valid Event JSON-LD", async ({ page }) => {
    await page.goto("/c/semantic-delegation");
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(raw).toBeTruthy();
    const data = JSON.parse(raw as string);
    expect(data["@type"]).toBe("Event");
    expect(data.name).toBeTruthy();
    expect(data.url).toContain("/c/semantic-delegation");
    expect(Array.isArray(data.performer)).toBe(true);
  });
});
