// Ashgrove Property (fictional concept demo) theme.
// Warm, architectural and editorial: a limestone canvas, charcoal ink, a
// fired-terracotta accent, a high-contrast display serif for headings and a
// clean grotesk for body copy. Fonts come from next/font CSS variables set in
// src/app/real-estate/layout.tsx (--font-ashgrove-heading / --font-ashgrove-body).
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const serifFallbacks = 'Georgia, "Times New Roman", Times, serif';

export const ashgroveTheme = defineTheme({
  name: 'ashgrove',
  extends: neutralTheme,

  // Brand-only colours used by page CSS and the architectural illustrations.
  localTokens: {
    '--ashgrove-ink': ['#25211d', '#efe8de'],
    '--ashgrove-charcoal': ['#2e2a26', '#191613'],
    '--ashgrove-limestone': ['#f1ebe2', '#1d1a17'],
    '--ashgrove-stone': ['#e4dacb', '#29241f'],
    '--ashgrove-stone-deep': ['#cfc2ae', '#3a332b'],
    '--ashgrove-paper': ['#fbf8f3', '#221e1a'],
    '--ashgrove-terracotta': ['#a4472a', '#e08a68'],
    '--ashgrove-terracotta-soft': ['#ecd3c6', '#4a2a1e'],
    '--ashgrove-clay': ['#c9774f', '#c9774f'],
    '--ashgrove-sage': ['#8d9a82', '#7f8c75'],
    '--ashgrove-sage-soft': ['#d9dccd', '#2f3329'],
    '--ashgrove-ochre': ['#c79a4f', '#c79a4f'],
    '--ashgrove-slate': ['#5f646a', '#9aa0a6'],
    '--ashgrove-glass': ['#cfd6d6', '#3b4446'],
    '--ashgrove-line': ['#3a342e', '#d8cfc2'],
    '--ashgrove-rule': ['#cdbfab', '#3d362e'],
    '--ashgrove-map-land': ['#efe8dc', '#1f1b17'],
    '--ashgrove-map-block': ['#e0d4c2', '#2a251f'],
    '--ashgrove-map-road': ['#fbf8f3', '#3a342d'],
    '--ashgrove-map-water': ['#cdd8d6', '#1f2d2e'],
    '--ashgrove-map-park': ['#d7dcc8', '#28301f'],
  },

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {family: 'var(--font-ashgrove-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-ashgrove-heading)',
      fallbacks: serifFallbacks,
      weight: 'normal',
      weights: {1: 'normal', 2: 'normal', 3: 'normal', 4: 'normal', 5: 'normal', 6: 'normal'},
    },
    code: {
      family: 'ui-monospace',
      fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", monospace',
    },
  },

  // Crisp, cut-stone corners.
  radius: {base: 3, multiplier: 1},

  components: {
    // Long FAQ questions wrap on phones: let the trigger grow with its text.
    'collapsible-trigger': {
      base: {height: 'auto', minHeight: '2.75rem', paddingBlock: '0.75rem'},
    },
    'toggle-button': {
      base: {boxShadow: 'inset 0 0 0 1px var(--color-border)'},
      'isPressed:true': {
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-on-accent)',
      },
    },
  },

  tokens: {
    // Surfaces: limestone and warm paper.
    '--color-background-body': ['#f1ebe2', '#1d1a17'],
    '--color-background-surface': ['#fbf8f3', '#221e1a'],
    '--color-background-card': ['#fffdf9', '#25211d'],
    '--color-background-popover': ['#fffdf9', '#25211d'],
    '--color-background-muted': ['#e8dfd2', '#2a251f'],

    // Accent: fired terracotta (6.0:1 on white, 5.0:1 on limestone).
    '--color-accent': ['#a4472a', '#e08a68'],
    '--color-accent-muted': ['#f1dfd5', '#4a2a1e'],
    '--color-on-accent': ['#ffffff', '#1d1a17'],
    '--color-text-accent': ['#8c3a20', '#eba07f'],
    '--color-icon-accent': ['#a4472a', '#e08a68'],

    // Text: charcoal ink rather than pure black. Secondary 6.5:1 on limestone.
    '--color-text-primary': ['#25211d', '#efe8de'],
    '--color-text-secondary': ['#5a5148', '#b9ae9f'],
    '--color-icon-primary': ['#25211d', '#efe8de'],
    '--color-icon-secondary': ['#5a5148', '#b9ae9f'],

    '--color-border': ['#d6cab8', '#3d362e'],

    '--radius-inner': '0.125rem',
    '--radius-element': '0.1875rem',
    '--radius-container': '0.25rem',
    '--radius-page': '0.375rem',
  },
});
