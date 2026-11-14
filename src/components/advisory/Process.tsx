import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {processSteps} from './lib/data';
import styles from './advisory.module.css';

export function Process() {
  return (
    <SectionShell
      id="process"
      eyebrow="How an engagement works"
      title="Four steps from first call to a steady rhythm"
      lead="A predictable start matters as much as the monthly work. Timings below are typical for the demo, not a promise.">
      <ol className={styles.processList}>
        {processSteps.map((s, i) => (
          <li key={s.title} className={styles.processItem}>
            <span className={styles.processNum} aria-hidden="true">
              {i + 1}
            </span>
            <Text as="p" className={styles.timing}>
              {s.timing}
            </Text>
            <Heading level={3} className={styles.areaTitle}>
              {s.title}
            </Heading>
            <Text as="p" color="secondary">
              {s.body}
            </Text>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
