import { expect, test } from "@playwright/test";

const CONF = "/c/semantic-delegation";

test.describe("Conference content", () => {
  test("speakers page lists speakers with X links", async ({ page }) => {
    await page.goto(`${CONF}/speakers`);
    expect(await page.locator('a[href*="x.com"]').count()).toBeGreaterThan(0);
  });

  test("glossary search filters terms", async ({ page }) => {
    await page.goto(`${CONF}/glossary`);
    const search = page.getByPlaceholder("Search a term…");
    await expect(search).toBeVisible();

    await search.fill("zzzznomatchzzzz");
    await expect(page.getByText("No term matches.")).toBeVisible();

    await search.fill("");
    await expect(page.getByText("No term matches.")).toHaveCount(0);
  });

  test("unknown conference slug shows a not-found state", async ({ page }) => {
    await page.goto("/c/this-conference-does-not-exist");
    await expect(page.getByText("Conference not found")).toBeVisible();
  });
});
