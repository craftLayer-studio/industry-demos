'use client';

import {CollapsibleGroup, Collapsible} from '@astryxdesign/core/Collapsible';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {faqs} from './lib/data';
import styles from './saltmarsh.module.css';

export function Faqs() {
  return (
    <SectionShell id="faqs" eyebrow="Questions" title="Before you arrive">
      <Card padding={4} className={styles.faqCard}>
        <CollapsibleGroup type="single" hasDividers density="spacious">
          {faqs.map((f, i) => (
            <Collapsible
              key={f.q}
              value={`faq-${i}`}
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
        </CollapsibleGroup>
      </Card>
    </SectionShell>
  );
}
