import {describe, expect, it} from 'vitest';
import {categories, faqs, team, treatments} from './data';
import {countLabel, filterTreatments} from './filter';
import {formatMoney, formatRange} from './format';
import {
  APR_OPTIONS,
  TERM_MARKS,
  aprAllowedForTerm,
  estimate,
  monthlyPayment,
  monthlyRate,
  startingCostFor,
  validateEstimate,
} from './finance';
import {
  EMPTY_FORM,
  MESSAGE_MAX,
  firstError,
  validateConsultation,
  validateEmail,
  validateName,
  validatePhone,
} from './validation';

const interests = treatments.map(t => t.id);

describe('data', () => {
  it('has at least two treatments in every category', () => {
    for (const c of categories) {
      expect(treatments.filter(t => t.category === c.id).length).toBeGreaterThanOrEqual(2);
    }
  });
  it('has valid, ordered price ranges', () => {
    for (const t of treatments) {
      expect(t.priceFrom).toBeGreaterThanOrEqual(0);
      expect(t.priceTo).toBeGreaterThanOrEqual(t.priceFrom);
    }
  });
  it('uses unique treatment ids', () => {
    expect(new Set(interests).size).toBe(interests.length);
  });
  it('never uses trademarked aligner brand names', () => {
    const text = JSON.stringify({treatments, faqs, team}).toLowerCase();
    expect(text).not.toMatch(/invisalign|clearcorrect|smile ?direct/);
  });
  it('does not invent qualifications or registration numbers', () => {
    const text = JSON.stringify(team);
    expect(text).not.toMatch(/\b(BDS|GDC|MSc|MJDF|registration|award)\b/i);
  });
});

describe('filterTreatments', () => {
  it('returns everything for all', () => {
    expect(filterTreatments(treatments, 'all')).toEqual(treatments);
  });
  it('returns only the chosen category, in order', () => {
    const list = filterTreatments(treatments, 'implants');
    expect(list.length).toBeGreaterThan(0);
    expect(list.every(t => t.category === 'implants')).toBe(true);
    expect(list).toEqual(treatments.filter(t => t.category === 'implants'));
  });
  it('labels counts', () => {
    expect(countLabel(1)).toBe('1 treatment');
    expect(countLabel(3)).toBe('3 treatments');
  });
});

describe('format', () => {
  it('formats ranges', () => {
    expect(formatRange(70, 110)).toBe('£70 to £110');
    expect(formatRange(0, 50)).toBe('Free to £50');
    expect(formatRange(95, 95)).toBe('£95');
  });
  it('formats money with pence', () => {
    expect(formatMoney(1234.5)).toBe('£1,234.50');
  });
});

describe('finance', () => {
  it('has the two sample APR options', () => {
    expect(APR_OPTIONS.map(o => o.rate)).toEqual([0, 9.9]);
  });
  it('builds term marks from 6 to 36 months', () => {
    expect(TERM_MARKS).toEqual([6, 12, 18, 24, 30, 36]);
  });
  it('computes a monthly rate from an effective APR', () => {
    expect(monthlyRate(0)).toBe(0);
    expect(Math.pow(1 + monthlyRate(9.9), 12) - 1).toBeCloseTo(0.099, 10);
  });
  it('divides evenly at 0% APR', () => {
    expect(monthlyPayment(1200, 0, 12)).toBe(100);
  });
  it('matches the annuity formula at 9.9% APR', () => {
    // £2,000 over 24 months at 9.9% APR (effective): about £91.81 a month.
    expect(monthlyPayment(2000, 9.9, 24)).toBeCloseTo(91.81, 2);
  });
  it('returns 0 for no principal', () => {
    expect(monthlyPayment(0, 9.9, 12)).toBe(0);
  });
  it('produces a consistent breakdown', () => {
    const e = estimate({cost: 3000, deposit: 500, termMonths: 24, aprPercent: 9.9});
    expect(e).not.toBeNull();
    expect(e!.financed).toBe(2500);
    expect(e!.payments).toBe(24);
    expect(e!.totalRepayable).toBeCloseTo(e!.monthly * 24, 2);
    expect(e!.totalInterest).toBeCloseTo(e!.totalRepayable - 2500, 2);
    expect(e!.totalCost).toBeCloseTo(e!.totalRepayable + 500, 2);
    expect(e!.totalInterest).toBeGreaterThan(0);
  });
  it('has no interest at 0% APR', () => {
    const e = estimate({cost: 1800, deposit: 0, termMonths: 12, aprPercent: 0});
    expect(e).toMatchObject({financed: 1800, monthly: 150, totalInterest: 0, totalRepayable: 1800, totalCost: 1800});
  });
  it('only allows 0% APR up to 12 months', () => {
    expect(aprAllowedForTerm(0, 12)).toBe(true);
    expect(aprAllowedForTerm(0, 18)).toBe(false);
    expect(aprAllowedForTerm(9.9, 36)).toBe(true);
    expect(validateEstimate({cost: 2000, deposit: 0, termMonths: 24, aprPercent: 0}).apr).toMatch(/12 months/);
  });
  it('validates cost, deposit, term and APR', () => {
    expect(validateEstimate({cost: 100, deposit: 0, termMonths: 12, aprPercent: 0}).cost).toBeDefined();
    expect(validateEstimate({cost: 25000, deposit: 0, termMonths: 12, aprPercent: 0}).cost).toBeDefined();
    expect(validateEstimate({cost: 2000, deposit: -1, termMonths: 12, aprPercent: 0}).deposit).toBeDefined();
    expect(validateEstimate({cost: 2000, deposit: 1900, termMonths: 12, aprPercent: 0}).deposit).toMatch(/at least £250/);
    expect(validateEstimate({cost: 2000, deposit: 0, termMonths: 7, aprPercent: 9.9}).term).toBeDefined();
    expect(validateEstimate({cost: 2000, deposit: 0, termMonths: 48, aprPercent: 9.9}).term).toBeDefined();
    expect(validateEstimate({cost: 2000, deposit: 0, termMonths: 12, aprPercent: 5}).apr).toBeDefined();
    expect(validateEstimate({cost: 2000, deposit: 0, termMonths: 12, aprPercent: 9.9})).toEqual({});
    expect(estimate({cost: 100, deposit: 0, termMonths: 12, aprPercent: 0})).toBeNull();
  });
  it('picks a clamped starting cost for a treatment', () => {
    expect(startingCostFor(1500, 2500)).toBe(2000);
    expect(startingCostFor(65, 95)).toBe(250);
  });
});

describe('consultation validation', () => {
  const valid = {
    ...EMPTY_FORM,
    name: 'Alex Example',
    email: 'alex@example.com',
    interest: 'check-up',
    consent: true,
  };
  it('accepts a valid form', () => {
    expect(validateConsultation(valid, interests)).toEqual({});
  });
  it('reports every missing required field', () => {
    const errors = validateConsultation(EMPTY_FORM, interests);
    expect(Object.keys(errors).sort()).toEqual(['consent', 'email', 'interest', 'name']);
    expect(firstError(errors)).toBe('name');
  });
  it('validates names and emails', () => {
    expect(validateName(' ')).toBeDefined();
    expect(validateName('A')).toBeDefined();
    expect(validateName('Al')).toBeUndefined();
    expect(validateEmail('nope')).toBeDefined();
    expect(validateEmail('a@b.co')).toBeUndefined();
  });
  it('requires a phone number only for phone contact', () => {
    expect(validatePhone('', false)).toBeUndefined();
    expect(validatePhone('', true)).toBeDefined();
    expect(validatePhone('abc', false)).toBeDefined();
    expect(validatePhone('0161 555 0100', true)).toBeUndefined();
    expect(validateConsultation({...valid, contactMethod: 'phone'}, interests).phone).toBeDefined();
  });
  it('rejects unknown interests and long messages', () => {
    expect(validateConsultation({...valid, interest: 'nope'}, interests).interest).toBeDefined();
    expect(validateConsultation({...valid, message: 'x'.repeat(MESSAGE_MAX + 1)}, interests).message).toBeDefined();
  });
});
