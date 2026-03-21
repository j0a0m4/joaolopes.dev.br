import { test, expect } from "@playwright/test";

// blog-qa checks 15, 16, 17

test.describe("feeds and machine-readable content", () => {
  test("RSS feed returns valid XML with items", async ({ request }) => {
    // blog-qa check 15
    const response = await request.get("/feed.xml");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("<rss");

    const itemCount = (body.match(/<item>/g) || []).length;
    expect(itemCount).toBeGreaterThan(0);
  });

  test("sitemap returns valid XML with URLs", async ({ request }) => {
    // blog-qa check 16
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("<urlset");

    const locCount = (body.match(/<loc>/g) || []).length;
    expect(locCount).toBeGreaterThan(0);
  });

  test("llms.txt exists and is non-empty", async ({ request }) => {
    // blog-qa check 17
    const response = await request.get("/llms.txt");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body.trim().length).toBeGreaterThan(0);
  });
});
