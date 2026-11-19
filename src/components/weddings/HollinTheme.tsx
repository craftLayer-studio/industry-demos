'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {hollinTheme} from '@/themes/weddings/hollin';
import '@/themes/weddings/hollin.css';
import styles from './hollin.module.css';

/**
 * Nested Astryx theme for the Hollin Barn demo. `fontClassName` carries the
 * next/font CSS variables the theme's font tokens reference, so it sits on
 * an ancestor of the Theme root.
 */
export function HollinTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={hollinTheme} mode="light">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
