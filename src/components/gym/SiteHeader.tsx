'use client';

import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {LogoMark} from './Art';
import {navItems} from './data';
import styles from './gym.module.css';

export function SiteHeader() {
  return (
    <header className={styles.siteHeader}>
      <HStack gap={4} align="center" justify="between" className={styles.wrap}>
        <a href="#main" className={styles.brand} aria-label="Forge Fitness, back to top">
          <LogoMark size={30} />
          <span className={styles.brandWord} aria-hidden="true">
            Forge
          </span>
        </a>
        <nav aria-label="Forge Fitness sections" className={styles.navDesktop}>
          <ul className={styles.navList}>
            {navItems.map(item => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <HStack gap={2} align="center">
          <span className={styles.headerCta}>
            <Button href="#trial" variant="primary" label="Book a free trial" size="md" />
          </span>
          <details className={styles.navMobile}>
            <summary className={styles.navSummary}>Menu</summary>
            <nav aria-label="Forge Fitness sections, mobile">
              <ul className={styles.navMobileList}>
                {navItems.map(item => (
                  <li key={item.href}>
                    <a href={item.href} className={styles.navLink}>
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#trial" className={styles.navLink}>
                    Book a free trial
                  </a>
                </li>
              </ul>
            </nav>
          </details>
        </HStack>
      </HStack>
    </header>
  );
}
