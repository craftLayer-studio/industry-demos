import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {firstVisitSteps} from './lib/data';
import styles from './salon.module.css';

export function FirstVisit() {
  return (
    <SectionShell
      id="first-visit"
      eyebrow="Your first visit"
      title="What to expect"
      lead="No rush, no upselling. Here is how a first appointment at the fictional studio would unfold."
      tone="plum">
      <ol className={styles.steps}>
        {firstVisitSteps.map((s, i) => (
          <li key={s.title} className={styles.step}>
            <span className={styles.stepNumber} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <VStack gap={2}>
              <Heading level={3} className={styles.stepTitle}>
                {s.title}
              </Heading>
              <Text as="p" className={styles.stepBody}>
                {s.body}
              </Text>
            </VStack>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
