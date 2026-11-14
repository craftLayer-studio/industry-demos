'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {ashgroveTheme} from '@/themes/real-estate/ashgrove';
import '@/themes/real-estate/ashgrove.css';
import styles from './ashgrove.module.css';

/**
 * Nested Astryx theme for the Ashgrove Property demo. `fontClassName` carries
 * the next/font CSS variables the theme's font tokens reference, so it sits
 * on an ancestor of the Theme root.
 */
export function AshgroveTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={ashgroveTheme} mode="light">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}

/** The same theme in its dark (charcoal) mode, for contrast bands. */
export function CharcoalBand({children}: {children: ReactNode}) {
  return (
    <Theme theme={ashgroveTheme} mode="dark">
      {children}
    </Theme>
  );
}
