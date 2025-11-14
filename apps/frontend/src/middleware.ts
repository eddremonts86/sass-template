import { clerkMiddleware } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { isProtectedRoute } from './isProtectedRoute';
import { routing } from './lib/i18n/routing';

// Create i18n middleware
const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware(
  async (auth, req) => {
    // Only protect specific routes (dashboard, profile, settings)
    // All other routes (home, sign-in, sign-up) are public
    if (isProtectedRoute(req)) {
      await auth.protect();
    }

    // Run i18n middleware for all requests
    return intlMiddleware(req);
  },
  {
    // Reduce header size by using short session token
    debug: false,
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
