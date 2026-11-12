import {describe, expect, it} from 'vitest';
import {tiers} from './data';
import {formatDollars, priceFor} from './pricing';

describe('priceFor', () => {
  it('returns the monthly price unchanged for monthly billing', () => {
    expect(priceFor({monthly: 89}, 'monthly')).toEqual({perMonth: 89, billed: 89, period: 'month', annualSaving: 0});
  });

  it('charges 10 months for an annual plan', () => {
    expect(priceFor({monthly: 89}, 'annual')).toEqual({perMonth: 74, billed: 890, period: 'year', annualSaving: 178});
  });

  it('makes every tier cheaper per month when paid annually', () => {
    for (const tier of tiers) {
      expect(priceFor(tier, 'annual').perMonth).toBeLessThan(priceFor(tier, 'monthly').perMonth);
    }
  });

  it('formats dollars with separators', () => {
    expect(formatDollars(1590)).toBe('$1,590');
  });
});
