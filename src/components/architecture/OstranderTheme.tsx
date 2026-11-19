'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {ostranderTheme} from '@/themes/architecture/ostrander';
import '@/themes/architecture/ostrander.css';
import styles from './ostrander.module.css';

/**
 * Nested Astryx theme for the Ostrander Studio demo. `fontClassName` carries
 * the next/font CSS variables the theme's font tokens reference, so it sits
 * on an ancestor of the Theme root.
 */
export function OstranderTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={ostranderTheme} mode="light">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}

/** The same theme in its dark (ink) mode, for full-bleed contrast bands. */
export function InkBand({children}: {children: ReactNode}) {
  return (
    <Theme theme={ostranderTheme} mode="dark">
      {children}
    </Theme>
  );
}
