import { test, expect } from "@playwright/test";

test.describe("glossary tooltip", () => {
  test("click reveals tooltip, escape dismisses it", async ({ page }) => {
    await page.goto("/posts/building-your-ai-toolkit/");

    const term = page.locator("abbr.glossary-term").first();
    await expect(term).toBeVisible();

    // Tooltip not visible initially
    await expect(page.locator(".glossary-tooltip.visible")).not.toBeVisible();

    // Click the abbr element itself (not the <a> child — clicking <a> navigates away).
    // The JS handler checks e.target.tagName === "A" and bails if so.
    // force: true bypasses actionability checks and dispatches directly on the element.
    await term.dispatchEvent("click");

    const tooltip = page.locator(".glossary-tooltip.visible");
    await expect(tooltip).toBeVisible();

    // Has aria-describedby
    await expect(term).toHaveAttribute("aria-describedby", /.+/);

    // Escape dismisses tooltip
    await page.keyboard.press("Escape");
    await expect(page.locator(".glossary-tooltip.visible")).not.toBeVisible();
  });
});
