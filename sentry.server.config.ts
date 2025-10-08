import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Debug mode
  debug: process.env.NODE_ENV === 'development',
  
  // Environment
  environment: process.env.NODE_ENV,
  
  // Release tracking
  release: process.env.APP_VERSION,
  
  // Server-specific integrations
  integrations: [
    Sentry.prismaIntegration(),
    Sentry.httpIntegration(),
  ],
  
  // Error filtering for server
  beforeSend(event, hint) {
    const error = hint.originalException;
    
    if (error && typeof error === 'object' && 'message' in error) {
      const message = error.message as string;
      
      // Filter out database connection timeouts in development
      if (process.env.NODE_ENV === 'development' && message.includes('ECONNREFUSED')) {
        return null;
      }
      
      // Filter out expected validation errors
      if (message.includes('ValidationError') || message.includes('ZodError')) {
        return null;
      }
    }
    
    return event;
  },
  
  // Add user context
  beforeSendTransaction(event) {
    // Add server-specific context
    event.contexts = {
      ...event.contexts,
      server: {
        name: process.env.SERVER_NAME || 'unknown',
        version: process.env.APP_VERSION || 'unknown',
      },
    };
    
    return event;
  },
});