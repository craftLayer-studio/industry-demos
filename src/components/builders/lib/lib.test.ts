import {describe, expect, it} from 'vitest';
import {
  DEFAULT_INPUT,
  MAX_SIZE,
  MIN_SIZE,
  clampSize,
  estimate,
  formatMoney,
  formatRange,
  roundTo,
  type EstimateInput,
} from './estimate';
import {SAMPLE_PROJECTS, countByService, filterProjects} from './projects';
import {
  EMPTY_SURVEY,
  earliestSurveyDate,
  firstError,
  hasErrors,
  isEmail,
  isPhone,
  isSurveyDay,
  latestSurveyDate,
  toISODate,
  validateSurvey,
  type SurveyValues,
} from './validation';

describe('extension estimator', () => {
  it('clamps size to the supported range and rounds to whole m²', () => {
    expect(clampSize(2)).toBe(MIN_SIZE);
    expect(clampSize(500)).toBe(MAX_SIZE);
    expect(clampSize(24.4)).toBe(24);
    expect(clampSize(Number.NaN)).toBe(MIN_SIZE);
  });

  it('rounds to the nearest 500', () => {
    expect(roundTo(1249)).toBe(1000);
    expect(roundTo(1250)).toBe(1500);
  });

  it('computes the default single-storey standard estimate', () => {
    const e = estimate(DEFAULT_INPUT);
    // 24 m² x 2100-2600 x 1.0 x 1.0
    expect(e.lines[0]).toMatchObject({key: 'build', low: 50500, high: 62500});
    expect(e.lines[1]).toMatchObject({key: 'design', low: 3500, high: 6000});
    // 8% of 50,500 = 4,040 -> 4,000; 12% of 62,500 = 7,500
    expect(e.lines[2]).toMatchObject({key: 'contingency', low: 4000, high: 7500});
    expect(e.total).toEqual({low: 58000, high: 76000});
    expect(e.floorArea).toBe(24);
    expect(e.perSquareMetre.low).toBe(Math.round(58000 / 24));
    expect(e.weeks).toEqual({low: 11, high: 15});
  });

  it('double storey doubles floor area but lowers the rate per m²', () => {
    const single = estimate(DEFAULT_INPUT);
    const double = estimate({...DEFAULT_INPUT, storeys: 'double'});
    expect(double.floorArea).toBe(48);
    expect(double.total.low).toBeGreaterThan(single.total.low);
    expect(double.total.low).toBeLessThan(single.total.low * 2);
    expect(double.weeks.low).toBeGreaterThan(single.weeks.low);
  });

  it('orders finish levels and region bands by cost', () => {
    const at = (patch: Partial<EstimateInput>) => estimate({...DEFAULT_INPUT, ...patch}).total.low;
    expect(at({finish: 'essential'})).toBeLessThan(at({finish: 'standard'}));
    expect(at({finish: 'standard'})).toBeLessThan(at({finish: 'premium'}));
    expect(at({region: 'a'})).toBeLessThan(at({region: 'b'}));
    expect(at({region: 'c'})).toBeLessThan(at({region: 'd'}));
  });

  it('always returns low <= high and totals that add up', () => {
    for (const storeys of ['single', 'double'] as const) {
      for (const finish of ['essential', 'standard', 'premium'] as const) {
        for (const region of ['a', 'b', 'c', 'd'] as const) {
          const e = estimate({size: 37, storeys, finish, region});
          expect(e.total.low).toBeLessThanOrEqual(e.total.high);
          expect(e.lines.reduce((s, l) => s + l.low, 0)).toBe(e.total.low);
          expect(e.lines.reduce((s, l) => s + l.high, 0)).toBe(e.total.high);
        }
      }
    }
  });

  it('clamps out-of-range sizes inside estimate()', () => {
    expect(estimate({...DEFAULT_INPUT, size: 1000}).size).toBe(MAX_SIZE);
  });

  it('formats pounds without pence', () => {
    expect(formatMoney(58000)).toBe('£58,000');
    expect(formatRange({low: 1000, high: 2500})).toBe('£1,000 to £2,500');
  });
});

describe('sample projects', () => {
  it('filters by service', () => {
    expect(filterProjects(SAMPLE_PROJECTS, 'all')).toHaveLength(SAMPLE_PROJECTS.length);
    const lofts = filterProjects(SAMPLE_PROJECTS, 'lofts');
    expect(lofts.length).toBeGreaterThan(0);
    expect(lofts.every(p => p.service === 'lofts')).toBe(true);
  });

  it('counts per service add up to the total', () => {
    const c = countByService(SAMPLE_PROJECTS);
    expect(c.extensions + c.lofts + c.kitchens + c.renovations).toBe(c.all);
  });

  it('labels every project as a sample', () => {
    expect(SAMPLE_PROJECTS.every(p => p.property.includes('(sample)'))).toBe(true);
    expect(new Set(SAMPLE_PROJECTS.map(p => p.id)).size).toBe(SAMPLE_PROJECTS.length);
  });
});

describe('survey validation', () => {
  // Wednesday 18 November 2026, local time.
  const today = new Date(2026, 10, 18);
  const valid: SurveyValues = {
    name: 'Sam Rivera',
    email: 'sam@example.com',
    phone: '',
    area: 'Millbrook',
    project: 'extension',
    property: 'semi',
    date: '2026-11-21',
    notes: '',
    consent: true,
  };

  it('accepts a complete request', () => {
    expect(hasErrors(validateSurvey(valid, today))).toBe(false);
  });

  it('flags every required field on an empty form, in order', () => {
    const e = validateSurvey(EMPTY_SURVEY, today);
    expect(Object.keys(e).sort()).toEqual(['area', 'consent', 'date', 'email', 'name', 'project', 'property'].sort());
    expect(firstError(e)).toBe('name');
  });

  it('checks email and optional phone formats', () => {
    expect(isEmail('a@example.com')).toBe(true);
    expect(isEmail('a@b')).toBe(false);
    expect(isPhone('+44 (0)20 5550 0123')).toBe(true);
    expect(isPhone('12')).toBe(false);
    expect(isPhone('call me')).toBe(false);
    expect(validateSurvey({...valid, phone: 'abc'}, today).phone).toBeDefined();
    expect(validateSurvey({...valid, email: 'nope'}, today).email).toMatch(/example\.com/);
  });

  it('enforces the survey date window and no Sundays', () => {
    expect(earliestSurveyDate(today)).toBe('2026-11-20');
    expect(latestSurveyDate(today)).toBe('2027-02-10');
    expect(validateSurvey({...valid, date: '2026-11-19'}, today).date).toMatch(/two days/);
    expect(validateSurvey({...valid, date: '2027-03-01'}, today).date).toMatch(/twelve weeks/);
    expect(isSurveyDay('2026-11-22')).toBe(false); // Sunday
    expect(validateSurvey({...valid, date: '2026-11-22'}, today).date).toMatch(/Monday to Saturday/);
    expect(validateSurvey({...valid, date: '2026-02-31'}, today).date).toBe('Enter a valid date.');
  });

  it('formats local ISO dates', () => {
    expect(toISODate(new Date(2027, 0, 5))).toBe('2027-01-05');
  });
});
