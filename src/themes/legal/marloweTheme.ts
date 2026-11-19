// Marlowe & Pike (fictional concept demo) theme.
// Deep navy chambers at night: ink-navy surfaces, ivory text, a polished brass
// accent and a high-contrast editorial serif for headings. Rendered in dark
// mode by MarloweTheme; the light values exist so the theme is complete.
// Fonts come from next/font CSS variables set in src/app/legal/layout.tsx
// (--font-marlowe-heading / --font-marlowe-body).
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const serifFallbacks = 'Georgia, "Times New Roman", Times, serif';

export const marloweTheme = defineTheme({
  name: 'marlowe',
  extends: neutralTheme,

  // Brand-only colours used by page CSS (rules, engraving art, paper receipt).
  localTokens: {
    '--marlowe-navy-deep': ['#0a1424', '#070f1c'],
    '--marlowe-navy': ['#0f1d33', '#0c182b'],
    '--marlowe-navy-raised': ['#14243e', '#122139'],
    // Brass for decoration (rules, engraving). Text uses --marlowe-brass-text.
    '--marlowe-brass': ['#9c7a3c', '#c4a05a'],
    '--marlowe-brass-bright': ['#b8934d', '#dcbd7e'],
    '--marlowe-brass-text': ['#7a5c25', '#d9b97a'],
    '--marlowe-brass-line': ['#c9b48a', '#5b4a2c'],
    '--marlowe-ivory': ['#f6f1e7', '#f3ecdd'],
    '--marlowe-paper': ['#fbf8f1', '#f5efe2'],
    '--marlowe-paper-ink': ['#1a2236', '#1a2236'],
    '--marlowe-paper-muted': ['#545a68', '#525866'],
    '--marlowe-paper-rule': ['#d9cfbb', '#d6cbb5'],
    // Ink colours used only on the paper fee sheet (AA on --marlowe-paper).
    '--marlowe-quote-brass': ['#7a5c25', '#7a5c25'],
    '--marlowe-stamp': ['#8a2f2a', '#8a2f2a'],
    '--marlowe-saving': ['#2f5d3a', '#2f5d3a'],
  },

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {family: 'var(--font-marlowe-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-marlowe-heading)',
      fallbacks: serifFallbacks,
      weight: 'normal',
      weights: {1: 'normal', 2: 'normal', 3: 'normal', 4: 'bold', 5: 'bold', 6: 'bold'},
    },
    code: {
      family: 'ui-monospace',
      fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", monospace',
    },
  },

  // Crisp, almost square corners: formal rather than friendly.
  radius: {base: 2, multiplier: 1},

  tokens: {
    // Surfaces: layered navy.
    '--color-background-body': ['#f4efe4', '#0b1626'],
    '--color-background-surface': ['#fbf8f1', '#0f1d33'],
    '--color-background-card': ['#ffffff', '#12223a'],
    '--color-background-popover': ['#ffffff', '#14263f'],
    '--color-background-muted': ['#ece5d6', '#162843'],

    // Accent: polished brass on navy (8.6:1 on body in dark mode).
    '--color-accent': ['#7a5c25', '#d0ad68'],
    '--color-accent-muted': ['#efe4cc', '#2a2618'],
    '--color-on-accent': ['#ffffff', '#0b1626'],
    '--color-text-accent': ['#7a5c25', '#dcbd7e'],
    '--color-icon-accent': ['#7a5c25', '#d0ad68'],

    // Text: warm ivory rather than pure white.
    '--color-text-primary': ['#141d30', '#f1eadb'],
    '--color-text-secondary': ['#4d5262', '#b8b4aa'],
    '--color-icon-primary': ['#141d30', '#f1eadb'],
    '--color-icon-secondary': ['#4d5262', '#b8b4aa'],

    '--color-border': ['#d6ccb8', '#2b3d5a'],

    '--radius-inner': '0.0625rem',
    '--radius-element': '0.125rem',
    '--radius-container': '0.1875rem',
    '--radius-page': '0.25rem',
  },
});
