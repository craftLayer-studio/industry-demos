// Common Table (fictional concept demo) theme.
// Poster-like community food network: a sunny butter-yellow canvas, deep
// forest-green ink and accent, a tomato red and leaf green reserved for the
// cut-paper illustrations, a characterful grotesk display face and a friendly
// rounded sans for body copy. Fonts come from next/font CSS variables set in
// src/app/nonprofit/layout.tsx (--font-ct-display / --font-ct-body).
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const commonTableTheme = defineTheme({
  name: 'commontable',
  extends: neutralTheme,

  // Brand-only colours used by page CSS and the SVG illustrations.
  localTokens: {
    '--ct-butter': '#f9df74',
    '--ct-butter-deep': '#f3cd45',
    '--ct-cream': '#fff8e1',
    '--ct-forest': '#1f4d2b',
    '--ct-forest-deep': '#163a20',
    '--ct-green': '#2f6b3a',
    '--ct-leaf': '#6fa84f',
    '--ct-tomato': '#d9512c',
    '--ct-tomato-text': '#a8361a',
    '--ct-crust': '#c9803a',
    '--ct-wood': '#8a5a32',
    '--ct-sky': '#9fd0d6',
    '--ct-ink': '#142a19',
  },

  typography: {
    scale: {base: 17, ratio: 1.25},
    body: {family: 'var(--font-ct-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-ct-display)',
      fallbacks: sansFallbacks,
      weight: 'bold',
      weights: {1: 'bold', 2: 'bold', 3: 'bold', 4: 'bold', 5: 'bold', 6: 'bold'},
    },
    code: {
      family: 'ui-monospace',
      fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", monospace',
    },
  },

  // Soft, friendly corners: cut paper rather than machined.
  radius: {base: 10, multiplier: 1.2},

  components: {
    button: {
      base: {borderRadius: '9999px', fontWeight: '700'},
    },
    'toggle-button': {
      base: {boxShadow: 'inset 0 0 0 2px var(--ct-forest)', borderRadius: '9999px', fontWeight: '700'},
      'isPressed:true': {
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-on-accent)',
      },
    },
  },

  tokens: {
    // Surfaces: butter-yellow page, cream paper cards.
    '--color-background-body': '#f9df74',
    '--color-background-surface': '#fff8e1',
    '--color-background-card': '#fffcf0',
    '--color-background-popover': '#fffcf0',
    '--color-background-muted': '#f6e7a8',

    // Accent: deep forest green (white text on it is 7.2:1).
    '--color-accent': '#2f6b3a',
    '--color-accent-muted': '#dcebc9',
    '--color-on-accent': '#ffffff',
    '--color-text-accent': '#235a2e',
    '--color-icon-accent': '#2f6b3a',

    // Text: forest ink rather than black. Secondary is 7:1+ on butter.
    '--color-text-primary': '#142a19',
    '--color-text-secondary': '#3b4a2c',
    '--color-icon-primary': '#142a19',
    '--color-icon-secondary': '#3b4a2c',

    '--color-border': '#c9b354',
    // Input, checkbox and radio outlines: 4.9:1 on cream, so controls stay visible (WCAG 1.4.11).
    '--color-border-emphasized': '#6f6635',
  },
});
