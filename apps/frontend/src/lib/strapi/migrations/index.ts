/**
 * Strapi migration script
 * Run this to verify the template-users collection schema
 *
 * Usage:
 *   pnpm migrate:strapi
 */

import { log } from '@/lib/logger';
import {
  printSetupInstructions,
  verifyTemplateUsersCollection,
} from './verify-schema';

async function runMigration() {
  console.log('\n🔄 Verifying Strapi schema...\n');

  try {
    const result = await verifyTemplateUsersCollection();

    if (result.exists) {
      log.info('✅ Migration complete - All schemas verified');
    } else {
      console.log('\n⚠️  Schema verification incomplete');
      printSetupInstructions();
    }

    process.exit(result.exists ? 0 : 1);
  } catch (error) {
    log.error('Migration failed', {}, error as Error);
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if called directly
if (require.main === module) {
  runMigration();
}

export { runMigration };
