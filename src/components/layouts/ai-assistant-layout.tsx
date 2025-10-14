'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, Info, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Tipos para el contexto de la aplicación
 */
interface AppContext {
  /** Nombre del proyecto actual */
  projectName: string;
  /** Stack tecnológico utilizado */
  techStack: string[];
  /** Estado actual de la aplicación */
  currentState: 'idle' | 'loading' | 'processing' | 'error' | 'success';
  /** Progreso actual (0-100) */
  progress?: number;
  /** Mensaje de estado actual */
  statusMessage?: string;
}

/**
 * Información agrupada por proximidad
 */
interface ProximityGroup {
  /** Título del grupo */
  title: string;
  /** Elementos relacionados */
  items: Array<{
    label: string;
    value: string | number;
    status?: 'success' | 'warning' | 'error' | 'info';
  }>;
  /** Prioridad del grupo (para atención selectiva) */
  priority: 'critical' | 'high' | 'medium' | 'low';
}

/**
 * Props del componente AIAssistantLayout
 */
interface AIAssistantLayoutProps {
  /** Contenido principal del layout */
  children: ReactNode;
  /** Contexto de la aplicación */
  appContext: AppContext;
  /** Grupos de información relacionada */
  proximityGroups?: ProximityGroup[];
  /** Callback para acciones críticas */
  onCriticalAction?: (action: string) => void;
  /** Mostrar panel de contexto */
  showContextPanel?: boolean;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Componente que implementa las Leyes de IA para Desarrollo Asistido:
 * - Ley de Claridad de Contexto: Proporciona contexto claro sobre el estado de la aplicación
 * - Ley de Proximidad de Información: Agrupa información relacionada
 * - Ley de Feedback Inmediato: Muestra progreso y estado en tiempo real
 * - Ley de Atención Selectiva: Resalta elementos críticos
 *
 * @example
 * ```tsx
 * const appContext = {
 *   projectName: "Mi App",
 *   techStack: ["React", "TypeScript", "Next.js"],
 *   currentState: "processing",
 *   progress: 75,
 *   statusMessage: "Compilando componentes..."
 * };
 *
 * const groups = [
 *   {
 *     title: "Estado del Sistema",
 *     priority: "critical",
 *     items: [
 *       { label: "Build Status", value: "Success", status: "success" },
 *       { label: "Tests", value: "15/15", status: "success" }
 *     ]
 *   }
 * ];
 *
 * <AIAssistantLayout
 *   appContext={appContext}
 *   proximityGroups={groups}
 *   showContextPanel={true}
 * >
 *   <div>Contenido principal</div>
 * </AIAssistantLayout>
 * ```
 */
export function AIAssistantLayout({
  children,
  appContext,
  proximityGroups = [],
  onCriticalAction,
  showContextPanel = true,
  className,
}: AIAssistantLayoutProps) {
  const t = useTranslations('common');

  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [feedbackHistory, setFeedbackHistory] = useState<string[]>([]);

  // Ley de Feedback Inmediato: Actualizar timestamp en cambios
  useEffect(() => {
    setLastUpdate(new Date());
    if (appContext.statusMessage) {
      setFeedbackHistory(prev => [
        ...prev.slice(-4), // Mantener solo los últimos 5 mensajes
        `${new Date().toLocaleTimeString()}: ${appContext.statusMessage}`,
      ]);
    }
  }, [appContext.currentState, appContext.progress, appContext.statusMessage]);

  // Ley de Atención Selectiva: Filtrar grupos críticos
  const criticalGroups = proximityGroups.filter(
    group => group.priority === 'critical'
  );
  const nonCriticalGroups = proximityGroups.filter(
    group => group.priority !== 'critical'
  );

  // Obtener icono de estado
  const getStatusIcon = (state: AppContext['currentState']) => {
    switch (state) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'loading':
      case 'processing':
        return <Clock className="h-4 w-4 animate-spin text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  // Obtener color de prioridad
  const getPriorityColor = (priority: ProximityGroup['priority']) => {
    switch (priority) {
      case 'critical':
        return 'border-red-500 bg-red-50 dark:bg-red-950';
      case 'high':
        return 'border-orange-500 bg-orange-50 dark:bg-orange-950';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'low':
        return 'border-gray-300 bg-gray-50 dark:bg-gray-950';
    }
  };

  return (
    <div className={cn('bg-background flex min-h-screen', className)}>
      {/* Panel de Contexto - Ley de Claridad de Contexto */}
      {showContextPanel && (
        <aside className="bg-muted/30 w-80 space-y-4 border-r p-4">
          {/* Contexto Principal */}
          <Card className="border-primary/20 border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="text-primary h-5 w-5" />
                Contexto de la Aplicación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  {t('project')}
                </p>
                <p className="font-semibold">{appContext.projectName}</p>
              </div>

              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Stack Tecnológico
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {appContext.techStack.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Estado Actual - Ley de Feedback Inmediato */}
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  {t('currentStatus')}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  {getStatusIcon(appContext.currentState)}
                  <span className="font-medium capitalize">
                    {appContext.currentState}
                  </span>
                </div>
                {appContext.progress !== undefined && (
                  <div className="mt-2">
                    <div className="text-muted-foreground mb-1 flex justify-between text-xs">
                      <span>{t('progress')}</span>
                      <span>{appContext.progress}%</span>
                    </div>
                    <div className="bg-secondary h-2 w-full rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${appContext.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="text-muted-foreground text-xs">
                Última actualización: {lastUpdate.toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>

          {/* Grupos Críticos - Ley de Atención Selectiva */}
          {criticalGroups.map((group, index) => (
            <Card
              key={`critical-${index}`}
              className={cn('border-2', getPriorityColor(group.priority))}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {group.title}
                  <Badge variant="destructive" className="text-xs">
                    CRÍTICO
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{item.label}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{item.value}</span>
                      {item.status && (
                        <div
                          className={cn(
                            'h-2 w-2 rounded-full',
                            item.status === 'success' && 'bg-green-500',
                            item.status === 'warning' && 'bg-yellow-500',
                            item.status === 'error' && 'bg-red-500',
                            item.status === 'info' && 'bg-blue-500'
                          )}
                        />
                      )}
                    </div>
                  </div>
                ))}
                {onCriticalAction && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="mt-2 w-full"
                    onClick={() => onCriticalAction(group.title)}
                  >
                    Acción Requerida
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Grupos No Críticos - Ley de Proximidad de Información */}
          {nonCriticalGroups.map((group, index) => (
            <Card
              key={`group-${index}`}
              className={cn('border', getPriorityColor(group.priority))}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{group.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between"
                  >
                    <span className="text-muted-foreground text-sm">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* Historial de Feedback */}
          {feedbackHistory.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{t('recentActivity')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {feedbackHistory.slice(-3).map((message, index) => (
                    <p key={index} className="text-muted-foreground text-xs">
                      {message}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </aside>
      )}

      {/* Contenido Principal */}
      <main className="flex-1 p-6">
        {/* Barra de Estado Superior */}
        <div className="bg-muted/50 mb-6 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(appContext.currentState)}
              <div>
                <h2 className="font-semibold">{appContext.projectName}</h2>
                {appContext.statusMessage && (
                  <p className="text-muted-foreground text-sm">
                    {appContext.statusMessage}
                  </p>
                )}
              </div>
            </div>

            {criticalGroups.length > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {criticalGroups.length} Crítico
                {criticalGroups.length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>

        {/* Contenido */}
        {children}
      </main>
    </div>
  );
}

export type { AIAssistantLayoutProps, AppContext, ProximityGroup };
