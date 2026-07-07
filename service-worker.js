// FamilyNest v35 v18 mobile polish
// Service worker intentionally not registered while testing mobile polish.
self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
