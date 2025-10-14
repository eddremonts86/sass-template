'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { getNetworkStatus, onNetworkChange } from '@/lib/pwa';
import { useTranslations } from 'next-intl';

interface NetworkStatusProps {
  showWhenOnline?: boolean;
  className?: string;
}

export function NetworkStatus({
  showWhenOnline = false,
  className,
}: NetworkStatusProps) {
  const t = useTranslations('network');
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string>('');

  useEffect(() => {
    // Get initial network status
    getNetworkStatus().then(({ online, effectiveType }) => {
      setIsOnline(online);
      setConnectionType(effectiveType || '');
    });

    // Listen for network changes
    const cleanup = onNetworkChange(online => {
      setIsOnline(online);

      if (online) {
        // Update connection type when back online
        getNetworkStatus().then(({ effectiveType }) => {
          setConnectionType(effectiveType || '');
        });
      }
    });

    return cleanup;
  }, []);

  // Don't show when online unless explicitly requested
  if (isOnline && !showWhenOnline) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      {isOnline ? (
        <>
          <Wifi className="h-4 w-4 text-green-500" />
          <span className="text-green-700 dark:text-green-400">
            {t('online')} {connectionType && `(${connectionType})`}
          </span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 text-red-500" />
          <span className="text-red-700 dark:text-red-400">{t('offline')}</span>
        </>
      )}
    </div>
  );
}

// Banner component for offline state
export function OfflineBanner() {
  const t = useTranslations('network');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    getNetworkStatus().then(({ online }) => {
      setIsOnline(online);
    });

    const cleanup = onNetworkChange(setIsOnline);
    return cleanup;
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="border-b border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm font-medium">{t('offlineBanner')}</span>
        </div>
      </div>
    </div>
  );
}

// Hook for network status
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string>('');

  useEffect(() => {
    getNetworkStatus().then(({ online, effectiveType }) => {
      setIsOnline(online);
      setConnectionType(effectiveType || '');
    });

    const cleanup = onNetworkChange(online => {
      setIsOnline(online);

      if (online) {
        getNetworkStatus().then(({ effectiveType }) => {
          setConnectionType(effectiveType || '');
        });
      }
    });

    return cleanup;
  }, []);

  return {
    isOnline,
    connectionType,
    isSlowConnection: connectionType === 'slow-2g' || connectionType === '2g',
  };
}
