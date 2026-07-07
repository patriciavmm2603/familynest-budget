# FamilyNest v30 rebuild

This rebuild splits the app into separate files:

- index.html
- src/styles.css
- src/mobile.css
- src/app.js
- src/mobile.js
- manifest.webmanifest
- icons/
- service-worker.js

Important:
- The service worker is intentionally NOT registered yet to avoid the blank-page cache issue.
- Upload the whole folder contents to GitHub root.
- After Vercel redeploys, test with:
  https://familynest-budget.vercel.app?v=30
