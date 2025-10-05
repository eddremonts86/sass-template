'use client';

import { useTranslations } from 'next-intl';
import { DollarSign } from 'lucide-react';
import { PageSection } from '@/components/common/containers/PageSection';
import { Empty } from '@/components/ui/empty';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const t = useTranslations('pages.pricing');
  const router = useRouter();

  return (
    <PageSection>
      <Empty
        icon={DollarSign}
        title={t('title')}
        description={t('description')}
        action={{
          label: t('backToHome'),
          onClick: () => router.push('/'),
        }}
      />
    </PageSection>
  );
}
