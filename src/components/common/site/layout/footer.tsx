'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/stores/auth-store';

/**
 * Main footer component
 */
export function Footer() {
  const t = useTranslations('navigation');
  const tFooter = useTranslations('footer');
  const { locale } = useAuthStore();

  const navigation = {
    main: [
      { name: t('home'), href: `/${locale || 'en'}` },
      { name: t('about'), href: `/${locale || 'en'}/about` },
      { name: t('features'), href: `/${locale || 'en'}/features` },
      { name: t('contact'), href: `/${locale || 'en'}/contact` },
    ],
  };

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href={`/${locale || 'en'}`}
              className="flex items-center space-x-2"
            >
              <span className="text-lg font-bold">{tFooter('brand.name')}</span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-md text-sm">
              {tFooter('brand.description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold">
              {tFooter('sections.navigation')}
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.main.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold">
              {tFooter('sections.resources')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Next.js
                </Link>
              </li>
              <li>
                <Link
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Shadcn/ui
                </Link>
              </li>
              <li>
                <Link
                  href="https://clerk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Clerk
                </Link>
              </li>
              <li>
                <Link
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Tailwind CSS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {tFooter('brand.name')}.{' '}
            {tFooter('copyright')}
          </p>
          <p className="text-muted-foreground mt-2 text-sm md:mt-0">
            {tFooter('builtWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
