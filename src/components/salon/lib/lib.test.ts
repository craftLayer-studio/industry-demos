import {describe, expect, it} from 'vitest';
import {openingHours, serviceById, services, specialists} from './data';
import {addDays, bookingWindow, dateProblem, isoWeekday} from './dates';
import {filterSpecialists} from './filter';
import {formatDuration, formatPrice} from './format';
import {giftAmount, validateGift, type GiftDraft} from './giftCard';
import {fittingStarts, generateSlots} from './slots';
import {ANY, stepError, validateContact, type AppointmentDraft} from './validation';

// 2026-11-14 is a Saturday.
const TODAY = '2026-11-14';
const TUESDAY = '2026-11-17';
const MONDAY = '2026-11-16';
const SATURDAY = '2026-11-21';

describe('dates', () => {
  it('knows the weekdays used in these tests', () => {
    expect(isoWeekday(TODAY)).toBe(6);
    expect(isoWeekday(MONDAY)).toBe(1);
    expect(isoWeekday(TUESDAY)).toBe(2);
  });

  it('allows tomorrow through 45 days ahead', () => {
    expect(bookingWindow(TODAY)).toEqual({min: '2026-11-15', max: '2026-12-29'});
    expect(dateProblem(TODAY, TODAY)).toBe('past');
    expect(dateProblem(addDays(TODAY, 46), TODAY)).toBe('too-far');
    expect(dateProblem('2026-11-15', TODAY)).toBeNull();
  });

  it('is closed on Mondays', () => {
    expect(dateProblem(MONDAY, TODAY)).toBe('closed');
  });

  it('respects a specialist’s working days', () => {
    // Iris works Tue, Wed, Thu, Sat.
    expect(dateProblem(TUESDAY, TODAY, [2, 3, 4, 6])).toBeNull();
    expect(dateProblem('2026-11-20', TODAY, [2, 3, 4, 6])).toBe('specialist-off');
  });

  it('rejects malformed dates', () => {
    expect(dateProblem('2026-02-30', TODAY)).toBe('invalid');
  });
});

describe('fittingStarts', () => {
  const tuesday = openingHours[2]; // 09:00-19:00

  it('ends every slot before closing time', () => {
    const starts = fittingStarts(tuesday, 60);
    expect(starts[0]).toBe(9 * 60);
    expect(starts.at(-1)).toBe(18 * 60);
    expect(starts).toHaveLength(19);
  });

  it('shrinks the day for longer services', () => {
    const starts = fittingStarts(tuesday, 180);
    expect(starts.at(-1)).toBe(16 * 60);
    expect(starts.every(m => m + 180 <= 19 * 60)).toBe(true);
  });

  it('handles odd durations on the 30 minute grid', () => {
    // 75 minutes: last start 17:30 ends 18:45; 18:00 would end 19:15.
    expect(fittingStarts(tuesday, 75).at(-1)).toBe(17 * 60 + 30);
  });

  it('uses Sunday’s shorter hours', () => {
    const starts = fittingStarts(openingHours[7], 90); // 10:00-16:00
    expect(starts[0]).toBe(10 * 60);
    expect(starts.at(-1)).toBe(14 * 60 + 30);
  });

  it('returns nothing when closed or the service cannot fit', () => {
    expect(fittingStarts(openingHours[1], 60)).toEqual([]);
    expect(fittingStarts({open: 600, close: 660}, 90)).toEqual([]);
    expect(fittingStarts(tuesday, 0)).toEqual([]);
  });
});

describe('generateSlots', () => {
  it('is deterministic and never runs past closing', () => {
    const a = generateSlots({iso: SATURDAY, today: TODAY, duration: 180, specialistId: 'mateo'});
    const b = generateSlots({iso: SATURDAY, today: TODAY, duration: 180, specialistId: 'mateo'});
    expect(a).toEqual(b);
    expect(a.length).toBeGreaterThanOrEqual(2);
    // Saturday closes at 17:00.
    expect(a.every(s => s.minutes + 180 <= 17 * 60)).toBe(true);
    expect(a.every(s => s.ends <= '17:00')).toBe(true);
  });

  it('returns no slots on Mondays or a specialist’s day off', () => {
    expect(generateSlots({iso: MONDAY, today: TODAY, duration: 60, specialistId: null})).toEqual([]);
    // Mateo does not work Tuesdays.
    expect(generateSlots({iso: TUESDAY, today: TODAY, duration: 60, specialistId: 'mateo'})).toEqual([]);
  });

  it('offers at least as many times for "any specialist"', () => {
    const one = generateSlots({iso: TUESDAY, today: TODAY, duration: 60, specialistId: 'iris'});
    const any = generateSlots({iso: TUESDAY, today: TODAY, duration: 60, specialistId: null, categoryIds: ['hair']});
    expect(any.length).toBeGreaterThanOrEqual(one.length);
    for (const s of one) expect(any.map(x => x.time)).toContain(s.time);
  });
});

describe('filterSpecialists', () => {
  it('filters by specialty', () => {
    expect(filterSpecialists(specialists, 'all')).toHaveLength(specialists.length);
    expect(filterSpecialists(specialists, 'spa').map(s => s.id)).toEqual(['tomas', 'wren']);
  });
});

describe('format', () => {
  it('formats durations and prices', () => {
    expect(formatDuration(45)).toBe('45 min');
    expect(formatDuration(60)).toBe('1 hr');
    expect(formatDuration(90)).toBe('1 hr 30 min');
    expect(formatPrice(68)).toBe('£68');
    expect(formatPrice(185, true)).toBe('from £185');
  });

  it('gives every service a duration that fits a Sunday', () => {
    for (const s of services) expect(fittingStarts(openingHours[7], s.duration).length).toBeGreaterThan(0);
  });
});

describe('gift card validation', () => {
  const base: GiftDraft = {
    amountChoice: '50',
    customAmount: null,
    recipientName: 'Sam',
    recipientEmail: '',
    senderName: 'Alex',
    message: '',
  };

  it('accepts a preset amount with names', () => {
    expect(validateGift(base)).toEqual({});
    expect(giftAmount(base)).toBe(50);
  });

  it('requires recipient and sender names', () => {
    const e = validateGift({...base, recipientName: '  ', senderName: ''});
    expect(e.recipientName).toBeDefined();
    expect(e.senderName).toBeDefined();
  });

  it('checks the custom amount range and whole pounds', () => {
    expect(validateGift({...base, amountChoice: 'custom', customAmount: null}).customAmount).toBeDefined();
    expect(validateGift({...base, amountChoice: 'custom', customAmount: 10}).customAmount).toMatch(/between/);
    expect(validateGift({...base, amountChoice: 'custom', customAmount: 501}).customAmount).toMatch(/between/);
    expect(validateGift({...base, amountChoice: 'custom', customAmount: 42.5}).customAmount).toMatch(/whole/);
    expect(validateGift({...base, amountChoice: 'custom', customAmount: 120})).toEqual({});
    expect(giftAmount({amountChoice: 'custom', customAmount: 120})).toBe(120);
  });

  it('only validates the email when given', () => {
    expect(validateGift({...base, recipientEmail: 'nope'}).recipientEmail).toBeDefined();
    expect(validateGift({...base, recipientEmail: 'sam@example.com'})).toEqual({});
  });

  it('limits the message length', () => {
    expect(validateGift({...base, message: 'x'.repeat(161)}).message).toBeDefined();
    expect(validateGift({...base, message: 'x'.repeat(160)})).toEqual({});
  });
});

describe('appointment validation', () => {
  const empty: AppointmentDraft = {service: null, specialist: null, date: null, time: null};

  it('requires a service, then a specialist or any', () => {
    expect(stepError('service', empty, TODAY)).toMatch(/service/);
    const withService = {...empty, service: 'signature-cut'};
    expect(stepError('service', withService, TODAY)).toBeNull();
    expect(stepError('specialist', withService, TODAY)).toMatch(/specialist/);
    expect(stepError('specialist', {...withService, specialist: ANY}, TODAY)).toBeNull();
    expect(stepError('specialist', {...withService, specialist: 'tomas'}, TODAY)).toMatch(/does not offer/);
  });

  it('rejects Mondays and dates outside the window', () => {
    const d = {...empty, service: 'signature-cut', specialist: ANY};
    expect(stepError('date', d, TODAY)).toMatch(/date/);
    expect(stepError('date', {...d, date: MONDAY}, TODAY)).toMatch(/Mondays/);
    expect(stepError('date', {...d, date: addDays(TODAY, 60)}, TODAY)).toMatch(/45 days/);
    expect(stepError('date', {...d, date: TUESDAY}, TODAY)).toBeNull();
  });

  it('only accepts a generated time', () => {
    const service = serviceById('balayage')!;
    const d = {...empty, service: service.id, specialist: 'mateo', date: SATURDAY};
    const slots = generateSlots({iso: SATURDAY, today: TODAY, duration: service.duration, specialistId: 'mateo'});
    expect(stepError('time', d, TODAY)).toMatch(/time/);
    expect(stepError('time', {...d, time: slots[0].time}, TODAY)).toBeNull();
    expect(stepError('time', {...d, time: '16:30'}, TODAY)).toMatch(/no longer available/);
  });

  it('validates contact details', () => {
    expect(validateContact({name: '', email: '', phone: '', notes: ''})).toEqual({
      name: expect.any(String),
      email: expect.any(String),
    });
    expect(validateContact({name: 'Jo', email: 'jo@example', phone: '', notes: ''}).email).toBeDefined();
    expect(validateContact({name: 'Jo', email: 'jo@example.com', phone: '12', notes: ''}).phone).toBeDefined();
    expect(validateContact({name: 'Jo', email: 'jo@example.com', phone: '555 0100 222', notes: ''})).toEqual({});
    expect(validateContact({name: 'Jo', email: 'jo@example.com', phone: '', notes: 'x'.repeat(301)}).notes).toBeDefined();
  });
});
