'use client';

import {HStack} from '@astryxdesign/core/HStack';
import {Link} from '@astryxdesign/core/Link';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {STUDIO_URL} from '@/lib/paths';
import {LogoMark} from './Art';
import {navItems} from './data';
import styles from './gym.module.css';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <VStack gap={8} className={styles.wrap}>
        <p className={styles.footerWord} aria-hidden="true">
          Forge
        </p>
        <HStack gap={6} wrap="wrap" justify="between" align="start">
          <VStack gap={2} className={styles.footerBlurb}>
            <HStack gap={2} align="center">
              <LogoMark size={24} />
              <Text weight="semibold">Forge Fitness</Text>
            </HStack>
            <Text as="p" color="secondary">
              A fictional gym. Every name, address, price and class on this page was invented for a portfolio concept.
            </Text>
          </VStack>
          <nav aria-label="Footer">
            <ul className={styles.footerLinks}>
              {navItems.map(item => (
                <li key={item.href}>
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#trial" className={styles.navLink}>
                  Book a trial
                </a>
              </li>
            </ul>
          </nav>
        </HStack>
        <HStack gap={4} wrap="wrap" justify="between" className={styles.footerBase}>
          <Text type="supporting">
            Concept demo by{' '}
            <Link href={STUDIO_URL} type="inherit">
              CraftLayer Studio
            </Link>
          </Text>
          <Text type="supporting">No real bookings, payments or personal data are processed.</Text>
        </HStack>
      </VStack>
    </footer>
  );
}
