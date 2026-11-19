// Ostrander Studio (fictional concept demo) theme.
// Stark and grid-driven: an off-white drafting-paper canvas, black ink, one
// signal red used sparingly, square corners and a tight grotesk for type.
// Fonts come from next/font CSS variables set in src/app/architecture/layout.tsx
// (--font-ostrander-sans / --font-ostrander-mono).
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks =
  '"Helvetica Neue", Helvetica, Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const monoFallbacks = 'ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

export const ostranderTheme = defineTheme({
  name: 'ostrander',
  extends: neutralTheme,

  // Brand-only colours used by page CSS and the line drawings.
  localTokens: {
    '--ostrander-paper': ['#f3f1ec', '#121212'],
    '--ostrander-sheet': ['#fbfaf7', '#1a1a1a'],
    '--ostrander-ink': ['#111111', '#f1efe9'],
    '--ostrander-graphite': ['#4a4844', '#b5b1a8'],
    '--ostrander-grid': ['#e2ded5', '#262626'],
    '--ostrander-rule': ['#c9c5bc', '#3a3a3a'],
    '--ostrander-red': ['#d0021b', '#ff4d5e'],
    '--ostrander-red-wash': ['#f7d9dc', '#3a1418'],
    '--ostrander-face-top': ['#fbfaf7', '#1f1f1f'],
    '--ostrander-face-left': ['#e9e6df', '#2a2a2a'],
    '--ostrander-face-right': ['#d8d4ca', '#333333'],
  },

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {family: 'var(--font-ostrander-sans)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-ostrander-sans)',
      fallbacks: sansFallbacks,
      weight: 'bold',
      weights: {1: 'bold', 2: 'bold', 3: 'bold', 4: 'bold', 5: 'bold', 6: 'bold'},
    },
    code: {family: 'var(--font-ostrander-mono)', fallbacks: monoFallbacks},
  },

  // Square corners throughout: drawings, not pebbles.
  radius: {base: 0, multiplier: 1},

  components: {
    // Secondary buttons are drawn, not filled: a hairline ink outline.
    button: {
      'variant:secondary': {
        backgroundColor: 'transparent',
        boxShadow: 'inset 0 0 0 1px var(--color-text-primary)',
      },
    },
    'toggle-button': {
      base: {boxShadow: 'inset 0 0 0 1px var(--color-border)'},
      'isPressed:true': {
        backgroundColor: 'var(--color-text-primary)',
        color: 'var(--color-background-body)',
        boxShadow: 'inset 0 0 0 1px var(--color-text-primary)',
      },
    },
    'collapsible-trigger': {
      base: {height: 'auto', minHeight: '2.75rem', paddingBlock: '0.75rem'},
    },
  },

  tokens: {
    '--color-background-body': ['#f3f1ec', '#121212'],
    '--color-background-surface': ['#fbfaf7', '#1a1a1a'],
    '--color-background-card': ['#fbfaf7', '#1a1a1a'],
    '--color-background-popover': ['#fbfaf7', '#1a1a1a'],
    '--color-background-muted': ['#e9e6df', '#242424'],

    // Signal red: 5.4:1 on white, 4.8:1 on the paper canvas.
    '--color-accent': ['#d0021b', '#ff4d5e'],
    '--color-accent-muted': ['#f7d9dc', '#3a1418'],
    '--color-on-accent': ['#ffffff', '#121212'],
    '--color-text-accent': ['#b00217', '#ff6b78'],
    '--color-icon-accent': ['#d0021b', '#ff4d5e'],

    '--color-text-primary': ['#111111', '#f1efe9'],
    '--color-text-secondary': ['#4a4844', '#b5b1a8'],
    '--color-icon-primary': ['#111111', '#f1efe9'],
    '--color-icon-secondary': ['#4a4844', '#b5b1a8'],

    '--color-border': ['#c9c5bc', '#3a3a3a'],

    '--radius-inner': '0',
    '--radius-element': '0',
    '--radius-container': '0',
    '--radius-page': '0',
  },
});
