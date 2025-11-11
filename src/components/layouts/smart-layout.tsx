'use client';

import { Footer } from '@/components/common/site/layout/footer';
import { Header } from '@/components/common/site/layout/header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressiveCard } from '@/components/ui/progressive-card';
import { useAIGuidance, type TaskFragment } from '@/hooks/use-ai-guidance';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { AIAssistantLayout } from './ai-assistant-layout';

/**
 * Configuración del layout inteligente
 */
interface SmartLayoutConfig {
  /** Mostrar asistente de IA */
  showAIAssistant: boolean;
  /** Mostrar progreso de tareas */
  showTaskProgress: boolean;
  /** Habilitar navegación inteligente */
  enableSmartNavigation: boolean;
  /** Mostrar métricas de rendimiento */
  showPerformanceMetrics: boolean;
  /** Modo de layout */
  layoutMode: 'public' | 'dashboard' | 'minimal' | 'ai-assisted';
}

/**
 * Props del SmartLayout
 */
interface SmartLayoutProps {
  /** Contenido del layout */
  children: ReactNode;
  /** Configuración del layout */
  config?: Partial<SmartLayoutConfig>;
  /** Título de la página */
  pageTitle?: string;
  /** Descripción de la página */
  pageDescription?: string;
  /** Clase CSS adicional */
  className?: string;
}

/**
 * Layout inteligente que implementa las 10 Leyes de IA para Desarrollo Asistido
 *
 * Características:
 * - Integra AIAssistantLayout para contexto y feedback
 * - Usa SmartButton para acciones simplificadas
 * - Implementa ProgressiveCard para tareas complejas
 * - Aplica useAIGuidance para toda la experiencia
 * - Navegación adaptativa basada en el contexto del usuario
 * - Métricas de rendimiento en tiempo real
 * - Feedback inmediato para todas las acciones
 *
 * @example
 * ```tsx
 * // Layout público básico
 * <SmartLayout
 *   config={{ layoutMode: 'public' }}
 *   pageTitle="Inicio"
 *   pageDescription="Página principal de la aplicación"
 * >
 *   <HomePage />
 * </SmartLayout>
 *
 * // Layout con asistente de IA completo
 * <SmartLayout
 *   config={{
 *     layoutMode: 'ai-assisted',
 *     showAIAssistant: true,
 *     showTaskProgress: true,
 *     enableSmartNavigation: true,
 *     showPerformanceMetrics: true
 *   }}
 *   pageTitle="Dashboard"
 * >
 *   <DashboardPage />
 * </SmartLayout>
 * ```
 */
export function SmartLayout({
  children,
  config = {},
  className,
}: SmartLayoutProps) {
  const t = useTranslations('common');
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  // Configuración por defecto
  const defaultConfig: SmartLayoutConfig = {
    showAIAssistant: false,
    showTaskProgress: false,
    enableSmartNavigation: true,
    showPerformanceMetrics: false,
    layoutMode: 'public',
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Hook de guía de IA
  const {
    taskFragments,
    performance,
    updateContext,
    addFeedback,
    simplifyOptions,
    fragmentTask,
    measureResponseTime,
  } = useAIGuidance({
    workingMemoryLimit: 7,
    maxPrimaryOptions: 5,
    defaultFeedbackDuration: 3000,
    performanceThreshold: 400,
  });

  // Estado local
  const [currentTasks, setCurrentTasks] = useState<TaskFragment[]>([]);

  // Actualizar contexto cuando cambia la página o usuario
  useEffect(() => {
    if (isLoaded) {
      const startTime = Date.now();

      updateContext({
        currentPage: pathname,

        appState: 'ready',
        settings: {
          theme: 'light', // Podría venir de un contexto de tema
          language: 'es',
          notifications: true,
        },
        navigationHistory: [pathname],
      });

      // Medir tiempo de carga de página
      setTimeout(() => {
        measureResponseTime('page-load', startTime);
      }, 100);
    }
  }, [pathname, user, isLoaded, updateContext, measureResponseTime]);

  // Configurar opciones de navegación inteligente
  useEffect(() => {
    if (finalConfig.enableSmartNavigation) {
      const navigationOptions = [
        {
          id: 'home',
          label: 'Inicio',
          action: () => (window.location.href = '/'),
          priority: 'high' as const,
          disabled: pathname === '/',
        },
        {
          id: 'dashboard',
          label: 'Dashboard',
          action: () => (window.location.href = '/dashboard'),
          priority: user ? ('high' as const) : ('low' as const),
          disabled: pathname === '/dashboard',
        },
        {
          id: 'profile',
          label: 'Perfil',
          action: () => (window.location.href = '/profile'),
          priority: user ? ('medium' as const) : ('low' as const),
          disabled: !user,
        },
        {
          id: 'settings',
          label: 'Configuración',
          action: () => (window.location.href = '/settings'),
          priority: 'medium' as const,
        },
        {
          id: 'help',
          label: 'Ayuda',
          action: () => (window.location.href = '/help'),
          priority: 'low' as const,
        },
      ];

      simplifyOptions(navigationOptions);
    }
  }, [pathname, user, finalConfig.enableSmartNavigation, simplifyOptions]);

  // Crear tareas de ejemplo para demostración
  useEffect(() => {
    if (finalConfig.showTaskProgress && taskFragments.length === 0) {
      const demoTasks = fragmentTask('onboarding', [
        {
          title: 'Configurar perfil',
          description: 'Completar información básica del usuario',
          estimatedMinutes: 5,
          priority: 'high',
        },
        {
          title: 'Explorar funcionalidades',
          description: 'Conocer las características principales',
          estimatedMinutes: 10,
          dependencies: ['onboarding-fragment-0'],
          priority: 'medium',
        },
        {
          title: 'Personalizar configuración',
          description: 'Ajustar preferencias y notificaciones',
          estimatedMinutes: 3,
          dependencies: ['onboarding-fragment-1'],
          priority: 'low',
        },
      ]);

      setCurrentTasks(demoTasks);
    }
  }, [finalConfig.showTaskProgress, taskFragments.length, fragmentTask]);

  // Removed unused handleNavigation function

  // Renderizar contenido según el modo de layout
  const renderContent = () => {
    switch (finalConfig.layoutMode) {
      case 'ai-assisted':
        return (
          <AIAssistantLayout
            appContext={{
              projectName: t('smartLayoutApp'),
              techStack: [t('react'), t('typescript'), t('tailwind')],
              currentState: 'idle',
            }}
            className="min-h-screen"
          >
            {children}
          </AIAssistantLayout>
        );

      case 'dashboard':
        return (
          <div className="bg-background min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                {/* Sidebar con métricas */}
                <div className="space-y-4 lg:col-span-1">
                  {finalConfig.showPerformanceMetrics && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          {t('performance')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span>{t('responseTime')}</span>
                          <Badge
                            variant={
                              performance.averageResponseTime > 400
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {Math.round(performance.averageResponseTime)}ms
                          </Badge>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>{t('completedTasks')}</span>
                          <span>
                            {Math.round(performance.taskCompletionRate * 100)}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {finalConfig.showTaskProgress && currentTasks.length > 0 && (
                    <ProgressiveCard
                      title={t('pendingTasks')}
                      description={t('completeTasksDescription')}
                      subtasks={currentTasks}
                      progression={{
                        showOverallProgress: true,
                        showSubtaskProgress: true,
                        allowSkipping: true,
                        validateDependencies: true,
                        viewMode: 'detailed',
                      }}
                      onSubtaskComplete={id => {
                        addFeedback('success', `Tarea ${id} completada`, 2000);
                      }}
                      onSubtaskStart={id => {
                        addFeedback('info', `Iniciando tarea ${id}`, 1500);
                      }}
                      onTaskComplete={() => {
                        addFeedback('success', t('allTasksCompleted'), 3000);
                      }}
                      defaultExpanded={true}
                    />
                  )}
                </div>

                {/* Contenido principal */}
                <div className="lg:col-span-3">{children}</div>
              </div>
            </main>
            <Footer />
          </div>
        );

      case 'minimal':
        return (
          <div className="bg-background min-h-screen">
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        );

      default: // 'public'
        return (
          <div className="bg-background min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        );
    }
  };

  return <div className={cn('smart-layout', className)}>{renderContent()}</div>;
}

export type { SmartLayoutConfig, SmartLayoutProps };
