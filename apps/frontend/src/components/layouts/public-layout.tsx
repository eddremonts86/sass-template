'use client';

import { ReactNode } from 'react';
import { Header } from '@/components/common/site/layout/header';
import { Footer } from '@/components/common/site/layout/footer';

interface PublicLayoutProps {
  children: ReactNode;
}

/**
 * Layout for public pages that includes header and footer
 */
export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
