'use client';

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Slider} from '@astryxdesign/core/Slider';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {Banner} from '@astryxdesign/core/Banner';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {SectionShell} from './SectionShell';
import {useEstate} from './EstateProvider';
import {DEFAULT_MORTGAGE, LIMITS, estimateMortgage, suggestedDeposit, validateMortgage, type MortgageInput} from './lib/mortgage';
import {formatGBP, formatGBPPence} from './lib/format';
import styles from './ashgrove.module.css';

const DEPOSIT_SHARES = ['10', '20', '30', '40'];

function errorStatus(message: string | undefined) {
  return message ? ({type: 'error', message} as const) : undefined;
}

export function Mortgage() {
  const {estimateRequest} = useEstate();
  const [input, setInput] = useState<MortgageInput>(DEFAULT_MORTGAGE);
  const [seenNonce, setSeenNonce] = useState(0);

  // A listing's "Estimate repayments" hands over its price (adjust state during render).
  if (estimateRequest && estimateRequest.nonce !== seenNonce) {
    setSeenNonce(estimateRequest.nonce);
    setInput(i => ({...i, price: estimateRequest.price, deposit: suggestedDeposit(estimateRequest.price)}));
  }

  const errors = validateMortgage(input);
  const result = estimateMortgage(input);
  const depositShare = input.price > 0 ? Math.round((input.deposit / input.price) * 100) : 0;
  const roundedShare = (price: number, pct: number) => Math.round((price * pct) / 100 / 1000) * 1000;
  const share = DEPOSIT_SHARES.find(s => roundedShare(input.price, Number(s)) === input.deposit) ?? '';
  const principalPct = result ? (result.loan / result.totalRepaid) * 100 : 0;

  return (
    <SectionShell
      id="mortgage"
      tone="paper"
      eyebrow="Repayment estimator"
      title="What might the monthly repayments look like?"
      lead="Change the price, deposit, term and an interest rate of your choosing to see an illustrative monthly figure for a repayment mortgage.">
      <div className={styles.mortgageGrid}>
        <Card padding={6} className={styles.mortgageInputs}>
          <form noValidate onSubmit={e => e.preventDefault()} aria-label="Repayment estimator inputs">
            <VStack gap={5}>
              <NumberInput
                label="Property price"
                value={input.price}
                onChange={price => setInput(i => ({...i, price}))}
                min={LIMITS.priceMin}
                max={LIMITS.priceMax}
                step={5000}
                isIntegerOnly
                formatValue={v => formatGBP(v)}
                status={errorStatus(errors.price)}
                statusVariant="detached"
                width="100%"
              />
              <NumberInput
                label="Deposit"
                description={`${depositShare}% of the price`}
                value={input.deposit}
                onChange={deposit => setInput(i => ({...i, deposit}))}
                min={0}
                step={1000}
                isIntegerOnly
                formatValue={v => formatGBP(v)}
                status={errorStatus(errors.deposit)}
                statusVariant="detached"
                width="100%"
              />
              <VStack gap={2}>
                <Text type="label" as="p">
                  Quick deposit
                </Text>
                <SegmentedControl
                  label="Quick deposit as a share of the price"
                  value={share}
                  layout="fill"
                  size="sm"
                  onChange={v =>
                    setInput(i => ({...i, deposit: roundedShare(i.price, Number(v))}))
                  }>
                  {DEPOSIT_SHARES.map(s => (
                    <SegmentedControlItem key={s} value={s} label={`${s}%`} />
                  ))}
                </SegmentedControl>
              </VStack>
              <Slider
                label="Mortgage term"
                value={input.termYears}
                onChange={(termYears: number) => setInput(i => ({...i, termYears}))}
                min={LIMITS.termMin}
                max={LIMITS.termMax}
                step={1}
                valueDisplay="text"
                formatValue={v => `${v} years`}
                marks={[
                  {value: 5, label: '5'},
                  {value: 25, label: '25'},
                  {value: 40, label: '40'},
                ]}
                width="100%"
                containerClassName={styles.sliderField}
              />
              <NumberInput
                label="Illustrative interest rate"
                description="Pick any rate to compare. This is not a quoted or current rate."
                value={input.ratePercent}
                onChange={ratePercent => setInput(i => ({...i, ratePercent}))}
                min={LIMITS.rateMin}
                max={LIMITS.rateMax}
                step={0.05}
                units="%"
                hasNumberSteppers
                status={errorStatus(errors.ratePercent)}
                statusVariant="detached"
                width="100%"
              />
            </VStack>
          </form>
        </Card>

        <Card padding={6} className={styles.mortgageResult}>
          <VStack gap={5}>
            <VStack gap={1}>
              <Text type="label" color="secondary" as="p">
                Illustrative monthly repayment
              </Text>
              <p className={styles.mortgageFigure} aria-live="polite" aria-atomic="true">
                {result ? formatGBPPence(result.monthly) : '—'}
                <span className={styles.mortgagePer}>{result ? ' a month' : ' Check the highlighted inputs'}</span>
              </p>
            </VStack>
            {result ? (
              <>
                <div className={styles.repayBar} aria-hidden="true">
                  <span className={styles.repayPrincipal} style={{width: `${principalPct}%`}} />
                  <span className={styles.repayInterest} />
                </div>
                <ul className={styles.repayLegend} aria-label="Split of the total repaid">
                  <li>
                    <span className={styles.swatchPrincipal} aria-hidden="true" />
                    Borrowed {formatGBP(result.loan)}
                  </li>
                  <li>
                    <span className={styles.swatchInterest} aria-hidden="true" />
                    Interest {formatGBP(result.totalInterest)}
                  </li>
                </ul>
                <MetadataList columns="multi">
                  <MetadataListItem label="Loan amount">{formatGBP(result.loan)}</MetadataListItem>
                  <MetadataListItem label="Loan to value">{result.ltv.toFixed(1)}%</MetadataListItem>
                  <MetadataListItem label="Number of payments">{result.months}</MetadataListItem>
                  <MetadataListItem label="Total repaid">{formatGBP(result.totalRepaid)}</MetadataListItem>
                </MetadataList>
              </>
            ) : null}
            <Banner
              status="warning"
              title="Illustrative only, not financial advice"
              description="A fixed rate for the whole term, with no fees, product changes or lender checks. Real offers depend on your circumstances; speak to a qualified, regulated adviser."
            />
          </VStack>
        </Card>
      </div>
    </SectionShell>
  );
}
