import type {ReactNode} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import styles from './saas.module.css';

type Props = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'plain' | 'raised';
  align?: 'start' | 'center';
  children: ReactNode;
};

/** Page section with a labelled heading block and a centred content column. */
export function Section({id, eyebrow, title, lead, tone = 'plain', align = 'start', children}: Props) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${styles.section} ${tone === 'raised' ? styles.sectionRaised : ''}`}>
      <div className={styles.container}>
        <div className={`${styles.sectionLead} ${align === 'center' ? styles.sectionLeadCenter : ''}`}>
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
