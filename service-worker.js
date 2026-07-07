// FamilyNest v31 single-file recovery
// Service worker intentionally not registered.
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
