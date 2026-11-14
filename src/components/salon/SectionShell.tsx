import type {ReactNode} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import styles from './salon.module.css';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  tone?: 'plain' | 'petal' | 'plum';
  align?: 'start' | 'center';
  children: ReactNode;
};

/** A page section with an eyebrow, a serif heading and a centred column. */
export function SectionShell({id, eyebrow, title, lead, tone = 'plain', align = 'start', children}: Props) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${styles[`tone_${tone}`]}`}>
      <VStack gap={10} className={styles.container}>
        <VStack gap={3} className={`${styles.sectionLead} ${align === 'center' ? styles.sectionLeadCenter : ''}`}>
          <Text type="label" className={styles.eyebrow}>
            {eyebrow}
          </Text>
          <Heading level={2} id={headingId} textWrap="balance" className={styles.sectionTitle}>
            {title}
          </Heading>
          {lead ? (
            <Text type="large" color="secondary" as="p" textWrap="pretty" className={styles.sectionLeadText}>
              {lead}
            </Text>
          ) : null}
        </VStack>
        {children}
      </VStack>
    </section>
  );
}
