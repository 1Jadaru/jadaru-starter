import { test, expect } from "@playwright/test";

/**
 * Home Page E2E Tests
 *
 * These tests verify the landing page loads correctly.
 */
test.describe("Home Page", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");

    // Check the page loaded
    await expect(page).toHaveTitle(/Jadaru/i);
  });

  test("should have navigation links", async ({ page }) => {
    await page.goto("/");

    // Check for common navigation elements
    const nav = page.locator("nav, header");
    await expect(nav).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Page should still load without errors
    await expect(page.locator("body")).toBeVisible();
  });
});
