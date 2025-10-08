// PWA utilities for service worker registration and push notifications

export interface PWAInstallPrompt {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface NotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: unknown;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

class PWAManager {
  private deferredPrompt: PWAInstallPrompt | null = null;
  private registration: ServiceWorkerRegistration | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private async init() {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', e => {
      console.log('PWA install prompt available');
      e.preventDefault();
      this.deferredPrompt = e as unknown as PWAInstallPrompt;
      this.dispatchInstallPromptEvent();
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.deferredPrompt = null;
      this.dispatchInstalledEvent();
    });

    // Register service worker
    await this.registerServiceWorker();
  }

  private dispatchInstallPromptEvent() {
    const event = new CustomEvent('pwa-install-available', {
      detail: { canInstall: true },
    });
    window.dispatchEvent(event);
  }

  private dispatchInstalledEvent() {
    const event = new CustomEvent('pwa-installed');
    window.dispatchEvent(event);
  }

  async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });

      this.registration = registration;

      console.log('Service Worker registered:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              console.log('New service worker available');
              this.dispatchUpdateAvailableEvent();
            }
          });
        }
      });

      // Listen for controlling service worker changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service worker controller changed');
        window.location.reload();
      });

      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }

  private dispatchUpdateAvailableEvent() {
    const event = new CustomEvent('pwa-update-available');
    window.dispatchEvent(event);
  }

  async updateServiceWorker(): Promise<void> {
    if (!this.registration) {
      console.log('No service worker registration available');
      return;
    }

    try {
      await this.registration.update();

      if (this.registration.waiting) {
        // Tell the waiting service worker to skip waiting
        this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    } catch (error) {
      console.error('Service worker update failed:', error);
    }
  }

  async showInstallPrompt(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.log('No install prompt available');
      return false;
    }

    try {
      await this.deferredPrompt.prompt();
      const choiceResult = await this.deferredPrompt.userChoice;

      console.log('Install prompt result:', choiceResult.outcome);

      this.deferredPrompt = null;
      return choiceResult.outcome === 'accepted';
    } catch (error) {
      console.error('Install prompt failed:', error);
      return false;
    }
  }

  isInstallable(): boolean {
    return this.deferredPrompt !== null;
  }

  isInstalled(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone ===
        true
    );
  }

  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  async showNotification(options: NotificationOptions): Promise<void> {
    const permission = await this.requestNotificationPermission();

    if (permission !== 'granted') {
      console.log('Notification permission not granted');
      return;
    }

    if (!this.registration) {
      console.log('No service worker registration for notifications');
      return;
    }

    try {
      await this.registration.showNotification(options.title, {
        body: options.body,
        icon: options.icon || '/icon-192x192.png',
        badge: options.badge || '/icon-72x72.png',
        tag: options.tag,
        data: options.data,
        vibrate: [100, 50, 100],
        requireInteraction: false,
        silent: false,
        ...(options.actions && { actions: options.actions }),
      } as NotificationOptions & {
        vibrate?: number[];
        requireInteraction?: boolean;
        silent?: boolean;
      });
    } catch (error) {
      console.error('Show notification failed:', error);
    }
  }

  async subscribeToPushNotifications(): Promise<PushSubscription | null> {
    const permission = await this.requestNotificationPermission();

    if (permission !== 'granted') {
      console.log('Push notification permission not granted');
      return null;
    }

    if (!this.registration) {
      console.log('No service worker registration for push notifications');
      return null;
    }

    try {
      // You'll need to replace this with your actual VAPID public key
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!vapidPublicKey) {
        console.log('VAPID public key not configured');
        return null;
      }

      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          vapidPublicKey
        ) as BufferSource,
      });

      console.log('Push subscription created:', subscription);
      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return null;
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async getNetworkStatus(): Promise<{
    online: boolean;
    effectiveType?: string;
  }> {
    const online = navigator.onLine;

    // Get connection info if available
    const connection =
      (
        navigator as unknown as {
          connection?: { effectiveType?: string };
          mozConnection?: { effectiveType?: string };
          webkitConnection?: { effectiveType?: string };
        }
      ).connection ||
      (navigator as unknown as { mozConnection?: { effectiveType?: string } })
        .mozConnection ||
      (
        navigator as unknown as {
          webkitConnection?: { effectiveType?: string };
        }
      ).webkitConnection;

    return {
      online,
      effectiveType: connection?.effectiveType,
    };
  }

  onNetworkChange(callback: (online: boolean) => void): () => void {
    const handleOnline = () => callback(true);
    const handleOffline = () => callback(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Return cleanup function
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }
}

// Create singleton instance
export const pwaManager = new PWAManager();

// Utility functions
export const isPWAInstalled = () => pwaManager.isInstalled();
export const isPWAInstallable = () => pwaManager.isInstallable();
export const installPWA = () => pwaManager.showInstallPrompt();
export const updatePWA = () => pwaManager.updateServiceWorker();
export const showNotification = (options: NotificationOptions) =>
  pwaManager.showNotification(options);
export const subscribeToPush = () => pwaManager.subscribeToPushNotifications();
export const getNetworkStatus = () => pwaManager.getNetworkStatus();
export const onNetworkChange = (callback: (online: boolean) => void) =>
  pwaManager.onNetworkChange(callback);
