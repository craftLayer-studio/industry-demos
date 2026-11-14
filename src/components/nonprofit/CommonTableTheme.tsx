'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {commontableTheme} from '@/themes/nonprofit/commontable';
import '@/themes/nonprofit/commontable.css';
import styles from './nonprofit.module.css';

/**
 * Nested Astryx theme for the Common Table demo. `fontClassName` carries the
 * next/font CSS variables that the theme's font tokens reference, so it sits on
 * an ancestor of the Theme root (inside it the variables would not resolve).
 */
export function CommonTableTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={commontableTheme} mode="light">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
