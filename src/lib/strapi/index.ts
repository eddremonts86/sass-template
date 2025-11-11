/**
 * Exportaciones centralizadas de Strapi
 */

// Cliente
export {
  STRAPI_API_TOKEN,
  STRAPI_API_URL,
  StrapiClient,
  strapiClient,
} from './client';

// Servicios
export {
  createTemplateUser,
  deleteTemplateUser,
  getActiveTemplateUsers,
  getAllTemplateUsers,
  getTemplateUserByClerkId,
  getTemplateUserById,
  searchTemplateUsers,
  syncTemplateUserFromClerk,
  updateTemplateUser,
  updateTemplateUserByClerkId,
} from './services/template-users';

// Utilidades
export {
  buildStrapiQuery,
  flattenStrapiCollection,
  flattenStrapiResponse,
  formatDateForStrapi,
  getStrapiAttributes,
  getStrapiId,
  isStrapiError,
  parseStrapiDate,
} from './utils';

// Tipos (re-export)
export type {
  CreateTemplateUserInput,
  StrapiCollectionResponse,
  StrapiData,
  StrapiError,
  StrapiErrorResponse,
  StrapiFilter,
  StrapiFilterValue,
  StrapiMeta,
  StrapiPagination,
  StrapiQueryParams,
  StrapiResponse,
  StrapiSort,
  TemplateUser,
  TemplateUserAttributes,
  TemplateUserResponse,
  TemplateUsersResponse,
  UpdateTemplateUserInput,
} from '@/types/strapi';
