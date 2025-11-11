import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children, params } = props;
  // Next.js dynamic route params can be async in RSC; ensure resolution
  const { locale } = await params;

  const { userId } = await auth();
  if (process.env.NODE_ENV !== 'production') {
    console.log('[dashboard layout] userId', userId);
  }

  // If unauthenticated, redirect to locale-specific sign-in
  if (!userId) {
    redirect(`/${locale}/sign-in`);
  }

  return children;
}
