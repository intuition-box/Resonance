import { expect, test } from "@playwright/test";

// localhost is a secure context → the Clipboard API is available.
test.use({ permissions: ["clipboard-read", "clipboard-write"] });

test.describe("Contribute page — agent prompt", () => {
  test("the button copies the prompt and shows feedback", async ({ page }) => {
    await page.goto("/contribute");

    const button = page.getByRole("button", { name: "Copy agent prompt" });
    await expect(button).toBeVisible();

    await button.click();

    // Visual feedback.
    await expect(page.getByText("Copied!")).toBeVisible();

    // The clipboard holds the prompt (the expected context for the agent).
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain("adding a NEW conference");
    expect(clip).toContain("src/data/conferences/");
  });
});
