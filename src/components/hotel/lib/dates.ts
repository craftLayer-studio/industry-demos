/**
 * Calendar helpers for ISO date strings (YYYY-MM-DD). Everything runs in UTC
 * so results never depend on the viewer's time zone.
 */

const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseISODate(iso: string): Date | null {
  const m = ISO_RE.exec(iso);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return d.toISOString().slice(0, 10) === iso ? d : null;
}

export function isISODate(iso: string): boolean {
  return parseISODate(iso) !== null;
}

/** The viewer's local calendar date as an ISO string. */
export function localToday(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(iso: string, days: number): string {
  const d = parseISODate(iso);
  if (!d) throw new Error(`Invalid ISO date: ${iso}`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Whole days from `a` to `b` (negative when b is earlier). */
export function daysBetween(a: string, b: string): number {
  const da = parseISODate(a);
  const db = parseISODate(b);
  if (!da || !db) return NaN;
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}

/** 0 = Sunday ... 6 = Saturday. */
export function weekdayOf(iso: string): number {
  const d = parseISODate(iso);
  if (!d) throw new Error(`Invalid ISO date: ${iso}`);
  return d.getUTCDay();
}

/** The nights of a stay: every date from check-in up to, not including, check-out. */
export function stayNights(checkIn: string, checkOut: string): string[] {
  const n = daysBetween(checkIn, checkOut);
  if (!Number.isFinite(n) || n <= 0) return [];
  return Array.from({length: n}, (_, i) => addDays(checkIn, i));
}

/** The next Friday on or after `from` (a Friday returns itself). */
export function nextFriday(from: string): string {
  const offset = (5 - weekdayOf(from) + 7) % 7;
  return addDays(from, offset);
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function shortWeekday(iso: string): string {
  return WEEKDAYS[weekdayOf(iso)];
}

/** "Fri 4 Dec" */
export function formatShortDate(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  return `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

/** "Friday 4 Dec 2026" */
export function formatLongDate(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  return `${WEEKDAYS_LONG[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
