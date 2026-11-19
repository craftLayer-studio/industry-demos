'use client';

import {useMemo, useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {SectionShell} from './SectionShell';
import {
  clampPrice,
  estimateConveyancing,
  formatGBP,
  PRICE_LIMITS,
  type ConveyancingEstimate,
  type ConveyancingInput,
  type Tenure,
} from './lib/conveyancing';
import styles from './legal.module.css';

export function summariseQuote(input: ConveyancingInput, e: ConveyancingEstimate): string {
  const parts = [
    `${input.tenure === 'leasehold' ? 'Leasehold' : 'Freehold'} purchase at ${formatGBP(clampPrice(input.price))}`,
    input.mortgage ? 'with a mortgage' : 'without a mortgage',
  ];
  if (input.firstTimeBuyer) parts.push('first-time buyer');
  return `${parts.join(', ')}: sample estimate ${formatGBP(e.total)} including VAT and disbursements`;
}

function signed(n: number): string {
  return n < 0 ? `−${formatGBP(-n)}` : formatGBP(n);
}

export function Conveyancing({onEnquire}: {onEnquire: (summary: string) => void}) {
  const [price, setPrice] = useState(325_000);
  const [tenure, setTenure] = useState<Tenure>('freehold');
  const [mortgage, setMortgage] = useState(true);
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(false);

  const input = {price, tenure, mortgage, firstTimeBuyer};
  const estimate = useMemo(
    () => estimateConveyancing({price, tenure, mortgage, firstTimeBuyer}),
    [price, tenure, mortgage, firstTimeBuyer],
  );
  const fees = estimate.lines.filter(l => l.group === 'fee');
  const disb = estimate.lines.filter(l => l.group === 'disbursement');

  return (
    <SectionShell
      id="conveyancing"
      tone="deep"
      eyebrow="II. Fixed-fee conveyancing"
      title="Know the cost of your purchase before you begin"
      lead="Enter a few details to see an itemised fixed-fee estimate for buying a home in England or Wales. All figures are illustrative samples.">
      <div className={styles.estimatorGrid}>
        <form className={styles.panel} aria-label="Conveyancing estimate inputs" onSubmit={e => e.preventDefault()} noValidate>
          <VStack gap={6}>
            <NumberInput
              label="Purchase price"
              description={`Between ${formatGBP(PRICE_LIMITS.min)} and ${formatGBP(PRICE_LIMITS.max)}. Updates when you leave the field or press Enter.`}
              value={price}
              onChange={v => setPrice(clampPrice(v))}
              min={PRICE_LIMITS.min}
              max={PRICE_LIMITS.max}
              step={PRICE_LIMITS.step}
              isIntegerOnly
              hasNumberSteppers
              formatValue={v => formatGBP(v)}
              width="100%"
            />
            <VStack gap={2}>
              <Text as="p" className={styles.fieldLabel} id="tenure-label">
                Tenure
              </Text>
              <SegmentedControl label="Tenure" value={tenure} onChange={v => setTenure(v as Tenure)} layout="fill">
                <SegmentedControlItem value="freehold" label="Freehold" />
                <SegmentedControlItem value="leasehold" label="Leasehold" />
              </SegmentedControl>
              <Text as="p" type="supporting">
                Leasehold purchases need extra work on the lease and management pack.
              </Text>
            </VStack>
            <RadioList
              label="Are you buying with a mortgage?"
              orientation="horizontal"
              value={mortgage ? 'yes' : 'no'}
              onChange={v => setMortgage(v === 'yes')}>
              <RadioListItem value="yes" label="Yes" />
              <RadioListItem value="no" label="No, a cash purchase" />
            </RadioList>
            <CheckboxInput
              label="I am a first-time buyer"
              description="Applies a sample saving on the legal fee."
              value={firstTimeBuyer}
              onChange={checked => setFirstTimeBuyer(checked)}
            />
          </VStack>
        </form>

        <section className={styles.quote} aria-labelledby="quote-heading">
          <header className={styles.quoteHead}>
            <VStack gap={1}>
              <span className={styles.quoteMark}>Marlowe &amp; Pike</span>
              <Heading level={3} id="quote-heading" className={styles.quoteTitle}>
                Fee estimate
              </Heading>
            </VStack>
            <span className={styles.sampleStamp}>Sample figures</span>
          </header>
          <table className={styles.quoteTable}>
            <caption className={styles.srOnly}>Itemised sample conveyancing estimate</caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col" className={styles.amount}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {fees.map(l => (
                <tr key={l.id} className={l.amount < 0 ? styles.savingRow : undefined}>
                  <th scope="row">
                    <span className={styles.lineLabel}>{l.label}</span>
                    <span className={styles.lineDetail}>{l.detail}</span>
                  </th>
                  <td className={styles.amount}>{signed(l.amount)}</td>
                </tr>
              ))}
              <tr className={styles.subRow}>
                <th scope="row">VAT at 20% on fees</th>
                <td className={styles.amount}>{formatGBP(estimate.vat)}</td>
              </tr>
              <tr className={styles.groupRow}>
                <th scope="row" colSpan={2}>
                  Disbursements (paid to third parties, no VAT)
                </th>
              </tr>
              {disb.map(l => (
                <tr key={l.id}>
                  <th scope="row">
                    <span className={styles.lineLabel}>{l.label}</span>
                    <span className={styles.lineDetail}>{l.detail}</span>
                  </th>
                  <td className={styles.amount}>{formatGBP(l.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Estimated total</th>
                <td className={`${styles.amount} ${styles.total}`} data-testid="quote-total">
                  {formatGBP(estimate.total)}
                </td>
              </tr>
            </tfoot>
          </table>
          <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
            Estimated total {formatGBP(estimate.total)}, including VAT and disbursements.
          </p>
          <p className={styles.quoteNote}>
            Excludes Stamp Duty Land Tax, which depends on your circumstances and current government rates. Sample pricing
            for a fictional firm: this is not a quote and not legal advice.
          </p>
          <div>
            <Button label="Enquire about this estimate" variant="primary" onClick={() => onEnquire(summariseQuote(input, estimate))} />
          </div>
        </section>
      </div>
    </SectionShell>
  );
}
