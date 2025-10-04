'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bell, Menu, Search, SidebarClose } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface DashboardHeaderProps {
  onToggleSidebar: () => void
  sidebarOpen: boolean
  onMobileMenuClick?: () => void
}

export function DashboardHeader({ onToggleSidebar, sidebarOpen, onMobileMenuClick }: DashboardHeaderProps) {
  const t = useTranslations('dashboard.header')
  const tDashboard = useTranslations('dashboard')

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            aria-label={t('toggleSidebar')}
          >
            {sidebarOpen ? <SidebarClose className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={tDashboard('searchPlaceholder')}
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </div>
          
          <nav className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onMobileMenuClick}
              aria-label={t('toggleMenu')}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" aria-label={t('notifications')}>
              <Bell className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}