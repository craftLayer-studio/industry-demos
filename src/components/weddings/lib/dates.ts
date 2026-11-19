/** Small, timezone-safe ISO date helpers (YYYY-MM-DD, treated as UTC days). */

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isISODate(value: string | undefined | null): value is string {
  if (!value || !ISO_RE.test(value)) return false;
  const d = parseISODate(value);
  return !Number.isNaN(d.getTime()) && toISODate(d) === value;
}

export function parseISODate(value: string): Date {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function toISODate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(iso: string, n: number): string {
  const d = parseISODate(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return toISODate(d);
}

export function daysBetween(from: string, to: string): number {
  return Math.round((parseISODate(to).getTime() - parseISODate(from).getTime()) / 86_400_000);
}

/** 0 = Sunday ... 6 = Saturday. */
export function weekdayOf(iso: string): number {
  return parseISODate(iso).getUTCDay();
}

/** 1-12 */
export function monthOf(iso: string): number {
  return parseISODate(iso).getUTCMonth() + 1;
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** The viewer's local calendar date as ISO. */
export function localToday(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Convert a local Date (as handed to DateInput constraints) to ISO. */
export function localDateToISO(date: Date): string {
  return localToday(date);
}

const longFmt = new Intl.DateTimeFormat('en-GB', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'});
const monthFmt = new Intl.DateTimeFormat('en-GB', {month: 'long', year: 'numeric', timeZone: 'UTC'});

export function formatLongDate(iso: string): string {
  return longFmt.format(parseISODate(iso));
}

export function formatMonth(year: number, month: number): string {
  return monthFmt.format(new Date(Date.UTC(year, month - 1, 1)));
}
