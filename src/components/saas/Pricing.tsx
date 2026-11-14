'use client';

import {useState} from 'react';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Slider} from '@astryxdesign/core/Slider';
import {Section} from './Section';
import {CheckIcon} from './icons';
import {PlanComparison} from './PlanComparison';
import {
  ANNUAL_DISCOUNT,
  EVENT_BLOCK,
  EVENT_STEPS,
  MAX_SEATS,
  MIN_SEATS,
  basePrice,
  clampSeats,
  formatEvents,
  formatUsd,
  getPlan,
  plans,
  quote,
  recommend,
  type Billing,
} from './lib/pricing';
import styles from './saas.module.css';

const discountPct = Math.round(ANNUAL_DISCOUNT * 100);

export function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly');
  const [seats, setSeats] = useState(8);
  const [eventIndex, setEventIndex] = useState(4);
  const events = EVENT_STEPS[eventIndex];
  const best = recommend(seats, events, billing);
  const bestPlan = getPlan(best.plan);
  const perUnit = billing === 'annual' ? `, billed annually` : '';

  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Simple plans that grow with your team"
      lead="Sample prices for a fictional product. Every plan includes funnels, retention and the weekly digest; you pay more only for seats and event volume."
      align="center">
      <div className={styles.billingRow}>
        <SegmentedControl label="Billing period" value={billing} onChange={v => setBilling(v as Billing)} size="lg">
          <SegmentedControlItem value="monthly" label="Monthly" />
          <SegmentedControlItem value="annual" label={`Annual (save ${discountPct}%)`} />
        </SegmentedControl>
      </div>

      <ul className={styles.planGrid} aria-label="Plans">
        {plans.map(plan => {
          const price = basePrice(plan, billing);
          return (
            <li key={plan.id} className={`${styles.plan} ${plan.isFeatured ? styles.planFeatured : ''}`}>
              <article aria-labelledby={`plan-${plan.id}`} className={styles.planInner}>
                <div className={styles.planTop}>
                  <Heading level={3} id={`plan-${plan.id}`} className={styles.planName}>
                    {plan.name}
                  </Heading>
                  {plan.isFeatured ? <span className={styles.planFlag}>Most teams start here</span> : null}
                </div>
                <p className={styles.planSummary}>{plan.summary}</p>
                <p className={styles.planPrice}>
                  <span className={styles.planPriceValue}>{formatUsd(price)}</span>
                  <span className={styles.planPriceUnit}>/ month</span>
                </p>
                <p className={styles.planBilled}>
                  {plan.base === 0
                    ? 'Free while you stay within the limits.'
                    : billing === 'annual'
                      ? `Billed ${formatUsd(price * 12)} a year, before extras.`
                      : 'Billed monthly, before extras. Cancel any time.'}
                </p>
                <ul className={styles.checkList}>
                  {plan.highlights.map(h => (
                    <li key={h}>
                      <CheckIcon className={styles.checkIcon} />
                      {h}
                    </li>
                  ))}
                </ul>
                {plan.seatPrice > 0 ? (
                  <p className={styles.planExtras}>
                    Extra seats {formatUsd(plan.seatPrice)}, extra events {formatUsd(plan.eventBlockPrice)} per{' '}
                    {formatEvents(EVENT_BLOCK)} (monthly list price).
                  </p>
                ) : (
                  <p className={styles.planExtras}>No add-ons. Move up a plan when you outgrow it.</p>
                )}
                <Button
                  href="#waitlist"
                  label={`Join the waitlist for ${plan.name}`}
                  variant={plan.isFeatured ? 'primary' : 'secondary'}
                  width="100%">
                  Join the waitlist
                </Button>
              </article>
            </li>
          );
        })}
      </ul>

      <div className={styles.calc} id="calculator">
        <div className={styles.calcInputs}>
          <Heading level={3} className={styles.calcTitle}>
            Estimate your price
          </Heading>
          <p className={styles.bodyText}>
            Tell us roughly how many people need access and how many events you send each month. The estimate uses the{' '}
            {billing === 'annual' ? 'annual' : 'monthly'} prices above.
          </p>
          <NumberInput
            label="Seats"
            description={`People who can sign in, ${MIN_SEATS} to ${MAX_SEATS}.`}
            value={seats}
            onChange={v => setSeats(clampSeats(v))}
            min={MIN_SEATS}
            max={MAX_SEATS}
            isIntegerOnly
            hasNumberSteppers
            width="100%"
          />
          <Slider
            label="Tracked events per month"
            value={eventIndex}
            onChange={(v: number) => setEventIndex(v)}
            min={0}
            max={EVENT_STEPS.length - 1}
            step={1}
            formatValue={(v: number) => `${formatEvents(EVENT_STEPS[v])} events`}
            valueDisplay="text"
            width="100%"
          />
          <div className={styles.sliderScale} aria-hidden="true">
            <span>{formatEvents(EVENT_STEPS[0])}</span>
            <span>{formatEvents(EVENT_STEPS[EVENT_STEPS.length - 1])}</span>
          </div>
        </div>

        <div className={styles.calcResult}>
          <div role="status" aria-live="polite" aria-atomic="true">
            <p className={styles.calcKicker}>Best fit for {seats} {seats === 1 ? 'seat' : 'seats'} and {formatEvents(events)} events</p>
            <p className={styles.calcPlan}>{bestPlan.name}</p>
            <p className={styles.calcPrice}>
              <span className={styles.calcPriceValue}>{formatUsd(best.monthly)}</span>
              <span className={styles.planPriceUnit}>/ month{perUnit}</span>
            </p>
            <p className={styles.planBilled}>
              {best.monthly === 0
                ? 'Nothing to pay at this size.'
                : billing === 'annual'
                  ? `${formatUsd(best.billedAmount)} billed once a year. You save ${formatUsd(best.annualSaving)} versus monthly.`
                  : `Switch to annual billing to save ${discountPct}%.`}
            </p>
          </div>
          <dl className={styles.breakdown}>
            <div>
              <dt>{bestPlan.name} base</dt>
              <dd>{formatUsd(best.baseMonthly)}</dd>
            </div>
            <div>
              <dt>
                {best.extraSeats} extra {best.extraSeats === 1 ? 'seat' : 'seats'}
              </dt>
              <dd>{formatUsd(best.seatsMonthly)}</dd>
            </div>
            <div>
              <dt>
                {best.extraEventBlocks} extra {formatEvents(EVENT_BLOCK)} event {best.extraEventBlocks === 1 ? 'block' : 'blocks'}
              </dt>
              <dd>{formatUsd(best.eventsMonthly)}</dd>
            </div>
          </dl>
          <div className={styles.compare}>
            <p className={styles.compareTitle}>All plans at this size</p>
            <ul>
              {plans.map(p => {
                const q = quote(p.id, seats, events, billing);
                return (
                  <li key={p.id} className={q.plan === best.plan ? styles.compareBest : ''}>
                    <span>{p.name}</span>
                    <span>{q.isEligible ? `${formatUsd(q.monthly)} / mo` : q.reason}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className={styles.finePrint}>Estimate only. Sample prices for a concept demo; nothing can be purchased.</p>
        </div>
      </div>

      <PlanComparison />
    </Section>
  );
}
