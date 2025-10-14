'use client';

import { useTranslations } from 'next-intl';
import { HelpCircle } from 'lucide-react';
import { Empty } from '@/components/ui/empty';

/**
 * Help dashboard page component
 */
export default function HelpPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('navigation.help')}
        </h1>
        <p className="text-muted-foreground">{t('help.subtitle')}</p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center">
        <Empty
          icon={HelpCircle}
          title={t('help.empty.title')}
          description={t('help.empty.description')}
        />
      </div>
    </div>
  );
}
