'use client';

import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Selector} from '@astryxdesign/core/Selector';
import {Section} from './Section';
import {BAG_SIZES, GRINDS, type BagSize, type Grind} from './lib/cart';
import {formatMoney} from './lib/catalog';
import {
  DEFAULT_SUBSCRIPTION,
  FREQUENCIES,
  STYLES,
  SUBSCRIPTION_DISCOUNT,
  quoteSubscription,
  type Frequency,
  type Style,
  type SubscriptionConfig,
} from './lib/subscription';
import styles from './coffee.module.css';

export function Subscription() {
  const [config, setConfig] = useState<SubscriptionConfig>(DEFAULT_SUBSCRIPTION);
  const [started, setStarted] = useState(false);
  const quote = quoteSubscription(config);

  const set = <K extends keyof SubscriptionConfig>(key: K, value: SubscriptionConfig[K]) => {
    setConfig(c => ({...c, [key]: value}));
    setStarted(false);
  };

  const style = STYLES.find(s => s.value === config.style)!;
  const freq = FREQUENCIES.find(f => f.value === config.frequency)!;
  const size = BAG_SIZES.find(s => s.value === config.size)!;
  const grind = GRINDS.find(g => g.value === config.grind)!;

  return (
    <Section
      id="subscribe"
      eyebrow="02 · Subscriptions"
      title="Build a subscription"
      tone="raised"
      lead={`Pick a style, size and rhythm. The price updates as you go and includes a sample ${Math.round(SUBSCRIPTION_DISCOUNT * 100)}% subscriber saving. Nothing is set up or charged.`}>
      <div className={styles.subGrid}>
        <div className={styles.subControls}>
          <RadioList label="Coffee style" value={config.style} onChange={v => set('style', v as Style)}>
            {STYLES.map(s => (
              <RadioListItem key={s.value} value={s.value} label={s.label} description={s.description} />
            ))}
          </RadioList>
          <div className={styles.subRow}>
            <div>
              <p className={styles.filterLabel}>Bag size</p>
              <SegmentedControl label="Bag size" value={config.size} onChange={v => set('size', v as BagSize)} layout="fill">
                {BAG_SIZES.map(s => (
                  <SegmentedControlItem key={s.value} value={s.value} label={s.label} />
                ))}
              </SegmentedControl>
            </div>
            <div>
              <p className={styles.filterLabel}>Bags per delivery</p>
              <SegmentedControl
                label="Bags per delivery"
                value={String(config.bags)}
                onChange={v => set('bags', Number(v))}
                layout="fill">
                {['1', '2', '3'].map(n => (
                  <SegmentedControlItem key={n} value={n} label={n} />
                ))}
              </SegmentedControl>
            </div>
          </div>
          <div className={styles.subRow}>
            <Selector
              label="Delivery frequency"
              options={FREQUENCIES.map(f => ({value: f.value, label: f.label}))}
              value={config.frequency}
              onChange={v => set('frequency', (v ?? 'fortnightly') as Frequency)}
              width="100%"
            />
            <Selector
              label="Grind"
              options={GRINDS}
              value={config.grind}
              onChange={v => set('grind', (v ?? 'whole') as Grind)}
              width="100%"
            />
          </div>
        </div>

        <aside className={styles.quoteCard} aria-labelledby="quote-heading">
          <p className={styles.eyebrow} id="quote-heading">
            Your sample plan
          </p>
          <output className={styles.quoteMain} aria-live="polite">
            <span className={styles.quoteValue}>{formatMoney(quote.perDelivery)}</span>
            <span className={styles.quoteUnit}>per delivery</span>
          </output>
          <dl className={styles.quoteList}>
            <div>
              <dt>Average per month</dt>
              <dd>{formatMoney(quote.monthly)}</dd>
            </div>
            <div>
              <dt>Per bag</dt>
              <dd>
                <s className={styles.strike}>{formatMoney(quote.listPerBag)}</s> {formatMoney(quote.perBag)}
              </dd>
            </div>
            <div>
              <dt>Saving per delivery</dt>
              <dd>{formatMoney(quote.savingPerDelivery)}</dd>
            </div>
            <div>
              <dt>Deliveries per year</dt>
              <dd>{quote.deliveriesPerYear}</dd>
            </div>
          </dl>
          <p className={styles.quoteSummary}>
            {config.bags} × {size.label} of {style.label.toLowerCase()}, {grind.label.toLowerCase()},{' '}
            {freq.label.toLowerCase()}.
          </p>
          <Button label="Start this subscription" variant="primary" width="100%" onClick={() => setStarted(true)} />
          <p className={styles.finePrint} role="status">
            {started
              ? 'Demo only: no subscription was created and nothing was charged.'
              : 'Sample prices. Monthly figure averages deliveries across a year. Pause or cancel any time in this concept.'}
          </p>
        </aside>
      </div>
    </Section>
  );
}
