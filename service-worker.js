// FamilyNest v36 CSV simplified sort
// Service worker intentionally not registered while testing.
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
