import {describe, expect, it} from 'vitest';
import {addDays, daysBetween, formatLongDate, isISODate, weekdayOf} from './dates';
import {
  DEFAULT_PACKAGE,
  EVENING_CAPACITY,
  EVENING_PER_HEAD,
  PEAK_SATURDAY_MIN_CHARGED,
  PER_HEAD,
  chargedDayGuests,
  classifyDate,
  dayTypeForWeekday,
  issueMessage,
  quotePackage,
  seasonForMonth,
  validatePackage,
  type PackageInput,
} from './pricing';
import {SAMPLE_MONTHS, SAMPLE_YEAR, monthGrid, monthSummary, openSaturdays, sampleStatus} from './availability';
import {EMPTY_VIEWING, hasErrors, isViewingDay, validateViewing, viewingWindow, type ViewingDraft} from './viewing';

describe('dates', () => {
  it('validates and shifts ISO dates', () => {
    expect(isISODate('2027-02-29')).toBe(false);
    expect(isISODate('2028-02-29')).toBe(true);
    expect(addDays('2027-12-31', 1)).toBe('2028-01-01');
    expect(daysBetween('2027-06-01', '2027-06-15')).toBe(14);
    expect(weekdayOf('2027-06-05')).toBe(6);
    expect(formatLongDate('2027-06-05')).toMatch(/^Saturday,? 5 June 2027$/);
  });
});

describe('pricing', () => {
  const base: PackageInput = {season: 'winter', dayType: 'midweek', dayGuests: 50, eveningGuests: 0, addOns: []};

  it('maps months and weekdays to seasons and day types', () => {
    expect(seasonForMonth(7)).toBe('peak');
    expect(seasonForMonth(4)).toBe('shoulder');
    expect(seasonForMonth(10)).toBe('shoulder');
    expect(seasonForMonth(1)).toBe('winter');
    expect(dayTypeForWeekday(6)).toBe('saturday');
    expect(dayTypeForWeekday(5)).toBe('fri-sun');
    expect(dayTypeForWeekday(0)).toBe('fri-sun');
    expect(dayTypeForWeekday(3)).toBe('midweek');
    expect(classifyDate('2027-06-05')).toEqual({season: 'peak', dayType: 'saturday'});
  });

  it('prices a simple winter midweek wedding', () => {
    const q = quotePackage(base);
    expect(q.ok).toBe(true);
    // 3600 * 0.7 = 2520 venue, 50 * 84 = 4200 dining
    expect(q.lines.map(l => l.amount)).toEqual([2520, 50 * PER_HEAD]);
    expect(q.total).toBe(2520 + 4200);
    expect(q.perGuest).toBe(Math.round(6720 / 50));
  });

  it('applies the peak Saturday minimum charged guests', () => {
    expect(chargedDayGuests({season: 'peak', dayType: 'saturday', dayGuests: 40})).toBe(PEAK_SATURDAY_MIN_CHARGED);
    expect(chargedDayGuests({season: 'peak', dayType: 'fri-sun', dayGuests: 40})).toBe(40);
    const q = quotePackage({...base, season: 'peak', dayType: 'saturday', dayGuests: 40});
    expect(q.lines[0].amount).toBe(6400);
    expect(q.lines[1].amount).toBe(PEAK_SATURDAY_MIN_CHARGED * PER_HEAD);
    expect(q.lines[1].detail).toMatch(/minimum/);
  });

  it('adds evening guests and flat or per-guest add-ons', () => {
    const q = quotePackage({...base, eveningGuests: 20, addOns: ['arbour', 'brunch']});
    const byId = Object.fromEntries(q.lines.map(l => [l.id, l.amount]));
    expect(byId.evening).toBe(20 * EVENING_PER_HEAD);
    expect(byId.arbour).toBe(450);
    expect(byId.brunch).toBe(22 * 50);
    expect(q.total).toBe(2520 + 4200 + 380 + 450 + 1100);
    expect(q.perGuest).toBe(Math.round(q.total / 70));
  });

  it('rejects out-of-range guest numbers', () => {
    expect(validatePackage({...base, dayGuests: 20}).map(i => i.code)).toEqual(['day-guests-low']);
    expect(validatePackage({...base, dayGuests: 121}).map(i => i.code)).toEqual(['day-guests-high']);
    expect(validatePackage({...base, eveningGuests: 61}).map(i => i.code)).toEqual(['evening-high']);
    expect(validatePackage({...base, dayGuests: 50.5}).map(i => i.code)).toEqual(['not-integer']);
    expect(EVENING_CAPACITY).toBe(180);
    const q = quotePackage({...base, dayGuests: 10});
    expect(q.ok).toBe(false);
    expect(q.total).toBe(0);
    expect(issueMessage(q.issues[0])).toMatch(/30/);
  });

  it('prices the default package', () => {
    const q = quotePackage(DEFAULT_PACKAGE);
    expect(q.ok).toBe(true);
    expect(q.total).toBe(6400 + 80 * 84 + 30 * 19);
  });
});

describe('availability', () => {
  it('is deterministic and closes Mondays', () => {
    expect(sampleStatus('2027-06-07')).toBe('closed'); // Monday
    expect(sampleStatus('2027-06-05')).toBe(sampleStatus('2027-06-05'));
  });

  it('builds Monday-first month grids', () => {
    const weeks = monthGrid(2027, 6); // 1 June 2027 is a Tuesday
    expect(weeks[0][0]).toBeNull();
    expect(weeks[0][1]?.iso).toBe('2027-06-01');
    expect(weeks.every(w => w.length === 7)).toBe(true);
    const days = weeks.flat().filter(Boolean);
    expect(days).toHaveLength(30);
  });

  it('summarises every sample month with a mix of statuses', () => {
    for (const m of SAMPLE_MONTHS) {
      const s = monthSummary(SAMPLE_YEAR, m);
      expect(s.open + s.limited + s.booked + s.closed).toBeGreaterThanOrEqual(30);
      expect(s.open).toBeGreaterThan(0);
      expect(s.closed).toBeGreaterThan(0);
    }
    for (const iso of openSaturdays(SAMPLE_YEAR, 7)) {
      expect(weekdayOf(iso)).toBe(6);
      expect(sampleStatus(iso)).not.toBe('booked');
    }
  });
});

describe('viewing request', () => {
  const today = '2027-03-01'; // a Monday
  const valid: ViewingDraft = {
    ...EMPTY_VIEWING,
    name: 'Ada Rowe',
    email: 'ada@example.com',
    viewingDate: '2027-03-04', // Thursday
    slot: 'morning',
    guests: '50-80',
    acknowledge: true,
  };

  it('accepts a complete request', () => {
    expect(validateViewing(valid, today)).toEqual({});
    expect(viewingWindow(today)).toEqual({min: '2027-03-02', max: '2027-06-29'});
    expect(isViewingDay('2027-03-06')).toBe(true);
    expect(isViewingDay('2027-03-05')).toBe(false);
  });

  it('flags every missing required field', () => {
    const e = validateViewing(EMPTY_VIEWING, today);
    expect(Object.keys(e).sort()).toEqual(['acknowledge', 'email', 'guests', 'name', 'slot', 'viewingDate']);
    expect(hasErrors(e)).toBe(true);
  });

  it('checks email, partner and date rules', () => {
    expect(validateViewing({...valid, email: 'ada@'}, today).email).toMatch(/example\.com/);
    expect(validateViewing({...valid, partner: 'B'}, today).partner).toBeDefined();
    expect(validateViewing({...valid, viewingDate: '2027-03-01'}, today).viewingDate).toMatch(/tomorrow/);
    expect(validateViewing({...valid, viewingDate: '2027-03-05'}, today).viewingDate).toMatch(/Tuesdays/);
    expect(validateViewing({...valid, viewingDate: '2027-12-02'}, today).viewingDate).toMatch(/120/);
    expect(validateViewing({...valid, message: 'x'.repeat(601)}, today).message).toBeDefined();
  });
});
