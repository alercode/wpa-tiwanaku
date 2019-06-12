/*if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./js/sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw',err))
}*/
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js').then(function(registration) {
        // Registration was successful
        console.log('Resgistro de ServiceWorkers exitoso: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('Error al reguistrar ServiceWorker: ', err);
      });
    });
  }