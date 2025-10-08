import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Performance Monitoring (lower sample rate for edge)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 0.5,
  
  // Debug mode
  debug: process.env.NODE_ENV === 'development',
  
  // Environment
  environment: process.env.NODE_ENV,
  
  // Release tracking
  release: process.env.APP_VERSION,
  
  // Minimal integrations for edge runtime
  integrations: [],
  
  // Error filtering for edge
  beforeSend(event, hint) {
    const error = hint.originalException;
    
    if (error && typeof error === 'object' && 'message' in error) {
      const message = error.message as string;
      
      // Filter out edge-specific non-critical errors
      if (message.includes('AbortError') || message.includes('TimeoutError')) {
        return null;
      }
    }
    
    return event;
  },
});