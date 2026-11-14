import {describe, expect, it} from 'vitest';
import {
  ANNUAL_DISCOUNT,
  basePrice,
  clampSeats,
  formatEvents,
  formatUsd,
  getPlan,
  quote,
  recommend,
} from './pricing';
import {buildChart, generateDailySeries, niceBounds, seededRandom, seriesFor, shortDate, weeklyBuckets} from './chart';
import {EMPTY_WAITLIST, firstError, hasErrors, isValidEmail, USE_CASE_MAX, validateWaitlist} from './validation';

describe('pricing', () => {
  it('applies the annual discount to the base price', () => {
    expect(basePrice(getPlan('team'), 'monthly')).toBe(49);
    expect(basePrice(getPlan('team'), 'annual')).toBe(39.2);
    expect(basePrice(getPlan('starter'), 'annual')).toBe(0);
  });

  it('charges only the base when within included limits', () => {
    const q = quote('team', 5, 1_000_000, 'monthly');
    expect(q.isEligible).toBe(true);
    expect(q.extraSeats).toBe(0);
    expect(q.extraEventBlocks).toBe(0);
    expect(q.monthly).toBe(49);
    expect(q.billedAmount).toBe(49);
    expect(q.annualSaving).toBe(0);
  });

  it('adds extra seats and rounds extra events up to whole blocks', () => {
    // 8 seats = 3 extra x $9; 2.5M events = 1.5M over, rounded up to 2 blocks x $8.
    const q = quote('team', 8, 2_500_000, 'monthly');
    expect(q.extraSeats).toBe(3);
    expect(q.extraEventBlocks).toBe(2);
    expect(q.monthly).toBe(49 + 27 + 16);
  });

  it('discounts every line on annual billing and reports the saving', () => {
    const monthly = quote('team', 8, 2_500_000, 'monthly');
    const annual = quote('team', 8, 2_500_000, 'annual');
    expect(annual.monthly).toBeCloseTo(monthly.monthly * (1 - ANNUAL_DISCOUNT), 2);
    expect(annual.billedAmount).toBeCloseTo(annual.monthly * 12, 2);
    expect(annual.annualSaving).toBeCloseTo(monthly.monthly * 12 - annual.monthly * 12, 2);
  });

  it('marks plans ineligible beyond their ceilings', () => {
    expect(quote('starter', 4, 50_000, 'monthly').isEligible).toBe(false);
    expect(quote('starter', 2, 250_000, 'monthly').reason).toMatch(/100k/);
    expect(quote('team', 51, 1_000_000, 'monthly').isEligible).toBe(false);
    expect(quote('scale', 200, 100_000_000, 'monthly').isEligible).toBe(true);
  });

  it('recommends the cheapest eligible plan', () => {
    expect(recommend(2, 100_000, 'monthly').plan).toBe('starter');
    expect(recommend(6, 2_000_000, 'monthly').plan).toBe('team');
    // Team: 49 + 25*9 + 19*8 = 426; Scale: 199 + 15*7 + 10*5 = 354.
    expect(recommend(30, 20_000_000, 'monthly').plan).toBe('scale');
    expect(recommend(60, 1_000_000, 'annual').plan).toBe('scale');
  });

  it('clamps seat input', () => {
    expect(clampSeats(0)).toBe(1);
    expect(clampSeats(4.6)).toBe(5);
    expect(clampSeats(9999)).toBe(200);
    expect(clampSeats(Number.NaN)).toBe(1);
  });

  it('formats events and dollars', () => {
    expect(formatEvents(250_000)).toBe('250k');
    expect(formatEvents(2_000_000)).toBe('2M');
    expect(formatEvents(2_500_000)).toBe('2.5M');
    expect(formatUsd(49)).toBe('$49');
    expect(formatUsd(39.2)).toBe('$39.20');
    expect(formatUsd(1234)).toBe('$1,234');
  });
});

describe('chart data', () => {
  it('is deterministic for a seed', () => {
    const a = seededRandom(42);
    const b = seededRandom(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
    expect(generateDailySeries()).toEqual(generateDailySeries());
  });

  it('ends on the fixed sample date with consecutive days', () => {
    const series = generateDailySeries();
    expect(series).toHaveLength(180);
    expect(series.at(-1)?.date).toBe('2026-10-31');
    expect(series.at(-2)?.date).toBe('2026-10-30');
    expect(series.every(p => p.value > 0)).toBe(true);
  });

  it('slices ranges and computes summary stats', () => {
    for (const [range, days] of [['7d', 7], ['30d', 30], ['90d', 90]] as const) {
      const s = seriesFor(range);
      expect(s.current).toHaveLength(days);
      expect(s.previous).toHaveLength(days);
      expect(s.total).toBe(s.current.reduce((n, p) => n + p.value, 0));
      expect(s.average).toBe(Math.round(s.total / days));
      expect(s.current).toContain(s.peak);
    }
  });

  it('computes change versus the previous period', () => {
    const source = Array.from({length: 14}, (_, i) => ({date: `2026-01-${String(i + 1).padStart(2, '0')}`, value: i < 7 ? 100 : 110}));
    expect(seriesFor('7d', source).changePct).toBe(10);
  });

  it('picks tidy tick bounds', () => {
    expect(niceBounds(1234, 2890)).toEqual({lo: 1000, hi: 3000, step: 500});
  });

  it('builds SVG paths inside the box', () => {
    const box = {width: 600, height: 240, padTop: 10, padRight: 10, padBottom: 30, padLeft: 50};
    const g = buildChart(seriesFor('30d').current, box);
    expect(g.line.startsWith('M50 ')).toBe(true);
    expect(g.line.split('L')).toHaveLength(30);
    expect(g.area.endsWith('Z')).toBe(true);
    expect(g.last.x).toBe(590);
    for (const t of g.yTicks) {
      expect(t.y).toBeGreaterThanOrEqual(10);
      expect(t.y).toBeLessThanOrEqual(210);
    }
    expect(g.xLabels).toHaveLength(4);
    expect(g.xLabels.at(-1)?.label).toBe('Oct 31');
    expect(() => buildChart([{date: '2026-01-01', value: 1}], box)).toThrow();
  });

  it('formats dates and buckets weeks', () => {
    expect(shortDate('2026-03-07')).toBe('Mar 7');
    const weeks = weeklyBuckets(seriesFor('30d').current);
    expect(weeks).toHaveLength(5);
    expect(weeks.reduce((n, w) => n + w.total, 0)).toBe(seriesFor('30d').total);
  });
});

describe('waitlist validation', () => {
  const valid = {email: 'ada@example.com', teamSize: '2-5', role: 'product', useCase: '', consent: true};

  it('accepts a complete form', () => {
    expect(validateWaitlist(valid)).toEqual({});
    expect(hasErrors(validateWaitlist(valid))).toBe(false);
  });

  it('flags every required field on an empty form, in order', () => {
    const errors = validateWaitlist(EMPTY_WAITLIST);
    expect(Object.keys(errors).sort()).toEqual(['consent', 'email', 'role', 'teamSize']);
    expect(firstError(errors)).toBe('email');
  });

  it('checks email format', () => {
    expect(isValidEmail('name@example.com')).toBe(true);
    expect(isValidEmail('  name@example.com ')).toBe(true);
    expect(isValidEmail('name@example')).toBe(false);
    expect(isValidEmail('name example.com')).toBe(false);
    expect(validateWaitlist({...valid, email: 'nope'}).email).toMatch(/name@example.com/);
  });

  it('rejects unknown select values and long use cases', () => {
    expect(validateWaitlist({...valid, teamSize: '9000'}).teamSize).toBeDefined();
    expect(validateWaitlist({...valid, role: 'ceo'}).role).toBeDefined();
    expect(validateWaitlist({...valid, useCase: 'x'.repeat(USE_CASE_MAX)}).useCase).toBeUndefined();
    expect(validateWaitlist({...valid, useCase: 'x'.repeat(USE_CASE_MAX + 1)}).useCase).toBeDefined();
  });

  it('requires consent', () => {
    expect(validateWaitlist({...valid, consent: false}).consent).toBeDefined();
  });
});
