import type {ReactNode} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import styles from './nonprofit.module.css';

export type Tone = 'butter' | 'cream' | 'forest';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  tone?: Tone;
  children: ReactNode;
};

const TONES: Record<Tone, string> = {
  butter: styles.toneButter,
  cream: styles.toneCream,
  forest: styles.toneForest,
};

/** A poster-style page section: a tag-like eyebrow, a bold display h2 and a lead. */
export function SectionShell({id, eyebrow, title, lead, tone = 'butter', children}: Props) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${TONES[tone]}`}>
      <VStack gap={8} className={styles.container}>
        <VStack gap={3} className={styles.sectionLead}>
          <Text as="p" color="inherit" className={styles.eyebrow}>
            {eyebrow}
          </Text>
          <Heading level={2} id={headingId} textWrap="balance" color="inherit" className={styles.sectionTitle}>
            {title}
          </Heading>
          {lead ? (
            <Text type="large" as="p" color="inherit" textWrap="pretty" className={styles.lead}>
              {lead}
            </Text>
          ) : null}
        </VStack>
        {children}
      </VStack>
    </section>
  );
}
