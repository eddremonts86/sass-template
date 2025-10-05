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
        title={t('docs.title', { default: 'Documentación' })}
        description={t('docs.description', { 
          default: 'Esta página contendrá la documentación completa de la aplicación, guías de uso, API reference y tutoriales. Próximamente estará disponible.' 
        })}
        action={{
          label: t('docs.cta', { default: 'Volver al Inicio' }),
          onClick: () => window.history.back()
        }}
      />
    </PageSection>
  );
}