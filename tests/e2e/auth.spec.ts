import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display sign in button when not authenticated', async ({
    page,
  }) => {
    await page.goto('/');

    // Check if sign in button is visible
    const signInButton = page.getByTestId('sign-in-button');
    await expect(signInButton).toBeVisible();
  });

  test('should redirect to sign in page when accessing protected route', async ({
    page,
  }) => {
    await page.goto('/dashboard');

    // Should be redirected to sign in page
    await expect(page).toHaveURL(/.*sign-in.*/);
  });

  test('should show user menu when authenticated', async ({ page }) => {
    // Use stored authentication state if available
    if (!process.env.E2E_TEST_USER_EMAIL) {
      test.skip();
      return;
    }

    await page.goto('/sign-in');

    // Fill login form
    await page.fill('[name="email"]', process.env.E2E_TEST_USER_EMAIL);
    await page.fill(
      '[name="password"]',
      process.env.E2E_TEST_USER_PASSWORD || 'testpassword'
    );

    // Submit form
    await page.click('[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForURL('/dashboard', { timeout: 10000 });

    // Check if user button is visible
    const userButton = page.getByTestId('user-button');
    await expect(userButton).toBeVisible();
  });

  test('should handle sign out', async ({ page }) => {
    // Skip if no test credentials
    if (!process.env.E2E_TEST_USER_EMAIL) {
      test.skip();
      return;
    }

    // Sign in first
    await page.goto('/sign-in');
    await page.fill('[name="email"]', process.env.E2E_TEST_USER_EMAIL);
    await page.fill(
      '[name="password"]',
      process.env.E2E_TEST_USER_PASSWORD || 'testpassword'
    );
    await page.click('[type="submit"]');
    await page.waitForURL('/dashboard');

    // Click user menu and sign out
    await page.click('[data-testid="user-button"]');
    await page.click('text=Sign out');

    // Should be redirected to home page
    await expect(page).toHaveURL('/');

    // Sign in button should be visible again
    const signInButton = page.getByTestId('sign-in-button');
    await expect(signInButton).toBeVisible();
  });
});
