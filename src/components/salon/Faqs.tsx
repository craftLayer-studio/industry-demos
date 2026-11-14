'use client';

import {CollapsibleGroup, Collapsible} from '@astryxdesign/core/Collapsible';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {faqs} from './lib/data';
import styles from './salon.module.css';

export function Faqs() {
  return (
    <SectionShell id="faq" eyebrow="FAQ" title="Good to know">
      <Card padding={2} className={styles.faqCard}>
        <CollapsibleGroup type="multiple" hasDividers density="spacious">
          {faqs.map((f, i) => (
            <Collapsible
              key={f.q}
              value={`faq-${i}`}
              defaultIsOpen={false}
              trigger={
                <Text type="large" weight="medium">
                  {f.q}
                </Text>
              }>
              <Text as="p" color="secondary" className={styles.faqAnswer}>
                {f.a}
              </Text>
            </Collapsible>
          ))}
        </CollapsibleGroup>
      </Card>
    </SectionShell>
  );
}
