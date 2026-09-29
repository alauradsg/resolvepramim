const CACHE_NAME = "resolve-pra-mim-v3";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./auth.js",
    "./status-modal.js",
    "./success-check.json",
    "./manifest.json",
    "./icon-192x192.png"
];

/* =========================================
   INSTALAÇÃO
========================================= */

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

/* =========================================
   ATIVAÇÃO
========================================= */

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
    self.clients.claim();
});

/* =========================================
   BUSCA DE ARQUIVOS
========================================= */

self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);

    // Ignora chamadas da API Vercel (/api/*) e domínios externos (Firebase Auth)
    if (event.request.method !== "GET" || url.pathname.includes("/api/") || url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then(response => {
                if (!response || response.status !== 200 || response.type === "opaque") {
                    return response;
                }

                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });

                return response;
            }).catch(() => {
                return caches.match("./index.html");
            });
        })
    );
});
