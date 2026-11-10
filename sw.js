/* Wortschatz-Trainer service worker: app files and fonts work offline. Change VERSION to force an update. */
const VERSION = 'v7';
const APP = 'wortschatz-app-' + VERSION;
const FONTS = 'wortschatz-fonts';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(APP).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== APP && k !== FONTS; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname === 'openrouter.ai') return; // AI calls always go to the network

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(function (c) {
      return c.match(req).then(function (hit) {
        const net = fetch(req).then(function (r) {
          if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone());
          return r;
        }).catch(function () { return hit; });
        return hit || net;
      });
    }));
    return;
  }

  if (url.origin === location.origin) {
    e.respondWith(caches.open(APP).then(function (c) {
      return c.match(req, { ignoreSearch: true }).then(function (hit) {
        const net = fetch(req).then(function (r) {
          if (r && r.ok) c.put(req, r.clone());
          return r;
        }).catch(function () { return hit || (req.mode === 'navigate' ? c.match('./index.html') : undefined); });
        return hit || net;
      });
    }));
  }
});
