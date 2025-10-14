'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import { NAVIGATION } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DashboardSidebarProps {
  className?: string;
}

/**
 * Dashboard sidebar component with navigation
 */
export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const t = useTranslations();
  const tSidebar = useTranslations('sidebar');
  const pathname = usePathname();
  const { sidebarCollapsed, locale } = useAuthStore();

  const sidebarItems = NAVIGATION.main.map(item => ({
    title: t(item.translationKey as string),
    href: `/${locale}${item.href}`,
    icon: item.icon,
  }));

  const bottomItems = NAVIGATION.secondary.map(item => ({
    title: t(item.translationKey as string),
    href: `/${locale}${item.href}`,
    icon: item.icon,
  }));

  return (
    <div
      className={cn(
        'bg-background flex h-full flex-col border-r transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-4">
        <Link href={`/${locale}/dashboard`} className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
            <span className="text-sm font-bold">T</span>
          </div>
          {!sidebarCollapsed && (
            <span className="font-semibold">{tSidebar('brand.name')}</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Button
                key={item.href}
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  sidebarCollapsed ? 'px-2' : 'px-3'
                )}
                asChild
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  {!sidebarCollapsed && (
                    <span className="ml-2">{item.title}</span>
                  )}
                </Link>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Bottom navigation */}
      <div className="border-t px-3 py-4">
        <nav className="space-y-2">
          {bottomItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Button
                key={item.href}
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  sidebarCollapsed ? 'px-2' : 'px-3'
                )}
                asChild
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  {!sidebarCollapsed && (
                    <span className="ml-2">{item.title}</span>
                  )}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
