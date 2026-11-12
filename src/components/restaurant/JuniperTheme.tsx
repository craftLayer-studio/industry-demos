'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {juniperTheme} from '@/themes/restaurant/juniper';
import '@/themes/restaurant/juniper.css';
import styles from './restaurant.module.css';

/**
 * Scopes the Juniper Kitchen Astryx theme to the restaurant route. The font
 * variables live on the outer stack so the theme's
 * var(--font-juniper-*) families resolve inside the theme scope.
 */
export function JuniperTheme({className, children}: {className: string; children: ReactNode}) {
  return (
    <VStack className={className}>
      <Theme theme={juniperTheme} mode="light">
        <VStack className={styles.root}>{children}</VStack>
      </Theme>
    </VStack>
  );
}
