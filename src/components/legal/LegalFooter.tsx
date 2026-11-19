import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {STUDIO_URL} from '@/lib/paths';
import {Wordmark} from './Wordmark';
import styles from './legal.module.css';

export function LegalFooter() {
  return (
    <footer className={styles.footer}>
      <VStack gap={6} className={styles.container}>
        <HStack gap={4} wrap="wrap" justify="between" vAlign="center">
          <Wordmark className={styles.footerMark} />
          <Text color="secondary">12 Chancery Walk, a fictional address</Text>
        </HStack>
        <hr className={styles.footerRule} />
        <Text as="p" color="secondary" className={styles.footerSmall}>
          Marlowe &amp; Pike is a fictional brand. It is not a law firm, is not authorised or regulated by any legal
          regulator, and does not provide legal services. Nothing on this page is legal advice. Fees are illustrative
          samples, and the solicitors, address and contact details are invented.
        </Text>
        <HStack gap={4} wrap="wrap" justify="between">
          <Text>
            Concept demo by <a href={STUDIO_URL}>CraftLayer Studio</a>
          </Text>
          <Text color="secondary" className={styles.footerSmall}>
            No enquiry can be sent and nothing you enter is stored.
          </Text>
        </HStack>
      </VStack>
    </footer>
  );
}
