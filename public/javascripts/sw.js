const PRECACHE = 'precahce-v1'
const RUNTIME = 'runtime'

const PRECACHE_URLS = [

]

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
            caches.match(event.request).then*(cachedResponse => {
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