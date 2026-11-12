/**
 * Forge Fitness theme (concept demo).
 *
 * Extends the Astryx neutral theme: near-black surfaces, a volt-lime signal
 * accent, condensed display headings and sharp corners. Fonts are loaded by
 * next/font in src/app/gym/layout.tsx and exposed as CSS variables.
 *
 * Rebuild after every edit:
 *   pnpm exec astryx theme build src/themes/gym/forgeTheme.ts
 */
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

export const forgeTheme = defineTheme({
  name: 'forge',
  extends: neutralTheme,
  color: {
    // [light, dark]: deep olive for light surfaces, volt lime on near-black.
    accent: ['#4A6400', '#C6F432'],
    neutralStyle: 'neutral',
    contrast: 'standard',
  },
  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {
      family: 'var(--font-forge-body)',
      fallbacks: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    },
    heading: {
      family: 'var(--font-forge-display)',
      fallbacks: 'Impact, "Arial Narrow", sans-serif',
    },
    code: {
      family: 'var(--font-forge-mono)',
      fallbacks: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    },
  },
  radius: {base: 2, multiplier: 0.5},
  tokens: {
    // Pin the exact signal colours; the colour scale would otherwise tone them down.
    '--color-accent': ['#4A6400', '#C6F432'],
    '--color-on-accent': ['#FFFFFF', '#0A0A09'],
    // Anton ships a single 400 weight: keep headings at 400 so the browser
    // never synthesises a faux bold.
    '--text-heading-1-weight': '400',
    '--text-heading-1-leading': '1.05',
    '--text-heading-2-weight': '400',
    '--text-heading-2-leading': '1.05',
    '--text-heading-3-weight': '400',
    '--text-heading-3-leading': '1.05',
    '--text-heading-4-weight': '400',
    '--text-heading-4-leading': '1.05',
    '--text-heading-5-weight': '400',
    '--text-heading-5-leading': '1.05',
    '--text-heading-6-weight': '400',
    '--text-heading-6-leading': '1.05',
    '--color-background-body': ['#F4F3EE', '#0A0A09'],
    '--color-background-surface': ['#FFFFFF', '#141413'],
    '--color-text-primary': ['#0A0A09', '#F4F3EE'],
    '--color-text-secondary': ['#3B3B37', '#B9B8B0'],
  },
});
