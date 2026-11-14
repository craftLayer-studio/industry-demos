'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {brightwaterTheme} from '@/themes/coffee/brightwater';
import '@/themes/coffee/brightwater.css';
import styles from './coffee.module.css';

/**
 * Nested Astryx theme for the Brightwater Coffee demo (always dark). The
 * next/font variable classes sit on an ancestor of the Theme element so the
 * theme's `var(--font-bw-*)` font tokens resolve.
 */
export function BrightwaterTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={brightwaterTheme} mode="dark">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
