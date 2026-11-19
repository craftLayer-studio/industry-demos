'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {meadowlarkTheme} from '@/themes/vet/meadowlark';
import '@/themes/vet/meadowlark.css';
import styles from './vet.module.css';

/**
 * Nested Astryx theme for the Meadowlark Vets demo. `fontClassName` carries
 * the next/font CSS variables the theme's font tokens reference, so it has to
 * sit on an ancestor of the Theme root.
 */
export function VetTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={meadowlarkTheme} mode="light">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
