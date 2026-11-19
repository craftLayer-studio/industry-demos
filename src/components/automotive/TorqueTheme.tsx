'use client';

import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {torqueTheme} from '@/themes/automotive/torque';
import '@/themes/automotive/torque.css';
import styles from './torque.module.css';

/**
 * Nested Astryx theme for the Torque & Co. Motors demo (always dark). The
 * next/font variable classes sit on an ancestor of the Theme element so the
 * theme's `var(--font-tq-*)` font tokens resolve.
 */
export function TorqueTheme({fontClassName, children}: {fontClassName: string; children: ReactNode}) {
  return (
    <div className={fontClassName}>
      <Theme theme={torqueTheme} mode="dark">
        <div className={styles.root}>{children}</div>
      </Theme>
    </div>
  );
}
