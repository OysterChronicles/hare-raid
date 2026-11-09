// Hare Raid service worker: keeps the game playable offline.
// The game page is fetched fresh when online (so updates arrive straight away) and served from cache when offline.
// Leaderboard requests go to Supabase (another site) and are never cached.
const VERSION = 'hare-raid-86690e0dc7';
const CORE = [
  './',
  'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png', 'icons/icon.svg',
  'fonts/fredoka-latin-400-normal.woff2', 'fonts/fredoka-latin-600-normal.woff2', 'fonts/fredoka-latin-700-normal.woff2'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // leaderboard etc: straight to the network
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 4000);
        const fresh = await fetch(req, { signal: ctl.signal }); clearTimeout(t);
        if (fresh.ok && !fresh.redirected) { const c = await caches.open(VERSION); c.put('./', fresh.clone()); }
        return fresh;
      } catch (err) {
        return (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
