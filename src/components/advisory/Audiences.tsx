import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {audiences} from './lib/data';
import styles from './advisory.module.css';

export function Audiences() {
  return (
    <SectionShell
      id="clients"
      tone="stone"
      eyebrow="Who we work with"
      title="Built for organisations that are still finding their shape">
      <ul className={styles.audienceGrid} role="list">
        {audiences.map(a => (
          <li key={a.title} className={styles.audience}>
            <Heading level={3} className={styles.areaTitle}>
              {a.title}
            </Heading>
            <Text as="p" color="secondary">
              {a.body}
            </Text>
            <Text as="p" className={styles.includesLabel}>
              Often a good fit when
            </Text>
            <ul className={styles.includes}>
              {a.typical.map(t => (
                <li key={t}>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
