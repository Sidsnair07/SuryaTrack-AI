/* SuryaTrack AI — Service Worker (Edge Offline Mode)
   Cache-first strategy: all app assets + MediaPipe WASM cached locally.
   Once installed, the app runs fully offline — no internet required.
*/

const CACHE_NAME = 'suryatrack-v2';
const MEDIAPIPE_CDN = 'cdn.jsdelivr.net';

// Install: pre-cache shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
            ]);
        })
    );
    self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch: cache-first for same-origin + MediaPipe CDN assets
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Network-first for non-GET or navigation
    if (event.request.method !== 'GET') return;

    // Cache-first strategy (covers MediaPipe WASM, fonts, app assets)
    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;

            return fetch(event.request)
                .then((response) => {
                    // Cache MediaPipe WASM and CDN assets aggressively
                    if (
                        response.ok &&
                        (url.hostname === MEDIAPIPE_CDN ||
                            url.hostname === 'fonts.googleapis.com' ||
                            url.hostname === 'fonts.gstatic.com' ||
                            url.origin === self.location.origin)
                    ) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                    }
                    return response;
                })
                .catch(() => {
                    // Offline fallback for HTML navigation
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }
                });
        })
    );
});
