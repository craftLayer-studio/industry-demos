'use client';

import {Collapsible} from '@astryxdesign/core/Collapsible';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {faqs} from './lib/data';
import styles from './ashgrove.module.css';

export function Faqs() {
  return (
    <SectionShell id="faqs" tone="paper" eyebrow="Questions" title="Things people ask before a viewing">
      <Card padding={4} className={styles.faqCard}>
        {faqs.map(f => (
          <Collapsible
            key={f.q}
            defaultIsOpen={false}
            className={styles.faqItem}
            trigger={
              <Text type="large" weight="medium">
                {f.q}
              </Text>
            }>
            <Text as="p" color="secondary" textWrap="pretty" className={styles.faqAnswer}>
              {f.a}
            </Text>
          </Collapsible>
        ))}
      </Card>
    </SectionShell>
  );
}
