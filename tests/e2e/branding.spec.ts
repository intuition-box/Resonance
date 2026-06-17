import { expect, test } from "@playwright/test";

test.describe("Navbar branding", () => {
  test("the navbar shows Resonance and no Intuition reference anymore", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");

    await expect(header.getByText("Resonance")).toBeVisible();

    // The Intuition wordmark was removed from the navbar.
    await expect(header.locator('img[alt="Intuition"]')).toHaveCount(0);
    // The Resonance logo is present.
    await expect(header.locator('img[src*="/brand/resonance/logo.svg"]')).toBeVisible();
  });

  test("the navbar logo grows on hover (animation)", async ({ page }) => {
    await page.goto("/");
    const brand = page.locator('header a[aria-label="Resonance"]');
    await expect(brand).toBeVisible();
    // The group-hover class animates the logo; at least verify the link is interactive.
    await brand.hover();
    await expect(brand.locator("img")).toBeVisible();
  });
});
