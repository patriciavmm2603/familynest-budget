// FamilyNest v30 rebuild
// Intentionally not registered yet. This avoids stale PWA cache causing blank pages.
// Once the rebuilt app is stable, a safe network-first service worker can be enabled.
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
