import '@babel/polyfill';
import fetchHandler from './fetchHandler';

self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
  //console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  //console.log('Service Worker activated');
});

self.addEventListener('fetch', fetchHandler);