// FamilyNest v37 personal money fix
// Service worker intentionally not registered while testing.
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
