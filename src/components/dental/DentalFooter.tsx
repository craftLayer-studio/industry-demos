import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {STUDIO_URL} from '@/lib/paths';
import {ArbourMark} from './art';
import styles from './dental.module.css';

export function DentalFooter() {
  return (
    <footer className={styles.footer}>
      <VStack gap={5} className={styles.container}>
        <HStack gap={2} vAlign="center">
          <ArbourMark />
          <Text type="large" weight="semibold" color="inherit">
            Arbour Dental
          </Text>
        </HStack>
        <Text as="p" color="inherit" className={styles.footerMuted}>
          Arbour Dental is a fictional brand. It is not a real dental practice or healthcare provider and does not offer
          dental or medical advice, diagnosis or treatment. Prices are illustrative samples, and the payment estimator
          is not a credit offer. Do not enter real personal or medical information.
        </Text>
        <HStack gap={4} wrap="wrap" justify="between">
          <Text color="inherit">
            Concept demo by <a href={STUDIO_URL}>CraftLayer Studio</a>
          </Text>
          <Text color="inherit" className={styles.footerMuted}>
            All names, team members and contact details are invented.
          </Text>
        </HStack>
      </VStack>
    </footer>
  );
}
