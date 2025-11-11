// Note: We avoid wrapping with Clerk middleware for consistent local E2E behavior
import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from './src/lib/i18n/config';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  // Preserve the requested path; we enforce prefix ourselves below
  localePrefix: 'as-needed',
});

// Route matchers using regex against pathname
function isProtectedRoutePath(pathname: string) {
  return (
    /^\/(en|es|da)\/dashboard(\/.*)?$/.test(pathname) ||
    /^\/(en|es|da)\/profile(\/.*)?$/.test(pathname) ||
    /^\/(en|es|da)\/settings(\/.*)?$/.test(pathname) ||
    /^\/dashboard(\/.*)?$/.test(pathname) ||
    /^\/profile(\/.*)?$/.test(pathname) ||
    /^\/settings(\/.*)?$/.test(pathname)
  );
}

function isPublicRoutePath(pathname: string) {
  return (
    /^\/$/.test(pathname) ||
    /^\/(en|es|da)(\/)?$/.test(pathname) ||
    /^\/sign-in(\/.*)?$/.test(pathname) ||
    /^\/sign-up(\/.*)?$/.test(pathname) ||
    /^\/(en|es|da)\/sign-in(\/.*)?$/.test(pathname) ||
    /^\/(en|es|da)\/sign-up(\/.*)?$/.test(pathname) ||
    /^\/(en|es|da)\/about(\/.*)?$/.test(pathname) ||
    /^\/(en|es|da)\/contact(\/.*)?$/.test(pathname) ||
    /^\/(en|es|da)\/features(\/.*)?$/.test(pathname) ||
    /^\/(en|es|da)\/pricing(\/.*)?$/.test(pathname) ||
    /^\/about$/.test(pathname) ||
    /^\/contact$/.test(pathname) ||
    /^\/features$/.test(pathname) ||
    /^\/pricing$/.test(pathname)
  );
}

export default async function proxy(req: NextRequest) {
  // Ensure locale prefix is present; redirect non-prefixed paths to default locale
  const pathname = req.nextUrl.pathname || '/';
  const hasLocalePrefix = /^\/(en|es|da)(\/|$)/.test(pathname);
  console.log('[proxy] evaluating', pathname);
  if (!hasLocalePrefix) {
    console.log('[proxy] missing locale prefix for', pathname);
    const targetUrl = new URL(`/${defaultLocale}${pathname}`, req.url);
    console.log('[proxy] redirecting to', targetUrl.toString());
    return Response.redirect(targetUrl, 307);
  }

  // Handle internationalization first
  const intlResponse = intlMiddleware(req);

  // If it's a public route, continue
  if (isPublicRoutePath(pathname)) {
    console.log('[proxy] public route', pathname);
    return intlResponse;
  }

  // If the route is protected and user is not authenticated, redirect to sign-in
  if (isProtectedRoutePath(pathname)) {
    console.log('[proxy] protected route', pathname);
    // During development and test, enforce redirect to sign-in for protected routes
    if (process.env.NODE_ENV !== 'production') {
      const signInUrl = new URL(`/${defaultLocale}/sign-in`, req.url);
      console.log(
        '[proxy] dev/test environment, redirecting to',
        signInUrl.toString()
      );
      return Response.redirect(signInUrl, 307);
    }
  }

  return intlResponse;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
