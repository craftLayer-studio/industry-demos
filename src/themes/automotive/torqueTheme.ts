/**
 * Torque & Co. Motors theme (fictional independent garage concept demo).
 *
 * Dark graphite workshop surfaces with a vivid signal orange, a squared-off
 * technical display face (Chakra Petch), a clean body face (Red Hat Text) and
 * a mono face (Red Hat Mono) for dashboard numerals. Always rendered in dark
 * mode; the light halves keep it legible if someone switches it.
 *
 * Rebuild after every edit:
 *   pnpm exec astryx theme build src/themes/automotive/torqueTheme.ts
 */
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export const torqueTheme = defineTheme({
  name: 'torque',
  extends: neutralTheme,
  color: {
    accent: ['#C2410C', '#FF6B1A'],
    neutralStyle: 'cool',
    contrast: 'standard',
  },

  localTokens: {
    '--tq-orange': ['#C2410C', '#FF6B1A'],
    '--tq-orange-soft': ['#FFE4D3', '#3A1E0E'],
    '--tq-graphite': ['#F2F3F5', '#141619'],
    '--tq-graphite-2': ['#E6E8EB', '#1B1E22'],
    '--tq-graphite-3': ['#D7DADF', '#23272C'],
    '--tq-steel': ['#5B626B', '#8C949E'],
    '--tq-line': ['#C4C8CE', '#30353C'],
    '--tq-ink': ['#101215', '#ECEEF1'],
    '--tq-cyan': ['#0E7490', '#5CD3E6'],
  },

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {family: 'var(--font-tq-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-tq-display)',
      fallbacks: '"Arial Narrow", ui-sans-serif, sans-serif',
      weights: {1: 'bold', 2: 'bold', 3: 'semibold', 4: 'semibold'},
    },
    code: {
      family: 'var(--font-tq-mono)',
      fallbacks: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    },
  },

  radius: {base: 4, multiplier: 1},

  tokens: {
    '--color-background-body': ['#F2F3F5', '#111316'],
    '--color-background-surface': ['#FFFFFF', '#181B1F'],
    '--color-background-card': ['#FFFFFF', '#1B1E22'],
    '--color-background-popover': ['#FFFFFF', '#1F2328'],
    '--color-background-muted': ['#E6E8EB', '#22262B'],
    '--color-background-orange': ['#FFE4D3', '#3A1E0E'],

    '--color-accent': ['#C2410C', '#FF6B1A'],
    '--color-accent-muted': ['#FFE4D3', '#3A1E0E'],
    '--color-on-accent': ['#FFFFFF', '#140A03'],
    '--color-text-accent': ['#B03A0A', '#FF8A47'],
    '--color-icon-accent': ['#B03A0A', '#FF8A47'],

    '--color-text-primary': ['#101215', '#ECEEF1'],
    '--color-text-secondary': ['#4A5058', '#A9B0B9'],
    '--color-icon-primary': ['#101215', '#ECEEF1'],
    '--color-icon-secondary': ['#4A5058', '#A9B0B9'],

    // Info banners pick up the orange instead of the default blue.
    '--color-info': ['#C2410C', '#FF6B1A'],
    '--color-info-muted': ['#FFE4D3', '#2E1A0E'],
    '--color-on-info-muted': ['#5A1F05', '#FFC9A6'],
    '--color-text-info': ['#B03A0A', '#FF8A47'],

    '--color-border': ['#C4C8CE', '#343A41'],
    '--color-border-emphasized': ['#101215', '#ECEEF1'],
  },
});
