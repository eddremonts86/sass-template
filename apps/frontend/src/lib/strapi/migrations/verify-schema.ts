/**
 * Strapi Migration Script
 * Verifies and creates the template-users collection if it doesn't exist
 */

import { log } from '@/lib/logger';
import { strapiClient } from '../client';

interface ContentType {
  uid: string;
  apiID: string;
  schema: {
    kind: string;
    collectionName: string;
    info: {
      singularName: string;
      pluralName: string;
      displayName: string;
    };
    attributes: Record<string, unknown>;
  };
}

/**
 * Check if template-users collection exists in Strapi
 */
async function checkCollectionExists(): Promise<boolean> {
  try {
    const response = await strapiClient.get<ContentType[]>(
      '/content-type-builder/content-types'
    );

    // The response.data is already the array of ContentType
    const contentTypes = Array.isArray(response)
      ? response
      : (response as { data?: ContentType[] }).data || [];

    const templateUsersExists = contentTypes.some(
      (contentType: ContentType) =>
        contentType.apiID === 'template-users' ||
        contentType.uid === 'api::template-users.template-users'
    );

    return templateUsersExists || false;
  } catch (error) {
    log.error('Failed to check collection existence', {}, error as Error);
    return false;
  }
}

/**
 * Verify template-users collection schema
 */
export async function verifyTemplateUsersCollection(): Promise<{
  exists: boolean;
  message: string;
}> {
  try {
    const exists = await checkCollectionExists();

    if (exists) {
      log.info('✅ template-users collection exists in Strapi');
      return {
        exists: true,
        message: 'template-users collection is configured correctly',
      };
    }

    log.warn(
      '⚠️  template-users collection does not exist. Please create it manually in Strapi admin panel.'
    );

    return {
      exists: false,
      message:
        'template-users collection not found. Create it at http://localhost:1337/admin/content-manager',
    };
  } catch (error) {
    log.error('Error verifying template-users collection', {}, error as Error);
    return {
      exists: false,
      message: `Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Get required schema for template-users collection
 * This serves as documentation for manual creation
 */
export function getRequiredSchema() {
  return {
    collectionName: 'template_users',
    info: {
      singularName: 'template-user',
      pluralName: 'template-users',
      displayName: 'Template User',
      description: 'User data synced from Clerk authentication',
    },
    attributes: {
      clerkId: {
        type: 'string',
        required: true,
        unique: true,
        description: 'Clerk user ID',
      },
      email: {
        type: 'email',
        required: true,
        unique: true,
        description: 'User email address',
      },
      firstName: {
        type: 'string',
        description: 'User first name',
      },
      lastName: {
        type: 'string',
        description: 'User last name',
      },
      username: {
        type: 'string',
        unique: true,
        description: 'User username',
      },
      imageUrl: {
        type: 'string',
        description: 'Profile image URL',
      },
      bio: {
        type: 'text',
        description: 'User biography',
      },
      locale: {
        type: 'enumeration',
        enum: ['en', 'es', 'da'],
        default: 'en',
        description: 'User preferred locale',
      },
      timezone: {
        type: 'string',
        description: 'User timezone',
      },
      isActive: {
        type: 'boolean',
        default: true,
        description: 'Whether the user account is active',
      },
      lastSignInAt: {
        type: 'datetime',
        description: 'Last sign in timestamp',
      },
    },
  };
}

/**
 * Print instructions for manual collection creation
 */
export function printSetupInstructions() {
  const schema = getRequiredSchema();

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 STRAPI SETUP REQUIRED');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('The template-users collection schema is already created in:');
  console.log('  📁 apps/backend/src/api/template-users/\n');

  console.log('Strapi will automatically load this collection when you:');
  console.log('  1. Restart the backend server (pnpm dev)');
  console.log(
    '  2. Go to http://localhost:1337/admin/content-manager/collection-types/api::template-users.template-users\n'
  );

  console.log('The collection includes these fields:');
  Object.entries(schema.attributes).forEach(([fieldName, config]) => {
    const fieldConfig = config as {
      type: string;
      required?: boolean;
      unique?: boolean;
      description?: string;
    };
    const badges = [];
    if (fieldConfig.required) badges.push('required');
    if (fieldConfig.unique) badges.push('unique');
    const badgeStr = badges.length > 0 ? ` [${badges.join(', ')}]` : '';
    console.log(
      `  • ${fieldName} (${fieldConfig.type})${badgeStr} - ${fieldConfig.description || ''}`
    );
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}
