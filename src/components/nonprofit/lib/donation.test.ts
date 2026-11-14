import {describe, expect, it} from 'vitest';
import {
  allocate,
  EMPTY_DONATION,
  formatMoney,
  ILLUSTRATIVE_SPLIT,
  parseAmount,
  selectedAmount,
  validateDonation,
  yearlyTotal,
} from './donation';

describe('parseAmount', () => {
  it('accepts whole numbers, cents, a leading $ and thousands separators', () => {
    expect(parseAmount('25')).toEqual({ok: true, value: 25});
    expect(parseAmount(' $12.50 ')).toEqual({ok: true, value: 12.5});
    expect(parseAmount('1,000')).toEqual({ok: true, value: 1000});
  });

  it('rejects empty, non-numeric, negative and over-precise input', () => {
    expect(parseAmount('')).toMatchObject({ok: false, error: 'Enter an amount.'});
    expect(parseAmount('ten')).toMatchObject({ok: false});
    expect(parseAmount('-5')).toMatchObject({ok: false});
    expect(parseAmount('10.555')).toMatchObject({ok: false});
    expect(parseAmount('1e3')).toMatchObject({ok: false});
  });

  it('enforces the minimum and maximum sample gift', () => {
    expect(parseAmount('1.99')).toMatchObject({ok: false, error: 'The smallest sample gift is $2.'});
    expect(parseAmount('2')).toEqual({ok: true, value: 2});
    expect(parseAmount('5000')).toEqual({ok: true, value: 5000});
    expect(parseAmount('5000.01')).toMatchObject({ok: false, error: 'The largest sample gift is $5,000.'});
  });
});

describe('monthly maths', () => {
  it('multiplies a monthly gift by twelve and leaves a one-off gift alone', () => {
    expect(yearlyTotal(10, 'monthly')).toBe(120);
    expect(yearlyTotal(12.5, 'monthly')).toBe(150);
    expect(yearlyTotal(0.1, 'monthly')).toBe(1.2);
    expect(yearlyTotal(30, 'once')).toBe(30);
  });

  it('formats money with cents only when needed', () => {
    expect(formatMoney(30)).toBe('$30');
    expect(formatMoney(12.5)).toBe('$12.50');
    expect(formatMoney(1200)).toBe('$1,200');
  });
});

describe('illustrative allocation', () => {
  it('uses percentages that total 100', () => {
    expect(ILLUSTRATIVE_SPLIT.reduce((a, s) => a + s.percent, 0)).toBe(100);
  });

  it('splits an amount so the rounded parts add up exactly', () => {
    for (const amount of [30, 12.5, 7.77, 2, 4999.99]) {
      const parts = allocate(amount);
      const cents = parts.reduce((a, p) => a + Math.round(p.amount * 100), 0);
      expect(cents).toBe(Math.round(amount * 100));
    }
    expect(allocate(60).map(p => p.amount)).toEqual([30, 12, 9, 6, 3]);
  });
});

describe('validateDonation', () => {
  it('requires a name and a valid email', () => {
    expect(validateDonation(EMPTY_DONATION)).toEqual({
      name: 'Enter your name.',
      email: 'Enter your email address.',
    });
    expect(validateDonation({...EMPTY_DONATION, name: 'Ari', email: 'ari@'}).email).toMatch(/name@example.com/);
  });

  it('validates a custom amount only when custom is chosen', () => {
    const base = {...EMPTY_DONATION, name: 'Ari Example', email: 'ari@example.com'};
    expect(validateDonation(base)).toEqual({});
    expect(validateDonation({...base, preset: 'custom', custom: '0.5'}).custom).toMatch(/smallest/);
    expect(validateDonation({...base, preset: 'custom', custom: '45'})).toEqual({});
    expect(selectedAmount({...base, preset: 'custom', custom: '45'})).toBe(45);
    expect(selectedAmount({...base, preset: 'custom', custom: 'x'})).toBeNull();
    expect(selectedAmount(base)).toBe(30);
  });

  it('requires an honouree when a dedication is on and limits the note', () => {
    const base = {...EMPTY_DONATION, name: 'Ari Example', email: 'ari@example.com', hasDedication: true};
    expect(validateDonation(base).dedicationName).toMatch(/in honour of/);
    expect(validateDonation({...base, dedicationName: 'Gran', dedicationNote: 'x'.repeat(121)}).dedicationNote).toMatch(
      /120/,
    );
    expect(validateDonation({...base, dedicationName: 'Gran', dedicationNote: 'With love'})).toEqual({});
  });
});
