const CACHE_NAME = "resolve-pra-mim-v7";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./auth.js",
    "./chatbot.js",
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
   ATIVAÇÃO (LIMPA CACHES ANTIGOS IMEDIATAMENTE)
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
   BUSCA DE ARQUIVOS (NETWORK-FIRST COM FALLBACK OFFLINE)
   Garante que celulares e notebooks sempre carreguem a versão mais recente
========================================= */

self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);

    // Ignora chamadas da API Vercel (/api/*) e domínios externos (Firebase / Hugging Face CDN)
    if (event.request.method !== "GET" || url.pathname.includes("/api/") || url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type !== "opaque") {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                return caches.match(event.request).then(cachedResponse => {
                    return cachedResponse || caches.match("./index.html");
                });
            })
    );
});
