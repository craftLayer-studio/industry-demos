# Astryx in the industry demos

Three fictional concept sites share one Next.js app (basePath `/industry-demos`).
The app root uses the package theme `neutral`; each demo nests its own built
theme. Full guide: `.claude/skills/astryx-design-system/SKILL.md` in the workspace root.

## How it is wired

| Piece | File |
|---|---|
| Reset + component CSS | `src/app/globals.css` |
| Root theme (neutral, via generated module) | `src/app/providers.tsx` uses `themes[defaultThemeSlug]` from `src/astryx-themes.ts` |
| Gym (Forge Fitness) | `src/themes/gym/forgeTheme.ts`, wrapper `src/components/gym/ForgeTheme.tsx`, used in `src/app/gym/layout.tsx` |
| Restaurant (Juniper Kitchen) | `src/themes/restaurant/juniperTheme.ts`, wrapper `src/components/restaurant/JuniperTheme.tsx` |
| Clinic (Northstar Clinic) | `src/themes/clinic/northstarTheme.ts`, wrapper `src/components/clinic/ClinicTheme.tsx` |

Each wrapper is a `'use client'` component that imports the **built** theme
`.js` and `.css` and renders `<Theme theme={...}>`. The next/font variable
classes go on an element that wraps the `<Theme>`, so the theme's font tokens
can resolve them. Do not run `astryx theme add` for the demo themes: it rewrites
`src/astryx-themes.ts` and can change the app default.

## Rebuild the themes

Run after editing a theme source and after any Astryx upgrade, then commit the
generated `.js`, `.css` and `.d.ts` files:

```bash
pnpm exec astryx theme build src/themes/gym/forgeTheme.ts
pnpm exec astryx theme build src/themes/restaurant/juniperTheme.ts
pnpm exec astryx theme build src/themes/clinic/northstarTheme.ts
# add --check to verify committed output is up to date without writing
```

## Rules of thumb

- Every demo page shows a visible "Concept demo" label (`Badge` or `Banner`).
- Forms never send data. Say so in the confirmation UI.
- Look up props before use: `pnpm exec astryx component DateInput --dense`.
- `xstyle` does not work here (no StyleX compiler); use `className` + CSS Modules.
- Links: pass app-relative hrefs (`/gym/`) to Astryx links and `next/link`;
  the basePath is added for you. Raw `<a>` tags and asset URLs need the
  `/industry-demos` prefix: use `asset()` from `src/lib/paths.ts`.
- Useful components: `Table` (schedule), `SegmentedControl` / `Selector` /
  `CheckboxList` (filters), `DateInput` / `TimeInput` / `NumberInput` /
  `RadioList` (booking), `Drawer` or `Dialog purpose="form"` (cart),
  `Stepper` + `Step` (appointment request), `CollapsibleGroup hasDividers` (FAQ).
