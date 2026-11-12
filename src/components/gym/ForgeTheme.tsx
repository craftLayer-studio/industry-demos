'use client';

import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {forgeTheme} from '@/themes/gym/forge';
import '@/themes/gym/forge.css';
import styles from './gym.module.css';
import type {ReactNode} from 'react';

/**
 * Nested Astryx theme for the Forge Fitness demo (always dark).
 * The next/font variable classes sit on an ancestor of the Theme element so
 * the theme's `var(--font-forge-*)` font tokens resolve.
 */
export function ForgeTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <VStack className={fontClassName}>
      <Theme theme={forgeTheme} mode="dark">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
