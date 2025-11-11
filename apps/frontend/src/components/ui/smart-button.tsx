'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle, CheckCircle, Info, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { ReactNode, useCallback, useState } from 'react';

/**
 * Validation configuration for error prevention
 */
interface ValidationConfig {
  /** Custom validation function */
  validator?: (context?: WorkingMemoryContext) => Promise<boolean> | boolean;
  /** Custom error message */
  errorMessage?: string;
  /** Validation required before action */
  required?: boolean;
}

/**
 * Limited context for working memory (maximum 5-7 elements)
 */
interface WorkingMemoryContext {
  /** Primary information (maximum 3 elements) */
  primary: Array<{ key: string; value: string | number }>;
  /** Secondary information (maximum 4 elements) */
  secondary?: Array<{ key: string; value: string | number }>;
}

/**
 * Smart button states
 */
type SmartButtonState =
  | 'idle'
  | 'validating'
  | 'loading'
  | 'success'
  | 'error'
  | 'disabled';

/**
 * SmartButton component variants
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
        simple: '', // 1-2 options
        moderate: 'min-w-[120px]', // 3-4 options
        complex: 'min-w-[160px]', // 5+ options (not recommended)
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
 * Props for the SmartButton component
 */
interface SmartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof smartButtonVariants> {
  /** Use as Slot for composition */
  asChild?: boolean;
  /** Validation configuration */
  validation?: ValidationConfig;
  /** Working memory context */
  workingMemory?: WorkingMemoryContext;
  /** Main button action */
  onSmartClick?: (context?: WorkingMemoryContext) => Promise<void> | void;
  /** Show context information */
  showContext?: boolean;
  /** Confirmation text for destructive actions */
  confirmationText?: string;
  /** Time limit for the action (ms) */
  timeoutMs?: number;
  /** Custom icon */
  icon?: ReactNode;
  /** Custom loading text */
  loadingText?: string;
}

/**
 * SmartButton component that implements the AI Laws for Assisted Development:
 * - Hick's Simplicity Law: Reduces complex options through complexity variants
 * - Error Prevention Law: Proactive validations before executing actions
 * - Working Memory Law: Limits simultaneous information to 5-7 elements
 *
 * @example
 * ```tsx
 * // Simple button with validation
 * <SmartButton
 *   variant="smart"
 *   complexity="simple"
 *   validation={{
 *     validator: async () => user.isAuthenticated,
 *     errorMessage: "You must log in",
 *     required: true
 *   }}
 *   workingMemory={{
 *     primary: [
 *       { key: "User", value: user.name },
 *       { key: "Action", value: "Save" }
 *     ]
 *   }}
 *   onSmartClick={async () => {
 *     await saveData();
 *   }}
 *   showContext={true}
 * >
 *   Save Changes
 * </SmartButton>
 *
 * // Destructive button with confirmation
 * <SmartButton
 *   variant="destructive"
 *   complexity="moderate"
 *   confirmationText="Are you sure you want to delete this item?"
 *   validation={{
 *     validator: () => selectedItems.length > 0,
 *     errorMessage: "Select at least one item"
 *   }}
 *   onSmartClick={handleDelete}
 * >
 *   Delete Selected
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

    // Error Prevention Law: Proactive validation
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

    // Hick's Simplicity Law: Simplified click handling
    const handleSmartClick = useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Previous validation
        const isValid = await validateAction();
        if (!isValid) return;

        // Confirmation for destructive actions
        if (confirmationText && !showConfirmation) {
          setShowConfirmation(true);
          return;
        }

        setState('loading');
        setError(null);

        try {
          // Timeout to prevent blocking
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeoutMs)
          );

          const actionPromise = onSmartClick?.(workingMemory);

          await Promise.race([actionPromise, timeoutPromise]);

          setState('success');

          // Reset to idle after showing success
          setTimeout(() => {
            setState('idle');
            setShowConfirmation(false);
          }, 2000);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
          setState('error');

          // Reset to idle after showing error
          setTimeout(() => setState('idle'), 3000);
        }

        // Call original onClick if it exists
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

    // Reset confirmation
    const handleCancelConfirmation = useCallback(() => {
      setShowConfirmation(false);
      setState('idle');
    }, []);

    // Working Memory Law: Show limited context
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

    // Get icon according to state
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

    // Get text according to state
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

          {/* Progress indicator */}
          {(state === 'loading' || state === 'validating') && (
            <div className="absolute inset-0 animate-pulse rounded-md bg-current opacity-20" />
          )}
        </Comp>

        {/* Confirmation buttons */}
        {showConfirmation && (
          <div className="absolute left-0 top-full z-10 mt-1 flex gap-1">
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

        {/* Working memory context */}
        {contextVisible && renderContext()}

        {/* Error tooltip */}
        {state === 'error' && error && (
          <div className="bg-destructive text-destructive-foreground absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 transform whitespace-nowrap rounded px-2 py-1 text-xs">
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
