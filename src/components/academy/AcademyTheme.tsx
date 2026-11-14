'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {quillmarkTheme} from '@/themes/academy/quillmark';
import '@/themes/academy/quillmark.css';
import styles from './academy.module.css';

/**
 * Nested Astryx theme for the Quillmark Academy demo. `fontClassName` carries
 * the next/font CSS variables the theme's font tokens reference, so it has to
 * sit on an ancestor of the Theme root.
 */
export function AcademyTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={quillmarkTheme} mode="light">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
