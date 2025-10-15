import { chromium, FullConfig } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function globalSetup(_config: FullConfig) {
  console.log('🚀 Starting global setup for E2E tests...');

  // Setup test database if needed
  if (process.env.DATABASE_URL) {
    console.log('📊 Setting up test database...');
    // Add database setup logic here if needed
  }

  // Setup authentication state
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to login page and authenticate if needed
    if (process.env.E2E_TEST_USER_EMAIL && process.env.E2E_TEST_USER_PASSWORD) {
      console.log('🔐 Setting up authentication state...');

      await page.goto('/sign-in');

      // Fill in login form (adjust selectors based on your auth provider)
      await page.fill('[name="email"]', process.env.E2E_TEST_USER_EMAIL);
      await page.fill('[name="password"]', process.env.E2E_TEST_USER_PASSWORD);
      await page.click('[type="submit"]');

      // Wait for successful login
      await page.waitForURL('/dashboard', { timeout: 10000 });

      // Save authentication state
      await page.context().storageState({ path: 'tests/e2e/auth.json' });
      console.log('✅ Authentication state saved');
    }
  } catch (error) {
    console.warn('⚠️ Authentication setup failed:', error);
  } finally {
    await browser.close();
  }

  console.log('✅ Global setup completed');
}

export default globalSetup;
