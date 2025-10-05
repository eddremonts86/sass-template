'use client';

import { useTranslations } from 'next-intl';
import { Users } from 'lucide-react';
import { Empty } from '@/components/ui/empty';

/**
 * Users dashboard page component
 */
export default function UsersPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('nav.users', { default: 'Usuarios' })}
        </h1>
        <p className="text-muted-foreground">
          {t('users.subtitle', {
            default: 'Gestiona usuarios, permisos y roles del sistema',
          })}
        </p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center">
        <Empty
          icon={Users}
          title={t('users.empty.title', { default: 'Gestión de Usuarios' })}
          description={t('users.empty.description', {
            default:
              'Aquí se mostrará una tabla con todos los usuarios registrados, opciones para editar perfiles, asignar roles y gestionar permisos. Próximamente estará disponible.',
          })}
        />
      </div>
    </div>
  );
}
