/**
 * Opening hours and time-slot generation. Pure: callers pass `now` explicitly
 * so the logic is deterministic and testable. Times are local, minutes since
 * midnight internally, 'HH:MM' strings at the edges.
 */

export type Interval = {open: number; close: number; label?: string};

/** Index 0 = Sunday, matching Date#getDay(). */
export const WEEKLY_HOURS: Interval[][] = [
  [
    {open: 11 * 60, close: 15 * 60, label: 'Brunch'},
    {open: 17 * 60, close: 21 * 60, label: 'Supper'},
  ],
  [],
  [{open: 17 * 60, close: 22 * 60}],
  [{open: 17 * 60, close: 22 * 60}],
  [{open: 17 * 60, close: 22 * 60}],
  [{open: 17 * 60, close: 23 * 60}],
  [{open: 17 * 60, close: 23 * 60}],
];

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Last table is seated this many minutes before close. */
export const LAST_SEATING_BEFORE_CLOSE = 60;
export const RESERVATION_STEP = 30;
export const PICKUP_STEP = 15;
/** Kitchen needs this long before the first pickup of a session and after "now". */
export const PICKUP_LEAD = 30;
export const BOOKING_WINDOW_DAYS = 60;

export function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function toTime(minutes: number): string {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

export function parseTime(value: string): number | null {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

/** 'HH:MM' (24h) to a friendly '6:30 pm'. */
export function formatTime(value: string | number): string {
  const minutes = typeof value === 'number' ? value : parseTime(value);
  if (minutes === null) return String(value);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${pad(m)} ${suffix}`;
}

export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Parses 'YYYY-MM-DD' as a local date; null for malformed or impossible dates. */
export function parseISODate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function formatDateShort(date: Date): string {
  return `${SHORT_DAYS[date.getDay()]} ${date.getDate()} ${SHORT_MONTHS[date.getMonth()]}`;
}

export function formatDateLong(date: Date): string {
  return `${DAY_NAMES[date.getDay()]}, ${date.getDate()} ${SHORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function hoursFor(date: Date): Interval[] {
  return WEEKLY_HOURS[date.getDay()];
}

export function isOpenDay(date: Date): boolean {
  return hoursFor(date).length > 0;
}

function minutesOf(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

/**
 * Reservation start times ('HH:MM') for a date. When `now` falls on that same
 * date, slots at or before the current time are dropped.
 */
export function reservationSlots(date: Date, now?: Date): string[] {
  const sameDay = now !== undefined && toISODate(now) === toISODate(date);
  const earliest = sameDay ? minutesOf(now) : -1;
  const slots: string[] = [];
  for (const {open, close} of hoursFor(date)) {
    for (let t = open; t <= close - LAST_SEATING_BEFORE_CLOSE; t += RESERVATION_STEP) {
      if (t > earliest) slots.push(toTime(t));
    }
  }
  return slots;
}

export type PickupSlot = {value: string; label: string};

/**
 * Pickup slots for the next service that still has room. Looks up to a week
 * ahead. Value format: 'YYYY-MM-DDTHH:MM'.
 */
export function pickupSlots(now: Date): PickupSlot[] {
  for (let offset = 0; offset < 8; offset += 1) {
    const day = addDays(now, offset);
    const earliest = offset === 0 ? minutesOf(now) + PICKUP_LEAD : -1;
    const slots: PickupSlot[] = [];
    for (const {open, close} of hoursFor(day)) {
      for (let t = open + PICKUP_LEAD; t <= close - PICKUP_LEAD; t += PICKUP_STEP) {
        if (t < earliest) continue;
        const dayLabel = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : formatDateShort(day);
        slots.push({value: `${toISODate(day)}T${toTime(t)}`, label: `${dayLabel}, ${formatTime(t)}`});
      }
    }
    if (slots.length > 0) return slots;
  }
  return [];
}

/** Human-readable weekly hours, grouping identical consecutive days (Mon-first). */
export function hoursSummary(): {days: string; hours: string}[] {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const describe = (intervals: Interval[]) =>
    intervals.length === 0
      ? 'Closed'
      : intervals
          .map((i) => `${i.label ? `${i.label} ` : ''}${formatTime(i.open)} – ${formatTime(i.close)}`)
          .join(' · ');
  const rows: {first: number; last: number; hours: string}[] = [];
  for (const day of order) {
    const hours = describe(WEEKLY_HOURS[day]);
    const prev = rows[rows.length - 1];
    if (prev && prev.hours === hours) prev.last = day;
    else rows.push({first: day, last: day, hours});
  }
  return rows.map(({first, last, hours}) => ({
    days: first === last ? DAY_NAMES[first] : `${DAY_NAMES[first]} – ${DAY_NAMES[last]}`,
    hours,
  }));
}
