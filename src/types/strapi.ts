/**
 * Tipos TypeScript para Strapi 5 CMS
 */

// =============================================================================
// TIPOS BASE DE STRAPI
// =============================================================================

/**
 * Metadatos de paginación de Strapi
 */
export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * Metadatos de respuesta de Strapi
 */
export interface StrapiMeta {
  pagination?: StrapiPagination;
}

/**
 * Estructura de datos de una entidad de Strapi
 */
export interface StrapiData<T> {
  id: number;
  attributes: T;
  meta?: Record<string, unknown>;
}

/**
 * Respuesta de una sola entidad
 */
export interface StrapiResponse<T> {
  data: StrapiData<T> | null;
  meta?: StrapiMeta;
}

/**
 * Respuesta de múltiples entidades
 */
export interface StrapiCollectionResponse<T> {
  data: StrapiData<T>[];
  meta: StrapiMeta;
}

/**
 * Respuesta de error de Strapi
 */
export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Respuesta de error
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
 * Tipo completo para un template_user
 */
export type TemplateUser = StrapiData<TemplateUserAttributes>;

/**
 * Respuesta de un template_user
 */
export type TemplateUserResponse = StrapiResponse<TemplateUserAttributes>;

/**
 * Respuesta de colección de template_users
 */
export type TemplateUsersResponse =
  StrapiCollectionResponse<TemplateUserAttributes>;

/**
 * Input para crear un template_user
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
 * Input para actualizar un template_user
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
 * Opciones de filtrado para queries de Strapi
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
 * Opciones de ordenamiento
 */
export type StrapiSort = string | string[];

/**
 * Parámetros de query para Strapi
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
