const PRECACHE = 'precahce-v1'
const RUNTIME = 'runtime'
// const IDB = window.indexedDB.open("service1");

const PRECACHE_URLS = [
  "/images/img-1.jpg",
  "/images/img-2.jpg",
  "/images/img-3.jpg"
];

self.addEventListener('install', event => {
    event.waitUntil(caches
        .open(PRECACHE)
        .then(cache => cache.addAll(PRECACHE_URLS))
        .then(self.skipWaiting()));
})

self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME]
    event.waitUntil(caches
        .keys()
        .then(cacheNames => {
          return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        })
        .then(cachesToDelete => {
          return Promise.all(cachesToDelete.map(cachesToDelete => {
              return caches.delete(cachesToDelete);
            }));
        })
        .then(() => self.clients.claim()));
})

self.addEventListener('fetch', event =>{
    if (event.request.url.startsWith(self.location.origin)){
        event.responseWith(
            caches.match(event.request).then(cachedResponse => {
                if(cachedResponse){
                    return cachedResponse;
                }
                return caches.open(RUNTIME).then(cache => {
                    return cache.put(event.request, response.clone()).then(() =>{
                        return response;
                    })
                })
            })
        )
    }
})