import type {ReactNode} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import styles from './advisory.module.css';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  tone?: 'plain' | 'paper' | 'stone';
  children: ReactNode;
};

/** A page section with an eyebrow, a serif h2 and a centred content column. */
export function SectionShell({id, eyebrow, title, lead, tone = 'plain', children}: Props) {
  const headingId = `${id}-heading`;
  const toneClass = tone === 'paper' ? styles.sectionPaper : tone === 'stone' ? styles.sectionStone : '';
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${toneClass}`}>
      <VStack gap={10} className={styles.container}>
        <VStack gap={4} className={styles.sectionLead}>
          <Text as="p" className={styles.eyebrow}>
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
