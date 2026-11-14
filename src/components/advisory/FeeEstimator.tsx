'use client';

import {useMemo, useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Button} from '@astryxdesign/core/Button';
import {Selector} from '@astryxdesign/core/Selector';
import {Slider} from '@astryxdesign/core/Slider';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {CheckboxList, CheckboxListItem} from '@astryxdesign/core/CheckboxList';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {SectionShell} from './SectionShell';
import {
  BUSINESS_TYPES,
  clampInt,
  estimateFees,
  formatMoney,
  INCLUDED_TRANSACTIONS,
  LIMITS,
  SERVICE_PRICES,
  type Billing,
  type BusinessType,
  type Estimate,
  type ServiceId,
} from './lib/fees';
import styles from './advisory.module.css';

export type EstimateHandoff = {
  services: ServiceId[];
  employees: number;
  summary: string;
};

const SERVICE_HINTS: Record<ServiceId, string> = {
  bookkeeping: 'Monthly reconciliations and close',
  'year-end': 'Annual statements and filing calendar',
  tax: 'Planning sessions and deadline tracking',
  payroll: 'Priced per employee',
  fundraising: 'Model, data room and preparation',
  cfo: 'Senior finance support, part-time',
};

export function summariseEstimate(e: Estimate): string {
  const per = formatMoney(e.monthlyTotal);
  return e.billing === 'annual'
    ? `${per} a month, billed annually (${formatMoney(e.annualTotal)} a year)`
    : `${per} a month, billed monthly`;
}

export function FeeEstimator({onDiscuss}: {onDiscuss: (handoff: EstimateHandoff) => void}) {
  const [businessType, setBusinessType] = useState<BusinessType>('services');
  const [transactions, setTransactions] = useState(250);
  const [employees, setEmployees] = useState(4);
  const [services, setServices] = useState<ServiceId[]>(['bookkeeping', 'year-end', 'payroll']);
  const [billing, setBilling] = useState<Billing>('monthly');

  const estimate = useMemo(
    () => estimateFees({businessType, transactions, employees, services, billing}),
    [businessType, transactions, employees, services, billing],
  );
  const hasServices = estimate.lines.length > 0;
  const summary = hasServices ? summariseEstimate(estimate) : 'No services chosen yet';

  return (
    <SectionShell
      id="estimate"
      tone="paper"
      eyebrow="Fee estimator"
      title="Estimate your monthly fee"
      lead="Fees are fixed and agreed up front. Adjust the inputs to see an itemised estimate using illustrative sample pricing.">
      <div className={styles.estimatorGrid}>
        <form className={styles.panel} aria-label="Fee estimator inputs" onSubmit={e => e.preventDefault()} noValidate>
          <VStack gap={6}>
            <Selector
              label="Business type"
              description="Some types need more reconciliation and reporting work."
              options={BUSINESS_TYPES.map(t => ({value: t.value, label: t.label, description: t.description}))}
              value={businessType}
              onChange={v => setBusinessType(v as BusinessType)}
              width="100%"
            />
            <Slider
              label="Monthly transactions"
              description={`Bank and card lines a month. The first ${INCLUDED_TRANSACTIONS} are included in bookkeeping.`}
              value={transactions}
              onChange={(v: number) => setTransactions(v)}
              min={LIMITS.transactions.min}
              max={LIMITS.transactions.max}
              step={LIMITS.transactions.step}
              valueDisplay="text"
              formatValue={(v: number) => (v >= LIMITS.transactions.max ? `${v.toLocaleString('en-US')}+` : v.toLocaleString('en-US'))}
              width="100%"
            />
            <NumberInput
              label="Number of employees"
              description="People on payroll, including directors who are paid through it."
              value={employees}
              onChange={v => setEmployees(clampInt(v ?? 0, LIMITS.employees.min, LIMITS.employees.max))}
              min={LIMITS.employees.min}
              max={LIMITS.employees.max}
              isIntegerOnly
              hasNumberSteppers
              width="100%"
            />
            <CheckboxList
              label="Services needed"
              description="Choose one or more."
              value={services}
              onChange={v => setServices(v as ServiceId[])}
              status={services.length === 0 ? {type: 'warning', message: 'Choose at least one service to see an estimate.'} : undefined}>
              {SERVICE_PRICES.map(s => (
                <CheckboxListItem key={s.id} value={s.id} label={s.label} description={SERVICE_HINTS[s.id]} />
              ))}
            </CheckboxList>
            <VStack gap={2}>
              <Text as="p" className={styles.fieldLabel} id="billing-label">
                Billing
              </Text>
              <SegmentedControl label="Billing" value={billing} onChange={v => setBilling(v as Billing)} layout="fill">
                <SegmentedControlItem value="monthly" label="Monthly" />
                <SegmentedControlItem value="annual" label="Annual, save 10%" />
              </SegmentedControl>
            </VStack>
          </VStack>
        </form>

        <div className={styles.receiptSticky}>
          <section className={styles.receipt} aria-labelledby="receipt-heading">
            <VStack gap={1}>
              <Heading level={3} id="receipt-heading" className={styles.areaTitle}>
                Your estimate
              </Heading>
              <Text as="p" className={styles.sampleTag}>
                Illustrative sample pricing
              </Text>
            </VStack>

            {hasServices ? (
              <table className={styles.receiptTable}>
                <caption className={styles.liveRegion}>Itemised monthly estimate</caption>
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col" className={styles.amount}>
                      Per month
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {estimate.lines.map(line => (
                    <tr key={line.id} className={line.id === 'discount' ? styles.discountRow : undefined}>
                      <th scope="row">
                        <span className={styles.lineLabel}>{line.label}</span>
                        <span className={styles.lineDetail}>{line.detail}</span>
                      </th>
                      <td className={styles.amount}>{formatMoney(line.monthly)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row" className={styles.totalLabel}>
                      Estimated total
                      <span className={styles.lineDetail}>
                        {billing === 'annual' ? 'Per month, billed annually' : 'Per month, billed monthly'}
                      </span>
                    </th>
                    <td className={`${styles.amount} ${styles.total}`} data-testid="estimate-total">
                      {formatMoney(estimate.monthlyTotal)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p className={styles.emptyReceipt}>Choose at least one service to see an itemised estimate.</p>
            )}

            {hasServices ? (
              <Text as="p" className={styles.annualNote}>
                <span className={styles.tnum}>{formatMoney(estimate.annualTotal)}</span> over twelve months
                {estimate.discount > 0 ? (
                  <>
                    , including <span className={styles.tnum}>{formatMoney(estimate.discount * 12)}</span> saved by
                    paying annually
                  </>
                ) : null}
                .
              </Text>
            ) : null}

            <p className={styles.liveRegion} aria-live="polite" aria-atomic="true">
              Estimated total: {summary}.
            </p>

            <HStack gap={3} wrap="wrap">
              <Button
                label="Discuss this estimate"
                variant="primary"
                isDisabled={!hasServices}
                onClick={() => onDiscuss({services, employees, summary})}
              />
            </HStack>

            <Text as="p" className={styles.illustrative}>
              Illustrative sample pricing for a fictional firm. This is not a quote, and real fees depend on a scoping
              conversation. Nothing on this page is tax or financial advice.
            </Text>
          </section>
        </div>
      </div>
    </SectionShell>
  );
}
