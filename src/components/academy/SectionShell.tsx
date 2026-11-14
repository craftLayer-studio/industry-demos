import type {ReactNode} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import styles from './academy.module.css';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  variant?: 'plain' | 'paper' | 'ink';
  headingId?: string;
  children: ReactNode;
};

/** A page section with a numbered-notebook style heading block and a centred column. */
export function SectionShell({id, eyebrow, title, lead, variant = 'plain', headingId, children}: Props) {
  const hId = headingId ?? `${id}-heading`;
  return (
    <section id={id} aria-labelledby={hId} className={`${styles.section} ${styles[`section_${variant}`]}`}>
      <VStack gap={8} className={styles.container}>
        <VStack gap={3} className={styles.sectionLead}>
          <Text type="label" weight="semibold" className={styles.eyebrow}>
            {eyebrow}
          </Text>
          <Heading level={2} id={hId} textWrap="balance" className={styles.sectionTitle} tabIndex={headingId ? -1 : undefined}>
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
