/* eslint-env serviceworker */
// 大溪河濱公園旅遊指南 PWA Service Worker
// Cache Strategy:
// - pre-cache: static assets for offline first paint
// - stale-while-revalidate: same-origin GET requests for fast navigation
// - network-first: navigations so updates deploy quickly
const VERSION = 'daxir-riverside-v2026-10-12-1';
const PRECACHE = `${VERSION}-precache`;
const RUNTIME = `${VERSION}-runtime`;

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/parking',
  '/bike',
  '/facilities',
  '/favicon.svg',
  '/manifest.webmanifest',
  '/robots.txt',
  '/sitemap.xml',
  '/images/hero-playground.jpg',
  '/images/og-cover.jpg',
  '/images/pirate-playground.webp',
  '/images/riverside-lawn.webp',
  '/images/green-lawn.webp',
  '/images/love-daxi.webp',
  '/images/shaded-path.webp',
  '/images/parking-youbike.webp',
  '/images/pavilion.webp',
  '/images/restroom.webp',
  '/images/amphitheater.webp',
  '/images/park-entry.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => undefined))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => !key.startsWith(VERSION)).map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

function isHtmlRequest(request) {
  return (
    request.mode === 'navigate' ||
    (request.method === 'GET' && (request.headers.get('accept') || '').includes('text/html'))
  );
}

function isAssetRequest(url) {
  return (
    url.origin === self.location.origin &&
    ['script', 'style', 'image', 'font', 'manifest'].includes(request.destination) ||
    /\.(?:js|css|webp|png|jpg|jpeg|svg|woff2?|webmanifest)$/i.test(url.pathname)
  );
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Only handle same-origin requests.
  if (url.origin !== self.location.origin) return;

  // HTML navigations: network-first with fallback to precached "/".
  if (isHtmlRequest(request)) {
    event.respondWith(
      (async () => {
        try {
          const network = await fetch(request);
          const cache = await caches.open(RUNTIME);
          cache.put(request, network.clone()).catch(() => undefined);
          return network;
        } catch (error) {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match('/');
          if (fallback) return fallback;
          throw error;
        }
      })(),
    );
    return;
  }

  // Static assets: cache-first with background revalidation.
  if (isAssetRequest(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        const networkPromise = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const copy = response.clone();
              caches.open(RUNTIME).then((cache) => cache.put(request, copy).catch(() => undefined));
            }
            return response;
          })
          .catch(() => cached);
        return cached || networkPromise;
      })(),
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
