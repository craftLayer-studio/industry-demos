'use client';

import {CollapsibleGroup, Collapsible} from '@astryxdesign/core/Collapsible';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {faqs} from './lib/data';
import styles from './advisory.module.css';

export function Faqs() {
  return (
    <SectionShell id="faq" tone="paper" eyebrow="Questions" title="Frequently asked">
      <div className={styles.faqWrap}>
        <CollapsibleGroup type="multiple" hasDividers density="spacious">
          {faqs.map((f, i) => (
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
