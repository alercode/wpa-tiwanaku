//asignar un nombre y versión al cache
const CACHE_NAME = 'v1';
const urlsToCache = [
    './index.html',
    './tiwanaku.html',
    './patrimonio.html',
    './infReserva.html',
    './logueo.html',
    './reservacion.html',
    './registro.html',
    './css/all.min.css',
    './css/bootstrap.min.css',
    './css/estilos.css',
    './css/jquery.mCustomScrollbar.css',
    './css/style.css',
    './css/styleCalendar.css',
    './webfonts/fa-solid-900.woff2',
    './webfonts/fa-regular-400.woff2',
    './js/bootstrap.min.js',
    './js/calendar.js',
    './js/jquery.mCustomScrollbar.concat.min.js',
    './js/jquery.min.js',
    './js/script.js',
    './manifest.json',
    './img/touch/icon_512x512.png',
    './img/touch/icon_384x384.png',
    './img/touch/icon_256x256.png',
    './img/touch/icon_192x192.png',
    './img/touch/icon_128x128.png',
    './img/touch/icon_96x96.png',
    './img/touch/icon_64x64.png',
    './img/touch/icon_32x32.png',
    './img/touch/icon_16x16.png',
    './img/icon_1024.png',
    './img/icon_16.png',
    './img/faceb.png',
    './img/ytube2.png',
    './img/en.png',
    './img/es.png',
    './img/us.png',
    './img/logo_byn_wt.png',
    './img/slid5a.jpg',
    './img/slid3a.jpg',
    './img/slid6a.jpg',
    './img/slid2a.jpg',
    './img/unsc.jpg',
    './img/logo_Tiwanaku.png',
    './img/objeto1_2.png',
    './img/Logo_marca_bolivia.png',
    './img/grad_amarillo.jpg',
    './img/textura_3.jpg'
];

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', event => {
  console.log('Service workers: Istalled')
    event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
            console.log('Cache abierto');
            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
});

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', event => {
    console.log('Service worker: Activate');
  const cacheWhitelist = [CACHE_NAME]

  event.waitUntil(
    caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
                console.log('Service worker: Limpiando el viejo cache');
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
});

//cuando el navegador recupera una url
self.addEventListener('fetch', event => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          //recuperar del cache
          return response;
        }
        //recuperar de la petición a la url
        return fetch(event.request);
      })
  )
});
/*self.addEventListener('fetch', event => {
    //console.log(event);
    console.log('service worker: fetching');
    //event.respondWith( fetch(event.request));
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    )
})*/