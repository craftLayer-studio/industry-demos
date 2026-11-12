// Northstar Clinic (fictional concept demo) theme.
// Calm sea-glass teal on soft clinical whites, humanist sans type and
// rounded-but-not-playful corners. Extends Astryx Neutral and only overrides
// what the brand needs. Fonts come from next/font CSS variables set in
// src/app/clinic/layout.tsx (--font-northstar-heading / --font-northstar-body).
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const northstarTheme = defineTheme({
  name: 'northstar',
  extends: neutralTheme,

  // Brand-only colours for the illustrations (hero art and stylised map).
  localTokens: {
    '--northstar-seaglass': ['#cfeae6', '#1f4442'],
    '--northstar-seaglass-strong': ['#9fd6cf', '#2c5f5b'],
    '--northstar-mist': ['#e9f4f7', '#16282c'],
    '--northstar-sky': ['#d7e8f4', '#1b3240'],
    '--northstar-sand': ['#f6efe4', '#2a2620'],
    '--northstar-coral': ['#f2a48f', '#d98a76'],
    '--northstar-ink': ['#10282b', '#e8f3f2'],
    '--northstar-map-land': ['#f4f8f6', '#132326'],
    '--northstar-map-block': ['#e3ece9', '#1c3134'],
    '--northstar-map-road': ['#ffffff', '#2a4245'],
    '--northstar-map-water': ['#cde6ef', '#183847'],
    '--northstar-map-park': ['#d6ecd9', '#1d3a2a'],
  },

  typography: {
    scale: {base: 16, ratio: 1.22},
    body: {family: 'var(--font-northstar-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-northstar-heading)',
      fallbacks: sansFallbacks,
      weights: {1: 'bold', 2: 'bold', 3: 'semibold', 4: 'semibold'},
    },
    code: {
      family: 'ui-monospace',
      fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", monospace',
    },
  },

  // Rounded but not playful: firm corners on controls, softer on cards.
  radius: {base: 6, multiplier: 1},

  // Pressed filters and chosen time slots read as clearly selected.
  components: {
    'toggle-button': {
      base: {boxShadow: 'inset 0 0 0 1px var(--color-border)'},
      'isPressed:true': {
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-on-accent)',
      },
    },
  },

  tokens: {
    // Surfaces: soft clinical white with a hint of sea-glass.
    '--color-background-body': ['#f3f8f7', '#0e1a1c'],
    '--color-background-surface': ['#ffffff', '#132326'],
    '--color-background-card': ['#ffffff', '#132326'],
    '--color-background-popover': ['#ffffff', '#132326'],
    '--color-background-muted': ['#e6f3f1', '#182c2f'],
    '--color-background-teal': ['#d3eeea', '#1d3a3a'],
    '--color-background-cyan': ['#d6edf5', '#1b3440'],

    // Accent: calm deep teal (6.05:1 on white, 5.64:1 on body).
    '--color-accent': ['#0b6e6e', '#6fd0c8'],
    '--color-accent-muted': ['#ddf1ee', '#1f4442'],
    '--color-on-accent': ['#ffffff', '#0e1a1c'],
    '--color-text-accent': ['#0a5c5c', '#7fd8d0'],
    '--color-icon-accent': ['#0b6e6e', '#6fd0c8'],

    // Text: deep ink-teal rather than pure black.
    '--color-text-primary': ['#10282b', '#e8f3f2'],
    '--color-text-secondary': ['#4a6366', '#a7bfbf'],
    '--color-icon-primary': ['#10282b', '#e8f3f2'],
    '--color-icon-secondary': ['#4a6366', '#a7bfbf'],

    '--color-border': ['#d4e3e1', '#27403f'],

    '--radius-inner': '0.375rem',
    '--radius-element': '0.625rem',
    '--radius-container': '1rem',
    '--radius-page': '1.5rem',
  },
});
