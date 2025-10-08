import * as Sentry from '@sentry/nextjs';

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Custom error class with additional context
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Track custom events
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>,
  user?: { id: string; email?: string }
) {
  Sentry.addBreadcrumb({
    message: eventName,
    category: 'custom',
    data: properties,
    level: 'info',
  });

  if (user) {
    Sentry.setUser(user);
  }
}

/**
 * Track performance metrics
 */
export function trackPerformance(
  operation: string,
  duration: number,
  metadata?: Record<string, unknown>
) {
  Sentry.addBreadcrumb({
    message: `Performance: ${operation}`,
    category: 'performance',
    data: {
      duration,
      ...metadata,
    },
    level: 'info',
  });
}

/**
 * Capture exception with context
 */
export function captureException(
  error: Error | AppError,
  context?: Record<string, unknown>,
  user?: { id: string; email?: string }
) {
  Sentry.withScope(scope => {
    if (context) {
      scope.setContext('additional', context);
    }

    if (user) {
      scope.setUser(user);
    }

    if (error instanceof AppError) {
      scope.setTag('errorCode', error.code);

      // Map custom severity to Sentry severity levels
      const severityMap: Record<ErrorSeverity, Sentry.SeverityLevel> = {
        [ErrorSeverity.LOW]: 'info',
        [ErrorSeverity.MEDIUM]: 'warning',
        [ErrorSeverity.HIGH]: 'error',
        [ErrorSeverity.CRITICAL]: 'fatal',
      };
      scope.setLevel(severityMap[error.severity]);

      if (error.context) {
        scope.setContext('appError', error.context);
      }
    }

    Sentry.captureException(error);
  });
}

/**
 * Capture message with context
 */
export function captureMessage(
  message: string,
  level: 'debug' | 'info' | 'warning' | 'error' = 'info',
  context?: Record<string, unknown>
) {
  Sentry.withScope(scope => {
    if (context) {
      scope.setContext('message', context);
    }

    scope.setLevel(level);
    Sentry.captureMessage(message);
  });
}

/**
 * Set user context for error tracking
 */
export function setUserContext(user: {
  id: string;
  email?: string;
  username?: string;
  role?: string;
}) {
  Sentry.setUser(user);
}

/**
 * Clear user context
 */
export function clearUserContext() {
  Sentry.setUser(null);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category: string = 'custom',
  data?: Record<string, unknown>,
  level: 'debug' | 'info' | 'warning' | 'error' = 'info'
) {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level,
    timestamp: Date.now() / 1000,
  });
}

/**
 * Start a span for performance monitoring
 */
export function startSpan<T>(
  name: string,
  operation: string,
  callback: () => T
): T {
  return Sentry.startSpan(
    {
      name,
      op: operation,
    },
    callback
  );
}

/**
 * Wrapper for async operations with error tracking
 */
export async function withErrorTracking<T>(
  operation: () => Promise<T>,
  operationName: string,
  context?: Record<string, unknown>
): Promise<T> {
  return await startSpan(operationName, 'function', async () => {
    try {
      addBreadcrumb(`Starting ${operationName}`, 'operation', context);
      const result = await operation();
      addBreadcrumb(`Completed ${operationName}`, 'operation');
      return result;
    } catch (error) {
      captureException(
        error instanceof Error ? error : new Error(String(error)),
        { operation: operationName, ...context }
      );
      throw error;
    }
  });
}
