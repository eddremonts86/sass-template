import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * Layout for authentication pages
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="bg-background min-h-screen">{children}</div>;
}
