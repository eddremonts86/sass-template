import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Props para el componente Progress
 */
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Valor del progreso (0-100) */
  value?: number;
  /** Valor máximo del progreso */
  max?: number;
  /** Tamaño del componente */
  size?: 'sm' | 'md' | 'lg';
  /** Variante de color */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /** Mostrar texto del porcentaje */
  showValue?: boolean;
}

/**
 * Componente Progress - Barra de progreso accesible
 *
 * Implementa las siguientes leyes de IA:
 * - Ley de Feedback Inmediato: Proporciona retroalimentación visual clara del progreso
 * - Ley de Progresión Gradual: Muestra el avance hacia un objetivo
 * - Ley de Consistencia de Jakob: Mantiene patrones de UI familiares
 *
 * @example
 * ```tsx
 * <Progress value={75} showValue />
 * <Progress value={50} variant="success" size="lg" />
 * ```
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size = 'md',
      variant = 'default',
      showValue = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeClasses = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
    };

    const variantClasses = {
      default: 'bg-primary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
    };

    return (
      <div className={cn('relative', className)} ref={ref} {...props}>
        <div
          className={cn(
            'bg-secondary w-full overflow-hidden rounded-full',
            sizeClasses[size]
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={`Progreso: ${percentage.toFixed(0)}%`}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-in-out',
              variantClasses[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-foreground text-xs font-medium">
              {percentage.toFixed(0)}%
            </span>
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
