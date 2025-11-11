/**
 * Strapi 5 REST API Client
 * Client configuration to connect with Strapi CMS
 */

const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

export interface StrapiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  params?: Record<string, unknown>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

/**
 * Cliente HTTP para Strapi 5 REST API
 */
export class StrapiClient {
  private baseUrl: string;
  private token: string;

  constructor(
    baseUrl: string = STRAPI_API_URL,
    token: string = STRAPI_API_TOKEN
  ) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  /**
   * Realiza una petición a la API de Strapi
   */
  async request<T>(
    endpoint: string,
    options: StrapiRequestOptions = {}
  ): Promise<T> {
    const { method = 'GET', body, params, cache, next } = options;

    // Construir URL con query params si existen
    let url = `${this.baseUrl}/api${endpoint}`;
    if (params) {
      const queryString = new URLSearchParams(
        params as Record<string, string>
      ).toString();
      url += `?${queryString}`;
    }

    // Configurar headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    // Configurar opciones de fetch
    const fetchOptions: RequestInit = {
      method,
      headers,
      cache: cache || 'no-store',
      next,
    };

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(
          error.error?.message ||
            `Strapi API error: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      console.error('Strapi request error:', error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(
    endpoint: string,
    options?: Omit<StrapiRequestOptions, 'method'>
  ) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    body: unknown,
    options?: Omit<StrapiRequestOptions, 'method' | 'body'>
  ) {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    body: unknown,
    options?: Omit<StrapiRequestOptions, 'method' | 'body'>
  ) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    options?: Omit<StrapiRequestOptions, 'method'>
  ) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// Instancia singleton del cliente
export const strapiClient = new StrapiClient();

// Export de constantes
export { STRAPI_API_TOKEN, STRAPI_API_URL };
