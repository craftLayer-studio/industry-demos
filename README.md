# CraftLayer Studio industry demos

Three fully working **concept websites** for fictional businesses, designed and engineered by [CraftLayer Studio](https://craftlayer-studio.github.io/) to show how we approach industry websites.

> **Concept demo disclaimer.** Forge Fitness, Juniper Kitchen and Northstar Clinic are fictional brands. They are not CraftLayer clients, they are not real businesses, and every person, address, phone number and price is invented. No bookings, orders, appointments, payments or personal data are processed or sent anywhere. Every page shows a "Concept demo" notice.

| Demo | Industry | Live |
|---|---|---|
| **Forge Fitness** | Gym and fitness | https://craftlayer-studio.github.io/industry-demos/gym/ |
| **Juniper Kitchen** | Restaurant and hospitality | https://craftlayer-studio.github.io/industry-demos/restaurant/ |
| **Northstar Clinic** | Healthcare | https://craftlayer-studio.github.io/industry-demos/clinic/ |

Index: https://craftlayer-studio.github.io/industry-demos/

## Screenshots

| Forge Fitness | Juniper Kitchen | Northstar Clinic |
|---|---|---|
| ![Forge Fitness hero](docs/screenshots/gym.png) | ![Juniper Kitchen hero](docs/screenshots/restaurant.png) | ![Northstar Clinic hero](docs/screenshots/clinic.png) |

## Features

**Forge Fitness** (`/gym/`): bold, dark, athletic brand.
- Programme cards that pre-filter the timetable.
- Class timetable filtered by day, programme and intensity, with an empty state.
- Membership tiers with a monthly/annual switch that recalculates prices.
- Trial booking form: field validation, error summary with focus, a date restricted to the chosen class's weekday, loading and honest demo success states.
- Fictional coaches, original SVG artwork, location and hours.

**Juniper Kitchen** (`/restaurant/`): warm, editorial restaurant brand.
- Menu with category tabs, dietary filters and accent-insensitive search.
- Mock pickup order: cart drawer, quantities, subtotal, illustrative tax, pickup-time and name validation, confirmation that states nothing was ordered or paid.
- Table reservation: open days only, time slots from opening hours, party size 1–12, contact validation.
- Story, gallery of original illustrations, hours and a stylised map.

**Northstar Clinic** (`/clinic/`): calm, clean healthcare brand.
- Specialties and services written without medical claims.
- Fictional clinicians with a working specialty filter.
- Accessible multi-step appointment request: specialty, clinician, weekday date within 60 days, deterministic time slots, minimal contact details, review, demo confirmation. Focus moves to each step heading.
- FAQ accordion, hours, stylised map, and a clear "not a real clinic" warning.

All three are responsive down to 320px, keyboard accessible, and respect `prefers-reduced-motion`.

## Technology

- Next.js 16.4.6 App Router, React 19.3, TypeScript 5, static export.
- [Meta Astryx](https://github.com/meta/astryx) 0.7.13. Each demo has its own built theme (`src/themes/gym/forge`, `src/themes/restaurant/juniper`, `src/themes/clinic/northstar`) nested inside its route layout. See `docs/ASTRYX.md`.
- CSS Modules on top of Astryx tokens; fonts self-hosted at build time via `next/font`.
- Vitest + Testing Library for filtering, pricing, cart, scheduling and validation logic.

## Project structure

```text
src/app/page.tsx              demos index
src/app/{gym,restaurant,clinic}/   route layout (metadata, fonts, theme) + page
src/components/shell/         ConceptBar shown on every demo page
src/components/{gym,restaurant,clinic}/   components and pure logic modules with tests
src/themes/{gym,restaurant,clinic}/       Astryx theme sources and built output
src/lib/paths.ts              basePath helper for plain <img> and static links
```

## Local setup

Requirements: Node.js 20.9+ (22 LTS recommended), pnpm 11.

```bash
pnpm install
pnpm dev            # http://localhost:3000/industry-demos/
pnpm lint && pnpm typecheck && pnpm test
pnpm build          # static export to out/
```

`dev` and `build` use `--webpack` for parity with hosts whose glibc cannot load Turbopack's native bindings. Run one build at a time: concurrent builds share `.next/` and can fail.

To preview the export with the correct base path, serve a directory whose `industry-demos/` folder contains `out/`, for example:

```bash
mkdir -p /tmp/pages/industry-demos && cp -r out/. /tmp/pages/industry-demos/
cd /tmp/pages && python3 -m http.server 4321   # http://localhost:4321/industry-demos/
```

## Deployment configuration

This is a GitHub Pages **project site**, served under `/industry-demos`.

```ts
// next.config.ts
output: 'export', basePath: '/industry-demos', trailingSlash: true, images: {unoptimized: true}
```

`next/link` and `next/image` add the base path automatically. Plain `<img>`, CSS `url()` and links to static files use `asset()` from `src/lib/paths.ts`. `.github/workflows/deploy.yml` installs with a frozen lockfile, runs lint, typecheck, tests and the build, checks that every demo page exists in `out/`, then deploys with `actions/deploy-pages`. A failing check stops the run before deployment.

## Known limitations

- Static hosting only: forms validate in the browser and then stop. Nothing is stored or sent, by design.
- Availability, time slots, prices and opening hours are generated from static data, not a live system.
- Visuals are original SVG illustrations, not photography.
- Maps are stylised illustrations; there are no third-party map embeds.
- The demos sitemap is listed in the main site's `robots.txt`, because a project site's own `robots.txt` is not read by crawlers.

## Licence

Code: MIT (see `LICENSE`). The fictional brand names and copy are provided as portfolio material; the CraftLayer Studio name and logo are not covered by the code licence.
