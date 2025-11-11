// Service Worker for PWA
const CACHE_NAME = 'template-trae-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const IMAGE_CACHE = 'images-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline',
  '/_next/static/css/',
  '/_next/static/js/',
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker installing...');

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (
              cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== IMAGE_CACHE
            ) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(handleStaticAssets(request));
  } else if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleAPIRequest(request));
  } else {
    event.respondWith(handlePageRequest(request));
  }
});

// Cache First strategy for images
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('Image request failed:', error);
    // Return a fallback image if available
    return new Response('', { status: 404 });
  }
}

// Cache First strategy for static assets
async function handleStaticAssets(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('Static asset request failed:', error);
    throw error;
  }
}

// Network First strategy for API requests
async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('API request failed, trying cache:', error);

    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    throw error;
  }
}

// Stale While Revalidate strategy for pages
async function handlePageRequest(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);

    const networkPromise = fetch(request)
      .then(networkResponse => {
        if (networkResponse.ok) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed, return cached version if available
        return cachedResponse;
      });

    // Return cached version immediately if available, otherwise wait for network
    return cachedResponse || networkPromise;
  } catch (error) {
    console.log('Page request failed:', error);

    // Return offline page if available
    const cache = await caches.open(STATIC_CACHE);
    const offlinePage = await cache.match('/offline');

    if (offlinePage) {
      return offlinePage;
    }

    throw error;
  }
}

// Background sync for failed requests
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Performing background sync...');
  // Implement background sync logic here
  // For example, retry failed API requests
}

// Push notification handling
self.addEventListener('push', event => {
  console.log('Push notification received:', event);

  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icon-192x192.png',
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification('Template Trae', options));
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('Notification clicked:', event);

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Message handling from main thread
self.addEventListener('message', event => {
  console.log('Message received in SW:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
