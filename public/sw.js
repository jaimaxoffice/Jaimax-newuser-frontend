// public/sw.js
// self.addEventListener('install', () => console.log('SW installed'));
// self.addEventListener('fetch', (e) => e.respondWith(fetch(e.request)));.

self.addEventListener('install', (e) => {
  // console.log('SW installed');
  self.skipWaiting();
});

