import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/config.ts');

const nextConfig: NextConfig = {
  // Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://clerk.dev https://*.clerk.accounts.dev https://vercel.live https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://clerk.dev https://*.clerk.accounts.dev https://vitals.vercel-insights.com https://vercel.live wss://ws-us3.pusher.com",
              "frame-src 'self' https://clerk.dev https://*.clerk.accounts.dev",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // Performance Optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Compiler Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['images.clerk.dev'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Bundle Analysis
  webpack: (config, { dev, isServer }) => {
    // Tree shaking optimization
    if (!dev && !isServer) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    return config;
  },

  // Caching Headers
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
        has: [
          {
            type: 'header',
            key: 'cache-control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
    ];
  },
};

// PWA Configuration
const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
});

export default withPWAConfig(withNextIntl(nextConfig));
