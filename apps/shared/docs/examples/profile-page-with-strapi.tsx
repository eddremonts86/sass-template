/**
 * Example page using Strapi in Server Component
 * src/app/[locale]/profile/page.tsx
 */

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getTemplateUserByClerkId } from '@/lib/strapi';
import { UserProfileCard } from '@/components/common/user-profile-card';

export default async function ProfilePage() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect('/sign-in');
  }

  // Get user data from Strapi
  const strapiUser = await getTemplateUserByClerkId(clerkUser.id);

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          {strapiUser ? (
            <div className="rounded-lg border p-4">
              <dl className="space-y-2">
                <div>
                  <dt className="text-muted-foreground text-sm font-medium">
                    Email
                  </dt>
                  <dd className="text-sm">{strapiUser.email}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-sm font-medium">
                    First Name
                  </dt>
                  <dd className="text-sm">
                    {strapiUser.firstName || 'Not specified'}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-sm font-medium">
                    Last Name
                  </dt>
                  <dd className="text-sm">
                    {strapiUser.lastName || 'Not specified'}
                  </dd>
                </div>
                {strapiUser.username && (
                  <div>
                    <dt className="text-muted-foreground text-sm font-medium">
                      Username
                    </dt>
                    <dd className="text-sm">@{strapiUser.username}</dd>
                  </div>
                )}
              </dl>
            </div>
          ) : (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">
                Your profile is not yet synced with Strapi. This may take a few
                moments.
              </p>
            </div>
          )}
        </div>

        {/* Client component with React Query */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Client View</h2>
          <UserProfileCard />
        </div>
      </div>
    </div>
  );
}
