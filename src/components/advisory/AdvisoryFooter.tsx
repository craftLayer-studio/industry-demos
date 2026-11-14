import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {STUDIO_URL} from '@/lib/paths';
import {Monogram} from './Monogram';
import styles from './advisory.module.css';

export function AdvisoryFooter() {
  return (
    <footer className={styles.footer}>
      <VStack gap={6} className={styles.container}>
        <HStack gap={3} vAlign="center">
          <Monogram className={styles.footerMonogram} />
          <Text color="inherit" className={styles.footerBrand}>
            Halden &amp; Rowe
          </Text>
        </HStack>
        <hr className={styles.footerRule} />
        <Text as="p" color="inherit" className={styles.footerMuted}>
          Halden &amp; Rowe is a fictional brand. It is not a real accounting firm and does not provide accounting, tax,
          legal or financial services. All content on this page is illustrative and general, and is not advice. Prices
          are sample figures, and the partners, address and contact details are invented.
        </Text>
        <HStack gap={4} wrap="wrap" justify="between">
          <Text color="inherit">
            Concept demo by <a href={STUDIO_URL}>CraftLayer Studio</a>
          </Text>
          <Text color="inherit" className={styles.footerMuted}>
            No consultation can be booked and nothing you enter is sent.
          </Text>
        </HStack>
      </VStack>
    </footer>
  );
}
