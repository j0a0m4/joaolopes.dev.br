import { test, expect } from "@playwright/test";

// blog-qa checks 6, 12

test.describe("post tags", () => {
  test("tag links point to correct tag pages", async ({ page }) => {
    // blog-qa check 6
    await page.goto("/posts/building-your-ai-toolkit/");

    const tags = page.locator("a.tag");
    const count = await tags.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await tags.nth(i).getAttribute("href");
      expect(href).toMatch(/^\/tags\/[a-z0-9-]+\/$/);
    }
  });
});

test.describe("tags index", () => {
  test("renders tag cloud with links", async ({ page }) => {
    // blog-qa check 12: tags page uses .tag-pill, not .tag
    await page.goto("/tags/");

    const tags = page.locator("a.tag-pill");
    const count = await tags.count();
    expect(count).toBeGreaterThan(0);

    const href = await tags.first().getAttribute("href");
    expect(href).toMatch(/^\/tags\//);
  });

  test("tag page lists posts", async ({ page }) => {
    // blog-qa check 12 (cont.)
    await page.goto("/tags/");

    const firstTag = page.locator("a.tag-pill").first();
    await firstTag.click();
    await page.waitForURL(/\/tags\/.+\//);

    await expect(page.locator("h1")).toBeVisible();

    // Tag pages list posts linking back to /posts/
    const posts = page.locator("main a[href^='/posts/']");
    expect(await posts.count()).toBeGreaterThan(0);
  });

  test("blog-qa check 23: tag page shows posts matching that tag", async ({
    page,
  }) => {
    await page.goto("/tags/");
    const firstPill = page.locator(".tag-pill").first();
    test.skip((await firstPill.count()) === 0, "No tags found");

    // Read the href to get the exact tag slug instead of parsing textContent
    // (textContent includes the count span, e.g. "#ai-first-engineering1")
    const href = await firstPill.getAttribute("href");
    const tagSlug = href.replace(/^\/tags\//, "").replace(/\/$/, "");
    await firstPill.click();
    await page.waitForURL(/\/tags\//);
    const heading = await page.locator("h1").textContent();
    expect(heading.toLowerCase()).toContain(tagSlug.toLowerCase());
    const posts = page.locator('a[href^="/posts/"]');
    expect(await posts.count()).toBeGreaterThan(0);
  });
});
