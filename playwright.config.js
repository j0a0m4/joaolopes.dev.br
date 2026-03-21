import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./test/e2e-playwright",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:3001",
    headless: true,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: {
    command: "clojure -M -i test/serve_static.clj",
    port: 3001,
    reuseExistingServer: !process.env.CI,
  },
});
