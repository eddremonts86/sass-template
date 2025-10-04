/**
 * Application Configuration Constants
 * Centralized configuration for the entire application
 */

export const APP_CONFIG = {
  // Application metadata
  name: 'sass-edd-template',
  version: '0.1.0',
  description: 'A modern SaaS template with internationalization support',
  
  // URLs and links
  urls: {
    github: 'https://github.com/yourusername/sass-edd-template',
    documentation: '/docs',
    support: '/support',
    privacy: '/privacy',
    terms: '/terms',
  },
  
  // Social media links
  social: {
    twitter: 'https://twitter.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    github: 'https://github.com/yourusername',
  },
  
  // Contact information
  contact: {
    email: 'contact@sass-edd-template.com',
    phone: '+1 (555) 123-4567',
  },
  
  // Feature flags
  features: {
    enableAnalytics: true,
    enableNotifications: true,
    enableDarkMode: true,
    enableMultiLanguage: true,
    enableUserProfiles: true,
  },
  
  // Pagination and limits
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
    dashboardItemsPerPage: 20,
  },
  
  // API configuration
  api: {
    timeout: 10000,
    retryAttempts: 3,
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  },
  
  // File upload limits
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    allowedDocumentTypes: ['application/pdf', 'text/plain', 'application/msword'],
  },
} as const

export type AppConfig = typeof APP_CONFIG