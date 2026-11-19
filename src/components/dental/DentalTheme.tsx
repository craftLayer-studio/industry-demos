'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {arbourTheme} from '@/themes/dental/arbour';
import '@/themes/dental/arbour.css';
import styles from './dental.module.css';

/**
 * Nested Astryx theme for the Arbour Dental demo. `fontClassName` carries the
 * next/font CSS variables the theme's font tokens reference, so it sits on an
 * ancestor of the Theme root.
 */
export function DentalTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={arbourTheme} mode="light">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
