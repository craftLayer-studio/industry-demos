/**
 * Brightwater theme (fictional small-batch coffee roaster concept demo).
 *
 * Espresso-brown canvas, warm cream ink and a caramel / amber accent, with an
 * expressive serif display face (Gloock), a sturdy grotesque body face
 * (Bricolage Grotesque) and a mono face (DM Mono) for tasting data. Always
 * rendered in dark mode; the light half of each tuple keeps the theme legible
 * if the mode is ever switched. Fonts come from next/font CSS variables set
 * in src/app/coffee/layout.tsx.
 *
 * Rebuild after every edit:
 *   pnpm exec astryx theme build src/themes/coffee/brightwaterTheme.ts
 */
import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

const sansFallbacks = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const serifFallbacks = 'ui-serif, Georgia, "Times New Roman", serif';

export const brightwaterTheme = defineTheme({
  name: 'brightwater',
  extends: neutralTheme,
  color: {
    accent: ['#8A4B12', '#E3A35A'],
    neutralStyle: 'warm',
    contrast: 'standard',
  },

  // Brand-only colours for illustrations and decorative surfaces.
  localTokens: {
    '--bw-caramel': ['#9A5716', '#E3A35A'],
    '--bw-amber': ['#B86A1C', '#F2BE7C'],
    '--bw-crema': ['#C98B4A', '#D9925A'],
    '--bw-roast': ['#3B2418', '#2A1A12'],
    '--bw-bean': ['#5A3420', '#6B4128'],
    '--bw-cream': ['#2B1B12', '#F3E6D3'],
    '--bw-sage': ['#4F6B4A', '#9DB38E'],
    '--bw-berry': ['#8C2F3E', '#E08A8F'],
    '--bw-sky': ['#2F5E73', '#8FC1CF'],
    '--bw-panel': ['#FFF8EE', '#24160F'],
    '--bw-panel-raised': ['#FBEFDF', '#2D1C13'],
    '--bw-line': ['#E5D3BC', '#4A3224'],
  },

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {family: 'var(--font-bw-body)', fallbacks: sansFallbacks},
    heading: {
      family: 'var(--font-bw-display)',
      fallbacks: serifFallbacks,
      weights: {1: 'normal', 2: 'normal', 3: 'semibold', 4: 'semibold'},
    },
    code: {
      family: 'var(--font-bw-mono)',
      fallbacks: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    },
  },

  radius: {base: 10, multiplier: 1},

  tokens: {
    '--color-background-body': ['#FBF4EA', '#1A100B'],
    '--color-background-surface': ['#FFF8EE', '#211510'],
    '--color-background-card': ['#FFF8EE', '#24160F'],
    '--color-background-popover': ['#FFF8EE', '#2A1A12'],
    '--color-background-muted': ['#F3E7D6', '#2D1C13'],
    '--color-background-orange': ['#F8E2C6', '#3A2414'],

    // Accent: caramel (dark: ~8.6:1 on body; light: ~6.9:1 on cream).
    '--color-accent': ['#8A4B12', '#E3A35A'],
    '--color-accent-muted': ['#F3DEC2', '#3A2617'],
    '--color-on-accent': ['#FFFFFF', '#1A100B'],
    '--color-text-accent': ['#7E4410', '#EDB878'],
    '--color-icon-accent': ['#8A4B12', '#E3A35A'],

    '--color-text-primary': ['#2B1B12', '#F3E6D3'],
    '--color-text-secondary': ['#664B3A', '#C9B29A'],
    '--color-icon-primary': ['#2B1B12', '#F3E6D3'],
    '--color-icon-secondary': ['#664B3A', '#C9B29A'],

    // Info (used by demo-notice banners): caramel instead of the default blue.
    '--color-info': ['#8A4B12', '#E3A35A'],
    '--color-info-muted': ['#F3DEC2', '#E3A35A26'],
    '--color-on-info-muted': ['#5A300A', '#F2CF9E'],
    '--color-text-info': ['#7E4410', '#EDB878'],

    '--color-border': ['#E5D3BC', '#3E2A1E'],
    '--color-border-emphasized': ['#CDB497', '#5C4130'],

    '--radius-inner': '0.375rem',
    '--radius-element': '0.625rem',
    '--radius-container': '1.125rem',
    '--radius-page': '1.75rem',
  },
});
