// Hollin Barn (fictional concept demo) theme.
// Romantic countryside: a warm linen canvas, deep olive for the accent and
// text, muted antique gold for fine rules and ornaments, a high-contrast
// display serif for headings and a clean grotesque for body copy. Fonts come
// from next/font CSS variables set in src/app/weddings/layout.tsx
// (--font-hollin-heading / --font-hollin-body).
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const serifFallbacks = 'Didot, "Bodoni 72", Georgia, "Times New Roman", serif';

export const hollinTheme = defineTheme({
  name: 'hollin',
  extends: neutralTheme,

  // Brand-only colours used by page CSS and the line-art illustrations.
  localTokens: {
    '--hollin-linen': ['#f4eee3', '#1b1c14'],
    '--hollin-linen-deep': ['#ebe2d2', '#23251a'],
    '--hollin-paper': ['#fbf8f1', '#202217'],
    '--hollin-olive': ['#4b5528', '#c3cd96'],
    '--hollin-olive-deep': ['#2f361a', '#e4e8cc'],
    '--hollin-olive-soft': ['#dfe0c8', '#343a22'],
    '--hollin-sage': ['#a7ad84', '#7d8560'],
    '--hollin-gold': ['#b08d47', '#cfae6a'],
    '--hollin-gold-text': ['#7a5c1f', '#d9bb7c'],
    '--hollin-gold-soft': ['#efe2c4', '#3a3220'],
    '--hollin-blush': ['#e9d3c4', '#4a3429'],
    '--hollin-ink': ['#26271b', '#f1ecdf'],
    '--hollin-rule': ['#d9cdb6', '#3b3d2c'],
  },

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {family: 'var(--font-hollin-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-hollin-heading)',
      fallbacks: serifFallbacks,
      weight: 'normal',
      weights: {1: 'normal', 2: 'normal', 3: 'normal', 4: 'normal', 5: 'normal', 6: 'normal'},
    },
    code: {
      family: 'ui-monospace',
      fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", monospace',
    },
  },

  // Soft but restrained corners, like letterpress stationery.
  radius: {base: 4, multiplier: 1},

  components: {
    button: {
      base: {borderRadius: '9999px', letterSpacing: '0.06em'},
      'variant:secondary': {
        backgroundColor: 'transparent',
        boxShadow: 'inset 0 0 0 1px var(--hollin-olive)',
        color: 'var(--hollin-olive-deep)',
      },
    },
    // Long FAQ questions wrap on phones: let the trigger grow with its text.
    'collapsible-trigger': {
      base: {height: 'auto', minHeight: '2.75rem', paddingBlock: '0.875rem'},
    },
  },

  tokens: {
    // Surfaces: linen canvas, paper cards.
    '--color-background-body': ['#f4eee3', '#1b1c14'],
    '--color-background-surface': ['#fbf8f1', '#202217'],
    '--color-background-card': ['#fffdf8', '#24261b'],
    '--color-background-popover': ['#fffdf8', '#24261b'],
    '--color-background-muted': ['#ece4d4', '#2a2c20'],

    // Accent: deep olive (about 7.9:1 on white, 7:1 on linen).
    '--color-accent': ['#4b5528', '#c3cd96'],
    '--color-accent-muted': ['#e3e4cd', '#343a22'],
    '--color-on-accent': ['#fffdf8', '#1b1c14'],
    '--color-text-accent': ['#434c22', '#cdd6a3'],
    '--color-icon-accent': ['#4b5528', '#c3cd96'],

    // Text: warm olive-black ink. Secondary over 6:1 on linen.
    '--color-text-primary': ['#26271b', '#f1ecdf'],
    '--color-text-secondary': ['#57543f', '#c2bca8'],
    '--color-icon-primary': ['#26271b', '#f1ecdf'],
    '--color-icon-secondary': ['#57543f', '#c2bca8'],

    '--color-border': ['#d9cdb6', '#3b3d2c'],

    '--radius-inner': '0.25rem',
    '--radius-element': '0.375rem',
    '--radius-container': '0.625rem',
    '--radius-page': '1rem',
  },
});
