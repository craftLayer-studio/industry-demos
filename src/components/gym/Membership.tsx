'use client';

import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {ANNUAL_MONTHS_CHARGED, tiers, type Billing} from './data';
import {formatDollars, priceFor} from './pricing';
import {SectionIntro} from './SectionIntro';
import styles from './gym.module.css';

export function Membership() {
  const [billing, setBilling] = useState<Billing>('monthly');
  return (
    <section id="membership" aria-labelledby="membership-title" className={styles.section} tabIndex={-1}>
      <VStack gap={8} className={styles.wrap}>
        <HStack gap={6} wrap="wrap" justify="between" align="end">
          <SectionIntro index="03" eyebrow="Membership" id="membership-title" title="Pick your load">
            No joining fee, no lock-in on monthly plans. Annual plans charge {ANNUAL_MONTHS_CHARGED} months for 12.
          </SectionIntro>
          <VStack gap={2} className={styles.billingToggle}>
            <Text type="code" className={styles.eyebrow} id="billing-label">
              Billing
            </Text>
            <SegmentedControl label="Billing period" value={billing} onChange={v => setBilling(v as Billing)} size="lg">
              <SegmentedControlItem value="monthly" label="Monthly" />
              <SegmentedControlItem value="annual" label="Annual, 2 months free" />
            </SegmentedControl>
          </VStack>
        </HStack>
        <ul className={styles.tierGrid} aria-live="polite">
          {tiers.map(tier => {
            const price = priceFor(tier, billing);
            return (
              <li key={tier.id} className={`${styles.tier} ${tier.isFeatured ? styles.tierFeatured : ''}`}>
                <article aria-labelledby={`tier-${tier.id}`} className={styles.tierInner}>
                  <VStack gap={4}>
                    <HStack justify="between" align="center" gap={2}>
                      <Heading level={3} id={`tier-${tier.id}`} className={styles.tierName}>
                        {tier.name}
                      </Heading>
                      {tier.isFeatured ? <span className={styles.tierFlag}>Most chosen plan</span> : null}
                    </HStack>
                    <Text as="p" className={styles.tierSummary}>
                      {tier.summary}
                    </Text>
                    <p className={styles.price}>
                      <span className={styles.priceValue}>{formatDollars(price.perMonth)}</span>
                      <span className={styles.priceUnit}>/ month</span>
                    </p>
                    <Text as="p" className={styles.priceNote}>
                      {billing === 'monthly'
                        ? 'Billed monthly. Cancel with 30 days notice.'
                        : `Billed ${formatDollars(price.billed)} a year. You save ${formatDollars(price.annualSaving)}.`}
                    </Text>
                    <ul className={styles.featureList}>
                      {tier.features.map(f => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </VStack>
                  <Button
                    href="#trial"
                    variant={tier.isFeatured ? 'primary' : 'secondary'}
                    label={`Start with a free trial`}
                    width="100%"
                  />
                </article>
              </li>
            );
          })}
        </ul>
        <Text type="supporting">Prices are illustrative for this concept demo. Nothing can be purchased here.</Text>
      </VStack>
    </section>
  );
}
