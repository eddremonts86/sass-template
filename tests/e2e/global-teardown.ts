import { FullConfig } from '@playwright/test';
import fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function globalTeardown(_config: FullConfig) {
  console.log('🧹 Starting global teardown for E2E tests...');

  // Clean up test database if needed
  if (process.env.DATABASE_URL) {
    console.log('🗑️ Cleaning up test database...');
    // Add database cleanup logic here if needed
  }

  // Clean up authentication files
  try {
    if (fs.existsSync('tests/e2e/auth.json')) {
      fs.unlinkSync('tests/e2e/auth.json');
      console.log('🔐 Authentication state cleaned up');
    }
  } catch (error) {
    console.warn('⚠️ Failed to clean up auth state:', error);
  }

  // Clean up any temporary files or resources
  console.log('🧽 Cleaning up temporary resources...');

  console.log('✅ Global teardown completed');
}

export default globalTeardown;
