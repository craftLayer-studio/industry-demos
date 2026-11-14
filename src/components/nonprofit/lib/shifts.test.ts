import {describe, expect, it} from 'vitest';
import {
  DEFAULT_FILTER,
  describeShift,
  EMPTY_VOLUNTEER,
  filterShifts,
  formatTime,
  generateShifts,
  SHIFTS,
  toggleDay,
  validateVolunteer,
} from './shifts';

describe('shift generation', () => {
  it('is deterministic and only uses each role on its own days', () => {
    expect(generateShifts()).toEqual(generateShifts());
    expect(SHIFTS.filter(s => s.role === 'breakfast').map(s => s.day)).toEqual(['mon', 'tue', 'wed', 'thu', 'fri']);
    expect(new Set(SHIFTS.map(s => s.id)).size).toBe(SHIFTS.length);
    expect(SHIFTS.length).toBe(25);
  });

  it('sorts by day then start time', () => {
    const monday = SHIFTS.filter(s => s.day === 'mon').map(s => s.start);
    expect(monday).toEqual([...monday].sort());
    expect(SHIFTS[0].day).toBe('mon');
    expect(SHIFTS.at(-1)?.day).toBe('sun');
  });

  it('includes some full shifts and some with places', () => {
    expect(SHIFTS.some(s => s.spotsLeft === 0)).toBe(true);
    expect(SHIFTS.some(s => s.spotsLeft > 0)).toBe(true);
  });
});

describe('filterShifts', () => {
  it('returns everything with the default filter', () => {
    expect(filterShifts(SHIFTS, DEFAULT_FILTER)).toHaveLength(SHIFTS.length);
  });

  it('filters by role and by any of the chosen days', () => {
    const drivers = filterShifts(SHIFTS, {...DEFAULT_FILTER, role: 'driver'});
    expect(drivers.map(s => s.day)).toEqual(['mon', 'wed', 'fri', 'sat']);

    const weekend = filterShifts(SHIFTS, {...DEFAULT_FILTER, days: ['sat', 'sun']});
    expect(weekend.every(s => s.day === 'sat' || s.day === 'sun')).toBe(true);
    expect(weekend).toHaveLength(6);

    expect(filterShifts(SHIFTS, {role: 'breakfast', days: ['sat'], hideFull: false})).toEqual([]);
  });

  it('can hide full shifts', () => {
    const open = filterShifts(SHIFTS, {...DEFAULT_FILTER, hideFull: true});
    expect(open.every(s => s.spotsLeft > 0)).toBe(true);
    expect(open.length).toBeLessThan(SHIFTS.length);
  });

  it('toggles days and keeps them in week order', () => {
    expect(toggleDay(['fri'], 'mon', true)).toEqual(['mon', 'fri']);
    expect(toggleDay(['mon', 'fri'], 'mon', false)).toEqual(['fri']);
    expect(toggleDay(['mon'], 'mon', true)).toEqual(['mon']);
  });
});

describe('formatting', () => {
  it('formats 24h times for people', () => {
    expect(formatTime('07:15')).toBe('7:15 am');
    expect(formatTime('13:00')).toBe('1 pm');
    expect(formatTime('12:00')).toBe('12 pm');
    expect(formatTime('00:30')).toBe('12:30 am');
    expect(describeShift(SHIFTS[0])).toBe('Monday, 7:15 am to 8:45 am');
  });
});

describe('validateVolunteer', () => {
  const open = SHIFTS.find(s => s.spotsLeft > 0)!;
  const full = SHIFTS.find(s => s.spotsLeft === 0)!;
  const valid = {...EMPTY_VOLUNTEER, shiftId: open.id, name: 'Sam Example', email: 'sam@example.com', agreed: true};

  it('accepts a complete sign-up', () => {
    expect(validateVolunteer(valid)).toEqual({});
  });

  it('reports every missing answer', () => {
    expect(Object.keys(validateVolunteer(EMPTY_VOLUNTEER)).sort()).toEqual(['agreed', 'email', 'name', 'shiftId']);
  });

  it('rejects full or unknown shifts', () => {
    expect(validateVolunteer({...valid, shiftId: full.id}).shiftId).toMatch(/full/);
    expect(validateVolunteer({...valid, shiftId: 'nope'}).shiftId).toMatch(/Pick a shift/);
  });
});
