import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/config.ts');

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Enable experimental features if needed
  },
  images: {
    // Configure image optimization
    domains: ['images.clerk.dev'], // Add Clerk image domains
  },
};

export default withNextIntl(nextConfig);
