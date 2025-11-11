'use client';

import { useTranslations } from 'next-intl';
import { Headphones } from 'lucide-react';
import { Empty } from '@/components/ui/empty';
import { PageSection } from '@/components/common/containers';

/**
 * Support page component
 */
export default function SupportPage() {
  const t = useTranslations('pages');

  return (
    <PageSection padding="xl" className="min-h-[60vh]">
      <Empty
        icon={Headphones}
        title={t('support.title')}
        description={t('support.description')}
        action={{
          label: t('support.cta'),
          onClick: () => window.history.back(),
        }}
      />
    </PageSection>
  );
}
