'use client';

import {useEffect, useImperativeHandle, useRef, useState, type Ref} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Slider} from '@astryxdesign/core/Slider';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {Banner} from '@astryxdesign/core/Banner';
import {SectionShell} from './SectionShell';
import type {Treatment} from './lib/data';
import {
  APR_OPTIONS,
  MAX_COST,
  MAX_TERM,
  MIN_COST,
  MIN_TERM,
  TERM_MARKS,
  TERM_STEP,
  ZERO_APR_MAX_TERM,
  aprAllowedForTerm,
  estimate,
  startingCostFor,
  validateEstimate,
} from './lib/finance';
import {formatMoney, formatPounds} from './lib/format';
import styles from './dental.module.css';

export type EstimatorHandle = {startWith: (t: Treatment) => void};

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

export function Estimator({ref}: {ref?: Ref<EstimatorHandle>}) {
  const [cost, setCost] = useState(3000);
  const [deposit, setDeposit] = useState(300);
  const [term, setTerm] = useState(12);
  const [aprId, setAprId] = useState<string>('0');
  const [context, setContext] = useState<string | null>(null);
  const [aprNote, setAprNote] = useState<string | null>(null);
  const [jump, setJump] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const aprPercent = APR_OPTIONS.find(o => o.id === aprId)?.rate ?? 9.9;
  const input = {cost, deposit, termMonths: term, aprPercent};
  const errors = validateEstimate(input);
  const result = estimate(input);

  useImperativeHandle(ref, () => ({
    startWith(t: Treatment) {
      const c = startingCostFor(t.priceFrom, t.priceTo);
      setCost(c);
      setDeposit(Math.round(c * 0.1));
      setContext(t.name);
      setJump(j => j + 1);
    },
  }));

  useEffect(() => {
    if (jump === 0) return;
    const section = document.getElementById('payments');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section?.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
    headingRef.current?.focus({preventScroll: true});
  }, [jump]);

  function changeTerm(next: number) {
    setTerm(next);
    if (!aprAllowedForTerm(aprPercent, next)) {
      setAprId('9.9');
      setAprNote(`The sample 0% option is only illustrated up to ${ZERO_APR_MAX_TERM} months, so the estimate switched to 9.9% APR.`);
    } else if (next <= ZERO_APR_MAX_TERM) {
      setAprNote(null);
    }
  }

  function changeApr(next: string) {
    setAprId(next);
    setAprNote(null);
  }

  return (
    <SectionShell
      id="payments"
      tone="ice"
      eyebrow="Payments"
      title="Estimate a monthly payment"
      lead="Spread the cost of a larger treatment over 6 to 36 months. Adjust the numbers to see an illustrative breakdown.">
      <div className={styles.estimatorGrid}>
        <Card padding={6} className={styles.estimatorCard}>
          <VStack gap={5}>
            <h3 ref={headingRef} tabIndex={-1} className={styles.focusHeading}>
              Your numbers
            </h3>
            {context ? (
              <Text as="p" color="secondary">
                Pre-filled from the sample range for <strong>{context}</strong>. Change anything you like.
              </Text>
            ) : null}
            <div className={styles.twoUp}>
              <NumberInput
                label="Treatment cost"
                value={cost}
                onChange={v => {
                  setCost(v ?? 0);
                  setContext(null);
                }}
                min={MIN_COST}
                max={MAX_COST}
                step={50}
                units="£"
                description={`${formatPounds(MIN_COST)} to ${formatPounds(MAX_COST)}`}
                status={errorStatus(errors.cost)}
                hasNumberSteppers
                isWheelEnabled={false}
              />
              <NumberInput
                label="Deposit"
                value={deposit}
                onChange={v => setDeposit(v ?? 0)}
                min={0}
                max={MAX_COST}
                step={50}
                units="£"
                description="Paid up front, can be £0"
                status={errorStatus(errors.deposit)}
                hasNumberSteppers
                isWheelEnabled={false}
              />
            </div>
            <div className={styles.sliderWrap}>
              <Slider
                label="Term"
                value={term}
                onChange={(v: number) => changeTerm(v)}
                min={MIN_TERM}
                max={MAX_TERM}
                step={TERM_STEP}
                marks={TERM_MARKS.map(m => ({value: m, label: `${m}`}))}
                formatValue={(v: number) => `${v} months`}
                valueDisplay="text"
                description="Months, in steps of 6"
              />
            </div>
            <VStack gap={2}>
              <Text weight="semibold">
                Sample APR
              </Text>
              <SegmentedControl value={aprId} onChange={changeApr} label="Sample APR" layout="fill">
                {APR_OPTIONS.map(o => (
                  <SegmentedControlItem
                    key={o.id}
                    value={o.id}
                    label={o.id === '0' ? '0% APR' : '9.9% APR'}
                    isDisabled={o.rate === 0 && term > ZERO_APR_MAX_TERM}
                  />
                ))}
              </SegmentedControl>
              <Text type="supporting" color="secondary">
                0% is illustrated for terms up to {ZERO_APR_MAX_TERM} months only.
              </Text>
              <p className={styles.inlineNote} aria-live="polite">
                {aprNote ?? errors.apr ?? ''}
              </p>
            </VStack>
          </VStack>
        </Card>

        <Card padding={6} className={styles.resultCard}>
          <VStack gap={5}>
            <Text type="label" className={styles.resultEyebrow}>
              Illustrative estimate
            </Text>
            <div aria-live="polite" aria-atomic="true" className={styles.resultLive}>
              {result ? (
                <p className={styles.resultFigure}>
                  <span className={styles.resultAmount}>{formatMoney(result.monthly)}</span>
                  <span className={styles.resultPer}>
                    {' '}
                    a month for {result.payments} months at {aprPercent}% APR (sample)
                  </span>
                </p>
              ) : (
                <p className={styles.resultFigure}>
                  <span className={styles.resultPer}>Fix the highlighted fields to see an estimate.</span>
                </p>
              )}
            </div>
            {result ? (
              <MetadataList label={{position: 'start'}}>
                <MetadataListItem label="Amount spread"><span className={styles.nowrap}>{formatMoney(result.financed)}</span></MetadataListItem>
                <MetadataListItem label="Deposit"><span className={styles.nowrap}>{formatMoney(deposit)}</span></MetadataListItem>
                <MetadataListItem label="Total interest"><span className={styles.nowrap}>{formatMoney(result.totalInterest)}</span></MetadataListItem>
                <MetadataListItem label="Total repayable"><span className={styles.nowrap}>{formatMoney(result.totalRepayable)}</span></MetadataListItem>
                <MetadataListItem label="Total cost incl. deposit"><span className={styles.nowrap}>{formatMoney(result.totalCost)}</span></MetadataListItem>
              </MetadataList>
            ) : null}
            <HStack gap={2} className={styles.disclaimer}>
              <Text as="p" type="supporting" color="secondary">
                <strong>Illustrative only, not a credit offer.</strong> Arbour Dental is fictional. No lender is
                involved, no eligibility is checked and nothing is applied for. Rates are samples; real finance would be
                subject to status and a lender&rsquo;s own terms.
              </Text>
            </HStack>
          </VStack>
        </Card>
      </div>
      <Banner
        status="info"
        title="This estimator is a demonstration"
        description="Figures round to the nearest penny and treat the sample APR as an annual effective rate. They are not a quote."
        collapsible={false}
      />
    </SectionShell>
  );
}
