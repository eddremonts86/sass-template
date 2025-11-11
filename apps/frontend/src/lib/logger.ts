import winston from 'winston';
import { captureException, addBreadcrumb } from './error-tracking';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Custom format for development
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Custom format for production
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Define transports
const transports = [];

// Console transport for development
if (process.env.NODE_ENV === 'development') {
  transports.push(
    new winston.transports.Console({
      format: devFormat,
    })
  );
} else {
  // Console transport for production (structured logs)
  transports.push(
    new winston.transports.Console({
      format: prodFormat,
    })
  );
}

// File transports for production
if (process.env.NODE_ENV === 'production') {
  // Error logs
  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: prodFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );

  // Combined logs
  transports.push(
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: prodFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );
}

// Create the logger
const logger = winston.createLogger({
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
  levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports,
  // Don't exit on handled exceptions
  exitOnError: false,
});

// Enhanced logging functions with Sentry integration
export const log = {
  error: (message: string, meta?: Record<string, unknown>, error?: Error) => {
    logger.error(message, meta);

    // Send to Sentry for errors
    if (error) {
      captureException(error, meta);
    } else {
      addBreadcrumb(message, 'error', meta, 'error');
    }
  },

  warn: (message: string, meta?: Record<string, unknown>) => {
    logger.warn(message, meta);
    addBreadcrumb(message, 'warning', meta, 'warning');
  },

  info: (message: string, meta?: Record<string, unknown>) => {
    logger.info(message, meta);
    addBreadcrumb(message, 'info', meta, 'info');
  },

  http: (message: string, meta?: Record<string, unknown>) => {
    logger.http(message, meta);
    addBreadcrumb(message, 'http', meta, 'info');
  },

  debug: (message: string, meta?: Record<string, unknown>) => {
    logger.debug(message, meta);
    if (process.env.NODE_ENV === 'development') {
      addBreadcrumb(message, 'debug', meta, 'debug');
    }
  },
};

// Request logging middleware helper
export function logRequest(req: unknown, res: unknown, responseTime?: number) {
  const request = req as {
    method: string;
    url: string;
    headers: Record<string, string>;
    ip?: string;
    connection?: { remoteAddress: string };
  };
  const response = res as { statusCode: number };

  const logData = {
    method: request.method,
    url: request.url,
    userAgent: request.headers['user-agent'],
    ip: request.ip || request.connection?.remoteAddress,
    statusCode: response.statusCode,
    responseTime: responseTime ? `${responseTime}ms` : undefined,
  };

  if (response.statusCode >= 400) {
    log.error(
      `HTTP ${response.statusCode} - ${request.method} ${request.url}`,
      logData
    );
  } else {
    log.http(
      `HTTP ${response.statusCode} - ${request.method} ${request.url}`,
      logData
    );
  }
}

// Performance logging
export function logPerformance(
  operation: string,
  duration: number,
  metadata?: Record<string, unknown>
) {
  const logData = {
    operation,
    duration: `${duration}ms`,
    ...metadata,
  };

  if (duration > 1000) {
    log.warn(`Slow operation detected: ${operation}`, logData);
  } else {
    log.debug(`Performance: ${operation}`, logData);
  }
}

// Database query logging
export function logQuery(query: string, duration: number, params?: unknown) {
  const logData = {
    query: query.substring(0, 200), // Truncate long queries
    duration: `${duration}ms`,
    params: params ? JSON.stringify(params).substring(0, 100) : undefined,
  };

  if (duration > 500) {
    log.warn('Slow database query', logData);
  } else {
    log.debug('Database query', logData);
  }
}

// User action logging
export function logUserAction(
  userId: string,
  action: string,
  metadata?: Record<string, unknown>
) {
  log.info(`User action: ${action}`, {
    userId,
    action,
    ...metadata,
  });
}

// Security event logging
export function logSecurityEvent(
  event: string,
  severity: 'low' | 'medium' | 'high',
  metadata?: Record<string, unknown>
) {
  const logData = {
    event,
    severity,
    timestamp: new Date().toISOString(),
    ...metadata,
  };

  if (severity === 'high') {
    log.error(`Security event: ${event}`, logData);
  } else if (severity === 'medium') {
    log.warn(`Security event: ${event}`, logData);
  } else {
    log.info(`Security event: ${event}`, logData);
  }
}

export default logger;
