import { NextRequest, NextResponse } from 'next/server';
import { logRequest, log } from '../lib/logger';

// Helper function to get client IP
function getClientIP(request: NextRequest): string | null {
  return (
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    null
  );
}

export function loggingMiddleware(request: NextRequest) {
  const start = Date.now();
  const clientIP = getClientIP(request);

  // Log the incoming request
  log.http(`Incoming request: ${request.method} ${request.url}`, {
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    ip: clientIP,
  });

  // Continue with the request
  const response = NextResponse.next();

  // Log the response (this will be called after the request is processed)
  const duration = Date.now() - start;

  // Add response time header
  response.headers.set('X-Response-Time', `${duration}ms`);

  // Log the response
  setTimeout(() => {
    logRequest(
      {
        method: request.method,
        url: request.url,
        headers: Object.fromEntries(request.headers.entries()),
        ip: clientIP,
      },
      {
        statusCode: response.status,
      },
      duration
    );
  }, 0);

  return response;
}

// API route wrapper for logging
export function withLogging<T extends unknown[], R>(
  handler: (...args: T) => Promise<R>,
  operationName: string
) {
  return async (...args: T): Promise<R> => {
    const start = Date.now();

    try {
      log.debug(`Starting ${operationName}`);
      const result = await handler(...args);
      const duration = Date.now() - start;

      log.info(`Completed ${operationName}`, { duration: `${duration}ms` });
      return result;
    } catch (error) {
      const duration = Date.now() - start;

      log.error(
        `Failed ${operationName}`,
        {
          duration: `${duration}ms`,
          error: error instanceof Error ? error.message : String(error),
        },
        error instanceof Error ? error : undefined
      );

      throw error;
    }
  };
}
