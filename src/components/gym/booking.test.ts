import {describe, expect, it} from 'vitest';
import {schedule} from './data';
import {
  emptyBooking,
  findClass,
  hasErrors,
  nextDateForClass,
  parseISODate,
  validateBooking,
  validateField,
  type BookingValues,
} from './booking';

// Thursday 12 November 2026, local time.
const today = new Date(2026, 10, 12, 15, 30);
const mondayClass = schedule.find(c => c.day === 'mon')!;

const valid: BookingValues = {
  name: 'Sam Rivera',
  email: 'sam@example.com',
  phone: '(555) 010-4477',
  classId: mondayClass.id,
  date: '2026-11-16', // a Monday
  experience: 'returning',
  consent: true,
};

describe('validateBooking', () => {
  it('accepts a complete, valid booking', () => {
    expect(validateBooking(valid, today)).toEqual({});
  });

  it('flags every field when empty', () => {
    const errors = validateBooking(emptyBooking, today);
    expect(Object.keys(errors).sort()).toEqual(['classId', 'consent', 'date', 'email', 'experience', 'name', 'phone']);
    expect(hasErrors(errors)).toBe(true);
  });

  it('validates name length after trimming', () => {
    expect(validateField('name', {...valid, name: '  A '}, today)).toMatch(/at least 2/);
    expect(validateField('name', {...valid, name: 'x'.repeat(81)}, today)).toMatch(/80/);
  });

  it('validates email format', () => {
    expect(validateField('email', {...valid, email: 'sam@'}, today)).toMatch(/email address like/);
    expect(validateField('email', {...valid, email: 'sam at example.com'}, today)).toBeDefined();
    expect(validateField('email', {...valid, email: ' sam@example.com '}, today)).toBeUndefined();
  });

  it('validates phone characters and digit count', () => {
    expect(validateField('phone', {...valid, phone: '555-CALL-NOW'}, today)).toMatch(/digits/);
    expect(validateField('phone', {...valid, phone: '12345'}, today)).toMatch(/7 to 15/);
    expect(validateField('phone', {...valid, phone: '+1 555 010 4477'}, today)).toBeUndefined();
  });

  it('requires a class that exists on the timetable', () => {
    expect(validateField('classId', {...valid, classId: ''}, today)).toMatch(/Choose a class/);
    expect(validateField('classId', {...valid, classId: 'nope'}, today)).toMatch(/no longer/);
  });

  it('rejects past dates but allows today', () => {
    expect(validateField('date', {...valid, classId: '', date: '2026-11-11'}, today)).toMatch(/today or a future/);
    expect(validateField('date', {...valid, classId: '', date: '2026-11-12'}, today)).toBeUndefined();
  });

  it('rejects invalid and far-future dates', () => {
    expect(validateField('date', {...valid, date: '2026-02-31'}, today)).toMatch(/valid date/);
    expect(validateField('date', {...valid, date: 'tomorrow'}, today)).toMatch(/valid date/);
    expect(validateField('date', {...valid, classId: '', date: '2027-03-01'}, today)).toMatch(/60 days/);
  });

  it('requires the date to fall on the class weekday', () => {
    expect(validateField('date', {...valid, date: '2026-11-17'}, today)).toMatch(/runs on Mondays/);
  });

  it('requires experience and consent', () => {
    expect(validateField('experience', {...valid, experience: ''}, today)).toBeDefined();
    expect(validateField('consent', {...valid, consent: false}, today)).toBeDefined();
  });
});

describe('date helpers', () => {
  it('parses ISO dates locally and rejects roll-overs', () => {
    const d = parseISODate('2026-11-16')!;
    expect([d.getFullYear(), d.getMonth(), d.getDate()]).toEqual([2026, 10, 16]);
    expect(parseISODate('2026-13-01')).toBeNull();
  });

  it('finds the next date on the class weekday', () => {
    expect(nextDateForClass(mondayClass, today)).toBe('2026-11-16');
    const thursday = schedule.find(c => c.day === 'thu')!;
    expect(nextDateForClass(thursday, today)).toBe('2026-11-12');
    expect(findClass(thursday.id)).toBe(thursday);
  });
});
