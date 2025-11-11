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
 * Smart layout configuration
 */
interface SmartLayoutConfig {
  /** Show AI assistant */
  showAIAssistant: boolean;
  /** Show task progress */
  showTaskProgress: boolean;
  /** Enable smart navigation */
  enableSmartNavigation: boolean;
  /** Show performance metrics */
  showPerformanceMetrics: boolean;
  /** Layout mode */
  layoutMode: 'public' | 'dashboard' | 'minimal' | 'ai-assisted';
}

/**
 * Props for SmartLayout
 */
interface SmartLayoutProps {
  /** Layout content */
  children: ReactNode;
  /** Layout configuration */
  config?: Partial<SmartLayoutConfig>;
  /** Page title */
  pageTitle?: string;
  /** Page description */
  pageDescription?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * Smart layout that implements the 10 AI Laws for Assisted Development
 *
 * Features:
 * - Integrates AIAssistantLayout for context and feedback
 * - Uses SmartButton for simplified actions
 * - Implements ProgressiveCard for complex tasks
 * - Applies useAIGuidance for the entire experience
 * - Adaptive navigation based on user context
 * - Real-time performance metrics
 * - Immediate feedback for all actions
 *
 * @example
 * ```tsx
 * // Basic public layout
 * <SmartLayout
 *   config={{ layoutMode: 'public' }}
 *   pageTitle="Inicio"
 *   pageDescription="Página principal de la aplicación"
 * >
 *   <HomePage />
 * </SmartLayout>
 *
 * // Layout with full AI assistant
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

  // Default configuration
  const defaultConfig: SmartLayoutConfig = {
    showAIAssistant: false,
    showTaskProgress: false,
    enableSmartNavigation: true,
    showPerformanceMetrics: false,
    layoutMode: 'public',
  };

  const finalConfig = { ...defaultConfig, ...config };

  // AI guidance hook
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

  // Local state
  const [currentTasks, setCurrentTasks] = useState<TaskFragment[]>([]);

  // Update context when page or user changes
  useEffect(() => {
    if (isLoaded) {
      const startTime = Date.now();

      updateContext({
        currentPage: pathname,

        appState: 'ready',
        settings: {
          theme: 'light', // Could come from a theme context
          language: 'es',
          notifications: true,
        },
        navigationHistory: [pathname],
      });

      // Measure page load time
      setTimeout(() => {
        measureResponseTime('page-load', startTime);
      }, 100);
    }
  }, [pathname, user, isLoaded, updateContext, measureResponseTime]);

  // Configure smart navigation options
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

  // Create example tasks for demonstration
  useEffect(() => {
    if (finalConfig.showTaskProgress && taskFragments.length === 0) {
      const demoTasks = fragmentTask('onboarding', [
        {
          title: 'Configurar perfil',
          description: 'Complete basic user information',
          estimatedMinutes: 5,
          priority: 'high',
        },
        {
          title: 'Explorar funcionalidades',
          description: 'Learn about the main features',
          estimatedMinutes: 10,
          dependencies: ['onboarding-fragment-0'],
          priority: 'medium',
        },
        {
          title: 'Personalizar configuración',
          description: 'Adjust preferences and notifications',
          estimatedMinutes: 3,
          dependencies: ['onboarding-fragment-1'],
          priority: 'low',
        },
      ]);

      setCurrentTasks(demoTasks);
    }
  }, [finalConfig.showTaskProgress, taskFragments.length, fragmentTask]);

  // Removed unused handleNavigation function

  // Render content according to layout mode
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
                {/* Sidebar with metrics */}
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

                {/* Main content */}
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
