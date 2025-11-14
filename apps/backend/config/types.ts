/**
 * Strapi environment utility types
 */

export interface StrapiEnv {
  (key: string, defaultValue?: string): string;
  int(key: string, defaultValue?: number): number;
  bool(key: string, defaultValue?: boolean): boolean;
  array(key: string, defaultValue?: string[]): string[];
}

export interface StrapiConfig {
  env: StrapiEnv;
}
