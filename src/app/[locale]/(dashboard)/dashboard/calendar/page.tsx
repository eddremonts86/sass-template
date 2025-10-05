'use client';

import { useTranslations } from 'next-intl';
import { Calendar } from 'lucide-react';
import { Empty } from '@/components/ui/empty';

/**
 * Calendar dashboard page component
 */
export default function CalendarPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('nav.calendar', { default: 'Calendario' })}
        </h1>
        <p className="text-muted-foreground">
          {t('calendar.subtitle', {
            default: 'Gestiona eventos, citas y programación',
          })}
        </p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center">
        <Empty
          icon={Calendar}
          title={t('calendar.empty.title', {
            default: 'Calendario de Eventos',
          })}
          description={t('calendar.empty.description', {
            default:
              'Aquí se mostrará un calendario interactivo con opciones para crear eventos, programar citas, establecer recordatorios y gestionar la agenda. Próximamente estará disponible.',
          })}
        />
      </div>
    </div>
  );
}
