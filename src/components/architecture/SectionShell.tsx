import type {ReactNode} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {InkBand} from './OstranderTheme';
import styles from './ostrander.module.css';

type Props = {
  id: string;
  /** Two-digit section number shown in the margin, e.g. "02". */
  index: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  tone?: 'paper' | 'sheet' | 'ink';
  children: ReactNode;
};

/** A grid-ruled section: index number and eyebrow in the margin column, title and content across the rest. */
export function SectionShell({id, index, eyebrow, title, lead, tone = 'paper', children}: Props) {
  const headingId = `${id}-heading`;
  const section = (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${styles[`tone_${tone}`]}`}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionIndex} aria-hidden="true">
            {index}
          </p>
          <div className={styles.sectionHeadMain}>
            <Text as="p" className={styles.eyebrow}>
              {eyebrow}
            </Text>
            <Heading level={2} id={headingId} textWrap="balance" className={styles.sectionTitle}>
              {title}
            </Heading>
            {lead ? (
              <Text as="p" type="large" textWrap="pretty" className={styles.lead}>
                {lead}
              </Text>
            ) : null}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
  return tone === 'ink' ? <InkBand>{section}</InkBand> : section;
}
