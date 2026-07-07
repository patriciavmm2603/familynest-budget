// FamilyNest v33 stable recovery
// Service worker intentionally not registered.
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
