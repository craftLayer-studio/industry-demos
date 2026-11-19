import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {steps} from './lib/data';
import styles from './legal.module.css';

const numerals = ['I', 'II', 'III', 'IV'];

export function Process() {
  return (
    <SectionShell
      id="how-we-work"
      eyebrow="III. How we work"
      title="A considered process, explained at every turn"
      lead="The same four steps for every matter, so you always know where things stand.">
      <ol className={styles.steps}>
        {steps.map((s, i) => (
          <li key={s.title} className={styles.step}>
            <span className={styles.stepNum} aria-hidden="true">
              {numerals[i]}
            </span>
            <Heading level={3} className={styles.stepTitle}>
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
