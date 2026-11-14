import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {CharcoalBand} from './AshgroveTheme';
import {SectionShell} from './SectionShell';
import {sellingSteps} from './lib/data';
import styles from './ashgrove.module.css';

export function SellingProcess() {
  return (
    <CharcoalBand>
      <SectionShell
        id="selling"
        tone="charcoal"
        eyebrow="Selling with us"
        title="Five steps from valuation to keys"
        lead="How a sale would run with Ashgrove: one named person from the first visit to completion, and everything put in writing.">
        <ol className={styles.steps}>
          {sellingSteps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <Text as="p" color="secondary" textWrap="pretty">
                {s.body}
              </Text>
            </li>
          ))}
        </ol>
        <HStack gap={3} wrap="wrap" vAlign="center">
          <Button label="Visit the office" variant="primary" href="#office" />
          <Text color="secondary">This demo does not take valuation bookings.</Text>
        </HStack>
      </SectionShell>
    </CharcoalBand>
  );
}
