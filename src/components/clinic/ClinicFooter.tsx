import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {STUDIO_URL} from '@/lib/paths';
import {NorthstarMark} from './icons';
import styles from './clinic.module.css';

export function ClinicFooter() {
  return (
    <footer className={styles.footer}>
      <VStack gap={5} className={styles.container}>
        <HStack gap={2} vAlign="center">
          <NorthstarMark width={24} height={24} />
          <Text type="large" weight="bold" color="inherit">
            Northstar Clinic
          </Text>
        </HStack>
        <Text as="p" color="inherit" className={styles.footerMuted}>
          Northstar Clinic is a fictional brand. It is not a real clinic or healthcare provider, and it does not offer
          medical advice, diagnosis or treatment. Do not enter real medical or personal information. In an emergency,
          contact your local emergency number.
        </Text>
        <HStack gap={4} wrap="wrap" justify="between">
          <Text color="inherit">
            Concept demo by <a href={STUDIO_URL}>CraftLayer Studio</a>
          </Text>
          <Text color="inherit" className={styles.footerMuted}>
            All names, clinicians and contact details are invented.
          </Text>
        </HStack>
      </VStack>
    </footer>
  );
}
