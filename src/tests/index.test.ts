import { test, expect, chromium, Browser, Page } from "@playwright/test";

test('should display "Hello World"', async ({ page }) => {
  await page.goto("http://localhost:3000");
  const text = await page.textContent("div");
  expect(text).toBe("Hello World");
});
