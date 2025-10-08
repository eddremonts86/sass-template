import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Debug mode
  debug: process.env.NODE_ENV === 'development',
  
  // Environment
  environment: process.env.NODE_ENV,
  
  // Release tracking
  release: process.env.NEXT_PUBLIC_APP_VERSION,
  
  // Integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.browserTracingIntegration(),
  ],
  
  // Error filtering
  beforeSend(event, hint) {
    // Filter out known non-critical errors
    const error = hint.originalException;
    
    if (error && typeof error === 'object' && 'message' in error) {
      const message = error.message as string;
      
      // Filter out network errors that are not actionable
      if (message.includes('Network Error') || message.includes('fetch')) {
        return null;
      }
      
      // Filter out extension errors
      if (message.includes('extension://')) {
        return null;
      }
    }
    
    return event;
  },
  
  // Performance monitoring configuration
  beforeSendTransaction(event) {
    // Sample transactions based on environment
    if (process.env.NODE_ENV === 'development') {
      return event;
    }
    
    // In production, only send important transactions
    if (event.transaction && event.transaction.includes('/api/')) {
      return event;
    }
    
    return Math.random() < 0.1 ? event : null;
  },
});