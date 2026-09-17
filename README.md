# Physics Lab

A complete, static Astro Physics Visualizer for hands-on learning. Twelve interactive experiments connect diagrams, measurements, equations, assumptions, and worked explanations. No accounts, backend, API keys, or paid model calls are required.

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
- Searchable experiment catalog, twelve concept lessons, formula reference, units reference, and contextual FAQs.
- 100 practice questions across five topics, feedback, mistake review, focused retries, and device-local best scores.
- Printable 8-, 12-, and 20-question worksheets with an optional answer key.

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
- Set `SITE_URL` to the final public origin, such as `https://your-physics-domain.example`, before building.

The sitemap, robots.txt, canonical links, and Open Graph URLs derive from `SITE_URL`. Without it, the app uses its separate private preview origin. No public custom domain has been assumed or purchased. The `.openai/hosting.json` manifest identifies the preview and is not needed by Cloudflare Pages. Static hosting needs no database, bindings, or migrations.

## Models and validation

All formulas live in `src/lib/physics.mjs`. Fifteen Node test cases check independent known answers, conservation relationships, parameter boundaries, singular cases, diagram finiteness, and practice-bank integrity. Each experiment states its approximation and units. Illustrations are automatically scaled or explicitly schematic; no generated images are used for scientific diagrams.

The friction model deliberately uses the same coefficient for static and kinetic friction. Pendulum amplitude is limited to 15° for the small-angle approximation. The wave explorer lets frequency and wavelength vary independently and computes the implied speed. Ray optics uses ideal thin-lens/paraxial assumptions. These are educational models, not engineering design or safety tools.

A feature-detected WebMCP `configure_physics_experiment` tool uses the same validation and visible state updates as the controls. Unsupported browsers are unaffected. Browser interaction and WebMCP runtime validation could not be completed in this build environment because the supervised preview failed to become available; production builds and model/content checks passed.

## Design and privacy

Warm ivory, navy, teal, and amber carry the shared visual style of Geometry Lab. SVG diagrams are generated from the physical state. Native fields, keyboard-operable controls, visible focus, responsive layouts, and reduced-motion styles are included. Practice scores stay in local browser storage. Google Fonts supplies DM Sans and Manrope; system fonts are fallbacks. Google Analytics (G-2ZHXFW2460) measures site usage through the shared page layout. There are no advertising scripts.

## Project structure

- `src/lib/experiments.mjs`: experiment definitions, fields, lessons, and FAQs.
- `src/lib/physics.mjs`: validated calculations and worked steps.
- `src/lib/diagrams.mjs`: state-based SVG diagrams.
- `src/components/Experiment.astro`: controls, animation, sharing, and downloads.
- `src/lib/practice.mjs`: question bank and round generation.
- `src/pages`: static routes and educational resources.
- `src/styles`: base theme and physics-specific responsive/print styles.
- `tests/physics.test.mjs`: physics and content regression checks.
