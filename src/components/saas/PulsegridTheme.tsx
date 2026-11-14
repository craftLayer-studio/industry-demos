'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {pulsegridTheme} from '@/themes/saas/pulsegrid';
import '@/themes/saas/pulsegrid.css';
import styles from './saas.module.css';

/**
 * Nested Astryx theme for the Pulsegrid demo (always dark). The next/font
 * variable classes sit on an ancestor of the Theme element so the theme's
 * `var(--font-pulsegrid-*)` font tokens resolve.
 */
export function PulsegridTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={pulsegridTheme} mode="dark">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
