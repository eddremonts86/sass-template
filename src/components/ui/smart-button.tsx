'use client';

import React, { useState, useCallback, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2, AlertTriangle, CheckCircle, Info } from 'lucide-react';

/**
 * Configuración de validación para prevención de errores
 */
interface ValidationConfig {
  /** Función de validación personalizada */
  validator?: (context?: WorkingMemoryContext) => Promise<boolean> | boolean;
  /** Mensaje de error personalizado */
  errorMessage?: string;
  /** Validación requerida antes de la acción */
  required?: boolean;
}

/**
 * Contexto limitado para memoria de trabajo (máximo 5-7 elementos)
 */
interface WorkingMemoryContext {
  /** Información principal (máximo 3 elementos) */
  primary: Array<{ key: string; value: string | number }>;
  /** Información secundaria (máximo 4 elementos) */
  secondary?: Array<{ key: string; value: string | number }>;
}

/**
 * Estados del botón inteligente
 */
type SmartButtonState =
  | 'idle'
  | 'validating'
  | 'loading'
  | 'success'
  | 'error'
  | 'disabled';

/**
 * Variantes del componente SmartButton
 */
const smartButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        smart:
          'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      complexity: {
        simple: '', // 1-2 opciones
        moderate: 'min-w-[120px]', // 3-4 opciones
        complex: 'min-w-[160px]', // 5+ opciones (no recomendado)
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      complexity: 'simple',
    },
  }
);

/**
 * Props del componente SmartButton
 */
interface SmartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof smartButtonVariants> {
  /** Usar como Slot para composición */
  asChild?: boolean;
  /** Configuración de validación */
  validation?: ValidationConfig;
  /** Contexto de memoria de trabajo */
  workingMemory?: WorkingMemoryContext;
  /** Acción principal del botón */
  onSmartClick?: (context?: WorkingMemoryContext) => Promise<void> | void;
  /** Mostrar información de contexto */
  showContext?: boolean;
  /** Texto de confirmación para acciones destructivas */
  confirmationText?: string;
  /** Límite de tiempo para la acción (ms) */
  timeoutMs?: number;
  /** Icono personalizado */
  icon?: ReactNode;
  /** Texto de loading personalizado */
  loadingText?: string;
}

/**
 * Componente SmartButton que implementa las Leyes de IA para Desarrollo Asistido:
 * - Ley de Simplicidad de Hick: Reduce opciones complejas mediante variantes de complejidad
 * - Ley de Prevención de Errores: Validaciones proactivas antes de ejecutar acciones
 * - Ley de Memoria de Trabajo: Limita información simultánea a 5-7 elementos
 *
 * @example
 * ```tsx
 * // Botón simple con validación
 * <SmartButton
 *   variant="smart"
 *   complexity="simple"
 *   validation={{
 *     validator: async () => user.isAuthenticated,
 *     errorMessage: "Debes iniciar sesión",
 *     required: true
 *   }}
 *   workingMemory={{
 *     primary: [
 *       { key: "Usuario", value: user.name },
 *       { key: "Acción", value: "Guardar" }
 *     ]
 *   }}
 *   onSmartClick={async () => {
 *     await saveData();
 *   }}
 *   showContext={true}
 * >
 *   Guardar Cambios
 * </SmartButton>
 *
 * // Botón destructivo con confirmación
 * <SmartButton
 *   variant="destructive"
 *   complexity="moderate"
 *   confirmationText="¿Estás seguro de eliminar este elemento?"
 *   validation={{
 *     validator: () => selectedItems.length > 0,
 *     errorMessage: "Selecciona al menos un elemento"
 *   }}
 *   onSmartClick={handleDelete}
 * >
 *   Eliminar Seleccionados
 * </SmartButton>
 * ```
 */
export const SmartButton = React.forwardRef<
  HTMLButtonElement,
  SmartButtonProps
>(
  (
    {
      className,
      variant,
      size,
      complexity = 'simple',
      asChild = false,
      validation,
      workingMemory,
      onSmartClick,
      showContext = false,
      confirmationText,
      timeoutMs = 30000,
      icon,
      loadingText = 'Procesando...',
      children,
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const t = useTranslations('common');
    const [state, setState] = useState<SmartButtonState>('idle');
    const [error, setError] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [contextVisible, setContextVisible] = useState(false);

    const Comp = asChild ? Slot : 'button';

    // Ley de Prevención de Errores: Validación proactiva
    const validateAction = useCallback(async (): Promise<boolean> => {
      if (!validation) return true;

      setState('validating');
      setError(null);

      try {
        const isValid = await validation.validator?.(workingMemory);
        if (!isValid && validation.required) {
          setError(validation.errorMessage || 'Validación fallida');
          setState('error');
          return false;
        }
        return true;
      } catch {
        setError(validation.errorMessage || 'Error de validación');
        setState('error');
        return false;
      }
    }, [validation, workingMemory]);

    // Ley de Simplicidad de Hick: Manejo simplificado de clicks
    const handleSmartClick = useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Validación previa
        const isValid = await validateAction();
        if (!isValid) return;

        // Confirmación para acciones destructivas
        if (confirmationText && !showConfirmation) {
          setShowConfirmation(true);
          return;
        }

        setState('loading');
        setError(null);

        try {
          // Timeout para prevenir bloqueos
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeoutMs)
          );

          const actionPromise = onSmartClick?.(workingMemory);

          await Promise.race([actionPromise, timeoutPromise]);

          setState('success');

          // Reset a idle después de mostrar éxito
          setTimeout(() => {
            setState('idle');
            setShowConfirmation(false);
          }, 2000);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
          setState('error');

          // Reset a idle después de mostrar error
          setTimeout(() => setState('idle'), 3000);
        }

        // Llamar onClick original si existe
        onClick?.(e);
      },
      [
        validateAction,
        confirmationText,
        showConfirmation,
        onSmartClick,
        workingMemory,
        timeoutMs,
        onClick,
      ]
    );

    // Reset de confirmación
    const handleCancelConfirmation = useCallback(() => {
      setShowConfirmation(false);
      setState('idle');
    }, []);

    // Ley de Memoria de Trabajo: Mostrar contexto limitado
    const renderContext = () => {
      if (!showContext || !workingMemory) return null;

      const totalItems =
        workingMemory.primary.length + (workingMemory.secondary?.length || 0);
      if (totalItems > 7) {
        console.warn(
          'SmartButton: Contexto excede el límite de memoria de trabajo (7 elementos)'
        );
      }

      return (
        <div className="bg-popover absolute -top-2 left-1/2 z-10 min-w-[200px] -translate-x-1/2 -translate-y-full transform rounded-md border p-2 shadow-lg">
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs font-medium">
              Contexto:
            </div>
            {workingMemory.primary.map((item, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span className="font-medium">{item.key}:</span>
                <span>{item.value}</span>
              </div>
            ))}
            {workingMemory.secondary && workingMemory.secondary.length > 0 && (
              <>
                <div className="mt-1 border-t pt-1">
                  {workingMemory.secondary.map((item, index) => (
                    <div
                      key={index}
                      className="text-muted-foreground flex justify-between text-xs"
                    >
                      <span>{item.key}:</span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      );
    };

    // Obtener icono según el estado
    const getStateIcon = () => {
      switch (state) {
        case 'validating':
        case 'loading':
          return <Loader2 className="h-4 w-4 animate-spin" />;
        case 'success':
          return <CheckCircle className="h-4 w-4" />;
        case 'error':
          return <AlertTriangle className="h-4 w-4" />;
        default:
          return icon;
      }
    };

    // Obtener texto según el estado
    const getStateText = () => {
      if (showConfirmation) return confirmationText;
      switch (state) {
        case 'validating':
          return 'Validando...';
        case 'loading':
          return loadingText;
        case 'success':
          return '¡Éxito!';
        case 'error':
          return error || 'Error';
        default:
          return children;
      }
    };

    const isDisabled =
      disabled ||
      state === 'validating' ||
      state === 'loading' ||
      state === 'disabled';

    return (
      <div className="relative inline-block">
        <Comp
          className={cn(
            smartButtonVariants({ variant, size, complexity, className }),
            state === 'error' && 'bg-destructive text-destructive-foreground',
            state === 'success' && 'bg-green-600 text-white',
            showConfirmation && 'bg-orange-600 text-white'
          )}
          ref={ref}
          disabled={isDisabled}
          onClick={handleSmartClick}
          onMouseEnter={() => setContextVisible(true)}
          onMouseLeave={() => setContextVisible(false)}
          {...props}
        >
          {getStateIcon()}
          <span className="truncate">{getStateText()}</span>

          {/* Indicador de progreso */}
          {(state === 'loading' || state === 'validating') && (
            <div className="absolute inset-0 animate-pulse rounded-md bg-current opacity-20" />
          )}
        </Comp>

        {/* Botones de confirmación */}
        {showConfirmation && (
          <div className="absolute top-full left-0 z-10 mt-1 flex gap-1">
            <button
              className="rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
              onClick={handleSmartClick}
            >
              {t('confirm')}
            </button>
            <button
              className="rounded bg-gray-600 px-2 py-1 text-xs text-white hover:bg-gray-700"
              onClick={handleCancelConfirmation}
            >
              {t('cancel')}
            </button>
          </div>
        )}

        {/* Contexto de memoria de trabajo */}
        {contextVisible && renderContext()}

        {/* Tooltip de error */}
        {state === 'error' && error && (
          <div className="bg-destructive text-destructive-foreground absolute top-full left-1/2 z-10 mt-1 -translate-x-1/2 transform rounded px-2 py-1 text-xs whitespace-nowrap">
            <Info className="mr-1 inline h-3 w-3" />
            {error}
          </div>
        )}
      </div>
    );
  }
);

SmartButton.displayName = 'SmartButton';

export {
  smartButtonVariants,
  type SmartButtonProps,
  type ValidationConfig,
  type WorkingMemoryContext,
};
