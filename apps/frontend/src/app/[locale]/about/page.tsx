'use client';

import { PublicLayout } from '@/components/layouts/public-layout';
import { PageSection } from '@/components/common/containers/PageSection';
import { AboutContent } from '@/components/about/about-content';

export default function AboutPage() {
  return (
    <PublicLayout>
      <PageSection>
        <AboutContent />
      </PageSection>
    </PublicLayout>
  );
}
