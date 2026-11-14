// Quillmark Academy (fictional concept demo) theme.
// Warm ivory paper, ink-brown text, a burnt-orange accent and a deep teal
// secondary, with an expressive serif for headings and a friendly sans body.
// Extends Astryx Neutral and only overrides what the brand needs. Fonts come
// from next/font CSS variables set in src/app/academy/layout.tsx
// (--font-quillmark-display / --font-quillmark-body).
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const serifFallbacks = 'Georgia, "Times New Roman", serif';

export const quillmarkTheme = defineTheme({
  name: 'quillmark',
  extends: neutralTheme,

  // Brand-only colours for illustrations, ruled-paper motifs and highlights.
  localTokens: {
    '--quillmark-paper': ['#fbf6ec', '#1d1813'],
    '--quillmark-paper-deep': ['#f3e9d6', '#272018'],
    '--quillmark-rule': ['#e6d9c2', '#3a3026'],
    '--quillmark-margin': ['#e7a58c', '#8c4a33'],
    '--quillmark-ink': ['#2b1d14', '#f4ebdd'],
    '--quillmark-saffron': ['#f2b33d', '#e0a531'],
    '--quillmark-saffron-soft': ['#fbe5b4', '#4a3a1c'],
    '--quillmark-teal': ['#1d5c60', '#7cc4c4'],
    '--quillmark-teal-soft': ['#d5e8e6', '#1c3537'],
    '--quillmark-orange-soft': ['#f8dccd', '#4a2a1d'],
  },

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {family: 'var(--font-quillmark-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-quillmark-display)',
      fallbacks: serifFallbacks,
      weights: {1: 'semibold', 2: 'semibold', 3: 'semibold', 4: 'semibold'},
    },
    code: {
      family: 'ui-monospace',
      fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", monospace',
    },
  },

  radius: {base: 6, multiplier: 1},

  tokens: {
    // Surfaces: ivory paper, slightly brighter cards.
    '--color-background-body': ['#fbf6ec', '#17130f'],
    '--color-background-surface': ['#fffdf8', '#1f1914'],
    '--color-background-card': ['#fffdf8', '#1f1914'],
    '--color-background-popover': ['#fffdf8', '#1f1914'],
    '--color-background-muted': ['#f3e9d6', '#272018'],
    '--color-background-orange': ['#f8dccd', '#4a2a1d'],
    '--color-background-teal': ['#d5e8e6', '#1c3537'],
    '--color-background-yellow': ['#fbe5b4', '#4a3a1c'],

    // Accent: burnt orange (5.6:1 on white, 5.2:1 on ivory body).
    '--color-accent': ['#b0441a', '#f08a5d'],
    '--color-accent-muted': ['#f8dccd', '#4a2a1d'],
    '--color-on-accent': ['#ffffff', '#17130f'],
    '--color-text-accent': ['#963914', '#f4a07a'],
    '--color-icon-accent': ['#b0441a', '#f08a5d'],

    // Text: ink brown rather than pure black.
    '--color-text-primary': ['#2b1d14', '#f4ebdd'],
    '--color-text-secondary': ['#5e4a3b', '#c9b9a5'],
    '--color-icon-primary': ['#2b1d14', '#f4ebdd'],
    '--color-icon-secondary': ['#5e4a3b', '#c9b9a5'],

    '--color-border': ['#e2d4bd', '#3a3026'],

    '--radius-inner': '0.375rem',
    '--radius-element': '0.5rem',
    '--radius-container': '0.875rem',
    '--radius-page': '1.25rem',
  },
});
