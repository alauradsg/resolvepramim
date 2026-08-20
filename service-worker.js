const CACHE_NAME = "resolve-pra-mim-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon-192x192.png"
];


/* =========================================
   INSTALAÇÃO
========================================= */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)
                .then(cache => {

                    return cache.addAll(
                        FILES_TO_CACHE
                    );

                })
        );


        self.skipWaiting();
    }
);


/* =========================================
   ATIVAÇÃO
========================================= */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys()
                .then(cacheNames => {

                    return Promise.all(

                        cacheNames
                            .filter(
                                cacheName =>
                                    cacheName !== CACHE_NAME
                            )
                            .map(
                                cacheName =>
                                    caches.delete(cacheName)
                            )
                    );

                })
        );


        self.clients.claim();
    }
);


/* =========================================
   BUSCA DE ARQUIVOS
========================================= */

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(event.request)
                .then(cachedResponse => {

                    if (cachedResponse) {

                        return cachedResponse;
                    }


                    return fetch(event.request)
                        .then(response => {

                            /*
                               Só armazena respostas válidas.
                            */

                            if (
                                !response ||
                                response.status !== 200 ||
                                response.type === "opaque"
                            ) {

                                return response;
                            }


                            const responseClone =
                                response.clone();


                            caches.open(CACHE_NAME)
                                .then(cache => {

                                    cache.put(
                                        event.request,
                                        responseClone
                                    );
                                });


                            return response;

                        })
                        .catch(() => {

                            /*
                               Caso esteja offline e a página
                               não esteja no cache.
                            */

                            return caches.match(
                                "./index.html"
                            );

                        });

                })
        );
    }
);