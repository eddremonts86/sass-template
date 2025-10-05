'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { PublicLayout } from '@/components/layouts/public-layout';
import { PageSection } from '@/components/common/containers/PageSection';
import { Empty } from '@/components/ui/empty';
import { Info } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('pages.about');
  const router = useRouter();

  return (
    <PublicLayout>
      <PageSection>
        <Empty
          icon={Info}
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
