import type {ReactNode} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import styles from './clinic.module.css';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  tinted?: boolean;
  children: ReactNode;
};

/** A page section with a labelled heading block and a centred content column. */
export function SectionShell({id, eyebrow, title, lead, tinted, children}: Props) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${styles.section} ${tinted ? styles.sectionTinted : ''}`}>
      <VStack gap={8} className={styles.container}>
        <VStack gap={3} className={styles.sectionLead}>
          <Text type="label" color="accent" weight="semibold">
            {eyebrow}
          </Text>
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
