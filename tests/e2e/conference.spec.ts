import { expect, test } from "@playwright/test";

test.describe("Conference page", () => {
  test("navigates from the hub to a conference", async ({ page }) => {
    await page.goto("/");
    await page.locator('a[href^="/c/"]').first().click();

    // Generous timeout: in dev, the first navigation to /c/[slug] compiles the route on demand.
    await expect(page).toHaveURL(/\/c\/.+/, { timeout: 15_000 });
    // Banner (static cover or generated OG card).
    await expect(page.locator("img").first()).toBeVisible();
  });

  test("the real conference loads with its sub-pages", async ({ page }) => {
    await page.goto("/c/semantic-delegation");
    await expect(page).toHaveURL(/semantic-delegation/);

    for (const sub of ["speakers", "themes", "missions", "glossary"]) {
      const res = await page.goto(`/c/semantic-delegation/${sub}`);
      expect(res?.status(), `sub-page ${sub}`).toBe(200);
    }
  });

  test("the banner CTAs expose the Space sessions and a copy-transcript button", async ({
    page,
  }) => {
    await page.goto("/c/semantic-delegation");

    // One link per audio Space session (this conference spanned two Spaces).
    await expect(page.locator('a[href*="x.com/i/spaces/1RJZzzXydyNJB"]')).toBeVisible();
    await expect(page.locator('a[href*="x.com/i/spaces/1qGvvvqbVjeGB"]')).toBeVisible();

    // The "Copy transcription" button fetches the raw verbatim transcript and
    // copies it to the clipboard. The fetch is async, so poll the clipboard.
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
    const copy = page.getByRole("button", { name: /copy transcription/i });
    await expect(copy).toBeVisible();
    await copy.click();
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toMatch(/# Part 1[\s\S]*# Part 2/);
  });
});

test.describe("Generated OG image (/api/og/<slug>)", () => {
  test("returns a valid PNG for the real conf and a fake one", async ({ request }) => {
    for (const slug of ["semantic-delegation", "demo-02-agentic-wallets"]) {
      const res = await request.get(`/api/og/${slug}`);
      expect(res.status(), slug).toBe(200);
      expect(res.headers()["content-type"], slug).toContain("image/png");
      expect((await res.body()).byteLength, slug).toBeGreaterThan(1000);
    }
  });
});
