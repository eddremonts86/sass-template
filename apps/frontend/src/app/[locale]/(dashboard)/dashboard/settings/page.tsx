'use client';

import { useTranslations } from 'next-intl';
import { Settings } from 'lucide-react';
import { Empty } from '@/components/ui/empty';

/**
 * Settings dashboard page component
 */
export default function SettingsPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('nav.settings', { default: 'Configuración' })}
        </h1>
        <p className="text-muted-foreground">
          {t('settings.subtitle', {
            default: 'Personaliza la aplicación y gestiona preferencias',
          })}
        </p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center">
        <Empty
          icon={Settings}
          title={t('settings.empty.title', {
            default: 'Panel de Configuración',
          })}
          description={t('settings.empty.description', {
            default:
              'Aquí se mostrarán opciones para personalizar la aplicación, gestionar cuenta, configurar notificaciones, preferencias de privacidad y ajustes del sistema. Próximamente estará disponible.',
          })}
        />
      </div>
    </div>
  );
}
