import type {ReactNode} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Sprig} from './art';
import styles from './hollin.module.css';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  tone?: 'linen' | 'paper' | 'olive';
  align?: 'start' | 'center';
  children: ReactNode;
};

/** A page section: a gilded eyebrow with a sprig, a serif h2 and a content column. */
export function SectionShell({id, eyebrow, title, lead, tone = 'linen', align = 'start', children}: Props) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${styles[`tone_${tone}`] ?? ''}`}>
      <VStack gap={10} className={styles.container}>
        <VStack gap={4} className={`${styles.sectionLead} ${align === 'center' ? styles.sectionLeadCenter : ''}`}>
          <Text as="p" className={styles.eyebrow}>
            <Sprig className={styles.eyebrowSprig} />
            {eyebrow}
          </Text>
          <Heading level={2} id={headingId} textWrap="balance" className={styles.sectionTitle}>
            {title}
          </Heading>
          {lead ? (
            <Text type="large" color="secondary" as="p" textWrap="pretty" className={styles.lead}>
              {lead}
            </Text>
          ) : null}
        </VStack>
        {children}
      </VStack>
    </section>
  );
}
