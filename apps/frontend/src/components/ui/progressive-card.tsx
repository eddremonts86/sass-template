'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ReactNode, useEffect, useState } from 'react';

/**
 * Status of a subtask
 */
type SubtaskStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'blocked'
  | 'skipped';

/**
 * Definition of a fragmented subtask
 */
interface Subtask {
  /** Unique subtask ID */
  id: string;
  /** Subtask title */
  title: string;
  /** Optional description */
  description?: string;
  /** Current status */
  status: SubtaskStatus;
  /** Individual progress (0-100) */
  progress?: number;
  /** Time estimate in minutes */
  estimatedMinutes?: number;
  /** Dependencies (IDs of other subtasks) */
  dependencies?: string[];
  /** Priority */
  priority: 'low' | 'medium' | 'high' | 'critical';
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Gradual progression configuration
 */
interface ProgressionConfig {
  /** Show overall progress */
  showOverallProgress: boolean;
  /** Show progress per subtask */
  showSubtaskProgress: boolean;
  /** Allow skipping subtasks */
  allowSkipping: boolean;
  /** Validate dependencies */
  validateDependencies: boolean;
  /** Visualization mode */
  viewMode: 'compact' | 'detailed' | 'minimal';
}

/**
 * ProgressiveCard component variants
 */
const progressiveCardVariants = cva(
  'transition-all duration-200 hover:shadow-md',
  {
    variants: {
      variant: {
        default: 'border-border',
        success:
          'border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800',
        warning:
          'border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800',
        error: 'border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800',
        info: 'border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800',
      },
      size: {
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Props for the ProgressiveCard component
 */
interface ProgressiveCardProps
  extends VariantProps<typeof progressiveCardVariants> {
  /** Main task title */
  title: string;
  /** Task description */
  description?: string;
  /** List of fragmented subtasks */
  subtasks: Subtask[];
  /** Progression configuration */
  progression?: Partial<ProgressionConfig>;
  /** Callback when a subtask is completed */
  onSubtaskComplete?: (subtaskId: string) => void;
  /** Callback when a subtask is started */
  onSubtaskStart?: (subtaskId: string) => void;
  /** Callback when a subtask is skipped */
  onSubtaskSkip?: (subtaskId: string) => void;
  /** Callback when the entire task is completed */
  onTaskComplete?: () => void;
  /** Show card expanded by default */
  defaultExpanded?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Additional content in the footer */
  footerContent?: ReactNode;
}

/**
 * ProgressiveCard component that implements the AI Laws for Assisted Development:
 * - Task Fragmentation Law: Divides complex content into manageable subtasks
 * - Gradual Progression Law: Shows clear progress toward objectives
 * - Jakob's Consistency Law: Maintains established UI patterns
 *
 * @example
 * ```tsx
 * const subtasks = [
 *   {
 *     id: '1',
 *     title: 'Configure database',
 *     description: 'Create tables and relationships',
 *     status: 'completed',
 *     progress: 100,
 *     priority: 'high',
 *     estimatedMinutes: 30
 *   },
 *   {
 *     id: '2',
 *     title: 'Implement API endpoints',
 *     status: 'in_progress',
 *     progress: 60,
 *     priority: 'high',
 *     dependencies: ['1'],
 *     estimatedMinutes: 45
 *   },
 *   {
 *     id: '3',
 *     title: 'Create UI components',
 *     status: 'pending',
 *     priority: 'medium',
 *     dependencies: ['2'],
 *     estimatedMinutes: 60
 *   }
 * ];
 *
 * <ProgressiveCard
 *   title="Authentication System"
 *   description="Implement login and user registration"
 *   subtasks={subtasks}
 *   progression={{
 *     showOverallProgress: true,
 *     showSubtaskProgress: true,
 *     allowSkipping: false,
 *     validateDependencies: true,
 *     viewMode: 'detailed'
 *   }}
 *   onSubtaskComplete={(id) => console.log('Completed:', id)}
 *   onTaskComplete={() => console.log('Task complete!')}
 * />
 * ```
 */
export function ProgressiveCard({
  title,
  description,
  subtasks,
  progression = {},
  onSubtaskComplete,
  onSubtaskStart,
  onSubtaskSkip,
  onTaskComplete,
  defaultExpanded = false,
  className,
  footerContent,
  variant,
  size,
}: ProgressiveCardProps) {
  const t = useTranslations('common');
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [localSubtasks, setLocalSubtasks] = useState<Subtask[]>(subtasks);

  // Default configuration
  const config: ProgressionConfig = {
    showOverallProgress: true,
    showSubtaskProgress: true,
    allowSkipping: true,
    validateDependencies: true,
    viewMode: 'detailed',
    ...progression,
  };

  // Update subtasks when props change
  useEffect(() => {
    setLocalSubtasks(subtasks);
  }, [subtasks]);

  // Gradual Progression Law: Calculate overall progress
  const calculateOverallProgress = (): number => {
    if (localSubtasks.length === 0) return 0;

    const totalProgress = localSubtasks.reduce((acc, subtask) => {
      if (subtask.status === 'completed') return acc + 100;
      if (subtask.status === 'in_progress')
        return acc + (subtask.progress || 0);
      if (subtask.status === 'skipped') return acc + 100; // Count as completed
      return acc;
    }, 0);

    return Math.round(totalProgress / localSubtasks.length);
  };

  // Get subtask statistics
  const getTaskStats = () => {
    const completed = localSubtasks.filter(
      t => t.status === 'completed' || t.status === 'skipped'
    ).length;
    const inProgress = localSubtasks.filter(
      t => t.status === 'in_progress'
    ).length;
    const blocked = localSubtasks.filter(t => t.status === 'blocked').length;
    const pending = localSubtasks.filter(t => t.status === 'pending').length;

    return {
      completed,
      inProgress,
      blocked,
      pending,
      total: localSubtasks.length,
    };
  };

  // Task Fragmentation Law: Validate dependencies
  const canStartSubtask = (subtask: Subtask): boolean => {
    if (!config.validateDependencies || !subtask.dependencies) return true;

    return subtask.dependencies.every(depId => {
      const dependency = localSubtasks.find(t => t.id === depId);
      return (
        dependency?.status === 'completed' || dependency?.status === 'skipped'
      );
    });
  };

  // Handle subtask start
  const handleSubtaskStart = (subtaskId: string) => {
    const subtask = localSubtasks.find(t => t.id === subtaskId);
    if (!subtask || !canStartSubtask(subtask)) return;

    setLocalSubtasks(prev =>
      prev.map(t =>
        t.id === subtaskId
          ? { ...t, status: 'in_progress' as SubtaskStatus }
          : t
      )
    );

    onSubtaskStart?.(subtaskId);
  };

  // Handle complete subtask
  const handleSubtaskComplete = (subtaskId: string) => {
    setLocalSubtasks(prev =>
      prev.map(t =>
        t.id === subtaskId
          ? { ...t, status: 'completed' as SubtaskStatus, progress: 100 }
          : t
      )
    );

    onSubtaskComplete?.(subtaskId);

    // Check if the entire task is complete
    const updatedSubtasks = localSubtasks.map(t =>
      t.id === subtaskId ? { ...t, status: 'completed' as SubtaskStatus } : t
    );

    const allCompleted = updatedSubtasks.every(
      t => t.status === 'completed' || t.status === 'skipped'
    );

    if (allCompleted) {
      setTimeout(() => onTaskComplete?.(), 500);
    }
  };

  // Handle skip subtask
  const handleSubtaskSkip = (subtaskId: string) => {
    if (!config.allowSkipping) return;

    setLocalSubtasks(prev =>
      prev.map(t =>
        t.id === subtaskId ? { ...t, status: 'skipped' as SubtaskStatus } : t
      )
    );

    onSubtaskSkip?.(subtaskId);
  };

  // Get status icon
  const getStatusIcon = (status: SubtaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 animate-pulse text-blue-500" />;
      case 'blocked':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'skipped':
        return <CheckCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  // Get priority color
  const getPriorityColor = (priority: Subtask['priority']) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const overallProgress = calculateOverallProgress();
  const stats = getTaskStats();
  const isCompleted = stats.completed === stats.total;

  return (
    <Card className={cn(progressiveCardVariants({ variant, size }), className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              {title}
              {isCompleted && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Overall Progress - Gradual Progression Law */}
        {config.showOverallProgress && (
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t('overallProgress')}</span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />

            <div className="text-muted-foreground flex gap-4 text-xs">
              <span>✅ {stats.completed} completadas</span>
              <span>🔄 {stats.inProgress} en progreso</span>
              <span>⏳ {stats.pending} pendientes</span>
              {stats.blocked > 0 && <span>🚫 {stats.blocked} bloqueadas</span>}
            </div>
          </div>
        )}
      </CardHeader>

      {/* Subtask List - Task Fragmentation Law */}
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {localSubtasks.map(subtask => {
              const canStart = canStartSubtask(subtask);
              const isBlocked = !canStart && subtask.status === 'pending';

              return (
                <div
                  key={subtask.id}
                  className={cn(
                    'rounded-lg border p-3 transition-all',
                    subtask.status === 'completed' &&
                      'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950',
                    subtask.status === 'in_progress' &&
                      'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950',
                    isBlocked &&
                      'border-red-200 bg-red-50 opacity-60 dark:border-red-800 dark:bg-red-950'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-1 items-start gap-3">
                      {getStatusIcon(isBlocked ? 'blocked' : subtask.status)}

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h4 className="truncate text-sm font-medium">
                            {subtask.title}
                          </h4>
                          <Badge
                            variant="secondary"
                            className={cn(
                              'text-xs',
                              getPriorityColor(subtask.priority)
                            )}
                          >
                            {subtask.priority}
                          </Badge>
                        </div>

                        {subtask.description && (
                          <p className="text-muted-foreground mb-2 text-xs">
                            {subtask.description}
                          </p>
                        )}

                        {/* Subtask Progress */}
                        {config.showSubtaskProgress &&
                          subtask.status === 'in_progress' &&
                          subtask.progress !== undefined && (
                            <div className="mt-2">
                              <div className="mb-1 flex justify-between text-xs">
                                <span>{t('progress')}</span>
                                <span>{subtask.progress}%</span>
                              </div>
                              <Progress
                                value={subtask.progress}
                                className="h-1"
                              />
                            </div>
                          )}

                        {/* Additional information */}
                        <div className="text-muted-foreground mt-2 flex items-center gap-3 text-xs">
                          {subtask.estimatedMinutes && (
                            <span>⏱️ {subtask.estimatedMinutes}min</span>
                          )}
                          {subtask.dependencies &&
                            subtask.dependencies.length > 0 && (
                              <span>
                                🔗 {subtask.dependencies.length} dependencias
                              </span>
                            )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="ml-2 flex gap-1">
                      {subtask.status === 'pending' && canStart && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSubtaskStart(subtask.id)}
                          className="h-7 px-2 text-xs"
                        >
                          {t('start')}
                        </Button>
                      )}

                      {subtask.status === 'in_progress' && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleSubtaskComplete(subtask.id)}
                          className="h-7 px-2 text-xs"
                        >
                          {t('complete')}
                        </Button>
                      )}

                      {config.allowSkipping &&
                        subtask.status !== 'completed' &&
                        subtask.status !== 'skipped' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSubtaskSkip(subtask.id)}
                            className="text-muted-foreground h-7 px-2 text-xs"
                          >
                            {t('skip')}
                          </Button>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      )}

      {/* Additional footer */}
      {footerContent && (
        <CardFooter className="pt-3">{footerContent}</CardFooter>
      )}
    </Card>
  );
}

export type { ProgressionConfig, ProgressiveCardProps, Subtask, SubtaskStatus };
