'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare } from 'lucide-react';
import { Empty } from '@/components/ui/empty';

/**
 * Messages dashboard page component
 */
export default function MessagesPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('navigation.messages')}
        </h1>
        <p className="text-muted-foreground">{t('messages.subtitle')}</p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center">
        <Empty
          icon={MessageSquare}
          title={t('messages.empty.title')}
          description={t('messages.empty.description')}
        />
      </div>
    </div>
  );
}
