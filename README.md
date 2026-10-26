# The Physics Lab

The Physics Lab ([thephysicslab.org](https://thephysicslab.org)) is a complete, static Astro physics visualizer for hands-on learning. Twelve interactive experiments connect diagrams, measurements, equations, assumptions, and worked explanations. No accounts, backend, API keys, or paid model calls are required.

## Included

- Projectile motion with angle, speed, gravity, trajectory, flight time, and range.
- Position and velocity graphs under constant acceleration, including reversals.
- Applied force and static/kinetic friction on a level surface.
- Conservation of energy for a particle sliding down a frictionless ramp.
- Buoyancy, prescribed immersion, floating equilibrium, and sinking.
- Small-angle pendulum motion and an ideal spring oscillator.
- A traveling transverse wave with a highlighted medium particle.
- Ohm’s law, electrical power, and series/parallel resistor circuits.
- Snell’s law with critical-angle and total-internal-reflection handling.
- A converging thin lens with real, virtual, and focal-plane cases.
- Play/pause and time scrubbing for time-dependent experiments; editable inputs, presets, reset, shareable settings, and SVG diagram downloads.
- Searchable experiment catalog and twelve concept lessons, each with a key-formula sheet, a step-by-step worked problem, and contextual FAQs.
- A physics formula sheet grouped by topic, a physics symbols glossary (`/physics-symbols/`), and a units reference.
- 100 practice questions across five topics, feedback, mistake review, focused retries, and device-local best scores, plus 20 server-rendered sample problems with answers.
- Printable 8-, 12-, and 20-question worksheets with an optional answer key.
- A teacher hub (`/teachers/`) with a printable one-page student activity for every experiment (`/experiments/<slug>/activity/`), matching answer keys (`/teachers/answers/<slug>/`), NGSS connections where they clearly apply, and plain-link Share to Google Classroom buttons.

## Development

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Astro outputs prerendered HTML in `dist/`. Each experiment has a server-rendered starting diagram, measurements, and explanation; interactive controls need JavaScript. Lessons and FAQ disclosures remain usable without JavaScript. Motion starts only after pressing Play and pauses when the page is hidden. Shared links restore validated input values and the selected time; invalid links display defaults with an explanatory message.

## Deploy to Cloudflare Pages

Connect `radoslav1992/physics-lab` and select `main`.

- Build command: `npm run build`
- Output directory: `dist`
- Environment: `NODE_VERSION=22`

The production origin `https://thephysicslab.org` is set in `astro.config.mjs`; the sitemap, robots.txt, canonical links, Open Graph URLs, and structured data derive from it. Change it there if the domain ever moves. The `.openai/hosting.json` manifest identifies the preview and is not needed by Cloudflare Pages. Static hosting needs no database, bindings, or migrations.

## Models and validation

All formulas live in `src/lib/physics.mjs`. Eighteen Node test cases check independent known answers, conservation relationships, parameter boundaries, singular cases, diagram finiteness, practice-bank integrity, search-guide completeness and snippet lengths, the numbers quoted in every worked example, and the Adsterra unit keys. Each experiment states its approximation and units. Illustrations are automatically scaled or explicitly schematic; no generated images are used for scientific diagrams.

The friction model deliberately uses the same coefficient for static and kinetic friction. Pendulum amplitude is limited to 15° for the small-angle approximation. The wave explorer lets frequency and wavelength vary independently and computes the implied speed. Ray optics uses ideal thin-lens/paraxial assumptions. These are educational models, not engineering design or safety tools.

A feature-detected WebMCP `configure_physics_experiment` tool uses the same validation and visible state updates as the controls. Unsupported browsers are unaffected. Browser interaction and WebMCP runtime validation could not be completed in this build environment because the supervised preview failed to become available; production builds and model/content checks passed.

## Search and structured data

Every page has a canonical URL, a title and meta description sized for search snippets, and JSON-LD: `WebApplication` for simulations, `Article` for lessons and references, `CollectionPage` for hubs, `BreadcrumbList` wherever a visible breadcrumb appears, and `WebSite` plus `Organization` on the home page. FAQ markup (`FAQPage`) is emitted only once per FAQ set, on the home page and on each simulation page. The 404 page is `noindex`.

## Design and privacy

Warm ivory, navy, teal, and amber carry the shared visual style of Geometry Lab. SVG diagrams are generated from the physical state. Native fields, keyboard-operable controls, visible focus, responsive layouts, and reduced-motion styles are included. Practice scores stay in local browser storage. Google Fonts supplies DM Sans and Manrope; system fonts are fallbacks. Google Analytics (G-2ZHXFW2460) measures site usage through the shared page layout. `/privacy/` explains analytics, ads, and local storage in plain language.

## Teachers

`/teachers/` lists every experiment with its grade band, time, NGSS connection, student activity, answer key, and a Share to Google Classroom link. Activities print as a single clean page (no header, footer, buttons, or ads). Answer keys are `noindex`, excluded from the sitemap (`astro.config.mjs`), linked only from the teacher hub, and show no ads; the hub shows none either. Share links are plain links to `classroom.google.com/share` (no Google script) and append `?classroom=1`, so students who open them browse ad-free. To add an activity, extend `src/lib/activities.mjs`; the tests check presets, field ranges, readout columns, and every printed number.

## Ads

Adsterra banner and native units fund the site. The unit keys live in `src/lib/ads.mjs`, and `src/components/AdSlot.astro` renders each slot with its space reserved (728×90 on wide screens or 320×50 on phones, 300×250, or native) so the page never jumps. Ad scripts load only when a slot nears the viewport, one banner at a time because Adsterra's snippets share a global `atOptions`, and only on the `thephysicslab.org` hostname, so local and preview builds stay ad-free. Placements: a leaderboard before the footer on every page (`<Layout ads={false}>` opts out, as on the 404 page); experiment and lesson pages, the formula sheet, and the symbols page add one 300×250 after the simulation or first content block, and lesson pages also add one native unit before the FAQ. Experiment, formula, and symbol pages skip the native unit because it would sit right next to another ad. Ads are never placed in the header or inside a simulation, and slots are hidden when printing. Students who arrive from Google Classroom, Canvas, or Schoology (or through a link carrying `?classroom`) browse ad-free on that device for 30 days: `src/components/AdFree.astro` runs in the page head, marks the page `ad-free` before anything renders, and `AdSlot` then neither shows nor loads ads.

Cookie consent: `src/components/ConsentDefaults.astro` runs right after `AdFree` in `<head>`, before the Google tag, and sets Google Consent Mode v2 defaults — analytics and ad storage are denied by default in the EEA, the UK, and Switzerland and granted elsewhere — and restores a saved choice (`cookieConsent` in local storage, kept 180 days). Visitors whose time zone is in Europe see `src/components/ConsentBanner.astro`, a small non-blocking banner with equally weighted Accept and Reject buttons. Until they accept, `AdSlot` neither shows nor loads ads; Reject keeps analytics cookie-free and shows no ads. *Cookie settings* in the footer reopens the banner, and accepting later starts ads without a reload. Students arriving from school platforms stay ad-free regardless of their choice.

## Project structure

- `src/lib/experiments.mjs`: experiment definitions, fields, lessons, and FAQs.
- `src/lib/physics.mjs`: validated calculations and worked steps.
- `src/lib/guides.mjs`: per-experiment search titles, quick answers, formula sheets, worked problems, and calculator FAQs (server-rendered only, so it stays out of the client bundle).
- `src/lib/diagrams.mjs`: state-based SVG diagrams.
- `src/lib/ads.mjs`, `src/components/AdSlot.astro`, and `src/components/AdFree.astro`: Adsterra unit keys, the lazy, production-only ad slot, and the ad-free rule for students arriving from school platforms.
- `src/components/ConsentDefaults.astro` and `src/components/ConsentBanner.astro`: Google Consent Mode defaults and the cookie banner for visitors in Europe.
- `src/components/Experiment.astro`: controls, animation, sharing, and downloads.
- `src/lib/practice.mjs`: question bank and round generation.
- `src/lib/activities.mjs`: classroom activities (steps, record tables, questions, answers) and the NGSS codes they reference. Each printed number carries a check against `physics.mjs`, enforced by `tests/activities.test.mjs`.
- `src/components/ActivityTable.astro` and `src/components/ClassroomShare.astro`: the worksheet record table (filled from the model in answer keys) and the Share to Google Classroom link.
- `src/pages`: static routes and educational resources.
- `src/styles`: base theme and physics-specific responsive/print styles.
- `tests/physics.test.mjs`: physics and content regression checks; `tests/ads.test.mjs`: ad unit key checks.
