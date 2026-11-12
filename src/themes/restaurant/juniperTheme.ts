import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

/**
 * Juniper Kitchen: warm editorial restaurant theme.
 * Cream paper, deep juniper green, olive and terracotta accents.
 * Fonts are loaded by next/font in src/app/restaurant/layout.tsx and exposed
 * as --font-juniper-display / --font-juniper-sans.
 */
export const juniperTheme = defineTheme({
  name: 'juniper',
  extends: neutralTheme,
  color: {accent: ['#24402f', '#a9c5a0'], neutralStyle: 'warm'},
  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {
      family: 'var(--font-juniper-sans)',
      fallbacks: '"Helvetica Neue", Arial, sans-serif',
    },
    heading: {
      family: 'var(--font-juniper-display)',
      fallbacks: 'Georgia, "Times New Roman", serif',
      weights: {1: 'medium', 2: 'medium', 3: 'semibold', 4: 'semibold'},
    },
  },
  radius: {base: 3, multiplier: 1},
  localTokens: {
    '--juniper-cream': ['#f5eee1', '#1b1f1a'],
    '--juniper-paper': ['#fbf7ef', '#222720'],
    '--juniper-linen': ['#ebe1cf', '#2b3128'],
    '--juniper-ink': ['#1d231e', '#f1ebdf'],
    '--juniper-forest': ['#24402f', '#a9c5a0'],
    '--juniper-forest-deep': ['#18291f', '#121712'],
    '--juniper-olive': ['#6b7240', '#b8bd8a'],
    '--juniper-olive-soft': ['#c9c79f', '#4c5233'],
    '--juniper-terracotta': ['#a4492d', '#e59a7b'],
    '--juniper-clay': ['#d7896a', '#b8664a'],
    '--juniper-butter': ['#e9c77b', '#c9a75b'],
    '--juniper-on-forest': ['#f5eee1', '#f5eee1'],
    '--juniper-rule': ['#1d231e26', '#f1ebdf26'],
  },
  tokens: {
    '--color-accent': ['#24402f', '#a9c5a0'],
    '--color-on-accent': ['#f5eee1', '#18291f'],
    '--color-background-body': ['#f5eee1', '#1b1f1a'],
    '--color-background-surface': ['#fbf7ef', '#222720'],
    '--color-background-card': ['#fffcf6', '#222720'],
    '--color-background-popover': ['#fffcf6', '#262b24'],
    '--color-background-muted': ['#ebe1cf', '#2b3128'],
    '--color-text-primary': ['#1d231e', '#f1ebdf'],
    '--color-text-secondary': ['#4f5448', '#c4bfb2'],
    '--color-text-accent': ['#24402f', '#a9c5a0'],
    '--color-icon-accent': ['#24402f', '#a9c5a0'],
    '--color-border': ['#1d231e24', '#f1ebdf24'],
    '--color-border-emphasized': ['#1d231e4d', '#f1ebdf4d'],
    '--color-accent-muted': ['#dfe3cf', '#34402f'],
  },
  components: {
    button: {
      base: {letterSpacing: '0.03em'},
    },
    card: {
      base: {borderRadius: '4px'},
    },
  },
});
