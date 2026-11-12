'use client';

import {CollapsibleGroup, Collapsible} from '@astryxdesign/core/Collapsible';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {faqs} from './lib/data';

export function Faqs() {
  return (
    <SectionShell id="faqs" eyebrow="FAQs" title="Questions people often ask">
      <Card padding={2}>
        <CollapsibleGroup type="single" defaultValue="faq-0" hasDividers density="spacious">
          {faqs.map((f, i) => (
            <Collapsible
              key={f.q}
              value={`faq-${i}`}
              trigger={
                <Text type="large" weight="semibold">
                  {f.q}
                </Text>
              }>
              <Text as="p" color="secondary">
                {f.a}
              </Text>
            </Collapsible>
          ))}
        </CollapsibleGroup>
      </Card>
    </SectionShell>
  );
}
