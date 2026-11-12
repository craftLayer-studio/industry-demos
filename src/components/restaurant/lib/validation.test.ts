import {describe, expect, it} from 'vitest';
import {formatTime, hoursSummary, parseISODate, pickupSlots, reservationSlots} from './hours';
import {
  EMPTY_RESERVATION,
  hasErrors,
  validateCheckout,
  validateEmail,
  validatePartySize,
  validatePhone,
  validateReservation,
  type ReservationValues,
} from './validation';

// Wednesday 12 Nov 2025, 18:10 local time.
const NOW = new Date(2025, 10, 12, 18, 10);

const valid: ReservationValues = {
  ...EMPTY_RESERVATION,
  date: '2025-11-14', // Friday
  time: '19:30',
  partySize: 4,
  name: 'Avery Lin',
  email: 'avery@example.com',
  phone: '(555) 014-2290',
};

describe('hours', () => {
  it('builds reservation slots inside opening hours with a last seating', () => {
    const friday = parseISODate('2025-11-14')!;
    const slots = reservationSlots(friday);
    expect(slots[0]).toBe('17:00');
    expect(slots[slots.length - 1]).toBe('22:00');
    expect(reservationSlots(parseISODate('2025-11-17')!)).toEqual([]); // Monday closed
  });

  it('includes both Sunday services', () => {
    const sunday = reservationSlots(parseISODate('2025-11-16')!);
    expect(sunday).toContain('11:00');
    expect(sunday).toContain('14:00');
    expect(sunday).not.toContain('15:00');
    expect(sunday).toContain('17:00');
    expect(sunday[sunday.length - 1]).toBe('20:00');
  });

  it('drops past slots for today', () => {
    const today = reservationSlots(parseISODate('2025-11-12')!, NOW);
    expect(today[0]).toBe('18:30');
  });

  it('offers pickup slots with lead time, rolling over to the next open day', () => {
    const slots = pickupSlots(NOW);
    expect(slots[0]).toEqual({value: '2025-11-12T18:45', label: 'Today, 6:45 pm'});
    expect(slots[slots.length - 1].value).toBe('2025-11-12T21:30');

    const late = pickupSlots(new Date(2025, 10, 12, 21, 45));
    expect(late[0]).toEqual({value: '2025-11-13T17:30', label: 'Tomorrow, 5:30 pm'});

    // Sunday night -> Monday closed -> Tuesday.
    const sundayNight = pickupSlots(new Date(2025, 10, 16, 22, 0));
    expect(sundayNight[0].value).toBe('2025-11-18T17:30');
    expect(sundayNight[0].label).toBe('Tue 18 Nov, 5:30 pm');
  });

  it('formats times and summarises the week', () => {
    expect(formatTime('00:15')).toBe('12:15 am');
    expect(formatTime('12:00')).toBe('12:00 pm');
    expect(formatTime(17 * 60 + 30)).toBe('5:30 pm');
    const summary = hoursSummary();
    expect(summary[0]).toEqual({days: 'Monday', hours: 'Closed'});
    expect(summary[1].days).toBe('Tuesday – Thursday');
    expect(summary.map((r) => r.days)).toContain('Sunday');
  });

  it('rejects impossible ISO dates', () => {
    expect(parseISODate('2025-02-30')).toBeNull();
    expect(parseISODate('nope')).toBeNull();
  });
});

describe('validateReservation', () => {
  it('accepts a valid booking', () => {
    expect(hasErrors(validateReservation(valid, NOW))).toBe(false);
  });

  it('requires all mandatory fields but not special requests', () => {
    const errors = validateReservation({...EMPTY_RESERVATION, partySize: null}, NOW);
    expect(Object.keys(errors).sort()).toEqual(['date', 'email', 'name', 'partySize', 'phone', 'time']);
  });

  it('rejects past dates, closed days and dates beyond the window', () => {
    expect(validateReservation({...valid, date: '2025-11-11'}, NOW).date).toMatch(/passed/);
    expect(validateReservation({...valid, date: '2025-11-17'}, NOW).date).toMatch(/closed on Mondays/);
    expect(validateReservation({...valid, date: '2026-03-01'}, NOW).date).toMatch(/days ahead/);
    expect(validateReservation({...valid, date: '2025-13-01'}, NOW).date).toMatch(/valid date/);
  });

  it('rejects times outside opening hours or already past today', () => {
    expect(validateReservation({...valid, time: '15:00'}, NOW).time).toBeDefined();
    expect(validateReservation({...valid, time: '22:30'}, NOW).time).toBeDefined();
    expect(validateReservation({...valid, date: '2025-11-12', time: '18:00'}, NOW).time).toBeDefined();
    expect(validateReservation({...valid, date: '2025-11-12', time: '20:00'}, NOW).time).toBeUndefined();
  });

  it('bounds party size to 1–12 whole guests', () => {
    expect(validatePartySize(0)).toBeDefined();
    expect(validatePartySize(1)).toBeUndefined();
    expect(validatePartySize(12)).toBeUndefined();
    expect(validatePartySize(13)).toMatch(/call/);
    expect(validatePartySize(2.5)).toBeDefined();
    expect(validatePartySize(null)).toBeDefined();
  });

  it('validates contact details', () => {
    expect(validateEmail('a@b')).toBeDefined();
    expect(validateEmail('guest@example.com')).toBeUndefined();
    expect(validatePhone('12345')).toBeDefined();
    expect(validatePhone('call me')).toBeDefined();
    expect(validatePhone('+1 555 014 2290')).toBeUndefined();
    expect(validateReservation({...valid, name: ' '}, NOW).name).toBeDefined();
    expect(validateReservation({...valid, name: '42'}, NOW).name).toMatch(/letters/);
  });

  it('limits special requests length', () => {
    expect(validateReservation({...valid, requests: 'x'.repeat(301)}, NOW).requests).toBeDefined();
    expect(validateReservation({...valid, requests: 'Window seat please'}, NOW).requests).toBeUndefined();
  });
});

describe('validateCheckout', () => {
  it('requires a name and an available pickup slot', () => {
    expect(validateCheckout({name: '', pickup: ''}, NOW)).toEqual({
      name: 'Please enter a name for the order.',
      pickup: 'Choose a pickup time.',
    });
    expect(validateCheckout({name: 'Sam', pickup: '2025-11-12T18:15'}, NOW).pickup).toMatch(/no longer available/);
    expect(validateCheckout({name: 'Sam', pickup: '2025-11-12T19:00'}, NOW)).toEqual({});
  });
});
