if (!window.indexedDB) {
  console.log('indexedDb not supported')
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/javascripts/sw.js')
}

if (navigator.onLine) {
    console.log("online")
} else {
    console.log("offline");
}

// const backSync = document.getElementById("backSync");
// backSync.addEventListener('click', event => {

// })