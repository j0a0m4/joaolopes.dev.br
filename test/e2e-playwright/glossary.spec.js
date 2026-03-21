import { test, expect } from "@playwright/test";

// blog-qa checks 8, 9, 10, 11

const POST_WITH_GLOSSARY = "/posts/building-your-ai-toolkit/";

test.describe("glossary tooltip", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(POST_WITH_GLOSSARY);
  });

  test("has required data attributes", async ({ page }) => {
    // blog-qa check 8
    const term = page.locator("abbr.glossary-term").first();
    await expect(term).toBeAttached();

    await expect(term).toHaveAttribute("title", /.+/);
    await expect(term).toHaveAttribute("data-slug", /^[a-z0-9-]+$/);
    await expect(term).toHaveAttribute("data-definition", /.+/);

    // Definition should be prose, not markdown heading
    const definition = await term.getAttribute("data-definition");
    expect(definition).not.toMatch(/^#\s/);
  });

  test("click reveals tooltip with a11y attributes, escape dismisses", async ({ page }) => {
    // blog-qa check 9
    const term = page.locator("abbr.glossary-term").first();
    await expect(term).toBeVisible();

    await expect(page.locator(".glossary-tooltip.visible")).not.toBeVisible();

    // dispatchEvent targets <abbr> itself — click() would hit child <a> and navigate
    await term.dispatchEvent("click");

    const tooltip = page.locator(".glossary-tooltip.visible");
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute("role", "tooltip");
    await expect(term).toHaveAttribute("aria-describedby", /.+/);

    await page.keyboard.press("Escape");
    await expect(page.locator(".glossary-tooltip.visible")).not.toBeVisible();
  });

  test("glossary link navigates to entry page", async ({ page }) => {
    // blog-qa check 10
    const link = page.locator("abbr.glossary-term a").first();
    const href = await link.getAttribute("href");
    expect(href).toMatch(/^\/glossary\//);

    await link.click();
    await page.waitForURL(/\/glossary\//);

    await expect(page.locator("text=← Glossary")).toBeVisible();
  });
});

test.describe("glossary index", () => {
  test("renders A-Z list of entries", async ({ page }) => {
    // blog-qa check 11
    await page.goto("/glossary/");

    const entries = page.locator(".glossary-index a, .glossary-list a, article a");
    const count = await entries.count();
    expect(count).toBeGreaterThan(0);
  });
});
