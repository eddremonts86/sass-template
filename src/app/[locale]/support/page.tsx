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
        title={t('support.title', { default: 'Soporte Técnico' })}
        description={t('support.description', {
          default:
            'Esta página contendrá opciones de soporte técnico, chat en vivo, sistema de tickets, base de conocimientos y formas de contactar con nuestro equipo de soporte. Próximamente estará disponible.',
        })}
        action={{
          label: t('support.cta', { default: 'Volver al Inicio' }),
          onClick: () => window.history.back(),
        }}
      />
    </PageSection>
  );
}
