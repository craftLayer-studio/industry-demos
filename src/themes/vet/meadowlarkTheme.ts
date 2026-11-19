// Meadowlark Vets (fictional concept demo) theme.
// Meadow green on warm cream, rounded friendly type (Fredoka headings,
// Nunito body) and soft pill-shaped controls. Extends Astryx Neutral and only
// overrides what the brand needs. Fonts come from next/font CSS variables set
// in src/app/vet/layout.tsx (--font-meadowlark-heading / --font-meadowlark-body).
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks =
  'ui-rounded, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const meadowlarkTheme = defineTheme({
  name: 'meadowlark',
  extends: neutralTheme,

  // Brand-only colours for the SVG animal illustrations and meadow scenery.
  localTokens: {
    '--meadowlark-grass': ['#9cc777', '#4f7a3a'],
    '--meadowlark-leaf': ['#5f9b4c', '#7fbf68'],
    '--meadowlark-hill': ['#cfe3b4', '#2a3d25'],
    '--meadowlark-sky': ['#d8ecec', '#1c2f31'],
    '--meadowlark-butter': ['#f4e2a8', '#4a4024'],
    '--meadowlark-clover': ['#f1b9ae', '#b9786c'],
    '--meadowlark-ink': ['#1f2b1f', '#eef3e6'],
    '--meadowlark-fur-tan': ['#d99b5f', '#c88a52'],
    '--meadowlark-fur-cream': ['#f7e8cf', '#e6d4b5'],
    '--meadowlark-fur-grey': ['#a9a59b', '#8f8b82'],
    '--meadowlark-fur-dark': ['#5b4636', '#4a392c'],
    '--meadowlark-white': ['#fffdf7', '#f1ede2'],
  },

  typography: {
    scale: {base: 17, ratio: 1.24},
    body: {family: 'var(--font-meadowlark-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-meadowlark-heading)',
      fallbacks: sansFallbacks,
      weights: {1: 'semibold', 2: 'semibold', 3: 'semibold', 4: 'semibold'},
    },
    code: {
      family: 'ui-monospace',
      fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", monospace',
    },
  },

  // Soft, generous corners everywhere: friendly rather than clinical.
  radius: {base: 10, multiplier: 1.2},

  components: {
    button: {
      base: {borderRadius: '9999px'},
    },
    'segmented-control': {
      base: {borderRadius: '9999px'},
    },
    'segmented-control-item': {
      base: {borderRadius: '9999px'},
    },
    // Pet filter chips: pressed reads as clearly selected.
    'toggle-button': {
      base: {
        borderRadius: '9999px',
        boxShadow: 'inset 0 0 0 1px var(--color-border)',
        backgroundColor: 'var(--color-background-surface)',
      },
      'isPressed:true': {
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-on-accent)',
        boxShadow: 'none',
      },
    },
  },

  tokens: {
    // Surfaces: warm cream paper with meadow-tinted muted panels.
    '--color-background-body': ['#fbf7ea', '#141a13'],
    '--color-background-surface': ['#fffdf7', '#1b2319'],
    '--color-background-card': ['#fffdf7', '#1b2319'],
    '--color-background-popover': ['#fffdf7', '#1b2319'],
    '--color-background-muted': ['#f2ecd7', '#20291e'],
    '--color-background-green': ['#e4efd5', '#22331f'],
    '--color-background-yellow': ['#f8eecb', '#3a3420'],

    // Accent: deep meadow green (6.4:1 on cream body, 6.7:1 on white).
    '--color-accent': ['#2f6b3a', '#8fcf7a'],
    '--color-accent-muted': ['#dcebcf', '#2a3d25'],
    '--color-on-accent': ['#fffdf7', '#141a13'],
    '--color-text-accent': ['#285c32', '#9edb88'],
    '--color-icon-accent': ['#2f6b3a', '#8fcf7a'],

    // Text: soft forest ink rather than pure black.
    '--color-text-primary': ['#1f2b1f', '#eef3e6'],
    '--color-text-secondary': ['#4b5947', '#b5c1ad'],
    '--color-icon-primary': ['#1f2b1f', '#eef3e6'],
    '--color-icon-secondary': ['#4b5947', '#b5c1ad'],

    '--color-border': ['#dfd6b9', '#34402f'],

    '--radius-inner': '0.5rem',
    '--radius-element': '0.875rem',
    '--radius-container': '1.5rem',
    '--radius-page': '2rem',
  },
});
