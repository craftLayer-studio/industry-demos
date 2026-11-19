/**
 * Sample availability and rate rules for The Saltmarsh concept demo.
 *
 * - Each room has a sample Sunday to Thursday nightly rate.
 * - Friday and Saturday nights carry a weekend uplift (25%).
 * - Any stay that includes a Saturday night needs at least 2 nights; some
 *   rooms have a higher minimum of their own.
 * - Stays are 1 to 14 nights, for up to the room's guest capacity.
 * - Breakfast is an optional add-on per guest per night.
 * - Availability is a deterministic sample pattern, not live inventory.
 *
 * Every figure is illustrative: nothing here is a real price or a real room.
 */
import {roomById, type Room} from './data';
import {daysBetween, isISODate, stayNights, weekdayOf} from './dates';

export const WEEKEND_UPLIFT = 0.25;
export const WEEKEND_MIN_NIGHTS = 2;
export const MAX_NIGHTS = 14;
export const BREAKFAST_PER_GUEST = 18;

/** Friday (5) and Saturday (6) nights. */
export function isWeekendNight(iso: string): boolean {
  const d = weekdayOf(iso);
  return d === 5 || d === 6;
}

export function nightlyRate(room: Room, iso: string): number {
  return isWeekendNight(iso) ? Math.round(room.baseRate * (1 + WEEKEND_UPLIFT)) : room.baseRate;
}

/** Small stable string hash (FNV-1a). */
function hash(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/**
 * Sample availability: roughly one night in eight is already "taken" for a
 * given room. The pattern is stable for a room and date, so the demo behaves
 * the same on every visit.
 */
export function isNightAvailable(roomId: string, iso: string): boolean {
  return hash(`${roomId}:${iso}`) % 8 !== 0;
}

/** Minimum nights for a stay in `room` covering `nights`. */
export function minimumNights(room: Room, nights: string[]): number {
  const hasSaturday = nights.some(n => weekdayOf(n) === 6);
  return Math.max(room.minNights, hasSaturday ? WEEKEND_MIN_NIGHTS : 1);
}

export type StayInput = {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  breakfast: boolean;
};

export type NightLine = {date: string; rate: number; isWeekend: boolean; isAvailable: boolean};

export type QuoteIssue =
  | {code: 'room'}
  | {code: 'dates'}
  | {code: 'order'}
  | {code: 'max-stay'; max: number}
  | {code: 'min-stay'; min: number; reason: 'weekend' | 'room'}
  | {code: 'capacity'; sleeps: number}
  | {code: 'unavailable'; dates: string[]};

export type Quote = {
  nights: NightLine[];
  roomSubtotal: number;
  weekendUplift: number;
  breakfastTotal: number;
  total: number;
  minNights: number;
  issues: QuoteIssue[];
  ok: boolean;
};

export function quoteStay(input: StayInput): Quote {
  const issues: QuoteIssue[] = [];
  const room = roomById(input.roomId);
  if (!room) issues.push({code: 'room'});

  const datesValid = isISODate(input.checkIn) && isISODate(input.checkOut);
  if (!datesValid) issues.push({code: 'dates'});

  const span = datesValid ? daysBetween(input.checkIn, input.checkOut) : 0;
  if (datesValid && span <= 0) issues.push({code: 'order'});
  if (datesValid && span > MAX_NIGHTS) issues.push({code: 'max-stay', max: MAX_NIGHTS});

  const dates = datesValid && span > 0 && span <= MAX_NIGHTS ? stayNights(input.checkIn, input.checkOut) : [];
  const nights: NightLine[] = room
    ? dates.map(date => ({
        date,
        rate: nightlyRate(room, date),
        isWeekend: isWeekendNight(date),
        isAvailable: isNightAvailable(room.id, date),
      }))
    : [];

  let minNights = room?.minNights ?? 1;
  if (room && dates.length > 0) {
    minNights = minimumNights(room, dates);
    if (dates.length < minNights) {
      issues.push({code: 'min-stay', min: minNights, reason: minNights > room.minNights ? 'weekend' : 'room'});
    }
  }

  if (room && input.guests > room.sleeps) issues.push({code: 'capacity', sleeps: room.sleeps});

  const taken = nights.filter(n => !n.isAvailable).map(n => n.date);
  if (taken.length > 0) issues.push({code: 'unavailable', dates: taken});

  const roomSubtotal = nights.reduce((sum, n) => sum + n.rate, 0);
  const weekendUplift = room ? nights.filter(n => n.isWeekend).reduce((sum, n) => sum + (n.rate - room.baseRate), 0) : 0;
  const breakfastTotal = input.breakfast ? nights.length * Math.max(1, input.guests) * BREAKFAST_PER_GUEST : 0;

  return {
    nights,
    roomSubtotal,
    weekendUplift,
    breakfastTotal,
    total: roomSubtotal + breakfastTotal,
    minNights,
    issues,
    ok: issues.length === 0,
  };
}

/** Plain-language message for a quote issue. */
export function issueMessage(issue: QuoteIssue, formatDate: (iso: string) => string = d => d): string {
  switch (issue.code) {
    case 'room':
      return 'Choose a room.';
    case 'dates':
      return 'Choose check-in and check-out dates.';
    case 'order':
      return 'Check-out must be after check-in.';
    case 'max-stay':
      return `Stays can be up to ${issue.max} nights in this demo.`;
    case 'min-stay':
      return issue.reason === 'weekend'
        ? `Stays that include a Saturday night need at least ${issue.min} nights.`
        : `This room needs a stay of at least ${issue.min} nights.`;
    case 'capacity':
      return `This room sleeps up to ${issue.sleeps} ${issue.sleeps === 1 ? 'guest' : 'guests'}.`;
    case 'unavailable':
      return issue.dates.length === 1
        ? `The night of ${formatDate(issue.dates[0])} is already taken (sample availability).`
        : `${issue.dates.length} nights are already taken (sample availability): ${issue.dates.map(formatDate).join(', ')}.`;
  }
}

export type RoomStayStatus = 'no-dates' | 'available' | 'unavailable' | 'too-small' | 'min-stay' | 'invalid';

/** A room card's one-line status for the current search. */
export function roomStayStatus(room: Room, checkIn: string, checkOut: string, guests: number): {status: RoomStayStatus; total: number; nights: number} {
  if (!checkIn || !checkOut) return {status: 'no-dates', total: 0, nights: 0};
  const q = quoteStay({roomId: room.id, checkIn, checkOut, guests, breakfast: false});
  const codes = q.issues.map(i => i.code);
  let status: RoomStayStatus = 'available';
  if (codes.includes('dates') || codes.includes('order') || codes.includes('max-stay')) status = 'invalid';
  else if (codes.includes('capacity')) status = 'too-small';
  else if (codes.includes('unavailable')) status = 'unavailable';
  else if (codes.includes('min-stay')) status = 'min-stay';
  return {status, total: q.roomSubtotal, nights: q.nights.length};
}

/** Availability for `days` consecutive nights starting at `from`. */
export function availabilityStrip(room: Room, from: string, days = 14): NightLine[] {
  return stayNights(from, addDaysSafe(from, days)).map(date => ({
    date,
    rate: nightlyRate(room, date),
    isWeekend: isWeekendNight(date),
    isAvailable: isNightAvailable(room.id, date),
  }));
}

function addDaysSafe(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function formatGBP(amount: number): string {
  return `£${amount.toLocaleString('en-GB')}`;
}
