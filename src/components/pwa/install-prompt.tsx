'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Smartphone } from 'lucide-react';
import { installPWA, isPWAInstallable, isPWAInstalled } from '@/lib/pwa';

interface InstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function InstallPrompt({
  onInstall,
  onDismiss,
  className,
}: InstallPromptProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Check if PWA is already installed
    if (isPWAInstalled()) {
      return;
    }

    // Listen for install prompt availability
    const handleInstallAvailable = () => {
      setIsVisible(true);
    };

    const handleInstalled = () => {
      setIsVisible(false);
      onInstall?.();
    };

    window.addEventListener('pwa-install-available', handleInstallAvailable);
    window.addEventListener('pwa-installed', handleInstalled);

    // Check if install prompt is already available
    if (isPWAInstallable()) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener(
        'pwa-install-available',
        handleInstallAvailable
      );
      window.removeEventListener('pwa-installed', handleInstalled);
    };
  }, [onInstall]);

  const handleInstall = async () => {
    setIsInstalling(true);

    try {
      const installed = await installPWA();
      if (installed) {
        setIsVisible(false);
        onInstall?.();
      }
    } catch (error) {
      console.error('Install failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-sm ${className}`}
    >
      <div className="bg-background rounded-lg border p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Smartphone className="text-primary h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-foreground text-sm font-semibold">
              Install App
            </h3>
            <p className="text-muted-foreground mt-1 text-xs">
              Install this app on your device for a better experience
            </p>

            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                onClick={handleInstall}
                disabled={isInstalling}
                className="flex-1"
              >
                <Download className="mr-1 h-4 w-4" />
                {isInstalling ? 'Installing...' : 'Install'}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handleDismiss}
                disabled={isInstalling}
              >
                Later
              </Button>
            </div>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            disabled={isInstalling}
            className="h-6 w-6 flex-shrink-0 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Hook for PWA install state
export function usePWAInstall() {
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setIsInstalled(isPWAInstalled());
    setCanInstall(isPWAInstallable());

    const handleInstallAvailable = () => setCanInstall(true);
    const handleInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
    };

    window.addEventListener('pwa-install-available', handleInstallAvailable);
    window.addEventListener('pwa-installed', handleInstalled);

    return () => {
      window.removeEventListener(
        'pwa-install-available',
        handleInstallAvailable
      );
      window.removeEventListener('pwa-installed', handleInstalled);
    };
  }, []);

  return {
    canInstall,
    isInstalled,
    install: installPWA,
  };
}
