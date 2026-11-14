'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {haldenTheme} from '@/themes/advisory/halden';
import '@/themes/advisory/halden.css';
import styles from './advisory.module.css';

/**
 * Nested Astryx theme for the Halden & Rowe demo. `fontClassName` carries the
 * next/font CSS variables the theme's font tokens reference, so it sits on an
 * ancestor of the Theme root (inside it the variables would not resolve).
 */
export function HaldenTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={haldenTheme} mode="light">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
