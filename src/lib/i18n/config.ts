import { getRequestConfig } from 'next-intl/server';

/**
 * Supported locales configuration
 */
export const locales = ['en', 'es', 'da'] as const;
export type Locale = (typeof locales)[number];

/**
 * Default locale
 */
export const defaultLocale: Locale = 'en';

/**
 * Locale labels for UI display
 */
export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  da: 'Dansk',
};

/**
 * Locale flags for UI display
 */
export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  da: '🇩🇰',
};

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Next-intl configuration
 */
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  // If invalid, use default locale instead of throwing notFound
  const validLocale = locale && isValidLocale(locale) ? locale : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`./locales/${validLocale}.json`)).default,
  };
});
