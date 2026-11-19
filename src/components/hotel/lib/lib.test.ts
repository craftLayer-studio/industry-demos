import {describe, expect, it} from 'vitest';
import {rooms, roomById} from './data';
import {addDays, daysBetween, formatShortDate, nextFriday, parseISODate, stayNights, weekdayOf} from './dates';
import {
  BREAKFAST_PER_GUEST,
  availabilityStrip,
  isNightAvailable,
  isWeekendNight,
  issueMessage,
  minimumNights,
  nightlyRate,
  quoteStay,
  roomStayStatus,
} from './rates';
import {filterRooms, roomResultSummary} from './rooms';
import {EMPTY_CONTACT, hasErrors, validateBooking, type ContactDraft, type StayDraft} from './booking';

const tideline = roomById('tideline')!;
const boathouse = roomById('boathouse')!;

/** First run of `n` nights from `from` where `roomId` is free every night. */
function freeRun(roomId: string, from: string, n: number, weekday?: number): string {
  let start = from;
  for (let i = 0; i < 400; i++) {
    const ok = (weekday === undefined || weekdayOf(start) === weekday) && stayNights(start, addDays(start, n)).every(d => isNightAvailable(roomId, d));
    if (ok) return start;
    start = addDays(start, 1);
  }
  throw new Error('no free run found');
}

describe('dates', () => {
  it('parses only real ISO dates', () => {
    expect(parseISODate('2026-12-04')).not.toBeNull();
    expect(parseISODate('2026-02-30')).toBeNull();
    expect(parseISODate('4/12/2026')).toBeNull();
  });

  it('lists the nights of a stay, excluding check-out', () => {
    expect(stayNights('2026-12-04', '2026-12-07')).toEqual(['2026-12-04', '2026-12-05', '2026-12-06']);
    expect(stayNights('2026-12-04', '2026-12-04')).toEqual([]);
    expect(daysBetween('2026-12-31', '2027-01-02')).toBe(2);
  });

  it('finds the next Friday and formats dates', () => {
    expect(nextFriday('2026-11-19')).toBe('2026-11-20');
    expect(nextFriday('2026-12-04')).toBe('2026-12-04');
    expect(formatShortDate('2026-12-04')).toBe('Fri 4 Dec');
  });
});

describe('rates', () => {
  it('adds a 25% uplift on Friday and Saturday nights only', () => {
    expect(isWeekendNight('2026-12-04')).toBe(true); // Fri
    expect(isWeekendNight('2026-12-05')).toBe(true); // Sat
    expect(isWeekendNight('2026-12-06')).toBe(false); // Sun
    expect(nightlyRate(tideline, '2026-12-03')).toBe(195);
    expect(nightlyRate(tideline, '2026-12-04')).toBe(244); // 195 * 1.25 = 243.75, rounded
  });

  it('needs two nights when a stay includes a Saturday, and respects room minimums', () => {
    expect(minimumNights(tideline, ['2026-12-05'])).toBe(2);
    expect(minimumNights(tideline, ['2026-12-03'])).toBe(1);
    expect(minimumNights(boathouse, ['2026-12-03'])).toBe(3);
  });

  it('prices a clean weekday stay with breakfast', () => {
    const start = freeRun('tideline', '2027-01-04', 2, 1); // a Monday
    const q = quoteStay({roomId: 'tideline', checkIn: start, checkOut: addDays(start, 2), guests: 2, breakfast: true});
    expect(q.ok).toBe(true);
    expect(q.roomSubtotal).toBe(390);
    expect(q.weekendUplift).toBe(0);
    expect(q.breakfastTotal).toBe(2 * 2 * BREAKFAST_PER_GUEST);
    expect(q.total).toBe(390 + 72);
  });

  it('itemises the weekend uplift', () => {
    const start = freeRun('tideline', '2027-01-01', 2, 5); // a Friday
    const q = quoteStay({roomId: 'tideline', checkIn: start, checkOut: addDays(start, 2), guests: 1, breakfast: false});
    expect(q.ok).toBe(true);
    expect(q.nights.map(n => n.isWeekend)).toEqual([true, true]);
    expect(q.roomSubtotal).toBe(488);
    expect(q.weekendUplift).toBe(98);
  });

  it('flags a single Saturday night as too short', () => {
    const sat = freeRun('reedbed', '2027-01-02', 1, 6);
    const q = quoteStay({roomId: 'reedbed', checkIn: sat, checkOut: addDays(sat, 1), guests: 2, breakfast: false});
    expect(q.ok).toBe(false);
    expect(q.issues).toContainEqual({code: 'min-stay', min: 2, reason: 'weekend'});
    expect(issueMessage(q.issues[0])).toMatch(/Saturday night need at least 2 nights/);
  });

  it('flags capacity, order, length and missing details', () => {
    expect(quoteStay({roomId: 'tideline', checkIn: '2027-01-04', checkOut: '2027-01-05', guests: 3, breakfast: false}).issues).toContainEqual({code: 'capacity', sleeps: 2});
    expect(quoteStay({roomId: 'tideline', checkIn: '2027-01-05', checkOut: '2027-01-04', guests: 1, breakfast: false}).issues).toContainEqual({code: 'order'});
    expect(quoteStay({roomId: 'tideline', checkIn: '2027-01-04', checkOut: '2027-01-30', guests: 1, breakfast: false}).issues).toContainEqual({code: 'max-stay', max: 14});
    const empty = quoteStay({roomId: '', checkIn: '', checkOut: '', guests: 1, breakfast: false});
    expect(empty.issues.map(i => i.code)).toEqual(['room', 'dates']);
    expect(empty.total).toBe(0);
  });

  it('reports nights that are already taken in the sample pattern', () => {
    let taken = '2027-01-01';
    while (isNightAvailable('samphire', taken)) taken = addDays(taken, 1);
    const q = quoteStay({roomId: 'samphire', checkIn: taken, checkOut: addDays(taken, 3), guests: 2, breakfast: false});
    expect(q.issues.find(i => i.code === 'unavailable')).toMatchObject({dates: expect.arrayContaining([taken])});
  });

  it('keeps sample availability stable and mostly open', () => {
    const strip = availabilityStrip(tideline, '2027-03-01', 60);
    expect(strip).toHaveLength(60);
    const open = strip.filter(n => n.isAvailable).length;
    expect(open).toBeGreaterThan(40);
    expect(availabilityStrip(tideline, '2027-03-01', 60)).toEqual(strip);
  });

  it('summarises a room for the search', () => {
    expect(roomStayStatus(tideline, '', '', 2).status).toBe('no-dates');
    expect(roomStayStatus(tideline, '2027-01-04', '2027-01-05', 4).status).toBe('too-small');
    const start = freeRun('lookout', '2027-01-04', 3, 1);
    expect(roomStayStatus(roomById('lookout')!, start, addDays(start, 3), 4)).toMatchObject({status: 'available', nights: 3, total: 1020});
  });
});

describe('room filters', () => {
  it('filters by type, sea view and party size', () => {
    expect(filterRooms(rooms, {type: 'all', seaViewOnly: false, guests: 1})).toHaveLength(rooms.length);
    expect(filterRooms(rooms, {type: 'suite', seaViewOnly: false, guests: 1}).map(r => r.id)).toEqual(['samphire', 'lookout']);
    expect(filterRooms(rooms, {type: 'all', seaViewOnly: true, guests: 1}).every(r => r.view === 'sea')).toBe(true);
    expect(filterRooms(rooms, {type: 'all', seaViewOnly: false, guests: 4}).map(r => r.id)).toEqual(['lookout', 'boathouse']);
    expect(filterRooms(rooms, {type: 'cottage', seaViewOnly: true, guests: 1})).toEqual([]);
  });

  it('describes the result count', () => {
    expect(roomResultSummary(6, 6)).toBe('Showing all 6 sample rooms.');
    expect(roomResultSummary(2, 6)).toBe('Showing 2 of 6 sample rooms.');
    expect(roomResultSummary(0, 6)).toMatch(/No sample rooms/);
  });
});

describe('booking validation', () => {
  const today = '2026-11-19';
  const good: ContactDraft = {name: 'Sam Example', email: 'sam@example.com', phone: '', arrival: 'evening', requests: '', acknowledge: true};

  it('reports every missing field', () => {
    const stay: StayDraft = {roomId: '', checkIn: '', checkOut: '', guests: 1, breakfast: false};
    const e = validateBooking(stay, EMPTY_CONTACT, today);
    expect(Object.keys(e).sort()).toEqual(['acknowledge', 'arrival', 'checkIn', 'checkOut', 'email', 'name', 'roomId'].sort());
  });

  it('accepts a complete, valid request', () => {
    const start = freeRun('reedbed', '2026-12-07', 2, 1);
    const stay: StayDraft = {roomId: 'reedbed', checkIn: start, checkOut: addDays(start, 2), guests: 2, breakfast: true};
    expect(hasErrors(validateBooking(stay, good, today))).toBe(false);
  });

  it('rejects past dates, bad emails, short phones and rule breaks', () => {
    const stay: StayDraft = {roomId: 'boathouse', checkIn: '2026-11-01', checkOut: '2026-11-02', guests: 2, breakfast: false};
    const e = validateBooking(stay, {...good, email: 'sam@example', phone: '123'}, today);
    expect(e.checkIn).toBe('Check-in cannot be in the past.');
    expect(e.checkOut).toMatch(/at least 3 nights/);
    expect(e.email).toMatch(/name@example.com/);
    expect(e.phone).toMatch(/7 to 15 digits/);
  });

  it('puts the capacity rule on the guests field', () => {
    const start = freeRun('tideline', '2026-12-07', 1, 1);
    const e = validateBooking({roomId: 'tideline', checkIn: start, checkOut: addDays(start, 1), guests: 4, breakfast: false}, good, today);
    expect(e.guests).toBe('This room sleeps up to 2 guests.');
  });
});
