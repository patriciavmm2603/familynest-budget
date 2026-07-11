// Kingdom Builder v47
// Service worker intentionally not registered while testing.
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
