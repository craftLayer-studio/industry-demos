/**
 * Pulsegrid theme (fictional product-analytics SaaS concept demo).
 *
 * Deep indigo / near-black canvas, a luminous violet accent with a cyan
 * companion for data, geometric sans headings (Sora), a friendly body sans
 * (Manrope) and a mono face (JetBrains Mono) for metrics. Always rendered in
 * dark mode; the light half of each tuple exists so the theme still reads if
 * someone switches mode. Fonts come from next/font CSS variables set in
 * src/app/saas/layout.tsx.
 *
 * Rebuild after every edit:
 *   pnpm exec astryx theme build src/themes/saas/pulsegridTheme.ts
 */
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export const pulsegridTheme = defineTheme({
  name: 'pulsegrid',
  extends: neutralTheme,
  color: {
    accent: ['#5B3FE0', '#A897FF'],
    neutralStyle: 'cool',
    contrast: 'standard',
  },

  // Brand-only colours for illustrations, charts and glows.
  localTokens: {
    '--pulsegrid-violet': ['#6D4DF2', '#A897FF'],
    '--pulsegrid-violet-deep': ['#4A2FC4', '#6D4DF2'],
    '--pulsegrid-cyan': ['#0B8DA3', '#5CE1F0'],
    '--pulsegrid-pink': ['#C2378A', '#F08ACB'],
    '--pulsegrid-lime': ['#4F7A12', '#B9F06A'],
    '--pulsegrid-grid': ['#E4E3F5', '#1C1F33'],
    '--pulsegrid-panel': ['#FFFFFF', '#121427'],
    '--pulsegrid-panel-raised': ['#F5F4FD', '#181B31'],
    '--pulsegrid-glow': ['rgba(109, 77, 242, 0.18)', 'rgba(124, 92, 255, 0.28)'],
  },

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {family: 'var(--font-pulsegrid-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-pulsegrid-heading)',
      fallbacks: sansFallbacks,
      weights: {1: 'semibold', 2: 'semibold', 3: 'semibold', 4: 'semibold'},
    },
    code: {
      family: 'var(--font-pulsegrid-mono)',
      fallbacks: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    },
  },

  radius: {base: 8, multiplier: 1},

  tokens: {
    // Surfaces: near-black with an indigo cast.
    '--color-background-body': ['#F7F6FD', '#07081A'],
    '--color-background-surface': ['#FFFFFF', '#0E1024'],
    '--color-background-card': ['#FFFFFF', '#111329'],
    '--color-background-popover': ['#FFFFFF', '#15183A'],
    '--color-background-muted': ['#EEECFA', '#161936'],
    '--color-background-purple': ['#ECE7FF', '#221B4D'],
    '--color-background-cyan': ['#DDF6FA', '#0E2A35'],

    // Accent: luminous violet (dark: 7.4:1 on body; light: 7.1:1 on white).
    '--color-accent': ['#5B3FE0', '#A897FF'],
    '--color-accent-muted': ['#E7E1FF', '#251E55'],
    '--color-on-accent': ['#FFFFFF', '#0A0820'],
    '--color-text-accent': ['#4F33D6', '#B9ABFF'],
    '--color-icon-accent': ['#5B3FE0', '#A897FF'],

    '--color-text-primary': ['#121330', '#EDEEFB'],
    '--color-text-secondary': ['#4B4E6B', '#A6AACA'],
    '--color-icon-primary': ['#121330', '#EDEEFB'],
    '--color-icon-secondary': ['#4B4E6B', '#A6AACA'],

    '--color-border': ['#DCDAF0', '#24284A'],
    '--color-border-emphasized': ['#BEBBE0', '#363B66'],

    '--radius-inner': '0.375rem',
    '--radius-element': '0.625rem',
    '--radius-container': '1rem',
    '--radius-page': '1.5rem',
  },
});
