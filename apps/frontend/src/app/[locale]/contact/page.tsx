'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { PublicLayout } from '@/components/layouts/public-layout';
import { PageSection } from '@/components/common/containers/PageSection';
import { Empty } from '@/components/ui/empty';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('pages.contact');
  const router = useRouter();

  return (
    <PublicLayout>
      <PageSection>
        <Empty
          icon={Mail}
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
