/**
 * Keystone theme (fictional builders and home renovators concept demo).
 *
 * Safety yellow and near-black on a pale concrete canvas, with a bold
 * condensed industrial display face (Barlow Condensed), a sturdy grotesque
 * body face (Barlow) and a mono face (IBM Plex Mono) for spec labels. The
 * accent is near-black so primary actions read as heavy black slabs with
 * safety-yellow text; the yellow itself lives in local tokens for surfaces.
 * Always rendered in light mode; dark halves keep it legible if switched.
 *
 * Rebuild after every edit:
 *   pnpm exec astryx theme build src/themes/builders/keystoneTheme.ts
 */
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const condensedFallbacks = '"Arial Narrow", "Roboto Condensed", Impact, ui-sans-serif, sans-serif';

export const keystoneTheme = defineTheme({
  name: 'keystone',
  extends: neutralTheme,
  color: {
    accent: ['#141414', '#FFC700'],
    neutralStyle: 'neutral',
    contrast: 'standard',
  },

  localTokens: {
    '--ks-yellow': ['#FFC700', '#FFC700'],
    '--ks-yellow-deep': ['#F2A900', '#F2A900'],
    '--ks-yellow-soft': ['#FFF1BF', '#3A3000'],
    '--ks-black': ['#141414', '#0A0A0A'],
    '--ks-ink': ['#141414', '#F5F3EE'],
    '--ks-steel': ['#3B3F45', '#9AA0A8'],
    '--ks-concrete': ['#EDEAE3', '#1E1E1E'],
    '--ks-concrete-deep': ['#D9D4C9', '#2A2A2A'],
    '--ks-brick': ['#A8442A', '#D9714F'],
    '--ks-timber': ['#C58B4E', '#C58B4E'],
    '--ks-sky': ['#CFE3EA', '#24343A'],
    '--ks-line': ['#141414', '#F5F3EE'],
  },

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {family: 'var(--font-ks-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-ks-display)',
      fallbacks: condensedFallbacks,
      weights: {1: 'extrabold', 2: 'extrabold', 3: 'bold', 4: 'bold'},
    },
    code: {
      family: 'var(--font-ks-mono)',
      fallbacks: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    },
  },

  radius: {base: 2, multiplier: 1},

  tokens: {
    '--color-background-body': ['#F5F3EE', '#111111'],
    '--color-background-surface': ['#FFFFFF', '#181818'],
    '--color-background-card': ['#FFFFFF', '#1B1B1B'],
    '--color-background-popover': ['#FFFFFF', '#1F1F1F'],
    '--color-background-muted': ['#EDEAE3', '#222222'],
    '--color-background-yellow': ['#FFF1BF', '#3A3000'],

    '--color-accent': ['#141414', '#FFC700'],
    '--color-accent-muted': ['#FFF1BF', '#3A3000'],
    '--color-on-accent': ['#FFC700', '#141414'],
    '--color-text-accent': ['#141414', '#FFC700'],
    '--color-icon-accent': ['#141414', '#FFC700'],

    '--color-text-primary': ['#141414', '#F5F3EE'],
    '--color-text-secondary': ['#45474B', '#C2C0BA'],
    '--color-icon-primary': ['#141414', '#F5F3EE'],
    '--color-icon-secondary': ['#45474B', '#C2C0BA'],

    // Info (used by demo-notice banners): yellow-tinted instead of default blue.
    '--color-info': ['#141414', '#FFC700'],
    '--color-info-muted': ['#FFF1BF', '#3A3000'],
    '--color-on-info-muted': ['#141414', '#FFE48A'],
    '--color-text-info': ['#141414', '#FFC700'],

    '--color-border': ['#B9B4A9', '#3A3A3A'],
    '--color-border-emphasized': ['#141414', '#F5F3EE'],

    '--radius-inner': '0.125rem',
    '--radius-element': '0.125rem',
    '--radius-container': '0.25rem',
    '--radius-page': '0.25rem',
  },
});
