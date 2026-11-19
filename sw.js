/* Basta Piles Clinic service worker. Keep beside index.html and manifest.webmanifest. */
'use strict';

const CACHE_PREFIX = 'basta-clinic';
const CACHE_VERSION = 'v2';
const SHELL_CACHE = `${CACHE_PREFIX}-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `${CACHE_PREFIX}-runtime-${CACHE_VERSION}`;
const BASE_URL = self.registration.scope;
const SHELL_FILES = [
  new URL('./', BASE_URL).href,
  new URL('./index.html', BASE_URL).href,
  new URL('./manifest.webmanifest', BASE_URL).href,
  new URL('./icon-192.png', BASE_URL).href,
  new URL('./icon-512.png', BASE_URL).href
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await cache.addAll(SHELL_FILES);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith(CACHE_PREFIX) && ![SHELL_CACHE, RUNTIME_CACHE].includes(key))
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function networkFirst(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone()).catch(() => {});
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const fallback = await caches.match(new URL('./index.html', BASE_URL).href);
      if (fallback) return fallback;
    }
    throw error;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && (response.ok || response.type === 'opaque')) {
      cache.put(request, response.clone()).catch(() => {});
    }
    return response;
  } catch (error) {
    const fallback = await cache.match(request);
    if (fallback) return fallback;
    throw error;
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return;
  // Never cache navigation away from the clinic or the WhatsApp / Maps destinations.
  if (request.mode === 'navigate' && url.origin !== self.location.origin) return;
  if (url.hostname === 'wa.me' || url.hostname.includes('whatsapp.com') || url.hostname === 'maps.app.goo.gl') return;

  if (request.mode === 'navigate' && url.origin === self.location.origin) {
    event.respondWith(networkFirst(request));
    return;
  }
  // Cache same-origin files and static CDN assets after the first successful visit.
  event.respondWith(cacheFirst(request));
});
