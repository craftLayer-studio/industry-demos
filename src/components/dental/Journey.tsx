import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {journey} from './lib/data';
import styles from './dental.module.css';

export function Journey() {
  return (
    <SectionShell
      id="journey"
      eyebrow="New patients"
      title="What happens when you get in touch"
      lead="Five unhurried steps from first message to aftercare. You are never asked to decide on the spot.">
      <ol className={styles.journey}>
        {journey.map((step, i) => (
          <li key={step.title} className={styles.journeyStep}>
            <span className={styles.journeyNumber} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <VStack gap={2}>
              <Heading level={3} className={styles.cardTitle}>
                <span className={styles.srOnly}>Step {i + 1}: </span>
                {step.title}
              </Heading>
              <Text as="p" color="secondary" textWrap="pretty">
                {step.body}
              </Text>
            </VStack>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
