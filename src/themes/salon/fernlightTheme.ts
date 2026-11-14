// Fernlight Salon & Spa (fictional concept demo) theme.
// Soft-luxury botanical: blush and rose canvas, deep plum ink and accent, a
// high-contrast Bodoni display serif with a light geometric sans. Extends
// Astryx Neutral and only overrides what the brand needs. Fonts come from
// next/font CSS variables set in src/app/salon/layout.tsx
// (--font-fernlight-display / --font-fernlight-body).
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks =
  '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
const serifFallbacks = '"Didot", "Bodoni 72", "Times New Roman", serif';

export const fernlightTheme = defineTheme({
  name: 'fernlight',
  extends: neutralTheme,

  // Brand-only colours for the botanical line art and the stylised map.
  localTokens: {
    '--fernlight-blush': ['#f6e4e1', '#2a1720'],
    '--fernlight-rose': ['#ecc9c6', '#4a2536'],
    '--fernlight-petal': ['#fbf3f1', '#1e1118'],
    '--fernlight-sage': ['#a9b8a0', '#7f9478'],
    '--fernlight-sage-deep': ['#5f7357', '#a9bea0'],
    '--fernlight-stone': ['#d9cfcb', '#3a2e33'],
    '--fernlight-gold': ['#b98a5e', '#d4a97c'],
    '--fernlight-plum-deep': ['#4a1631', '#f3d7e3'],
    '--fernlight-map-land': ['#f8ebe8', '#22141b'],
    '--fernlight-map-block': ['#efd9d5', '#2f1d26'],
    '--fernlight-map-road': ['#fffaf9', '#3d2a33'],
    '--fernlight-map-park': ['#dfe6d6', '#25332a'],
    '--fernlight-map-water': ['#dde7ea', '#1d2b33'],
  },

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {family: 'var(--font-fernlight-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-fernlight-display)',
      fallbacks: serifFallbacks,
      weights: {1: 'normal', 2: 'normal', 3: 'medium', 4: 'medium'},
    },
    code: {
      family: 'ui-monospace',
      fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", monospace',
    },
  },

  // Soft, pebble-like corners.
  radius: {base: 8, multiplier: 1.25},

  components: {
    button: {
      base: {borderRadius: '9999px', letterSpacing: '0.02em'},
      'variant:secondary': {
        backgroundColor: 'var(--color-accent-muted)',
        color: 'var(--color-text-accent)',
      },
    },
    'toggle-button': {
      base: {borderRadius: '9999px', boxShadow: 'inset 0 0 0 1px var(--color-border)'},
      'isPressed:true': {
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-on-accent)',
      },
    },
  },

  tokens: {
    // Surfaces: blush canvas, petal-white cards.
    '--color-background-body': ['#fbf1ef', '#170d12'],
    '--color-background-surface': ['#fffaf9', '#21131a'],
    '--color-background-card': ['#fffaf9', '#21131a'],
    '--color-background-popover': ['#fffaf9', '#21131a'],
    '--color-background-muted': ['#f4e2df', '#2a1820'],
    '--color-background-pink': ['#f6dde0', '#3a1f2b'],
    '--color-background-purple': ['#ecdbe6', '#33202d'],
    '--color-background-green': ['#e3eadc', '#1f2b21'],

    // Accent: deep plum (on white about 9:1; white text on it about 9:1).
    '--color-accent': ['#7d2f55', '#e9a9c6'],
    '--color-accent-muted': ['#f1dbe4', '#3f2131'],
    '--color-on-accent': ['#ffffff', '#1c0c14'],
    '--color-text-accent': ['#7d2f55', '#efb7cf'],
    '--color-icon-accent': ['#7d2f55', '#e9a9c6'],

    // Text: plum ink rather than black.
    '--color-text-primary': ['#2e1222', '#f6e8ee'],
    '--color-text-secondary': ['#674656', '#cdb3bf'],
    '--color-icon-primary': ['#2e1222', '#f6e8ee'],
    '--color-icon-secondary': ['#674656', '#cdb3bf'],

    '--color-border': ['#ead2cf', '#3e2632'],

    '--radius-inner': '0.5rem',
    '--radius-element': '0.875rem',
    '--radius-container': '1.5rem',
    '--radius-page': '2rem',
  },
});
