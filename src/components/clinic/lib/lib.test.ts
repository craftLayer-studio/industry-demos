import {describe, expect, it} from 'vitest';
import {clinicians, specialties} from './data';
import {formatDays} from './format';
import {countLabel, filterClinicians} from './filter';
import {addDays, bookingWindow, dateProblem, isBookableDate, isoWeekday, localToday, parseISODate} from './dates';
import {dayTemplate, generateSlots, hashString} from './slots';
import {stepError, validateContact, validateEmail, validateName, validatePhone, validateReason, REASON_MAX} from './validation';

// 2026-11-12 is a Thursday.
const TODAY = '2026-11-12';

describe('data', () => {
  it('has six specialties, each with at least one clinician', () => {
    expect(specialties).toHaveLength(6);
    for (const s of specialties) {
      expect(clinicians.some(c => c.specialty === s.id)).toBe(true);
    }
  });
  it('only schedules clinicians on weekdays', () => {
    const days = clinicians.flatMap(c => c.days);
    expect(days.every(d => d >= 1 && d <= 5)).toBe(true);
  });
});

describe('filterClinicians', () => {
  it('returns everyone for all', () => {
    expect(filterClinicians(clinicians, 'all')).toHaveLength(clinicians.length);
  });
  it('returns only the chosen specialty', () => {
    const list = filterClinicians(clinicians, 'cardiology');
    expect(list.length).toBeGreaterThan(0);
    expect(list.every(c => c.specialty === 'cardiology')).toBe(true);
  });
  it('does not mutate the source list', () => {
    const copy = [...clinicians];
    filterClinicians(clinicians, 'all').pop();
    expect(clinicians).toEqual(copy);
  });
  it('labels counts', () => {
    expect(countLabel(1)).toBe('Showing 1 clinician');
    expect(countLabel(3)).toBe('Showing 3 clinicians');
  });
});

describe('dates', () => {
  it('parses valid and rejects invalid ISO dates', () => {
    expect(parseISODate('2026-02-28')).not.toBeNull();
    expect(parseISODate('2026-02-30')).toBeNull();
    expect(parseISODate('12/11/2026')).toBeNull();
  });
  it('adds days across month and year boundaries', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2026-03-28', 2)).toBe('2026-03-30');
  });
  it('computes ISO weekdays', () => {
    expect(isoWeekday(TODAY)).toBe(4);
    expect(isoWeekday('2026-11-15')).toBe(7);
  });
  it('formats the local date', () => {
    expect(localToday(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05');
  });
  it('opens the window tomorrow and closes it after 60 days', () => {
    expect(bookingWindow(TODAY)).toEqual({min: '2026-11-13', max: '2027-01-11'});
  });
  it('rejects past, today, weekends and dates beyond 60 days', () => {
    expect(dateProblem('2026-11-11', TODAY)).toBe('past');
    expect(dateProblem(TODAY, TODAY)).toBe('past');
    expect(dateProblem('2026-11-14', TODAY)).toBe('weekend');
    expect(dateProblem('2027-01-12', TODAY)).toBe('too-far');
    expect(dateProblem('not-a-date', TODAY)).toBe('invalid');
  });
  it('accepts weekdays in the window, respecting clinician days', () => {
    expect(isBookableDate('2026-11-13', TODAY)).toBe(true);
    expect(isBookableDate('2027-01-11', TODAY)).toBe(true);
    // 2026-11-16 is a Monday
    expect(dateProblem('2026-11-16', TODAY, [2, 4])).toBe('clinician-off');
    expect(isBookableDate('2026-11-17', TODAY, [2, 4])).toBe(true);
  });
});

describe('generateSlots', () => {
  it('is deterministic', () => {
    expect(generateSlots('hana-sato', '2026-11-17', TODAY)).toEqual(generateSlots('hana-sato', '2026-11-17', TODAY));
    expect(hashString('abc')).toBe(hashString('abc'));
  });
  it('varies by clinician or date', () => {
    const a = generateSlots('hana-sato', '2026-11-17', TODAY).map(s => s.time).join();
    const b = generateSlots('noor-haddad', '2026-11-17', TODAY).map(s => s.time).join();
    const c = generateSlots('hana-sato', '2026-11-18', TODAY).map(s => s.time).join();
    expect(new Set([a, b, c]).size).toBeGreaterThan(1);
  });
  it('returns no slots for unbookable dates', () => {
    expect(generateSlots('noor-haddad', '2026-11-14', TODAY)).toEqual([]);
    expect(generateSlots('noor-haddad', '2026-11-10', TODAY)).toEqual([]);
    expect(generateSlots('noor-haddad', '2027-02-01', TODAY)).toEqual([]);
    expect(generateSlots('sam-whitaker', '2026-11-16', TODAY, [2, 4])).toEqual([]);
  });
  it('keeps slots inside clinic hours, skips lunch, sorted, at least two free', () => {
    const template = dayTemplate();
    expect(template).not.toContain(12 * 60 + 30);
    expect(template).not.toContain(13 * 60);
    let day = '2026-11-13';
    for (let i = 0; i < 60; i++, day = addDays(day, 1)) {
      for (const c of clinicians) {
        const slots = generateSlots(c.id, day, TODAY, c.days);
        if (slots.length === 0) continue;
        expect(slots.length).toBeGreaterThanOrEqual(2);
        const times = slots.map(s => s.time);
        expect([...times].sort()).toEqual(times);
        for (const t of times) {
          expect(t >= '09:00' && t < '17:00').toBe(true);
          expect(t === '12:30' || t === '13:00').toBe(false);
        }
      }
    }
  });
});

describe('validation', () => {
  const valid = {name: 'Alex Example', email: 'alex@example.com', phone: '(555) 010-0199', reason: ''};
  it('accepts a minimal valid form', () => {
    expect(validateContact(valid)).toEqual({});
  });
  it('requires name, email and phone', () => {
    const errors = validateContact({name: '', email: '', phone: '', reason: ''});
    expect(Object.keys(errors).sort()).toEqual(['email', 'name', 'phone']);
  });
  it('validates name', () => {
    expect(validateName('A')).toBeDefined();
    expect(validateName('R2D2')).toBeDefined();
    expect(validateName('x'.repeat(81))).toBeDefined();
    expect(validateName('  Jo  ')).toBeUndefined();
  });
  it('validates email', () => {
    expect(validateEmail('alex@')).toBeDefined();
    expect(validateEmail('alex@example')).toBeDefined();
    expect(validateEmail('a b@example.com')).toBeDefined();
    expect(validateEmail('alex@example.com')).toBeUndefined();
  });
  it('validates phone', () => {
    expect(validatePhone('12345')).toBeDefined();
    expect(validatePhone('555-CALL-NOW')).toBeDefined();
    expect(validatePhone('1'.repeat(16))).toBeDefined();
    expect(validatePhone('+1 555 010 0142')).toBeUndefined();
  });
  it('keeps the optional reason short', () => {
    expect(validateReason('')).toBeUndefined();
    expect(validateReason('x'.repeat(REASON_MAX))).toBeUndefined();
    expect(validateReason('x'.repeat(REASON_MAX + 1))).toBeDefined();
  });
  it('gates each step on its own choice', () => {
    const empty = {specialty: null, clinician: null, date: null, time: null};
    expect(stepError(0, empty)).toMatch(/specialty/);
    expect(stepError(1, {...empty, specialty: 'cardiology'})).toMatch(/clinician/);
    expect(stepError(2, {...empty, specialty: 'x', clinician: 'y'})).toMatch(/date/);
    expect(stepError(2, {specialty: 'x', clinician: 'y', date: '2026-11-13', time: null})).toMatch(/time/);
    expect(stepError(2, {specialty: 'x', clinician: 'y', date: '2026-11-13', time: '09:00'})).toBeNull();
  });
});

describe('formatDays', () => {
  it('formats day lists', () => {
    expect(formatDays([4, 1, 2])).toBe('Mon, Tue, Thu');
    expect(formatDays([1, 2, 3, 4, 5])).toBe('Mon to Fri');
    expect(formatDays([2, 4], true)).toBe('Tuesday, Thursday');
  });
});
