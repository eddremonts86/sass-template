/**
 * TypeScript types for Strapi 5 CMS
 */

// =============================================================================
// STRAPI BASE TYPES
// =============================================================================

/**
 * Strapi pagination metadata
 */
export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * Strapi response metadata
 */
export interface StrapiMeta {
  pagination?: StrapiPagination;
}

/**
 * Data structure of a Strapi entity
 */
export interface StrapiData<T> {
  id: number;
  attributes: T;
  meta?: Record<string, unknown>;
}

/**
 * Single entity response
 */
export interface StrapiResponse<T> {
  data: StrapiData<T> | null;
  meta?: StrapiMeta;
}

/**
 * Multiple entities response
 */
export interface StrapiCollectionResponse<T> {
  data: StrapiData<T>[];
  meta: StrapiMeta;
}

/**
 * Strapi error response
 */
export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Error response
 */
export interface StrapiErrorResponse {
  error: StrapiError;
}

// =============================================================================
// TEMPLATE USERS - Public user data
// =============================================================================

/**
 * template_users attributes
 * Stores public data for users authenticated with Clerk
 */
export interface TemplateUserAttributes {
  // Clerk identifier
  clerkId: string;

  // Basic information
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;

  // Profile information
  imageUrl?: string | null;
  bio?: string | null;

  // Metadata
  lastSignInAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;

  // User preferences
  locale?: string | null;
  timezone?: string | null;

  // State
  isActive?: boolean;
}

/**
 * Complete type for a template_user
 */
export type TemplateUser = StrapiData<TemplateUserAttributes>;

/**
 * template_user response
 */
export type TemplateUserResponse = StrapiResponse<TemplateUserAttributes>;

/**
 * template_users collection response
 */
export type TemplateUsersResponse =
  StrapiCollectionResponse<TemplateUserAttributes>;

/**
 * Input to create a template_user
 */
export interface CreateTemplateUserInput {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  imageUrl?: string;
  locale?: string;
  timezone?: string;
}

/**
 * Input to update a template_user
 */
export interface UpdateTemplateUserInput {
  firstName?: string;
  lastName?: string;
  username?: string;
  imageUrl?: string;
  bio?: string;
  locale?: string;
  timezone?: string;
  lastSignInAt?: string;
  isActive?: boolean;
}

// =============================================================================
// QUERY PARAMETERS
// =============================================================================

/**
 * Filtering options for Strapi queries
 */
export type StrapiFilterValue =
  | string
  | number
  | boolean
  | null
  | {
      $eq?: string | number | boolean;
      $ne?: string | number | boolean;
      $in?: (string | number)[];
      $notIn?: (string | number)[];
      $lt?: number;
      $lte?: number;
      $gt?: number;
      $gte?: number;
      $contains?: string;
      $notContains?: string;
      $containsi?: string;
      $notContainsi?: string;
      $startsWith?: string;
      $endsWith?: string;
      $null?: boolean;
      $notNull?: boolean;
    };

export interface StrapiFilter {
  $or?: StrapiFilter[];
  $and?: StrapiFilter[];
  [key: string]: StrapiFilterValue | StrapiFilter[] | undefined;
}

/**
 * Sorting options
 */
export type StrapiSort = string | string[];

/**
 * Query parameters for Strapi
 */
export interface StrapiQueryParams {
  filters?: StrapiFilter;
  sort?: StrapiSort;
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string[];
  populate?: string | string[] | Record<string, unknown>;
  publicationState?: 'live' | 'preview';
  locale?: string;
}
