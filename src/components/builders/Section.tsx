import type {ReactNode} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import styles from './keystone.module.css';

type Props = {
  id: string;
  number: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'plain' | 'concrete' | 'black' | 'yellow';
  children: ReactNode;
};

const toneClass = {
  plain: styles.tonePlain,
  concrete: styles.toneConcrete,
  black: styles.toneBlack,
  yellow: styles.toneYellow,
};

/** Page section with a stencil-style number tag, a condensed display heading and content. */
export function Section({id, number, kicker, title, lead, tone = 'plain', children}: Props) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${toneClass[tone]}`}>
      <div className={styles.container}>
        <header className={styles.sectionHead}>
          <p className={styles.kicker}>
            <span className={styles.kickerNum}>{number}</span>
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
