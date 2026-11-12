'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import styles from './gym.module.css';
import type {ReactNode} from 'react';

/** Numbered editorial section header: "02 / Coaches" + display heading + intro. */
export function SectionIntro({
  index,
  eyebrow,
  id,
  title,
  children,
}: {
  index: string;
  eyebrow: string;
  id: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <VStack as="header" gap={3} className={styles.sectionIntro}>
      <Text type="code" className={styles.eyebrow}>
        {index} / {eyebrow}
      </Text>
      <Heading level={2} id={id} className={styles.sectionTitle}>
        {title}
      </Heading>
      {children ? (
        <Text as="p" type="large" color="secondary" className={styles.lede}>
          {children}
        </Text>
      ) : null}
    </VStack>
  );
}
