'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {marloweTheme} from '@/themes/legal/marlowe';
import '@/themes/legal/marlowe.css';
import styles from './legal.module.css';

/**
 * Nested Astryx theme for the Marlowe & Pike demo, forced to its navy dark
 * mode. `fontClassName` carries the next/font CSS variables the theme's font
 * tokens reference, so it sits on an ancestor of the Theme root.
 */
export function MarloweTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={marloweTheme} mode="dark">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
