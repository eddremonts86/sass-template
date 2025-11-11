'use client';

import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/auth-store';
import {
  locales,
  localeLabels,
  localeFlags,
  type Locale,
} from '@/lib/i18n/config';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

/**
 * Language toggle component with dropdown menu
 * Allows switching between supported locales
 */
export function LanguageToggle() {
  const t = useTranslations('language');
  const currentLocale = useLocale() as Locale;
  const { setLocale } = useAuthStore();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);

    // Update URL with new locale
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.unshift('', newLocale);
    }

    const newPath = segments.join('/');
    // Force full page reload to update all translated content
    window.location.href = newPath;
  };

  const currentFlag = localeFlags[currentLocale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2">
          <span className="text-base">{currentFlag}</span>
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t('select')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map(localeOption => (
          <DropdownMenuItem
            key={localeOption}
            onClick={() => handleLocaleChange(localeOption)}
            className="flex items-center gap-2"
          >
            <span className="text-base">{localeFlags[localeOption]}</span>
            <span>{localeLabels[localeOption]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Simple language toggle button without dropdown
 * Cycles through available locales
 */
export function SimpleLanguageToggle() {
  const t = useTranslations('language');
  const currentLocale = useLocale() as Locale;
  const { setLocale } = useAuthStore();
  const pathname = usePathname();

  const handleToggle = () => {
    const currentIndex = locales.indexOf(currentLocale);
    const nextIndex = (currentIndex + 1) % locales.length;
    const newLocale = locales[nextIndex];

    setLocale(newLocale);

    // Update URL with new locale
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.unshift('', newLocale);
    }

    const newPath = segments.join('/');
    // Force full page reload to update all translated content
    window.location.href = newPath;
  };

  const currentFlag = localeFlags[currentLocale];

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="h-9 w-9 p-0"
    >
      <span className="text-base">{currentFlag}</span>
      <span className="sr-only">{t('toggle')}</span>
    </Button>
  );
}
