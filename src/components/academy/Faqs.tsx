'use client';

import {CollapsibleGroup, Collapsible} from '@astryxdesign/core/Collapsible';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {faqs} from './lib/data';
import styles from './academy.module.css';

export function Faqs() {
  return (
    <SectionShell id="faq" variant="paper" eyebrow="FAQ" title="Questions people tend to ask first">
      <div className={styles.faqCard}>
        <CollapsibleGroup type="multiple" hasDividers density="spacious">
          {faqs.map((f, i) => (
            <Collapsible
              key={f.q}
              value={`faq-${i}`}
              defaultIsOpen={false}
              trigger={
                <Text type="large" weight="semibold">
                  {f.q}
                </Text>
              }>
              <Text as="p" color="secondary" textWrap="pretty">
                {f.a}
              </Text>
            </Collapsible>
          ))}
        </CollapsibleGroup>
      </div>
    </SectionShell>
  );
}
