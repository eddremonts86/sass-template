import { createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes that REQUIRE authentication (dashboard, profile, etc.)
export const isProtectedRoute = createRouteMatcher([
  '/:locale/dashboard(.*)',
  '/:locale/profile(.*)',
  '/:locale/settings(.*)',
]);
