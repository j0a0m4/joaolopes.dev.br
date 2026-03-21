import { test, expect } from "@playwright/test";

// blog-qa feature checks: SVG ARIA, mermaid, series nav

test.describe("SVG diagrams", () => {
  test("diagram SVGs have ARIA attributes", async ({ page }) => {
    // blog-qa feature check: SVG a11y
    // Target SVGs with role="img" (diagram SVGs), not the logo SVG
    await page.goto("/posts/building-your-ai-toolkit/");

    const diagramSvg = page.locator('svg[role="img"]').first();
    const svgCount = await diagramSvg.count();
    test.skip(svgCount === 0, "No diagram SVGs found on this page");

    await expect(diagramSvg).toHaveAttribute("aria-labelledby", /.+/);

    const hasTitle = await diagramSvg.locator("title").count();
    expect(hasTitle).toBeGreaterThan(0);

    const hasDesc = await diagramSvg.locator("desc").count();
    expect(hasDesc).toBeGreaterThan(0);
  });
});
