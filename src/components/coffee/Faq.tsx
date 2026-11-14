'use client';

import {Collapsible, CollapsibleGroup} from '@astryxdesign/core/Collapsible';
import {Text} from '@astryxdesign/core/Text';
import {Section} from './Section';
import styles from './coffee.module.css';

const faqs = [
  {
    q: 'Is Brightwater Coffee a real roaster?',
    a: 'No. Brightwater is a fictional brand designed by CraftLayer Studio to show how a coffee shop site can work. There is nothing to buy and no orders, payments or subscriptions are processed.',
  },
  {
    q: 'Are the prices and coffees real?',
    a: 'They are illustrative samples. Origins are named only by country and region, and the tasting notes describe what this kind of coffee often tastes like rather than a specific lot.',
  },
  {
    q: 'Whole bean or ground?',
    a: 'Whole bean keeps its aroma longest, so it is the default. If you do not have a grinder, pick the grind that matches your brewer and use the bag within a few weeks.',
  },
  {
    q: 'How fresh would the coffee be?',
    a: 'In this concept, coffee is roasted to order on a fixed day and shipped within two days. Most coffees taste best from about a week to six weeks after roasting.',
  },
  {
    q: 'How would subscriptions work?',
    a: 'You choose a style, bag size, frequency and grind, and the roaster picks a coffee in that style for each delivery. In the concept you could skip, pause or cancel at any time.',
  },
  {
    q: 'What does the brew ratio mean?',
    a: 'It is grams of water (or espresso yield) per gram of coffee. 1:16 means 16 g of water for every 1 g of coffee. Start with the suggested ratio and adjust to taste.',
  },
];

export function Faq() {
  return (
    <Section id="faq" eyebrow="05 · FAQ" title="Good questions">
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
