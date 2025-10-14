'use client';

import { useTranslations } from 'next-intl';
import { BookOpen } from 'lucide-react';
import { Empty } from '@/components/ui/empty';
import { PageSection } from '@/components/common/containers';

/**
 * Documentation page component
 */
export default function DocsPage() {
  const t = useTranslations('pages');

  return (
    <PageSection padding="xl" className="min-h-[60vh]">
      <Empty
        icon={BookOpen}
        title={t('docs.title')}
        description={t('docs.description')}
        action={{
          label: t('docs.cta'),
          onClick: () => window.history.back()
        }}
      />
    </PageSection>
  );
}