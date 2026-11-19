import type {ReactNode} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import styles from './torque.module.css';

type Props = {
  id: string;
  code: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'base' | 'raised' | 'grid';
  children: ReactNode;
};

const toneClass = {base: styles.toneBase, raised: styles.toneRaised, grid: styles.toneGrid};

/** Page section with a mono diagnostic code tag, display heading and content. */
export function Section({id, code, kicker, title, lead, tone = 'base', children}: Props) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${toneClass[tone]}`}>
      <div className={styles.container}>
        <header className={styles.sectionHead}>
          <p className={styles.kicker}>
            <span className={styles.kickerCode}>{code}</span>
            {kicker}
          </p>
          <Heading level={2} id={headingId} textWrap="balance" className={styles.sectionTitle}>
            {title}
          </Heading>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
