import type {ReactNode} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import styles from './vet.module.css';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  tone?: 'body' | 'green' | 'cream';
  children: ReactNode;
};

const toneClass = {body: '', green: styles.sectionGreen, cream: styles.sectionCream};

/** A page section with a labelled heading block and a centred content column. */
export function SectionShell({id, eyebrow, title, lead, tone = 'body', children}: Props) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${toneClass[tone]}`}>
      <VStack gap={8} className={styles.container}>
        <VStack gap={3} className={styles.sectionLead}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <Heading level={2} id={headingId} textWrap="balance" className={styles.sectionTitle}>
            {title}
          </Heading>
          {lead ? (
            <Text type="large" color="secondary" as="p" textWrap="pretty">
              {lead}
            </Text>
          ) : null}
        </VStack>
        {children}
      </VStack>
    </section>
  );
}
