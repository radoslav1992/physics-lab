# The Physics Lab

The Physics Lab ([thephysicslab.org](https://thephysicslab.org)) is a complete, static Astro physics visualizer for hands-on learning. Fifteen interactive experiments connect diagrams, measurements, equations, assumptions, and worked explanations. No accounts, backend, API keys, or paid model calls are required.

## Included

- Projectile motion with angle, speed, gravity, trajectory, flight time, and range.
- Position and velocity graphs under constant acceleration, including reversals.
- Free fall under Earth, Moon, Mars, or Jupiter gravity, with air resistance off or on (quadratic drag and terminal velocity), the two falls side by side, and speed–time and height–time graphs.
- Uniform circular motion and centripetal force for a puck on a string (set speed, period, or rpm), a car on a flat curve (top speed √(μgr), with a skid when friction is too small), and a satellite in a circular Earth orbit.
- One-dimensional collisions of two carts with a coefficient of restitution from 0 (stick together) to 1 (elastic): momentum, kinetic energy lost, and impulse, with a live momentum bar chart.
- Applied force and static/kinetic friction on a level surface.
- Conservation of energy for a particle sliding down a frictionless ramp.
- Buoyancy, prescribed immersion, floating equilibrium, and sinking.
- Small-angle pendulum motion and an ideal spring oscillator.
- A traveling transverse wave with a highlighted medium particle.
- Ohm’s law, electrical power, and series/parallel resistor circuits.
- Snell’s law with critical-angle and total-internal-reflection handling.
- A converging thin lens with real, virtual, and focal-plane cases.
- Play/pause and time scrubbing for time-dependent experiments; editable inputs, presets, reset, shareable settings, and SVG diagram downloads.
- Searchable experiment catalog and fifteen concept lessons, each with a key-formula sheet, a step-by-step worked problem, and contextual FAQs.
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

**HTTPS.** A static site cannot redirect `http://` requests itself, and some `http://thephysicslab.org/...` URLs have appeared in Google Search. Turn on **Always Use HTTPS** for the zone in the Cloudflare dashboard (SSL/TLS → Edge Certificates) so every `http://` request is redirected to `https://`. `public/_headers` also sends `Strict-Transport-Security: max-age=31536000; includeSubDomains` on every response, so browsers that have visited once keep using HTTPS. Do not add host- or scheme-based rules to `_redirects`; Cloudflare's static asset hosting rejects them.

## Models and validation

All formulas live in `src/lib/physics.mjs`. Forty-four Node test cases check independent known answers, conservation relationships, parameter boundaries, singular cases, diagram finiteness, practice-bank integrity, search-guide completeness and snippet lengths, the numbers quoted in every worked example, and that ads are switched off. Each experiment states its approximation and units. Illustrations are automatically scaled or explicitly schematic; no generated images are used for scientific diagrams.

The friction model deliberately uses the same coefficient for static and kinetic friction. Pendulum amplitude is limited to 15° for the small-angle approximation. The wave explorer lets frequency and wavelength vary independently and computes the implied speed. Ray optics uses ideal thin-lens/paraxial assumptions. Free fall uses quadratic drag, ½ρCdAv², with a constant drag coefficient and air density: terminal velocity vₜ = √(2mg/(ρCdA)), v(t) = vₜ tanh(gt/vₜ), y(t) = (vₜ²/g) ln cosh(gt/vₜ), and a fall time found by inverting y(t). Its object presets are rounded, approximate values (the skydiver uses the OpenStax textbook figures, 85 kg, Cd 1.0, 0.7 m²), and its gravity presets change g only. Circular motion is described from the ground frame; the car is on a flat, unbanked road with one friction coefficient, and the satellite is on a circular orbit around a spherical Earth with GM = 3.986004418 × 10¹⁴ m³/s² and the equatorial radius 6,378.137 km, which gives a geostationary period within a second of the sidereal day. Collisions are instantaneous with a constant coefficient of restitution; carts that are not closing on each other are reported as never meeting. These are educational models, not engineering design or safety tools.

`fall`, `terminalVelocity`, `circular`, `curveSpeedLimit`, `orbitSpeed`, and `collide` are exported from `physics.mjs` as plain functions so tests, answer keys, and diagrams share them. Very short or very long motions return a `playTime`, so the animation is slowed down or sped up and says so on the diagram; the clock always shows model time.

A feature-detected WebMCP `configure_physics_experiment` tool uses the same validation and visible state updates as the controls. Unsupported browsers are unaffected. Browser interaction and WebMCP runtime validation could not be completed in this build environment because the supervised preview failed to become available; production builds and model/content checks passed.

## Search and structured data

Every page has a canonical URL, a title and meta description sized for search snippets, and JSON-LD: `WebApplication` for simulations, `Article` for lessons and references, `CollectionPage` for hubs, `BreadcrumbList` wherever a visible breadcrumb appears, and `WebSite` plus `Organization` on the home page. FAQ markup (`FAQPage`) is emitted only once per FAQ set, on the home page and on each simulation page. The experiment hub adds an `ItemList` of all the simulations that matches its visible “What each physics simulation does” table.

Search wording lives in `src/lib/guides.mjs`: each simulation’s title and H1 lead with “… simulation” or “… simulator”, the description and the one-line `summary` say what can be changed and measured, and `formulaHeading` names its block on the formula sheet. Simulation, lesson, and activity pages link to each other with those names as anchor text. Deep links: `/formulas/#<experiment-slug>` (for example `/formulas/#buoyancy`), `/formulas/#centripetal-force` for rows of the extra table, and `/physics-symbols/#symbol-force` for a symbol row (ids come from `src/lib/symbols.mjs`). The 404 page is `noindex`.

## Design and privacy

Warm ivory, navy, teal, and amber carry the shared visual style of Geometry Lab. SVG diagrams are generated from the physical state. Native fields, keyboard-operable controls, visible focus, responsive layouts, and reduced-motion styles are included. Practice scores stay in local browser storage. Google Fonts supplies DM Sans and Manrope; system fonts are fallbacks. Google Analytics (G-2ZHXFW2460) measures site usage through the shared page layout. `/privacy/` explains analytics and local storage in plain language, and says there are no ads.

## Teachers

`/teachers/` lists every experiment with its grade band, time, NGSS connection, student activity, answer key, and a Share to Google Classroom link. Activities print as a single clean page (no header, footer, buttons, or ads). Answer keys are `noindex`, excluded from the sitemap (`astro.config.mjs`), linked only from the teacher hub, and show no ads; the hub shows none either. Share links are plain links to `classroom.google.com/share` (no Google script) and append `?classroom=1`, which marks a visit as coming from a class (the ad-free rule reads it if ads are ever switched on again). To add an activity, extend `src/lib/activities.mjs`; the tests check presets, field ranges, readout columns, and every printed number.

## Ads

The Physics Lab shows no ads. `src/lib/ads.mjs` holds no unit keys, so `src/components/AdSlot.astro` renders nothing: no markup, no script, and no request to an ad network. Adsterra was removed in November 2026 because its filters do not block dating and fake-alert ads, which are not acceptable on a site used in classrooms.

The switch is kept so ads could return with a network that is safe for schools. The `<AdSlot>` placements stay in the pages, and `AdUnit.astro` (the unit and its loader) and `AdFree.astro` (no ads for visitors from Google Classroom, Canvas or Schoology) only run when keys are set. The privacy, about and teacher pages say the site has no ads, so restore their advertising sections before setting keys; `tests/ads.test.mjs` fails as a reminder.

Cookie consent: `src/components/ConsentDefaults.astro` runs in `<head>`, before the Google tag, and sets Google Consent Mode v2 defaults — analytics and ad storage are denied by default in the EEA, the UK, and Switzerland and granted elsewhere — and restores a saved choice (`cookieConsent` in local storage, kept 180 days). Visitors whose time zone is in Europe see `src/components/ConsentBanner.astro`, a small non-blocking banner with equally weighted Accept and Reject buttons. Until they accept, Google Analytics runs without cookies; Reject keeps it cookie-free. *Cookie settings* in the footer reopens the banner.

## Project structure

- `src/lib/experiments.mjs`: experiment definitions, fields, lessons, and FAQs. A field made with `only(mode, …)` appears only in that mode; one made with `linked(…)` is another way to enter a stored value (period and rpm set the speed in circular motion); a preset may name the mode it belongs to as a third item; `related` lists experiments in other topics to link to and from. `count` and `countWord` give the number of experiments, and the home page, hubs, teacher page, and `llms.txt` intro read them, so adding an experiment updates every “15”.
- `src/lib/physics.mjs`: validated calculations and worked steps.
- `src/lib/guides.mjs`: per-experiment search titles, quick answers, formula sheets, worked problems, and calculator FAQs (server-rendered only, so it stays out of the client bundle).
- `src/lib/diagrams.mjs`: state-based SVG diagrams.
- `src/lib/symbols.mjs`: the physics symbols tables, row anchors, and the A–Z quantity lookup shown on `/physics-symbols/`.
- `src/lib/ads.mjs`, `src/components/AdSlot.astro`, `src/components/AdUnit.astro`, and `src/components/AdFree.astro`: the ad switch (off: no unit keys), the slot that renders nothing while it is off, the unit and its loader, and the ad-free rule for students arriving from school platforms.
- `src/components/ConsentDefaults.astro` and `src/components/ConsentBanner.astro`: Google Consent Mode defaults and the cookie banner for visitors in Europe.
- `src/components/Experiment.astro`: controls, animation, sharing, and downloads.
- `src/lib/practice.mjs`: question bank and round generation.
- `src/lib/activities.mjs`: classroom activities (steps, record tables, questions, answers) and the NGSS codes they reference. Each printed number carries a check against `physics.mjs`, enforced by `tests/activities.test.mjs`.
- `src/components/ActivityTable.astro` and `src/components/ClassroomShare.astro`: the worksheet record table (filled from the model in answer keys) and the Share to Google Classroom link.
- `src/pages`: static routes and educational resources.
- `src/styles`: base theme and physics-specific responsive/print styles.
- `tests/physics.test.mjs`: physics and content regression checks, including every number quoted in the new experiments’ examples, worked problems, and FAQs; `tests/ads.test.mjs`: ad unit key checks; `tests/content.test.mjs`: search copy, symbol anchors, and the HTTPS header.

## llms.txt

`public/llms.txt` is a plain-text guide to the site for AI assistants (see llmstxt.org): one line per page with
its title and description. ChatGPT is one of the site's main sources of visitors, and it can only recommend a
tool it can read about. The file is generated from the built pages, so regenerate it after changing a title or
description, or adding a page:

```sh
npm run build && npm run llms
```

`tests/llms.test.mjs` fails if a experiment is missing from the file.
