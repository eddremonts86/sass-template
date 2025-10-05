import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/lib/i18n/config';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/settings(.*)',
  '/(en|es|da)/dashboard(.*)',
  '/(en|es|da)/profile(.*)',
  '/(en|es|da)/settings(.*)',
]);

// Define public routes that should bypass authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/about',
  '/contact',
  '/features',
  '/pricing',
  '/(en|es|da)',
  '/(en|es|da)/sign-in(.*)',
  '/(en|es|da)/sign-up(.*)',
  '/(en|es|da)/about',
  '/(en|es|da)/contact',
  '/(en|es|da)/features',
  '/(en|es|da)/pricing',
]);

export default clerkMiddleware(async (auth, req) => {
  // Handle internationalization first
  const intlResponse = intlMiddleware(req);

  // If it's a public route, continue
  if (isPublicRoute(req)) {
    return intlResponse;
  }

  // If the route is protected and user is not authenticated, redirect to sign-in
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  return intlResponse;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
