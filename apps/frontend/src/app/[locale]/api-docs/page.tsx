'use client';

import { useTranslations } from 'next-intl';
import { Code } from 'lucide-react';
import { Empty } from '@/components/ui/empty';
import { PageSection } from '@/components/common/containers';

/**
 * API Documentation page component
 */
export default function ApiDocsPage() {
  const t = useTranslations('pages');

  return (
    <PageSection padding="xl" className="min-h-[60vh]">
      <Empty
        icon={Code}
        title={t('apiDocs.title')}
        description={t('apiDocs.description')}
        action={{
          label: t('apiDocs.cta'),
          onClick: () => window.history.back(),
        }}
      />
    </PageSection>
  );
}
