import js from "@eslint/js";
import globals from "globals";
import playwright from "eslint-plugin-playwright";

export default [
  js.configs.recommended,
  {
    ...playwright.configs["flat/recommended"],
    files: ["test/e2e-playwright/**/*.spec.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      "playwright/no-skipped-test": ["warn", { allowConditional: true }],
    },
  },
];
