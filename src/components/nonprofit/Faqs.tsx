'use client';

import {CollapsibleGroup, Collapsible} from '@astryxdesign/core/Collapsible';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {FAQS} from './lib/content';
import styles from './nonprofit.module.css';

export function Faqs() {
  return (
    <SectionShell id="faq" tone="cream" eyebrow="Questions" title="Good to know">
      <div className={styles.faqWrap}>
        <CollapsibleGroup type="multiple" hasDividers density="spacious">
          {FAQS.map((f, i) => (
            <Collapsible
              key={f.q}
              value={`faq-${i}`}
              defaultIsOpen={false}
              trigger={<span className={styles.faqQ}>{f.q}</span>}>
              <Text as="p" color="secondary">
                {f.a}
              </Text>
            </Collapsible>
          ))}
        </CollapsibleGroup>
      </div>
    </SectionShell>
  );
}
