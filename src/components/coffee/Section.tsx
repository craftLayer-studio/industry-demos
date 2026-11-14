import type {ReactNode} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import styles from './coffee.module.css';

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'plain' | 'raised';
  children: ReactNode;
};

/** Page section with a numbered eyebrow, a display heading and a content column. */
export function Section({id, eyebrow, title, lead, tone = 'plain', children}: Props) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${tone === 'raised' ? styles.sectionRaised : ''}`}>
      <div className={styles.container}>
        <div className={styles.sectionLead}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <Heading level={2} id={headingId} textWrap="balance" className={styles.sectionTitle}>
            {title}
          </Heading>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
