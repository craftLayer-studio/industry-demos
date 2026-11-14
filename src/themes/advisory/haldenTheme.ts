// Halden & Rowe (fictional concept demo) theme.
// Understated professional-services palette: cool stone paper, deep navy ink,
// a restrained brass accent reserved for fine rules and eyebrows, a sharp
// transitional serif for headings and a neutral grotesk for body copy.
// Fonts come from next/font CSS variables set in src/app/advisory/layout.tsx
// (--font-halden-heading / --font-halden-body).
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const serifFallbacks = 'Georgia, "Times New Roman", Times, serif';

export const haldenTheme = defineTheme({
  name: 'halden',
  extends: neutralTheme,

  // Brand-only colours used by page CSS (rules, ledger art, stylised map).
  localTokens: {
    '--halden-ink': ['#13203a', '#e9ecf2'],
    '--halden-navy': ['#1d2e52', '#9fb3d9'],
    '--halden-navy-deep': ['#0f1a30', '#0b1220'],
    // Brass for decoration (rules, marks). Text uses the darker brass below.
    '--halden-brass': ['#a8874a', '#c9a96a'],
    '--halden-brass-text': ['#765722', '#d8be86'],
    '--halden-brass-soft': ['#efe6d4', '#2c2618'],
    '--halden-paper': ['#faf8f4', '#141b29'],
    '--halden-stone': ['#eae6de', '#1a2233'],
    '--halden-rule': ['#cfc8ba', '#2f3a50'],
    '--halden-map-land': ['#f1eee7', '#151d2c'],
    '--halden-map-block': ['#e3ded3', '#1d2638'],
    '--halden-map-road': ['#ffffff', '#2a3448'],
    '--halden-map-water': ['#d5dde6', '#1a2a3d'],
    '--halden-map-park': ['#dfe3d3', '#1d2b24'],
  },

  typography: {
    scale: {base: 16, ratio: 1.24},
    body: {family: 'var(--font-halden-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-halden-heading)',
      fallbacks: serifFallbacks,
      weight: 'normal',
      weights: {1: 'normal', 2: 'normal', 3: 'normal', 4: 'bold', 5: 'bold', 6: 'bold'},
    },
    code: {
      family: 'ui-monospace',
      fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", monospace',
    },
  },

  // Precise, nearly square corners: tailored rather than friendly.
  radius: {base: 3, multiplier: 1},

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
    // Surfaces: cool stone paper.
    '--color-background-body': ['#f3f1ec', '#0f1522'],
    '--color-background-surface': ['#faf8f4', '#141b29'],
    '--color-background-card': ['#ffffff', '#172031'],
    '--color-background-popover': ['#ffffff', '#172031'],
    '--color-background-muted': ['#eae6de', '#1a2233'],

    // Accent: deep navy ink (13.4:1 on white, 11.9:1 on body).
    '--color-accent': ['#1d2e52', '#9fb3d9'],
    '--color-accent-muted': ['#e3e7ef', '#22304a'],
    '--color-on-accent': ['#ffffff', '#0f1522'],
    '--color-text-accent': ['#1d2e52', '#b4c4e3'],
    '--color-icon-accent': ['#1d2e52', '#9fb3d9'],

    // Text: navy ink rather than pure black. Secondary 6.7:1 on body.
    '--color-text-primary': ['#13203a', '#e9ecf2'],
    '--color-text-secondary': ['#4b5466', '#aab3c3'],
    '--color-icon-primary': ['#13203a', '#e9ecf2'],
    '--color-icon-secondary': ['#4b5466', '#aab3c3'],

    '--color-border': ['#d8d2c6', '#2f3a50'],

    '--radius-inner': '0.125rem',
    '--radius-element': '0.1875rem',
    '--radius-container': '0.25rem',
    '--radius-page': '0.375rem',
  },
});
