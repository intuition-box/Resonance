import { expect, test } from "@playwright/test";

test.describe("Hub (home page)", () => {
  test("shows the hero and a (paginated) page of conferences", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // The list is paginated: at most PAGE_SIZE (10) cards per page.
    const cards = page.locator('a[href^="/c/"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(10);

    // In dev (real conf + 20 fakes), the pagination is present.
    await expect(page.getByRole("navigation", { name: "Pagination" })).toBeVisible();
  });

  test("search filters the cards", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator('a[href^="/c/"]');
    const total = await cards.count();

    await page.getByRole("textbox").first().fill("zzzznomatchzzzz");
    await expect(cards).toHaveCount(0);

    await page.getByRole("textbox").first().fill("");
    expect(await cards.count()).toBe(total);
  });

  test("pagination changes page", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Pagination" });
    await expect(nav).toBeVisible();

    const firstSlugP1 = await page.locator('a[href^="/c/"]').first().getAttribute("href");

    await page.getByRole("button", { name: "Go to page 2" }).click();

    // Page 2 is active and the first card changed.
    await expect(page.getByRole("button", { name: "Go to page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    const firstSlugP2 = await page.locator('a[href^="/c/"]').first().getAttribute("href");
    expect(firstSlugP2).not.toBe(firstSlugP1);
  });

  test("tag filter and sort controls work", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator('a[href^="/c/"]');

    // The A–Z sort toggle becomes active.
    const azButton = page.getByRole("button", { name: /A.Z/ });
    await azButton.click();
    await expect(azButton).toHaveAttribute("aria-pressed", "true");

    // Filtering by a tag keeps the chip pressed and still shows results.
    const tag = page.getByRole("button", { name: "Web3", exact: true });
    await tag.click();
    await expect(tag).toHaveAttribute("aria-pressed", "true");
    expect(await cards.count()).toBeGreaterThan(0);

    // Clearing filters resets the chip.
    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect(tag).toHaveAttribute("aria-pressed", "false");
  });

  test("each card has an image (static cover or generated OG)", async ({ page }) => {
    await page.goto("/");
    const firstCard = page.locator('a[href^="/c/"]').first();
    await expect(firstCard.locator("img")).toBeVisible();
  });
});
