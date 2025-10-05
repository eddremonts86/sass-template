'use client';

import { useTranslations } from 'next-intl';
import { FileText } from 'lucide-react';
import { Empty } from '@/components/ui/empty';

/**
 * Documents dashboard page component
 */
export default function DocumentsPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('nav.documents', { default: 'Documentos' })}
        </h1>
        <p className="text-muted-foreground">
          {t('documents.subtitle', {
            default: 'Gestiona archivos, documentos y recursos del sistema',
          })}
        </p>
      </div>

      <div className="flex min-h-[400px] items-center justify-center">
        <Empty
          icon={FileText}
          title={t('documents.empty.title', {
            default: 'Gestión de Documentos',
          })}
          description={t('documents.empty.description', {
            default:
              'Aquí se mostrará un explorador de archivos con opciones para subir, organizar, compartir y gestionar documentos. Incluirá funciones de búsqueda y filtrado. Próximamente estará disponible.',
          })}
        />
      </div>
    </div>
  );
}
