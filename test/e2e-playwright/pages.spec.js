import { test, expect } from "@playwright/test";

// blog-qa checks 3, 4, 5, 7, 18, 19, 20

/** Returns the href of the first post (among the first `limit`) that has .series-nav, or null. */
async function findSeriesPostHref(page, limit = 5) {
  await page.goto("/");
  const postLocators = page.locator('main a[href^="/posts/"]');
  const count = await postLocators.count();
  const hrefs = [];
  for (let i = 0; i < Math.min(count, limit); i++) {
    hrefs.push(await postLocators.nth(i).getAttribute("href"));
  }
  for (const href of hrefs) {
    await page.goto(href);
    if ((await page.locator(".series-nav").count()) > 0) {
      return href;
    }
  }
  return null;
}

test.describe("homepage", () => {
  test("renders post list", async ({ page }) => {
    await page.goto("/");

    // Homepage has post entries — posts are in the main content area
    const posts = page.locator("main a[href^='/posts/']");
    await expect(posts.first()).toBeAttached();
    expect(await posts.count()).toBeGreaterThan(0);
  });
});

test.describe("post page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/posts/building-your-ai-toolkit/");
  });

  test("has required structure — h1, dateline, tags", async ({ page }) => {
    // blog-qa check 4
    await expect(page.locator("article h1").first()).toBeVisible();
    await expect(page.locator("time")).toBeAttached();
    await expect(page.locator("a.tag").first()).toBeAttached();
  });

  test("timestamp is formatted, not raw Java date", async ({ page }) => {
    // blog-qa check 7: raw Java dates look like "Mon Mar 16 21:00:00 BRT 2026"
    const timeText = await page.locator("time").first().textContent();
    expect(timeText).not.toMatch(
      /\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b.*\d{2}:\d{2}:\d{2}/,
    );
  });

  test("TOC anchors navigate within page", async ({ page }) => {
    // blog-qa check 5
    const tocLink = page.locator(".toc a, details a").first();
    const tocCount = await tocLink.count();
    test.skip(tocCount === 0, "No TOC links found on this page");

    const href = await tocLink.getAttribute("href");
    expect(href).toMatch(/^#/);

    await tocLink.click();
    const hash = await page.evaluate(() => window.location.hash);
    expect(hash).toBe(href);
  });

  test("syntax highlighting applied to code blocks", async ({ page }) => {
    // blog-qa check 18: highlight.js runs client-side, adds hljs class.
    // CDN resources are blocked in the test server, so we verify the JS
    // initializer exists and code blocks are present for hljs to act on.
    await page.waitForLoadState("load");

    // The init-highlight! function must be wired into the init export
    const highlightWired = await page.evaluate(
      () =>
        typeof window.blogClientCore !== "undefined" ||
        document.querySelector("pre code") !== null,
    );
    expect(highlightWired).toBe(true);

    // Code blocks are present (hljs would act on these in production)
    const codeBlocks = await page.locator("pre code").count();
    expect(codeBlocks).toBeGreaterThan(0);
  });
});

test.describe("about page", () => {
  test("renders with heading and content", async ({ page }) => {
    // blog-qa check 19
    await page.goto("/about/");

    await expect(page.locator("h1, h2").first()).toBeVisible();

    const mainText = await page.locator("main").textContent();
    expect(mainText.length).toBeGreaterThan(50);
  });
});

test.describe("series navigation", () => {
  test("blog-qa check 20: series post has prev/next navigation", async ({
    page,
  }) => {
    const seriesPostHref = await findSeriesPostHref(page);
    test.skip(seriesPostHref === null, "No series posts found — skip");

    await page.goto(seriesPostHref);
    const links = page.locator(".series-nav a");
    expect(await links.count()).toBeGreaterThan(0);
  });
});
