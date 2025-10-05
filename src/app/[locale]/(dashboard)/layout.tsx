'use client';

import { ReactNode, useState } from 'react';
import { AuthGuard } from '@/lib/auth/auth-guard';
import { DashboardHeader } from '@/components/features/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/features/dashboard/dashboard-sidebar';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * Layout for dashboard pages with authentication guard
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className={cn('hidden md:flex', !sidebarOpen && 'md:hidden')}>
          <DashboardSidebar />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <DashboardSidebar />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader
            onToggleSidebar={handleToggleSidebar}
            sidebarOpen={sidebarOpen}
            onMobileMenuClick={() => setMobileMenuOpen(true)}
          />

          <main
            className={cn(
              'bg-muted/10 flex-1 overflow-auto p-4 transition-all duration-300 lg:p-6'
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
