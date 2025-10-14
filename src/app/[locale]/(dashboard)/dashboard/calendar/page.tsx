'use client';

import { useTranslations } from 'next-intl';
import { Calendar } from 'lucide-react';
import { Empty } from '@/components/ui/empty';

/**
 * Calendar dashboard page component
 */
export default function CalendarPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('navigation.calendar')}
        </h1>
        <p className="text-muted-foreground">{t('calendar.subtitle')}</p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center">
        <Empty
          icon={Calendar}
          title={t('calendar.empty.title')}
          description={t('calendar.empty.description')}
        />
      </div>
    </div>
  );
}
