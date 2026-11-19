import {describe, expect, it} from 'vitest';
import {services, weeklyHours, type DayHours} from './data';
import {countByFilter, filterServices} from './services';
import {addOnsFor, calculatePlan, formatPence} from './plan';
import {formatMinutes, getOpenStatus} from './hours';
import {
  hasErrors,
  isRequestableDate,
  parseISODate,
  toISODate,
  validateAppointment,
  type AppointmentRequest,
} from './validation';

describe('filterServices', () => {
  it('returns everything for "all"', () => {
    expect(filterServices(services, 'all')).toHaveLength(services.length);
  });

  it('only returns services offered for the pet type', () => {
    const rabbit = filterServices(services, 'rabbit');
    expect(rabbit.length).toBeGreaterThan(0);
    expect(rabbit.every(s => s.pets.includes('rabbit'))).toBe(true);
    expect(rabbit.map(s => s.id)).toContain('rabbit-diet');
    expect(rabbit.map(s => s.id)).not.toContain('cat-quiet');
  });

  it('keeps the original order and does not mutate the list', () => {
    const before = services.map(s => s.id);
    const small = filterServices(services, 'small');
    expect(services.map(s => s.id)).toEqual(before);
    expect(small.map(s => s.id)).toEqual(before.filter(id => small.some(s => s.id === id)));
  });

  it('counts services per filter', () => {
    const counts = countByFilter(services);
    expect(counts.all).toBe(services.length);
    expect(counts.cat).toBe(filterServices(services, 'cat').length);
  });
});

describe('calculatePlan', () => {
  it('prices an adult cat with no add-ons at the base price', () => {
    const q = calculatePlan({pet: 'cat', age: 'adult', addOns: []});
    expect(q.monthly).toBe(1400);
    expect(q.yearly).toBe(16800);
    expect(q.lines).toEqual([{label: 'Core plan', monthly: 1400}]);
  });

  it('adds the age adjustment and add-ons', () => {
    const q = calculatePlan({pet: 'dog', age: 'senior', addOns: ['dental', 'nails']});
    expect(q.monthly).toBe(1650 + 400 + 350 + 200);
    expect(q.lines.map(l => l.label)).toEqual(['Core plan', 'Senior pet care', 'Dental check-ins', 'Unlimited nail clips']);
  });

  it('ignores add-ons not offered for the pet, and duplicates', () => {
    const q = calculatePlan({pet: 'small', age: 'young', addOns: ['parasite', 'nails', 'nails']});
    expect(q.ignored).toEqual(['parasite']);
    expect(q.monthly).toBe(600 + 250 + 200);
  });

  it('lists only applicable add-ons per pet', () => {
    expect(addOnsFor('small').map(a => a.id)).toEqual(['nails', 'nutrition']);
    expect(addOnsFor('dog')).toHaveLength(4);
  });

  it('formats pence as pounds', () => {
    expect(formatPence(1650)).toBe('£16.50');
    expect(formatPence(5)).toBe('£0.05');
    expect(formatPence(123400)).toBe('£1,234.00');
  });
});

describe('getOpenStatus', () => {
  // 2026-11-16 is a Monday.
  const at = (day: number, h: number, m = 0) => new Date(2026, 10, 15 + day, h, m);

  it('is open during weekday hours', () => {
    const s = getOpenStatus(at(1, 10, 30), weeklyHours);
    expect(s.isOpen).toBe(true);
    expect(s.label).toBe('Open now, closes at 7:00pm');
  });

  it('treats opening as inclusive and closing as exclusive', () => {
    expect(getOpenStatus(at(1, 8, 0), weeklyHours).isOpen).toBe(true);
    expect(getOpenStatus(at(1, 19, 0), weeklyHours).isOpen).toBe(false);
    expect(getOpenStatus(at(3, 19, 30), weeklyHours).isOpen).toBe(true);
  });

  it('opens later today when before opening', () => {
    expect(getOpenStatus(at(2, 6, 15), weeklyHours).label).toBe('Closed now, opens today at 8:00am');
  });

  it('opens tomorrow after closing', () => {
    expect(getOpenStatus(at(1, 21, 0), weeklyHours).label).toBe('Closed now, opens tomorrow at 8:00am');
    expect(getOpenStatus(at(6, 14, 0), weeklyHours).label).toBe('Closed now, opens Monday at 8:00am');
  });

  it('skips closed days', () => {
    const s = getOpenStatus(at(0, 12, 0), weeklyHours);
    expect(s.isOpen).toBe(false);
    expect(s.label).toBe('Closed now, opens tomorrow at 8:00am');
  });

  it('handles a week with no opening hours', () => {
    const closed: DayHours[] = [null, null, null, null, null, null, null];
    expect(getOpenStatus(at(1, 10), closed).label).toBe('Closed');
  });

  it('formats times', () => {
    expect(formatMinutes(0)).toBe('12:00am');
    expect(formatMinutes(12 * 60)).toBe('12:00pm');
    expect(formatMinutes(18 * 60 + 30)).toBe('6:30pm');
  });
});

describe('validateAppointment', () => {
  const today = new Date(2026, 10, 16); // Monday
  const valid: AppointmentRequest = {
    ownerName: 'Sam Example',
    email: 'sam@example.com',
    petName: 'Biscuit',
    pet: 'dog',
    reason: 'checkup',
    date: '2026-11-18',
    timeOfDay: 'morning',
    notes: '',
    understood: true,
  };

  it('accepts a complete request', () => {
    expect(hasErrors(validateAppointment(valid, today))).toBe(false);
  });

  it('flags every missing field', () => {
    const errors = validateAppointment(
      {...valid, ownerName: '', email: '', petName: ' ', pet: '', reason: '', date: '', understood: false},
      today,
    );
    expect(Object.keys(errors).sort()).toEqual(['date', 'email', 'ownerName', 'pet', 'petName', 'reason', 'understood']);
  });

  it('rejects a malformed email', () => {
    expect(validateAppointment({...valid, email: 'sam@'}, today).email).toMatch(/example\.com/);
  });

  it('rejects past, same-day, Sunday and far-future dates', () => {
    expect(validateAppointment({...valid, date: '2026-11-16'}, today).date).toBeDefined();
    expect(validateAppointment({...valid, date: '2026-11-22'}, today).date).toBeDefined();
    expect(validateAppointment({...valid, date: '2027-03-01'}, today).date).toBeDefined();
    expect(validateAppointment({...valid, date: '2026-02-30'}, today).date).toBe('Enter a valid date.');
  });

  it('limits notes length', () => {
    expect(validateAppointment({...valid, notes: 'x'.repeat(401)}, today).notes).toBeDefined();
  });

  it('round-trips ISO dates and checks the window', () => {
    expect(toISODate(parseISODate('2026-12-01')!)).toBe('2026-12-01');
    expect(isRequestableDate(new Date(2026, 10, 17), today)).toBe(true);
    expect(isRequestableDate(new Date(2027, 0, 15), today)).toBe(true);
    expect(isRequestableDate(new Date(2027, 0, 16), today)).toBe(false);
  });
});
