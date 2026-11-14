'use client';

import {CollapsibleGroup, Collapsible} from '@astryxdesign/core/Collapsible';
import {Text} from '@astryxdesign/core/Text';
import {Section} from './Section';
import styles from './saas.module.css';

const faqs = [
  {q: 'Is Pulsegrid a real product?', a: 'No. Pulsegrid is a fictional brand designed by CraftLayer Studio to show how a SaaS launch page can be built. There is no app to sign in to and no data is collected.'},
  {q: 'Where do the numbers on this page come from?', a: 'They are generated sample data. The dashboard widget uses a seeded generator, so it shows the same made-up values every time. Nothing reflects real users or customers.'},
  {q: 'What counts as an event?', a: 'Any action you choose to track, such as a page view, a signup or a project being created. In this concept, the price is driven by how many events you send each month.'},
  {q: 'What happens if we go over our event allowance?', a: 'In the sample pricing, Team and Scale plans bill extra events in blocks of one million. Starter simply stops recording new events until the next month.'},
  {q: 'Do we need an engineer to set it up?', a: 'Someone needs to add one snippet or call the API from your server. After that, funnels, retention views and alerts are built from the dashboard without code.'},
  {q: 'Can we leave and take our data with us?', a: 'The concept includes raw event export on every plan, so your history is never locked in a format only Pulsegrid can read.'},
];

export function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions, answered" tone="raised">
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
              <p className={styles.bodyText}>{f.a}</p>
            </Collapsible>
          ))}
        </CollapsibleGroup>
      </div>
    </Section>
  );
}
