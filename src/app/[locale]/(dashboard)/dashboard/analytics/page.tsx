'use client';

import { useTranslations } from 'next-intl';
import { BarChart3 } from 'lucide-react';
import { Empty } from '@/components/ui/empty';

/**
 * Analytics dashboard page component
 */
export default function AnalyticsPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('nav.analytics', { default: 'Analytics' })}
        </h1>
        <p className="text-muted-foreground">
          {t('analytics.subtitle', {
            default: 'Visualiza métricas y estadísticas de tu aplicación',
          })}
        </p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center">
        <Empty
          icon={BarChart3}
          title={t('analytics.empty.title', { default: 'Analytics Dashboard' })}
          description={t('analytics.empty.description', {
            default:
              'Aquí se mostrarán gráficos, métricas de rendimiento, estadísticas de usuarios y análisis detallados de la aplicación. Próximamente estará disponible.',
          })}
        />
      </div>
    </div>
  );
}
