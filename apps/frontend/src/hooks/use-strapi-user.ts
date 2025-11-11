/**
 * Hook to get the current Strapi user synced with Clerk
 */

'use client';

import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

interface StrapiUser {
  id: number;
  clerkId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  imageUrl?: string | null;
  bio?: string | null;
  locale?: string | null;
  timezone?: string | null;
  isActive?: boolean;
  lastSignInAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Fetches the Strapi user based on the Clerk user
 */
async function fetchStrapiUser(clerkId: string): Promise<StrapiUser | null> {
  try {
    const response = await fetch(`/api/users/me?clerkId=${clerkId}`);

    if (!response.ok) {
      throw new Error('Error fetching Strapi user');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error fetching Strapi user:', error);
    return null;
  }
}

/**
 * Hook to access the authenticated user's Strapi user
 */
export function useStrapiUser() {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();

  const {
    data: strapiUser,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['strapiUser', clerkUser?.id],
    queryFn: () => fetchStrapiUser(clerkUser!.id),
    enabled: isClerkLoaded && !!clerkUser,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });

  return {
    strapiUser,
    clerkUser,
    isLoading: !isClerkLoaded || isLoading,
    error,
    refetch,
    isAuthenticated: !!clerkUser,
  };
}
