import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {practiceAreas} from './lib/data';
import styles from './advisory.module.css';

export function PracticeAreas() {
  return (
    <SectionShell
      id="services"
      eyebrow="Practice areas"
      title="Six services, one steady finance function"
      lead="Choose what you need now and add the rest as the business grows. Every engagement has a written scope.">
      <ul className={styles.areaGrid} role="list">
        {practiceAreas.map((a, i) => (
          <li key={a.id} className={styles.area}>
            <span className={styles.areaNum} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <Heading level={3} className={styles.areaTitle}>
              {a.title}
            </Heading>
            <Text as="p" color="secondary">
              {a.summary}
            </Text>
            <Text as="p" className={styles.includesLabel}>
              What’s included
            </Text>
            <ul className={styles.includes}>
              {a.includes.map(item => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
