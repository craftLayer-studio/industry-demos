'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {fernlightTheme} from '@/themes/salon/fernlight';
import '@/themes/salon/fernlight.css';
import styles from './salon.module.css';

/**
 * Nested Astryx theme for the Fernlight Salon & Spa demo. `fontClassName`
 * carries the next/font CSS variables the theme's font tokens reference, so
 * it sits on an ancestor of the Theme root.
 */
export function SalonTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={fernlightTheme} mode="light">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
