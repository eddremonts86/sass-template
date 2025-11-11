/**
 * Utilidades para trabajar con Strapi 5
 */

import type { StrapiQueryParams } from '@/types/strapi';
import qs from 'qs';

/**
 * Construye query string para Strapi REST API
 * Usa qs para manejar objetos anidados y arrays
 */
export function buildStrapiQuery(params: StrapiQueryParams): string {
  return qs.stringify(params, {
    encodeValuesOnly: true, // prettier URLs
  });
}

/**
 * Extrae el ID de una entidad de Strapi
 */
export function getStrapiId<T>(
  data: { id: number; attributes: T } | null
): number | null {
  return data?.id || null;
}

/**
 * Extrae los atributos de una entidad de Strapi
 */
export function getStrapiAttributes<T>(
  data: { id: number; attributes: T } | null
): T | null {
  return data?.attributes || null;
}

/**
 * Convierte una respuesta de Strapi a un objeto más simple
 */
export function flattenStrapiResponse<T>(
  data: {
    id: number;
    attributes: T;
  } | null
): (T & { id: number }) | null {
  if (!data) return null;
  return {
    id: data.id,
    ...data.attributes,
  };
}

/**
 * Convierte una colección de Strapi a un array simple
 */
export function flattenStrapiCollection<T>(
  data: Array<{ id: number; attributes: T }>
): Array<T & { id: number }> {
  return data.map(item => flattenStrapiResponse(item)!);
}

/**
 * Verifica si una respuesta de Strapi es un error
 */
export function isStrapiError(
  response: unknown
): response is { error: { status: number; message: string } } {
  return (
    typeof response === 'object' &&
    response !== null &&
    'error' in response &&
    typeof (response as { error?: unknown }).error === 'object'
  );
}

/**
 * Formatea una fecha para Strapi (ISO 8601)
 */
export function formatDateForStrapi(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

/**
 * Parsea una fecha de Strapi
 */
export function parseStrapiDate(
  dateString: string | null | undefined
): Date | null {
  if (!dateString) return null;
  return new Date(dateString);
}
