const CACHE_NAME = "firstpwa";
const urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/manifest.json",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/history.html",
    "/pages/players.html",
    "assets/css/materialize.min.css",
    "assets/js/materialize.min.js",
    "assets/js/main.js",
    "assets/js/register-service-worker.js",
    "assets/image/icons/icon-192x192.png",
    "assets/image/icons/icon-512x512.png",
    "assets/image/logo.png",
    "assets/image/manUtd.jpg",
    "assets/image/sirMattBusby.jpg",
    "assets/image/munich.jpg",
    "assets/image/sirAlexFergusen.jpg",
    "assets/image/vanGaal.jpg",
    "assets/image/ryanGiggs.jpg",
    "assets/image/jose.jpg",
    "assets/image/ogs.jpg",
    "assets/image/oldtraford.jpg",
    "assets/image/player/AARONWAN-BISSAKA.jpg",
    "assets/image/player/alexissanchez.jpg",
    "assets/image/player/andreasPereira.jpg",
    "assets/image/player/anthonymartial.jpg",
    "assets/image/player/axeltuanzebe.jpg",
    "assets/image/player/brandonwilliam.jpg",
    "assets/image/player/brunofernandes.jpg",
    "assets/image/player/danieljames.jpg",
    "assets/image/player/davidDeGea.jpg",
    "assets/image/player/diogodalot.jpg",
    "assets/image/player/ericBaily.jpg",
    "assets/image/player/fred.jpg",
    "assets/image/player/harrymaguire.jpg",
    "assets/image/player/jesseLingard.jpg",
    "assets/image/player/joelpereira.jpg",
    "assets/image/player/juanmata.jpg",
    "assets/image/player/leegrant.jpg",
    "assets/image/player/lukeshaw.jpg",
    "assets/image/player/marcusrashford.jpg",
    "assets/image/player/masongreenwood.jpg",
    "assets/image/player/Nemanja-Matic.jpg",
    "assets/image/player/odionighalo.jpg",
    "assets/image/player/paulpogba.jpg",
    "assets/image/player/philJones.jpg",
    "assets/image/player/scotmctominay.jpg",
    "assets/image/player/sergioRomero.jpg",
    "assets/image/player/tahithchong.jpg",
    "assets/image/player/victorLindelof.jpg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});