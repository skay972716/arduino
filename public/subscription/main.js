const PUBLIC_VAPID_KEY =
  'BJZivCYf8u0sIB56yzERHqqfmcc_tepc5LrJM2TKjkzwrQzgF8wMnwSNYzSOJOvfX4ycQpWguGKUW9RextF1bnE';

//Funcion de sucripcion
const subscription = async () => {
  // Service Worker
  console.log('Registering a Service worker');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  });

  // Listen Push Notifications
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });
  console.log(subscription);
  // Send Notification
  await fetch('/subscription', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const suscrito = document.getElementById('suscrito');
  suscrito.innerHTML = '¡Gracias por suscribirse!';
  suscrito.removeAttribute('class');
  suscrito.setAttribute('class', 'notification is-success');
};

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
// Service Worker Support
if ('serviceWorker' in navigator) {
  subscription().catch(err => console.log(err));
}
//Accion de recargar
const btnReload = document.getElementById('reload');
btnReload.addEventListener('click', function () {
  location.reload();
});
