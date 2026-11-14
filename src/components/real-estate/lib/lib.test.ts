import {describe, expect, it} from 'vitest';
import {properties, propertyById} from './data';
import {
  DEFAULT_FILTERS,
  activeFilterCount,
  matchesFilters,
  resultSummary,
  searchProperties,
  sortProperties,
  withMode,
  withPriceBound,
} from './listings';
import {DEFAULT_MORTGAGE, estimateMortgage, monthlyRepayment, suggestedDeposit, validateMortgage} from './mortgage';
import {
  EMPTY_VIEWING,
  addDays,
  dateError,
  isWeekdayDate,
  isWeekdayISO,
  validateViewing,
  viewingWindow,
  type ViewingDraft,
} from './viewing';
import {formatListingPrice, formatShortPrice} from './format';

const ids = (list: {id: string}[]) => list.map(p => p.id);

describe('listing filters', () => {
  it('shows only sale listings by default, in recommended order', () => {
    const res = searchProperties(properties, DEFAULT_FILTERS, 'recommended');
    expect(res.every(p => p.mode === 'buy')).toBe(true);
    expect(res).toHaveLength(6);
    expect(res.map(p => p.featuredRank)).toEqual([...res.map(p => p.featuredRank)].sort((a, b) => a - b));
  });

  it('filters by mode, area, price range and bedrooms together', () => {
    const rent = searchProperties(properties, {...DEFAULT_FILTERS, mode: 'rent'}, 'recommended');
    expect(ids(rent)).toEqual(['malthouse-yard-2', 'chapel-street-18', 'the-lodge']);

    const hollins = searchProperties(properties, {...DEFAULT_FILTERS, area: 'hollins-rise'}, 'recommended');
    expect(ids(hollins)).toEqual(['hollins-12']);

    const ranged = searchProperties(
      properties,
      {...DEFAULT_FILTERS, minPrice: 300000, maxPrice: 500000},
      'price-asc',
    );
    expect(ids(ranged)).toEqual(['station-fields-31', 'orchard-cottage', 'hollins-12']);

    const fourBeds = searchProperties(properties, {...DEFAULT_FILTERS, minBeds: 4}, 'recommended');
    expect(ids(fourBeds)).toEqual(['old-granary', 'ferry-row-7']);
  });

  it('treats price bounds as inclusive', () => {
    const p = propertyById('hollins-12')!;
    expect(matchesFilters(p, {...DEFAULT_FILTERS, minPrice: 465000, maxPrice: 465000})).toBe(true);
    expect(matchesFilters(p, {...DEFAULT_FILTERS, maxPrice: 464999})).toBe(false);
  });

  it('returns an empty list when nothing matches', () => {
    const res = searchProperties(properties, {...DEFAULT_FILTERS, area: 'saltings', maxPrice: 400000}, 'recommended');
    expect(res).toEqual([]);
    expect(resultSummary(0, 'buy')).toMatch(/No sample homes for sale/);
    expect(resultSummary(1, 'rent')).toBe('1 sample home to rent.');
  });

  it('counts active filters without counting the buy/rent mode', () => {
    expect(activeFilterCount(DEFAULT_FILTERS)).toBe(0);
    expect(activeFilterCount({...DEFAULT_FILTERS, mode: 'rent'})).toBe(0);
    expect(activeFilterCount({...DEFAULT_FILTERS, area: 'saltings', minBeds: 2, maxPrice: 500000})).toBe(3);
  });

  it('resets price bounds when switching between buy and rent', () => {
    const f = {...DEFAULT_FILTERS, minPrice: 300000, maxPrice: 600000, minBeds: 2};
    expect(withMode(f, 'rent')).toEqual({...f, mode: 'rent', minPrice: 0, maxPrice: 0});
    expect(withMode(f, 'buy')).toBe(f);
  });

  it('clears the opposite bound instead of allowing an impossible range', () => {
    const f = {...DEFAULT_FILTERS, minPrice: 400000, maxPrice: 500000};
    expect(withPriceBound(f, 'min', 600000)).toMatchObject({minPrice: 600000, maxPrice: 0});
    expect(withPriceBound(f, 'max', 300000)).toMatchObject({minPrice: 0, maxPrice: 300000});
    expect(withPriceBound(f, 'max', 450000)).toMatchObject({minPrice: 400000, maxPrice: 450000});
  });
});

describe('listing sort', () => {
  const sale = properties.filter(p => p.mode === 'buy');

  it('sorts by price both ways', () => {
    const asc = sortProperties(sale, 'price-asc').map(p => p.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    const desc = sortProperties(sale, 'price-desc').map(p => p.price);
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
  });

  it('sorts newest first and by most bedrooms', () => {
    expect(sortProperties(sale, 'newest')[0].id).toBe('station-fields-31');
    expect(sortProperties(sale, 'beds-desc')[0].id).toBe('ferry-row-7');
  });

  it('does not mutate the input list', () => {
    const before = ids(sale);
    sortProperties(sale, 'price-desc');
    expect(ids(sale)).toEqual(before);
  });
});

describe('mortgage maths', () => {
  it('matches the standard amortisation formula', () => {
    // £200,000 over 25 years at 5%: about £1,169.18 a month.
    expect(monthlyRepayment(200000, 5, 25)).toBeCloseTo(1169.18, 2);
    // £100,000 over 30 years at 3%: about £421.60 a month.
    expect(monthlyRepayment(100000, 3, 30)).toBeCloseTo(421.6, 1);
  });

  it('divides the loan evenly at 0%', () => {
    expect(monthlyRepayment(120000, 0, 10)).toBeCloseTo(1000, 6);
  });

  it('returns 0 for no loan', () => {
    expect(monthlyRepayment(0, 4, 25)).toBe(0);
  });

  it('derives loan, LTV and totals', () => {
    const r = estimateMortgage({price: 250000, deposit: 50000, termYears: 25, ratePercent: 5})!;
    expect(r.loan).toBe(200000);
    expect(r.ltv).toBeCloseTo(80, 6);
    expect(r.months).toBe(300);
    expect(r.totalRepaid).toBeCloseTo(r.monthly * 300, 6);
    expect(r.totalInterest).toBeCloseTo(r.totalRepaid - 200000, 6);
  });

  it('rejects impossible inputs', () => {
    expect(validateMortgage(DEFAULT_MORTGAGE)).toEqual({});
    expect(validateMortgage({...DEFAULT_MORTGAGE, deposit: 465000}).deposit).toMatch(/less than the price/);
    expect(validateMortgage({...DEFAULT_MORTGAGE, deposit: -1}).deposit).toBeDefined();
    expect(validateMortgage({...DEFAULT_MORTGAGE, price: 1000}).price).toBeDefined();
    expect(validateMortgage({...DEFAULT_MORTGAGE, termYears: 50}).termYears).toBeDefined();
    expect(validateMortgage({...DEFAULT_MORTGAGE, ratePercent: 20}).ratePercent).toBeDefined();
    expect(validateMortgage({...DEFAULT_MORTGAGE, ratePercent: Number.NaN}).ratePercent).toBeDefined();
    expect(estimateMortgage({...DEFAULT_MORTGAGE, deposit: 999999})).toBeNull();
  });

  it('suggests a 20% deposit rounded to £1,000', () => {
    expect(suggestedDeposit(465000)).toBe(93000);
    expect(suggestedDeposit(349950)).toBe(70000);
  });
});

describe('viewing request validation', () => {
  // 2026-11-16 is a Monday.
  const today = '2026-11-16';
  const known = (id: string) => Boolean(propertyById(id));
  const valid: ViewingDraft = {
    propertyId: 'hollins-12',
    date: '2026-11-18',
    slot: '11:00',
    name: 'Sam Example',
    email: 'sam@example.com',
    phone: '01632 960 123',
    notes: '',
  };

  it('accepts a complete request', () => {
    expect(validateViewing(valid, today, known)).toEqual({});
  });

  it('requires every field except notes', () => {
    const e = validateViewing(EMPTY_VIEWING, today, known);
    expect(Object.keys(e).sort()).toEqual(['date', 'email', 'name', 'phone', 'propertyId', 'slot']);
  });

  it('only allows weekdays from tomorrow up to 30 days ahead', () => {
    expect(viewingWindow(today)).toEqual({min: '2026-11-17', max: '2026-12-16'});
    expect(dateError('2026-11-16', today)).toMatch(/tomorrow/);
    expect(dateError('2026-11-21', today)).toMatch(/weekdays/); // Saturday
    expect(dateError('2026-11-22', today)).toMatch(/weekdays/); // Sunday
    expect(dateError('2026-12-16', today)).toBeUndefined(); // Wednesday, day 30
    expect(dateError('2026-12-17', today)).toMatch(/30 days/);
    expect(dateError('2026-02-30', today)).toMatch(/valid/);
    expect(isWeekdayISO('2026-11-20')).toBe(true);
    expect(isWeekdayDate(new Date(2026, 10, 21))).toBe(false);
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });

  it('checks name, email and phone formats', () => {
    const e = validateViewing({...valid, name: 'A', email: 'sam@example', phone: '12345'}, today, known);
    expect(e.name).toBeDefined();
    expect(e.email).toBeDefined();
    expect(e.phone).toMatch(/7 to 15 digits/);
    expect(validateViewing({...valid, phone: '0163 abc'}, today, known).phone).toMatch(/digits/);
    expect(validateViewing({...valid, phone: '+44 (0)1632 960123'}, today, known).phone).toBeUndefined();
  });

  it('rejects unknown properties and slots', () => {
    const e = validateViewing({...valid, propertyId: 'nope', slot: '03:00'}, today, known);
    expect(e.propertyId).toBeDefined();
    expect(e.slot).toBeDefined();
  });
});

describe('listing data', () => {
  it('has unique ids and floor plans that tile the 100 x 70 footprint', () => {
    expect(new Set(properties.map(p => p.id)).size).toBe(properties.length);
    for (const p of properties) {
      const area = p.plan.reduce((sum, r) => sum + r.w * r.h, 0);
      expect(area, p.id).toBe(7000);
      for (const r of p.plan) {
        expect(r.x + r.w, `${p.id} ${r.name}`).toBeLessThanOrEqual(100);
        expect(r.y + r.h, `${p.id} ${r.name}`).toBeLessThanOrEqual(70);
      }
    }
  });
});

describe('formatting', () => {
  it('formats prices for listings and selectors', () => {
    expect(formatListingPrice(465000, 'buy')).toBe('£465,000');
    expect(formatListingPrice(1650, 'rent')).toBe('£1,650 pcm');
    expect(formatShortPrice(350000)).toBe('£350k');
    expect(formatShortPrice(1000000)).toBe('£1m');
    expect(formatShortPrice(1250)).toBe('£1,250');
  });
});
