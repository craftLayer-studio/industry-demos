import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {STUDIO_URL} from '@/lib/paths';
import {LogoMark} from './illustrations';
import styles from './nonprofit.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <VStack gap={6} className={styles.container}>
        <HStack gap={3} vAlign="center">
          <LogoMark className={styles.logo} />
          <Text color="inherit" className={styles.footerBrand}>
            Common Table
          </Text>
        </HStack>
        <Text as="p" color="inherit" className={styles.footerMuted}>
          Common Table is a fictional brand. It is not a real charity or food bank, it is not registered anywhere and it
          cannot accept donations. Larkfield, the pantries, events, shifts and addresses are invented, and the
          &ldquo;how a gift is used&rdquo; figures are an illustrative sample model, not real accounts.
        </Text>
        <hr className={styles.footerRule} />
        <HStack gap={4} wrap="wrap" justify="between">
          <Text color="inherit">
            Concept demo by <a href={STUDIO_URL}>CraftLayer Studio</a>
          </Text>
          <Text color="inherit" className={styles.footerMuted}>
            No payment is taken and nothing you enter is sent.
          </Text>
        </HStack>
      </VStack>
    </footer>
  );
}
