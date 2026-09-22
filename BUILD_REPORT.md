# Mawski Web3 Portfolio — Build Report

## Status

Narrative homepage implemented and deployed to the existing staging-only Cloudflare Pages project `mawski-web3-test`.

## Narrative changes

- Replaced the former normal-flow motion with a persistent `journey-stage` (460vh desktop / 330vh mobile) containing a sticky full-viewport `journey-viewport`.
- Added one scroll-scrubbed normalized timeline with six authored waypoints: Departure, Show Token, DRX bridge, Trust Wallet Indonesia, Connected Map, and Arrival.
- Moved the traveller into the persistent stage so it visibly travels, scales, rotates, and crosses the route through every destination.
- Added scene choreography: changing pastel sky layers, route/path, destination landmarks, foreground occluders, camera pan/push/tilt, chapter indicator, and timeline-bound copy changes.
- Added a deliberate mobile stage variant and a reduced-motion fallback where the route and all destinations remain represented without animation.
- Kept the previous WebGL hero optional and retained normal browser scrolling, passive listeners, keyboard focus, and no scroll hijacking.
- Re-authored the journey as a vertical route: the traveller now moves through six waypoints from the lower departure point upward to arrival, with a vertical path and vertically arranged landmarks rather than a left-to-right route.
- Preserved the sticky full-viewport stage, normalized scroll timeline, scene layers, camera choreography, mobile variant, reduced-motion fallback, and no horizontal overflow on the document.
- Corrected LinkedIn everywhere to `https://www.linkedin.com/in/gelar-bhakti/`.
- Added WhatsApp, Telegram, LinkedIn, and X directly beside the email CTA as visible contact pills; footer is intentionally copyright-only with no social links.
- Removed the journey's permanent idle `requestAnimationFrame` loop. Scroll updates are now coalesced into one passive-listener frame, reducing unnecessary main-thread and style work while preserving scrubbed motion.
- Optimized the hero WebGL loop: canvas dimensions are only reset when CSS size/DPR changes, and rendering pauses when the hero is off-screen or the document is hidden.
- Kept the hero WebGL animation separate and optional; reduced-motion still disables it.
- Added dedicated static case-study routes: `show-token.html`, `drx-token.html`, and `trust-wallet-indonesia.html` with brief, role, scope, deliverables, campaign system, reflection, and clearly labeled original evidence-panel gallery placeholders.
- Trust Wallet is explicitly represented as `Marketing Intern — Indonesia`.
- Kept claims conservative. No invented metrics, dates, outcomes, or campaign imagery were added. Placeholder panels are labeled and do not pretend to be real assets.
- Preserved staging safety: no DNS, production domains, Cloudflare Tunnel, email, or production sites touched.

## Verification

- HTML parser: passed for all four HTML pages using Python `html.parser`.
- Source assertions: passed for required chapter markers, exact Trust Wallet title, all three case-study routes, no-scroll-jacking markers, passive listener, rAF, reduced-motion, WebGL and CSS fallback markers, placeholder labels, and no invented public metrics.
- Local HTTP smoke: passed for `/`, all three case-study routes, `/favicon.svg`, and `/robots.txt` with HTTP 200 via `python3 -m http.server` and curl.
- Local response hashes: verified against on-disk files for all four HTML pages.
- `npx --yes html-validate index.html`: passed with zero errors after fixing doctype, decorative evidence semantics, and inline-style validation findings.
- Browser runtime/screenshot QA: not completed. The browser harness could not launch a supported Chromium-family browser in this environment; no visual browser result is claimed.
- Cloudflare Pages deployment: completed with `npx wrangler pages deploy . --project-name mawski-web3-test --commit-dirty=true`.
- Final deployment URL: `https://bc8c5fca.mawski-web3-test.pages.dev`.
- Deployed HTTP: passed for `/`, all three case-study routes, `/favicon.svg`, and `/robots.txt`, all HTTP 200 with a browser user-agent.
- Exact local/deployed byte verification: passed for all four HTML pages and static assets; each remote response matched the local file byte-for-byte.
- Deployed markers: passed for `journey-stage`, sticky viewport, six scene waypoints, persistent traveller, route landmarks, camera variables, reduced-motion fallback, exact Trust Wallet role, and labeled evidence placeholders.

## Honest limits

- No physical iOS/Android touch test or pixel-level screenshot review was available.
- Google Fonts are externally loaded with system fallbacks.
- Staging remains `noindex,nofollow`; this is not a production release.
- Abstract evidence panels must be replaced only with approved campaign imagery.
