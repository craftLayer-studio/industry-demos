import {describe, expect, it} from 'vitest';
import {
  clampPrice,
  estimateConveyancing,
  formatGBP,
  legalFeeFor,
  PRICE_LIMITS,
  registrationFeeFor,
  type ConveyancingInput,
} from './conveyancing';

const base: ConveyancingInput = {price: 300_000, tenure: 'freehold', mortgage: false, firstTimeBuyer: false};

describe('conveyancing estimator', () => {
  it('bands the legal fee by price, inclusive of the upper bound', () => {
    expect(legalFeeFor(250_000)).toBe(950);
    expect(legalFeeFor(250_001)).toBe(1150);
    expect(legalFeeFor(500_000)).toBe(1150);
    expect(legalFeeFor(1_000_000)).toBe(1450);
    expect(legalFeeFor(2_000_000)).toBe(1850);
  });

  it('bands the registration fee by price', () => {
    expect(registrationFeeFor(200_000)).toBe(95);
    expect(registrationFeeFor(300_000)).toBe(150);
    expect(registrationFeeFor(900_000)).toBe(295);
    expect(registrationFeeFor(1_500_000)).toBe(500);
  });

  it('prices a simple freehold purchase with VAT on fees only', () => {
    const e = estimateConveyancing(base);
    expect(e.lines.map(l => l.id)).toEqual(['legal-fee', 'id-checks', 'searches', 'registration', 'transfer']);
    expect(e.feeSubtotal).toBe(1180);
    expect(e.vat).toBe(236);
    expect(e.disbursements).toBe(320 + 150 + 40);
    expect(e.total).toBe(1180 + 236 + 510);
  });

  it('adds leasehold and mortgage supplements and the first-time buyer saving', () => {
    const e = estimateConveyancing({...base, tenure: 'leasehold', mortgage: true, firstTimeBuyer: true});
    const ids = e.lines.map(l => l.id);
    expect(ids).toContain('leasehold');
    expect(ids).toContain('mortgage');
    expect(e.lines.find(l => l.id === 'first-time')?.amount).toBe(-100);
    expect(e.feeSubtotal).toBe(1150 + 350 + 150 - 100 + 30);
    expect(e.vat).toBe(Math.round(e.feeSubtotal * 0.2 * 100) / 100);
    expect(e.total).toBe(e.feeSubtotal + e.vat + e.disbursements);
  });

  it('clamps out-of-range and invalid prices', () => {
    expect(clampPrice(10)).toBe(PRICE_LIMITS.min);
    expect(clampPrice(9_000_000)).toBe(PRICE_LIMITS.max);
    expect(clampPrice(Number.NaN)).toBe(PRICE_LIMITS.min);
    expect(clampPrice(123_456.7)).toBe(123_457);
    expect(estimateConveyancing({...base, price: 1}).lines[0].amount).toBe(950);
  });

  it('formats pounds, with pence only when needed', () => {
    expect(formatGBP(1180)).toBe('£1,180');
    expect(formatGBP(236.5)).toBe('£236.50');
  });
});
