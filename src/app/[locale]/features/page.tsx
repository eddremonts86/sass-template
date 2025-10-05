'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { PublicLayout } from '@/components/layouts/public-layout';
import { PageSection } from '@/components/common/containers/PageSection';
import { Empty } from '@/components/ui/empty';
import { Zap } from 'lucide-react';

export default function FeaturesPage() {
  const t = useTranslations('pages.features');
  const router = useRouter();

  return (
    <PublicLayout>
      <PageSection>
        <Empty
          icon={Zap}
          title={t('title')}
          description={t('description')}
          action={{
            label: t('backToHome'),
            onClick: () => router.push('/'),
          }}
        />
      </PageSection>
    </PublicLayout>
  );
}
