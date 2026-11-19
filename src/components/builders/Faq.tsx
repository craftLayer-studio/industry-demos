'use client';

import {Collapsible, CollapsibleGroup} from '@astryxdesign/core/Collapsible';
import {Text} from '@astryxdesign/core/Text';
import {Section} from './Section';
import styles from './keystone.module.css';

const FAQS = [
  {
    q: 'Is Keystone Build Co. a real builder?',
    a: 'No. Keystone is a fictional company designed by CraftLayer Studio to show how a builder or renovator website could work. No surveys are booked, no quotes are issued and no building work takes place.',
  },
  {
    q: 'How accurate is the extension estimator?',
    a: 'It is illustrative only. The rates, region bands and fees are invented sample figures chosen to make the tool feel realistic. A real builder would price from a site survey and drawings.',
  },
  {
    q: 'Do I need planning permission for an extension?',
    a: 'It depends on the size, the position on the house and local rules. Many smaller rear extensions fall under permitted development, but always check with your local planning authority before you commit.',
  },
  {
    q: 'Can we stay at home during the work?',
    a: 'For most extensions and lofts, yes. The work zone is sealed off and the messiest stages are planned in advance. Whole-house renovations sometimes need a short move-out during rewiring and plastering.',
  },
  {
    q: 'What happens at a site survey?',
    a: 'In this concept, a site lead visits for about an hour, measures up, looks at access, drainage and structure, and talks through what you want. You would get a written summary afterwards.',
  },
  {
    q: 'Who handles building control and party walls?',
    a: 'In this concept, Keystone would coordinate building control and structural calculations and help you serve party-wall notices. Any surveyor or council fees would be listed separately in the quote.',
  },
];

export function Faq() {
  return (
    <Section id="faq" number="06" kicker="FAQ" title="Straight answers" tone="concrete">
      <div className={styles.faqCard}>
        <CollapsibleGroup type="multiple" hasDividers density="spacious">
          {FAQS.map((f, i) => (
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
