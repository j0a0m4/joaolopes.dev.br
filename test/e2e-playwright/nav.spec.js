import { test, expect } from "@playwright/test";

test.describe("nav toggle", () => {
  test("toggle button controls aria-expanded on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const btn = page.locator("#nav-toggle");
    await expect(btn).toBeVisible();

    // Collapsed by default
    await expect(btn).toHaveAttribute("aria-expanded", "false");

    // Click expands
    await btn.click();
    await expect(btn).toHaveAttribute("aria-expanded", "true");
  });
});
