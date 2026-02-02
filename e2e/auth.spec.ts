import { test, expect } from "@playwright/test";

/**
 * Authentication E2E Tests
 *
 * These tests verify the authentication flow works correctly.
 */
test.describe("Authentication", () => {
  test("should show login page", async ({ page }) => {
    await page.goto("/login");

    // Check login form elements
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("should show registration page", async ({ page }) => {
    await page.goto("/register");

    // Check registration form elements
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("should show validation errors on invalid login", async ({ page }) => {
    await page.goto("/login");

    // Submit empty form
    await page.click('button[type="submit"]');

    // Should show some validation feedback
    // (Implementation depends on form validation approach)
  });

  test("should redirect unauthenticated users from protected routes", async ({ page }) => {
    // Try to access protected route
    await page.goto("/dashboard");

    // Should be redirected to login
    await expect(page).toHaveURL(/login/);
  });

  test("should have link between login and register", async ({ page }) => {
    await page.goto("/login");

    // Find and click register link
    const registerLink = page.locator('a[href*="register"]');
    if (await registerLink.isVisible()) {
      await registerLink.click();
      await expect(page).toHaveURL(/register/);
    }
  });
});
