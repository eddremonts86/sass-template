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
        title={t('apiDocs.title', { default: 'Documentación API' })}
        description={t('apiDocs.description', {
          default:
            'Esta página contendrá la documentación completa de la API, endpoints disponibles, ejemplos de uso, autenticación y guías para desarrolladores. Próximamente estará disponible.',
        })}
        action={{
          label: t('apiDocs.cta', { default: 'Volver al Inicio' }),
          onClick: () => window.history.back(),
        }}
      />
    </PageSection>
  );
}
