/**
 * Servicio para gestionar template_users en Strapi
 * CRUD operations para la colección template-users
 */

import type {
  CreateTemplateUserInput,
  StrapiQueryParams,
  TemplateUserResponse,
  TemplateUsersResponse,
  UpdateTemplateUserInput,
} from '@/types/strapi';
import { strapiClient } from '../client';
import {
  buildStrapiQuery,
  flattenStrapiCollection,
  flattenStrapiResponse,
} from '../utils';

const COLLECTION_NAME = 'template-users';

/**
 * Get all template users
 */
export async function getAllTemplateUsers(params?: StrapiQueryParams) {
  const endpoint = params
    ? `/${COLLECTION_NAME}?${buildStrapiQuery(params)}`
    : `/${COLLECTION_NAME}`;

  const response = await strapiClient.get<TemplateUsersResponse>(endpoint);

  return {
    data: flattenStrapiCollection(response.data),
    meta: response.meta,
  };
}

/**
 * Get a template user by Strapi ID
 */
export async function getTemplateUserById(id: number) {
  const response = await strapiClient.get<TemplateUserResponse>(
    `/${COLLECTION_NAME}/${id}`
  );

  return flattenStrapiResponse(response.data);
}

/**
 * Get a template user by Clerk ID
 */
export async function getTemplateUserByClerkId(clerkId: string) {
  const params: StrapiQueryParams = {
    filters: {
      clerkId: {
        $eq: clerkId,
      },
    },
  };

  const endpoint = `/${COLLECTION_NAME}?${buildStrapiQuery(params)}`;
  const response = await strapiClient.get<TemplateUsersResponse>(endpoint);

  if (response.data.length === 0) {
    return null;
  }

  return flattenStrapiResponse(response.data[0]);
}

/**
 * Create a new template user
 */
export async function createTemplateUser(input: CreateTemplateUserInput) {
  const response = await strapiClient.post<TemplateUserResponse>(
    `/${COLLECTION_NAME}`,
    {
      data: input,
    }
  );

  return flattenStrapiResponse(response.data);
}

/**
 * Update an existing template user by Strapi ID
 */
export async function updateTemplateUser(
  id: number,
  input: UpdateTemplateUserInput
) {
  const response = await strapiClient.put<TemplateUserResponse>(
    `/${COLLECTION_NAME}/${id}`,
    {
      data: input,
    }
  );

  return flattenStrapiResponse(response.data);
}

/**
 * Update a template user by Clerk ID
 */
export async function updateTemplateUserByClerkId(
  clerkId: string,
  input: UpdateTemplateUserInput
) {
  const user = await getTemplateUserByClerkId(clerkId);

  if (!user) {
    throw new Error(`User with clerkId ${clerkId} not found`);
  }

  return updateTemplateUser(user.id, input);
}

/**
 * Delete a template user
 */
export async function deleteTemplateUser(id: number) {
  const response = await strapiClient.delete<TemplateUserResponse>(
    `/${COLLECTION_NAME}/${id}`
  );

  return flattenStrapiResponse(response.data);
}

/**
 * Sync or create user from Clerk
 * If the user exists, it updates them. If not, it creates them.
 */
export async function syncTemplateUserFromClerk(clerkUser: {
  id: string;
  emailAddresses: Array<{ emailAddress: string }>;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  imageUrl?: string;
  lastSignInAt?: number | null;
}) {
  const existingUser = await getTemplateUserByClerkId(clerkUser.id);

  const userData: CreateTemplateUserInput | UpdateTemplateUserInput = {
    email: clerkUser.emailAddresses[0]?.emailAddress || '',
    firstName: clerkUser.firstName || undefined,
    lastName: clerkUser.lastName || undefined,
    username: clerkUser.username || undefined,
    imageUrl: clerkUser.imageUrl,
    lastSignInAt: clerkUser.lastSignInAt
      ? new Date(clerkUser.lastSignInAt).toISOString()
      : undefined,
  };

  if (existingUser) {
    // Update existing user
    return updateTemplateUser(existingUser.id, userData);
  } else {
    // Create new user
    return createTemplateUser({
      ...(userData as CreateTemplateUserInput),
      clerkId: clerkUser.id,
    });
  }
}

/**
 * Search template users by name or email
 */
export async function searchTemplateUsers(searchTerm: string) {
  const params: StrapiQueryParams = {
    filters: {
      $or: [
        { firstName: { $containsi: searchTerm } },
        { lastName: { $containsi: searchTerm } },
        { email: { $containsi: searchTerm } },
        { username: { $containsi: searchTerm } },
      ],
    },
  };

  const endpoint = `/${COLLECTION_NAME}?${buildStrapiQuery(params)}`;
  const response = await strapiClient.get<TemplateUsersResponse>(endpoint);

  return {
    data: flattenStrapiCollection(response.data),
    meta: response.meta,
  };
}

/**
 * Get active template users
 */
export async function getActiveTemplateUsers(params?: StrapiQueryParams) {
  const queryParams: StrapiQueryParams = {
    ...params,
    filters: {
      ...params?.filters,
      isActive: true,
    },
  };

  return getAllTemplateUsers(queryParams);
}
