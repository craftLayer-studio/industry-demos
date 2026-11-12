import {ANNUAL_MONTHS_CHARGED, type Billing, type Tier} from './data';

export type TierPrice = {
  /** Effective price per month, rounded to whole dollars. */
  perMonth: number;
  /** Amount charged each billing period. */
  billed: number;
  period: 'month' | 'year';
  /** Saving compared with paying monthly for 12 months (0 for monthly). */
  annualSaving: number;
};

export function priceFor(tier: Pick<Tier, 'monthly'>, billing: Billing): TierPrice {
  if (billing === 'monthly') {
    return {perMonth: tier.monthly, billed: tier.monthly, period: 'month', annualSaving: 0};
  }
  const billed = tier.monthly * ANNUAL_MONTHS_CHARGED;
  return {
    perMonth: Math.round(billed / 12),
    billed,
    period: 'year',
    annualSaving: tier.monthly * 12 - billed,
  };
}

export function formatDollars(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}
