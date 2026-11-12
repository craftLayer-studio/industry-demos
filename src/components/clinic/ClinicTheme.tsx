'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {northstarTheme} from '@/themes/clinic/northstar';
import '@/themes/clinic/northstar.css';
import styles from './clinic.module.css';

/**
 * Nested Astryx theme for the Northstar Clinic demo. `fontClassName` carries
 * the next/font CSS variables the theme's font tokens reference, so it has to
 * sit on an ancestor of the Theme root.
 */
export function ClinicTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={northstarTheme} mode="light">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
