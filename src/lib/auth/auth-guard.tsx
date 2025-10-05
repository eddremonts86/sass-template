'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Props for AuthGuard component
 */
interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Authentication guard component
 * Protects routes that require authentication
 * Redirects unauthenticated users to sign-in page
 */
export function AuthGuard({
  children,
  fallback = <div>Loading...</div>,
  redirectTo = '/sign-in',
}: AuthGuardProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(redirectTo);
    }
  }, [isLoaded, isSignedIn, router, redirectTo]);

  // Show loading state while auth is being determined
  if (!isLoaded) {
    return <>{fallback}</>;
  }

  // Show loading state while redirecting
  if (!isSignedIn) {
    return <>{fallback}</>;
  }

  // User is authenticated, render children
  return <>{children}</>;
}

/**
 * Higher-order component version of AuthGuard
 * Usage: const ProtectedComponent = withAuthGuard(MyComponent);
 */
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<AuthGuardProps, 'children'>
) {
  return function ProtectedComponent(props: P) {
    return (
      <AuthGuard {...options}>
        <Component {...props} />
      </AuthGuard>
    );
  };
}
