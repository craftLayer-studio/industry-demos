// The Saltmarsh (fictional concept demo) theme.
// Airy and coastal: a salt-white canvas, sea-glass greens for surfaces and
// the accent, a fired terracotta for warm highlights, a refined display serif
// for headings and a soft humanist sans for body copy. Fonts come from
// next/font CSS variables set in src/app/hotel/layout.tsx
// (--font-saltmarsh-heading / --font-saltmarsh-body).
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const serifFallbacks = 'Georgia, "Times New Roman", Times, serif';

export const saltmarshTheme = defineTheme({
  name: 'saltmarsh',
  extends: neutralTheme,

  // Brand-only colours used by page CSS and the coastal illustrations.
  localTokens: {
    '--saltmarsh-salt': ['#f7f8f4', '#0f1a17'],
    '--saltmarsh-foam': ['#fcfdfb', '#14211d'],
    '--saltmarsh-glass': ['#cfe5da', '#24403a'],
    '--saltmarsh-glass-soft': ['#e6f1eb', '#1a2d28'],
    '--saltmarsh-glass-mid': ['#9cc8b4', '#4f8a76'],
    '--saltmarsh-sea': ['#5f9e8a', '#6fb09b'],
    '--saltmarsh-deep': ['#1f4a40', '#cfe5da'],
    '--saltmarsh-ink': ['#1c2e2a', '#e8f0ec'],
    '--saltmarsh-terracotta': ['#b0532f', '#e48d68'],
    '--saltmarsh-terracotta-soft': ['#f3ddd2', '#43281d'],
    '--saltmarsh-clay': ['#d98b66', '#d98b66'],
    '--saltmarsh-sand': ['#efe7da', '#2a2722'],
    '--saltmarsh-sand-deep': ['#ddd0bb', '#3a352d'],
    '--saltmarsh-reed': ['#a7a36f', '#8f8b5c'],
    '--saltmarsh-sky': ['#e4eef0', '#16262a'],
    '--saltmarsh-rule': ['#d5e2db', '#2c3f39'],
  },

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {family: 'var(--font-saltmarsh-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-saltmarsh-heading)',
      fallbacks: serifFallbacks,
      weight: 'normal',
      weights: {1: 'normal', 2: 'normal', 3: 'normal', 4: 'normal', 5: 'normal', 6: 'normal'},
    },
    code: {
      family: 'ui-monospace',
      fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", monospace',
    },
  },

  // Gently rounded, like tumbled sea glass.
  radius: {base: 6, multiplier: 1.25},

  components: {
    button: {
      base: {borderRadius: '9999px', letterSpacing: '0.03em'},
      'variant:secondary': {
        backgroundColor: 'var(--color-accent-muted)',
        color: 'var(--color-text-accent)',
      },
    },
    // Long FAQ questions wrap on phones: let the trigger grow with its text.
    'collapsible-trigger': {
      base: {height: 'auto', minHeight: '2.75rem', paddingBlock: '0.875rem'},
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
    // Surfaces: salt-white canvas, foam-white cards.
    '--color-background-body': ['#f7f8f4', '#0f1a17'],
    '--color-background-surface': ['#fcfdfb', '#14211d'],
    '--color-background-card': ['#ffffff', '#16241f'],
    '--color-background-popover': ['#ffffff', '#16241f'],
    '--color-background-muted': ['#e9f1ec', '#1c2c27'],

    // Accent: deep sea-glass green (7.4:1 on white).
    '--color-accent': ['#2c6656', '#8fcdb6'],
    '--color-accent-muted': ['#dcece4', '#22403a'],
    '--color-on-accent': ['#ffffff', '#0f1a17'],
    '--color-text-accent': ['#245748', '#9fd6c1'],
    '--color-icon-accent': ['#2c6656', '#8fcdb6'],

    // Text: deep marsh ink. Secondary 7:1 on salt-white.
    '--color-text-primary': ['#1c2e2a', '#e8f0ec'],
    '--color-text-secondary': ['#4b5f59', '#adc0b9'],
    '--color-icon-primary': ['#1c2e2a', '#e8f0ec'],
    '--color-icon-secondary': ['#4b5f59', '#adc0b9'],

    '--color-border': ['#d3e0d9', '#2c3f39'],

    '--radius-inner': '0.375rem',
    '--radius-element': '0.625rem',
    '--radius-container': '1.125rem',
    '--radius-page': '1.75rem',
  },
});
