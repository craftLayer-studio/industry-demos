import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {included} from './lib/data';
import styles from './hollin.module.css';

export function Included() {
  return (
    <SectionShell
      id="included"
      tone="olive"
      align="center"
      eyebrow="What's included"
      title="Everything you need, nothing you have to hire in">
      <ul className={styles.includedGrid}>
        {included.map((item, i) => (
          <li key={item.title} className={styles.includedItem}>
            <span className={styles.includedNumeral} aria-hidden="true">
              {['i', 'ii', 'iii', 'iv', 'v', 'vi'][i]}
            </span>
            <Heading level={3} className={styles.includedTitle}>
              {item.title}
            </Heading>
            <Text as="p" textWrap="pretty" className={styles.includedBody}>
              {item.body}
            </Text>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
