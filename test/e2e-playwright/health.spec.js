import { test, expect } from "@playwright/test";

// blog-qa checks 1 + 2: no 404s on critical assets, no console errors

test.describe("site health", () => {
  test("critical assets load — CSS and JS return 200", async ({ page }) => {
    const failed = [];
    page.on("response", (res) => {
      if (res.status() >= 400) {
        const url = new URL(res.url());
        if (url.pathname.endsWith(".css") || url.pathname.endsWith(".js")) {
          failed.push({ path: url.pathname, status: res.status() });
        }
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(failed).toEqual([]);
  });

  test("no console errors on homepage", async ({ page }) => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("no console errors on post page", async ({ page }) => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/posts/building-your-ai-toolkit/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
});
