'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {keystoneTheme} from '@/themes/builders/keystone';
import '@/themes/builders/keystone.css';
import styles from './keystone.module.css';

/**
 * Nested Astryx theme for the Keystone Build Co. demo (always light). The
 * next/font variable classes sit on an ancestor of the Theme element so the
 * theme's `var(--font-ks-*)` font tokens resolve.
 */
export function KeystoneTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <div className={fontClassName}>
      <Theme theme={keystoneTheme} mode="light">
        <div className={styles.root}>{children}</div>
      </Theme>
    </div>
  );
}
