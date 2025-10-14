import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Configuración para el hook useAIGuidance
 * Implementa las 10 Leyes de IA para Desarrollo Asistido
 */
export interface AIGuidanceConfig {
  workingMemoryLimit: number;
  defaultFeedbackDuration: number;
  maxPrimaryOptions: number;
  autoValidateDependencies: boolean;
  consistencyMode: 'strict' | 'adaptive' | 'flexible';
  enableGradualProgression: boolean;
  performanceThreshold: number;
}

/**
 * Contexto de la aplicación para la Ley de Claridad de Contexto
 */
export interface AppContext {
  currentPage: string;
  appState: 'loading' | 'ready' | 'error' | 'offline';
  settings: Record<string, unknown>;
  navigationHistory: string[];
}

/**
 * Estado de feedback para la Ley de Feedback Inmediato
 */
export interface FeedbackState {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration: number;
  timestamp: number;
}

/**
 * Opciones simplificadas para la Ley de Simplicidad de Hick
 */
export interface SimplifiedOptions {
  primary: Array<{
    id: string;
    label: string;
    action: () => void;
    disabled?: boolean;
    priority: 'high' | 'medium' | 'low';
  }>;
  secondary?: Array<{
    id: string;
    label: string;
    action: () => void;
    disabled?: boolean;
    priority: 'high' | 'medium' | 'low';
  }>;
}

/**
 * Grupo de proximidad para la Ley de Proximidad de Información
 */
export interface ProximityGroup {
  id: string;
  title: string;
  items: Array<{
    id: string;
    content: unknown;
    relevance: number;
    lastAccessed?: number;
  }>;
  position: 'primary' | 'secondary' | 'contextual';
}

/**
 * Fragmento de tarea para la Ley de Fragmentación de Tareas
 */
export interface TaskFragment {
  id: string;
  title: string;
  description?: string;
  estimatedMinutes: number;
  dependencies: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  progress: number;
}

/**
 * Elemento de memoria de trabajo para la Ley de Memoria de Trabajo
 */
export interface WorkingMemoryItem {
  id: string;
  content: unknown;
  type: 'context' | 'action' | 'data' | 'instruction';
  priority: number;
  lastAccessed: number;
  ttl?: number;
}

/**
 * Elemento de atención para la Ley de Atención Selectiva
 */
export interface AttentionItem {
  id: string;
  element: string;
  reason: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  duration: number;
}

/**
 * Estado principal del hook
 */
export interface AIGuidanceState {
  context: AppContext;
  feedbacks: FeedbackState[];
  options: SimplifiedOptions;
  proximityGroups: ProximityGroup[];
  taskFragments: TaskFragment[];
  workingMemory: WorkingMemoryItem[];
  attentionItems: AttentionItem[];
  overallProgress: number;
  performance: {
    averageResponseTime: number;
    errorRate: number;
    taskCompletionRate: number;
    userSatisfaction: number;
  };
}

/**
 * Hook personalizado que implementa las 10 Leyes de IA para Desarrollo Asistido
 *
 * @param config Configuración opcional para personalizar el comportamiento
 * @returns Estado y funciones para gestionar la interacción usuario-IA
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const {
 *     context,
 *     feedbacks,
 *     addFeedback,
 *     simplifyOptions,
 *     fragmentTask,
 *     addToWorkingMemory
 *   } = useAIGuidance({
 *     workingMemoryLimit: 5,
 *     performanceThreshold: 300
 *   });
 *
 *   const handleComplexAction = async () => {
 *     const feedbackId = addFeedback('info', 'Procesando...');
 *
 *     try {
 *       // Lógica compleja aquí
 *       addFeedback('success', 'Operación completada');
 *     } catch (error) {
 *       addFeedback('error', 'Error en la operación');
 *     } finally {
 *       removeFeedback(feedbackId);
 *     }
 *   };
 *
 *   return (
 *     // UI que usa el contexto y estado del hook
 *   );
 * }
 * ```
 */
export function useAIGuidance(config: Partial<AIGuidanceConfig> = {}) {
  // Configuración por defecto
  const defaultConfig: AIGuidanceConfig = {
    workingMemoryLimit: 7,
    defaultFeedbackDuration: 3000,
    maxPrimaryOptions: 5,
    autoValidateDependencies: true,
    consistencyMode: 'adaptive',
    enableGradualProgression: true,
    performanceThreshold: 400,
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Estado principal
  const [state, setState] = useState<AIGuidanceState>({
    context: {
      currentPage: '/',
      appState: 'loading',
      settings: {},
      navigationHistory: [],
    },
    feedbacks: [],
    options: { primary: [] },
    proximityGroups: [],
    taskFragments: [],
    workingMemory: [],
    attentionItems: [],
    overallProgress: 0,
    performance: {
      averageResponseTime: 0,
      errorRate: 0,
      taskCompletionRate: 0,
      userSatisfaction: 0,
    },
  });

  // Referencias para timers y métricas
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const metricsRef = useRef<{
    responseTimes: number[];
    errors: number;
    completedTasks: number;
    totalTasks: number;
  }>({
    responseTimes: [],
    errors: 0,
    completedTasks: 0,
    totalTasks: 0,
  });

  // Ley 1: Claridad de Contexto
  const updateContext = useCallback((updates: Partial<AppContext>) => {
    setState(prev => ({
      ...prev,
      context: { ...prev.context, ...updates },
    }));
  }, []);

  // Ley 7: Feedback Inmediato
  const addFeedback = useCallback(
    (
      type: FeedbackState['type'],
      message: string,
      duration?: number
    ): string => {
      const id =
        'feedback-' +
        Date.now() +
        '-' +
        Math.random().toString(36).substr(2, 9);
      const feedbackDuration = duration ?? finalConfig.defaultFeedbackDuration;

      const feedback: FeedbackState = {
        id,
        type,
        message,
        duration: feedbackDuration,
        timestamp: Date.now(),
      };

      setState(prev => ({
        ...prev,
        feedbacks: [...prev.feedbacks, feedback],
      }));

      // Auto-remover feedback después de la duración especificada
      if (feedbackDuration > 0) {
        const timer = setTimeout(() => {
          removeFeedback(id);
        }, feedbackDuration);

        timersRef.current.set(id, timer);
      }

      return id;
    },
    [finalConfig.defaultFeedbackDuration, removeFeedback]
  );

  // Remover feedback
  const removeFeedback = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      feedbacks: prev.feedbacks.filter(f => f.id !== id),
    }));

    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  // Ley 4: Simplicidad de Hick - Simplificar opciones
  const simplifyOptions = useCallback(
    (
      allOptions: Array<{
        id: string;
        label: string;
        action: () => void;
        disabled?: boolean;
        priority: 'high' | 'medium' | 'low';
      }>
    ) => {
      // Ordenar por prioridad
      const sorted = allOptions.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

      // Separar en primarias y secundarias
      const primary = sorted.slice(0, finalConfig.maxPrimaryOptions);
      const secondary = sorted.slice(finalConfig.maxPrimaryOptions);

      const simplifiedOptions: SimplifiedOptions = {
        primary,
        secondary: secondary.length > 0 ? secondary : undefined,
      };

      setState(prev => ({
        ...prev,
        options: simplifiedOptions,
      }));

      return simplifiedOptions;
    },
    [finalConfig.maxPrimaryOptions]
  );

  // Ley 3: Proximidad de Información - Agrupar información relacionada
  const groupByProximity = useCallback(
    (
      items: Array<{
        id: string;
        content: unknown;
        category: string;
        relevance: number;
        lastAccessed?: number;
      }>
    ) => {
      const groups = new Map<string, ProximityGroup>();

      items.forEach(item => {
        if (!groups.has(item.category)) {
          groups.set(item.category, {
            id: item.category,
            title: item.category,
            items: [],
            position: 'secondary',
          });
        }

        groups.get(item.category)!.items.push({
          id: item.id,
          content: item.content,
          relevance: item.relevance,
          lastAccessed: item.lastAccessed,
        });
      });

      // Determinar posiciones basadas en relevancia
      const proximityGroups = Array.from(groups.values()).map(group => {
        const avgRelevance =
          group.items.reduce((sum, item) => sum + item.relevance, 0) /
          group.items.length;

        return {
          ...group,
          position:
            avgRelevance > 0.8
              ? 'primary'
              : avgRelevance > 0.5
                ? 'secondary'
                : 'contextual',
        } as ProximityGroup;
      });

      setState(prev => ({
        ...prev,
        proximityGroups,
      }));

      return proximityGroups;
    },
    []
  );

  // Ley 5: Fragmentación de Tareas
  const fragmentTask = useCallback(
    (
      taskId: string,
      fragments: Array<{
        title: string;
        description?: string;
        estimatedMinutes: number;
        dependencies?: string[];
        priority?: 'low' | 'medium' | 'high' | 'critical';
      }>
    ) => {
      const taskFragments: TaskFragment[] = fragments.map(
        (fragment, index) => ({
          id: taskId + '-fragment-' + index,
          title: fragment.title,
          description: fragment.description,
          estimatedMinutes: fragment.estimatedMinutes,
          dependencies: fragment.dependencies || [],
          priority: fragment.priority || 'medium',
          status: 'pending',
          progress: 0,
        })
      );

      setState(prev => ({
        ...prev,
        taskFragments: [...prev.taskFragments, ...taskFragments],
      }));

      // Actualizar métricas
      metricsRef.current.totalTasks += taskFragments.length;

      return taskFragments;
    },
    []
  );

  // Ley 6: Memoria de Trabajo - Gestionar elementos en memoria
  const addToWorkingMemory = useCallback(
    (item: Omit<WorkingMemoryItem, 'lastAccessed'>) => {
      const newItem: WorkingMemoryItem = {
        ...item,
        lastAccessed: Date.now(),
      };

      setState(prev => {
        let updatedMemory = [...prev.workingMemory, newItem];

        // Aplicar límite de memoria de trabajo
        if (updatedMemory.length > finalConfig.workingMemoryLimit) {
          // Remover elementos menos prioritarios y más antiguos
          updatedMemory.sort((a, b) => {
            if (a.priority !== b.priority) {
              return b.priority - a.priority;
            }
            return b.lastAccessed - a.lastAccessed;
          });

          updatedMemory = updatedMemory.slice(
            0,
            finalConfig.workingMemoryLimit
          );
        }

        return {
          ...prev,
          workingMemory: updatedMemory,
        };
      });
    },
    [finalConfig.workingMemoryLimit]
  );

  // Ley 9: Atención Selectiva - Resaltar elementos importantes
  const highlightElement = useCallback((item: Omit<AttentionItem, 'id'>) => {
    const id =
      'attention-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

    const attentionItem: AttentionItem = {
      ...item,
      id,
    };

    setState(prev => ({
      ...prev,
      attentionItems: [...prev.attentionItems, attentionItem],
    }));

    // Auto-remover después de la duración
    const timer = setTimeout(() => {
      setState(prev => ({
        ...prev,
        attentionItems: prev.attentionItems.filter(a => a.id !== id),
      }));
    }, item.duration);

    timersRef.current.set(id, timer);

    return id;
  }, []);

  // Actualizar progreso de fragmento
  const updateProgress = useCallback((fragmentId: string, progress: number) => {
    setState(prev => {
      const updatedFragments = prev.taskFragments.map(fragment => {
        if (fragment.id === fragmentId) {
          const newStatus: 'pending' | 'in_progress' | 'completed' | 'blocked' =
            progress >= 100
              ? 'completed'
              : progress > 0
                ? 'in_progress'
                : 'pending';

          // Actualizar métricas si se completa
          if (newStatus === 'completed' && fragment.status !== 'completed') {
            metricsRef.current.completedTasks++;
          }

          return { ...fragment, progress, status: newStatus };
        }
        return fragment;
      });

      // Calcular progreso general
      const totalProgress =
        updatedFragments.length > 0
          ? updatedFragments.reduce((sum, f) => sum + f.progress, 0) /
            updatedFragments.length
          : 0;

      return {
        ...prev,
        taskFragments: updatedFragments,
        overallProgress: totalProgress,
      };
    });
  }, []);

  // Ley 8: Umbral de Doherty - Medir tiempo de respuesta
  const measureResponseTime = useCallback(
    (actionName: string, startTime: number) => {
      const responseTime = Date.now() - startTime;

      metricsRef.current.responseTimes.push(responseTime);

      // Mantener solo las últimas 100 mediciones
      if (metricsRef.current.responseTimes.length > 100) {
        metricsRef.current.responseTimes.shift();
      }

      // Actualizar métricas de rendimiento
      const avgResponseTime =
        metricsRef.current.responseTimes.reduce((sum, time) => sum + time, 0) /
        metricsRef.current.responseTimes.length;

      setState(prev => ({
        ...prev,
        performance: {
          ...prev.performance,
          averageResponseTime: avgResponseTime,
          taskCompletionRate:
            metricsRef.current.totalTasks > 0
              ? metricsRef.current.completedTasks /
                metricsRef.current.totalTasks
              : 0,
        },
      }));

      // Feedback si excede el umbral
      if (responseTime > finalConfig.performanceThreshold) {
        addFeedback(
          'warning',
          'Action "' +
            actionName +
            '" took ' +
            responseTime +
            'ms (threshold: ' +
            finalConfig.performanceThreshold +
            'ms)'
        );
      }

      return responseTime;
    },
    [finalConfig.performanceThreshold, addFeedback]
  );

  // Limpiar timers al desmontar
  useEffect(() => {
    const currentTimers = timersRef.current;
    return () => {
      currentTimers.forEach(timer => clearTimeout(timer));
      currentTimers.clear();
    };
  }, []);

  // Limpiar elementos expirados de memoria de trabajo
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setState(prev => ({
        ...prev,
        workingMemory: prev.workingMemory.filter(item => {
          if (!item.ttl) return true;
          return now - item.lastAccessed < item.ttl;
        }),
      }));
    }, 30000); // Revisar cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  return {
    // Estado
    ...state,
    config: finalConfig,

    // Acciones
    updateContext,
    addFeedback,
    removeFeedback,
    simplifyOptions,
    groupByProximity,
    fragmentTask,
    addToWorkingMemory,
    highlightElement,
    updateProgress,
    measureResponseTime,

    // Utilidades
    clearWorkingMemory: () =>
      setState(prev => ({ ...prev, workingMemory: [] })),
    clearAttentionItems: () =>
      setState(prev => ({ ...prev, attentionItems: [] })),
    resetMetrics: () => {
      metricsRef.current = {
        responseTimes: [],
        errors: 0,
        completedTasks: 0,
        totalTasks: 0,
      };
    },
  };
}
