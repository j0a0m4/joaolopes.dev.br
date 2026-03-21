import { test, expect } from "@playwright/test";

// blog-qa checks 8, 9, 10, 11

// Post must contain [[glossary:...]] wikilinks (see posts/). Toolkit post is plain prose.
const POST_WITH_GLOSSARY = "/posts/i-built-this-blog-by-prompting-claude-code/";

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

  test("click reveals tooltip with a11y attributes, escape dismisses", async ({
    page,
  }) => {
    // blog-qa check 9
    const term = page.locator("abbr.glossary-term").first();
    await expect(term).toBeVisible();

    await expect(page.locator(".glossary-tooltip.visible")).toBeHidden();

    // Model: plain click on the term toggles the tooltip (navigation is via tooltip link).
    await term.dispatchEvent("click");

    const tooltip = page.locator(".glossary-tooltip.visible");
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveAttribute("role", "tooltip");
    await expect(term).toHaveAttribute("aria-describedby", /.+/);

    await page.keyboard.press("Escape");
    await expect(page.locator(".glossary-tooltip.visible")).toBeHidden();
  });

  test("full entry in tooltip navigates to glossary page", async ({ page }) => {
    // blog-qa check 10 — term link opens tooltip; glossary page via in-tooltip redirect
    const term = page.locator("abbr.glossary-term").first();
    await term.dispatchEvent("click");

    const fullEntry = page.locator(".glossary-tooltip.visible a.glossary-link");
    await expect(fullEntry).toBeVisible();
    const href = await fullEntry.getAttribute("href");
    expect(href).toMatch(/^\/glossary\//);

    await Promise.all([
      page.waitForURL((u) => u.pathname.startsWith("/glossary/")),
      fullEntry.click(),
    ]);
    await expect(page.locator("text=← Glossary")).toBeVisible();
  });
});

test.describe("glossary index", () => {
  test("renders A-Z list of entries", async ({ page }) => {
    // blog-qa check 11
    await page.goto("/glossary/");

    const entries = page.locator(
      ".glossary-index a, .glossary-list a, article a",
    );
    const count = await entries.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("glossary tooltip content", () => {
  test("blog-qa check 21: glossary tooltip shows definition text", async ({
    page,
  }) => {
    await page.goto(POST_WITH_GLOSSARY);
    const term = page.locator("abbr.glossary-term").first();
    test.skip((await term.count()) === 0, "No glossary terms on page");

    await term.dispatchEvent("click");
    const tooltip = page.locator(".glossary-tooltip.visible");
    await expect(tooltip).toBeVisible();
    const tooltipText = await tooltip.textContent();
    expect(tooltipText.length).toBeGreaterThan(0);
    await expect(tooltip.locator("a.glossary-link")).toBeVisible();
  });
});
