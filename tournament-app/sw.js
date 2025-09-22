// ==========================================
// TOURNAMENT ARENA - SERVICE WORKER
// Enhanced Performance & Offline Support
// ==========================================

const CACHE_NAME = 'tournament-arena-v1.0.0';
const STATIC_CACHE = 'tournament-arena-static-v1.0.0';
const DYNAMIC_CACHE = 'tournament-arena-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/home.html',
    '/profile.html',
    '/wallet.html',
    '/matchlist.html',
    '/top.html',
    '/match.html',
    '/contact.html',
    '/faq.html',
    '/styles.css',
    '/app.js',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

// Network-first files (always try network first)
const NETWORK_FIRST = [
    '/api/',
    '/admin'
];

// Cache-first files (try cache first)
const CACHE_FIRST = [
    'https://fonts.googleapis.com/',
    'https://cdnjs.cloudflare.com/',
    'https://cdn.tailwindcss.com'
];

// Install event - Cache static files
self.addEventListener('install', event => {
    console.log('SW: Installing Service Worker');
    
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE).then(cache => {
                console.log('SW: Caching static files');
                return cache.addAll(STATIC_FILES.map(url => new Request(url, {
                    credentials: 'same-origin'
                })));
            }),
            self.skipWaiting()
        ])
    );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
    console.log('SW: Activating Service Worker');
    
    event.waitUntil(
        Promise.all([
            caches.keys().then(keys => {
                return Promise.all(
                    keys.filter(key => {
                        return key !== STATIC_CACHE && 
                               key !== DYNAMIC_CACHE &&
                               key.startsWith('tournament-arena');
                    }).map(key => {
                        console.log('SW: Deleting old cache:', key);
                        return caches.delete(key);
                    })
                );
            }),
            self.clients.claim()
        ])
    );
});

// Fetch event - Implement caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!request.url.startsWith('http')) {
        return;
    }
    
    // Network-first strategy for API calls
    if (NETWORK_FIRST.some(pattern => request.url.includes(pattern))) {
        event.respondWith(networkFirst(request));
        return;
    }
    
    // Cache-first strategy for external resources
    if (CACHE_FIRST.some(pattern => request.url.includes(pattern))) {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Stale-while-revalidate for HTML pages
    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }
    
    // Cache-first for other resources
    event.respondWith(cacheFirst(request));
});

// Cache Strategies
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('SW: Network failed, trying cache');
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page for HTML requests
        if (request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
        }
        
        throw error;
    }
}

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('SW: Failed to fetch:', request.url);
        throw error;
    }
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(error => {
        console.log('SW: Network failed for:', request.url);
    });
    
    return cachedResponse || fetchPromise;
}

// Background Sync for offline actions
self.addEventListener('sync', event => {
    console.log('SW: Background sync triggered:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Process any queued offline actions
        const offlineActions = await getOfflineActions();
        
        for (const action of offlineActions) {
            try {
                await processOfflineAction(action);
                await removeOfflineAction(action.id);
            } catch (error) {
                console.log('SW: Failed to process offline action:', error);
            }
        }
    } catch (error) {
        console.log('SW: Background sync failed:', error);
    }
}

// Push notifications
self.addEventListener('push', event => {
    console.log('SW: Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'New tournament available!',
        icon: '/icon-192.png',
        badge: '/badge-72.png',
        tag: 'tournament-notification',
        actions: [
            {
                action: 'view',
                title: 'View Tournament'
            },
            {
                action: 'dismiss',
                title: 'Dismiss'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Tournament Arena', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    console.log('SW: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/matchlist.html')
        );
    }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
    console.log('SW: Message received:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_CACHE_SIZE') {
        getCacheSize().then(size => {
            event.ports[0].postMessage({ cacheSize: size });
        });
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        clearDynamicCache().then(() => {
            event.ports[0].postMessage({ success: true });
        });
    }
});

// Utility functions
async function getOfflineActions() {
    // Implement based on your offline action storage
    return [];
}

async function processOfflineAction(action) {
    // Implement based on your action types
    console.log('Processing offline action:', action);
}

async function removeOfflineAction(id) {
    // Implement based on your storage system
    console.log('Removing offline action:', id);
}

async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        
        for (const request of keys) {
            const response = await cache.match(request);
            if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
            }
        }
    }
    
    return totalSize;
}

async function clearDynamicCache() {
    await caches.delete(DYNAMIC_CACHE);
    console.log('SW: Dynamic cache cleared');
}

// Performance monitoring
self.addEventListener('fetch', event => {
    const start = performance.now();
    
    event.respondWith(
        fetch(event.request).then(response => {
            const duration = performance.now() - start;
            
            // Log slow requests
            if (duration > 1000) {
                console.log(`SW: Slow request detected: ${event.request.url} (${duration}ms)`);
            }
            
            return response;
        })
    );
});

console.log('SW: Service Worker script loaded');