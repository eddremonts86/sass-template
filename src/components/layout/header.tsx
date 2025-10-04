'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { UserButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { LanguageToggle } from '@/components/common/language-toggle';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth-store';

/**
 * Main header component with navigation and user controls
 */
export function Header() {
  const t = useTranslations('navigation');
  const tAuth = useTranslations('auth');
  const tHeader = useTranslations('header');
  const { isSignedIn } = useAuth();
  const { locale } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('home'), href: `/${locale || 'en'}` },
    { name: t('about'), href: `/${locale || 'en'}/about` },
    { name: t('features'), href: `/${locale || 'en'}/features` },
    { name: t('contact'), href: `/${locale || 'en'}/contact` },
  ];

  const authNavigation = [
    { name: t('dashboard'), href: `/${locale || 'en'}/dashboard` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 hidden md:flex">
          <Link href={`/${locale || 'en'}`} className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              {tHeader('brand.name')}
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">{tHeader('menu.toggle')}</span>
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </Link>
            ))}
            {isSignedIn && authNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />
            
            {isSignedIn ? (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/${locale || 'en'}/sign-in`}>
                    {tAuth('signIn')}
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/${locale || 'en'}/sign-up`}>
                    {tAuth('signUp')}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 z-50 bg-background border-b border-border md:hidden">
            <nav className="container py-4">
              <div className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {isSignedIn && authNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                  
                  {isSignedIn ? (
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "h-8 w-8"
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/${locale || 'en'}/sign-in`}>
                          {tAuth('signIn')}
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/${locale || 'en'}/sign-up`}>
                          {tAuth('signUp')}
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}