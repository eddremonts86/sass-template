'use client';

import { useAuthStore } from '@/stores/auth-store';
import { ClerkProvider, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

/**
 * Props for ClerkAuthProvider component
 */
interface ClerkAuthProviderProps {
  children: React.ReactNode;
}

/**
 * Internal component to sync Clerk user with Zustand store
 */
function UserSync() {
  const { user, isSignedIn } = useUser();
  const { setUser, setAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isSignedIn && user) {
      setUser({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        imageUrl: user.imageUrl || undefined,
      });
    } else {
      setUser(null);
      setAuthenticated(false);
    }
  }, [user, isSignedIn, setUser, setAuthenticated]);

  return null;
}

/**
 * Clerk authentication provider wrapper
 * Integrates Clerk.js with the application and syncs user state
 */
export function ClerkAuthProvider({ children }: ClerkAuthProviderProps) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      dynamic
      appearance={{
        baseTheme: undefined, // Will be handled by our theme system
        variables: {
          colorPrimary: 'hsl(var(--primary))',
          colorBackground: 'hsl(var(--background))',
          colorInputBackground: 'hsl(var(--background))',
          colorInputText: 'hsl(var(--foreground))',
        },
        elements: {
          formButtonPrimary:
            'bg-primary text-primary-foreground hover:bg-primary/90',
          card: 'bg-card text-card-foreground border border-border',
        },
      }}
    >
      <UserSync />
      {children}
    </ClerkProvider>
  );
}
