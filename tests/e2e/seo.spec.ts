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
