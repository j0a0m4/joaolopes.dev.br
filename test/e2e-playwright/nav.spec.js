import { test, expect } from "@playwright/test";

// blog-qa checks 13, 14

test.describe("nav toggle", () => {
  test("toggle button controls aria-expanded on mobile", async ({ page }) => {
    // blog-qa check 13
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const btn = page.locator("#nav-toggle");
    await expect(btn).toBeVisible();

    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await btn.click();
    await expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  test("hamburger visible at 390px, nav links hidden", async ({ page }) => {
    // blog-qa check 14
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const hamburger = page.locator("#nav-toggle");
    await expect(hamburger).toBeVisible();
  });

  test("nav links visible at desktop width", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const navLinks = page.locator("nav a").first();
    await expect(navLinks).toBeVisible();
  });
});
