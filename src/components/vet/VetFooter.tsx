import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {STUDIO_URL} from '@/lib/paths';
import {MeadowlarkMark} from './illustrations';
import styles from './vet.module.css';

export function VetFooter() {
  return (
    <footer className={styles.footer}>
      <VStack gap={5} className={styles.container}>
        <HStack gap={2} vAlign="center">
          <MeadowlarkMark size={28} />
          <Text type="large" weight="bold" color="inherit">
            Meadowlark Vets
          </Text>
        </HStack>
        <Text as="p" color="inherit" className={styles.footerMuted}>
          Meadowlark Vets is a fictional brand. It is not a real veterinary practice and does not give veterinary
          advice. Do not enter real personal information. If your pet needs urgent help, contact your nearest
          out-of-hours vet.
        </Text>
        <HStack gap={4} wrap="wrap" justify="between">
          <Text color="inherit">
            Concept demo by <a href={STUDIO_URL}>CraftLayer Studio</a>
          </Text>
          <Text color="inherit" className={styles.footerMuted}>
            All names, pets, hours and prices are invented.
          </Text>
        </HStack>
      </VStack>
    </footer>
  );
}
