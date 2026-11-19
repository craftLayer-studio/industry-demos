// Arbour Dental (fictional concept demo) theme.
// Clean ice-blue on bright whites, a soft geometric sans and generous,
// pill-and-pebble rounding. Deliberately cooler and bluer than the
// Northstar Clinic teal. Fonts come from next/font CSS variables set in
// src/app/dental/layout.tsx (--font-arbour-heading / --font-arbour-body).
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const arbourTheme = defineTheme({
  name: 'arbour',
  extends: neutralTheme,

  // Brand-only colours for the illustrations and tinted bands.
  localTokens: {
    '--arbour-ice': ['#e6f1fb', '#14243a'],
    '--arbour-ice-strong': ['#c9e0f6', '#1d3452'],
    '--arbour-glacier': ['#9cc6ee', '#2f5683'],
    '--arbour-frost': ['#f7fbff', '#0f1b2c'],
    '--arbour-pearl': ['#ffffff', '#16263c'],
    '--arbour-silver': ['#d5e0eb', '#2a3a50'],
    '--arbour-deep': ['#0c2a4a', '#081626'],
    '--arbour-ink': ['#0d2238', '#e9f2fb'],
  },

  typography: {
    scale: {base: 16, ratio: 1.22},
    body: {family: 'var(--font-arbour-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-arbour-heading)',
      fallbacks: sansFallbacks,
      weights: {1: 'semibold', 2: 'semibold', 3: 'medium', 4: 'medium'},
    },
    code: {
      family: 'ui-monospace',
      fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", monospace',
    },
  },

  // Soft and rounded: pebble cards, pill controls.
  radius: {base: 8, multiplier: 1.25},

  components: {
    button: {
      base: {borderRadius: '9999px'},
      'variant:secondary': {
        backgroundColor: 'var(--color-accent-muted)',
        color: 'var(--color-text-accent)',
      },
    },
  },

  tokens: {
    // Surfaces: bright white with an ice-blue cast.
    '--color-background-body': ['#f6f9fd', '#0b1626'],
    '--color-background-surface': ['#ffffff', '#111f33'],
    '--color-background-card': ['#ffffff', '#111f33'],
    '--color-background-popover': ['#ffffff', '#111f33'],
    '--color-background-muted': ['#edf4fb', '#15253b'],
    '--color-background-blue': ['#e1eefa', '#16304d'],
    '--color-background-cyan': ['#e0f2f8', '#123444'],

    // Accent: clear glacier blue (6.4:1 on white).
    '--color-accent': ['#1d5f9f', '#8cc2f2'],
    '--color-accent-muted': ['#e3effa', '#1b3452'],
    '--color-on-accent': ['#ffffff', '#0b1626'],
    '--color-text-accent': ['#1a5591', '#9ccbf5'],
    '--color-icon-accent': ['#1d5f9f', '#8cc2f2'],

    // Text: deep navy-slate rather than black.
    '--color-text-primary': ['#0d2238', '#e9f2fb'],
    '--color-text-secondary': ['#4a5d72', '#a9bccf'],
    '--color-icon-primary': ['#0d2238', '#e9f2fb'],
    '--color-icon-secondary': ['#4a5d72', '#a9bccf'],

    '--color-border': ['#d9e5f1', '#24384f'],

    '--radius-inner': '0.5rem',
    '--radius-element': '0.875rem',
    '--radius-container': '1.5rem',
    '--radius-page': '2rem',
  },
});
