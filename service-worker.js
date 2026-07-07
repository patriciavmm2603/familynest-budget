const CACHE_NAME = "familynest-pwa-v20-phone-cache-fix";
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).catch(() => null)
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Never cache Supabase/Auth/API calls.
  if (url.hostname.includes("supabase.co")) {
    event.respondWith(fetch(request));
    return;
  }

  // For navigation/page loads, always try network first so phones do not get stuck on an old app.
  if (request.mode === "navigate" || request.destination === "document") {
    event.respondWith(
      fetch(request, { cache: "no-store" })
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("/index.html", copy)).catch(() => null);
          return response;
        })
        .catch(() => caches.match("/index.html").then(cached => cached || caches.match("/")))
    );
    return;
  }

  // For icons/manifest/static files: network first, cache fallback.
  event.respondWith(
    fetch(request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(() => null);
        return response;
      })
      .catch(() => caches.match(request))
  );
});
