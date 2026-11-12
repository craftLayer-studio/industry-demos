/**
 * Date helpers for the booking flow. All dates are ISO calendar strings
 * (YYYY-MM-DD) handled in UTC so results never depend on the viewer's time
 * zone or daylight-saving changes.
 */

export const BOOKING_WINDOW_DAYS = 60;

const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseISODate(iso: string): Date | null {
  const m = ISO_RE.exec(iso);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  // Reject overflowed dates such as 2026-02-30.
  return d.toISOString().slice(0, 10) === iso ? d : null;
}

export function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
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
  return toISODate(d);
}

/** ISO weekday: 1 = Monday … 7 = Sunday. */
export function isoWeekday(iso: string): number {
  const d = parseISODate(iso);
  if (!d) throw new Error(`Invalid ISO date: ${iso}`);
  const day = d.getUTCDay();
  return day === 0 ? 7 : day;
}

export function isWeekday(iso: string): boolean {
  return isoWeekday(iso) <= 5;
}

/** First and last requestable dates: tomorrow through today + 60 days. */
export function bookingWindow(today: string): {min: string; max: string} {
  return {min: addDays(today, 1), max: addDays(today, BOOKING_WINDOW_DAYS)};
}

export type DateProblem = 'invalid' | 'past' | 'too-far' | 'weekend' | 'clinician-off';

/**
 * Why a date cannot be requested, or null when it can. `clinicianDays`
 * (ISO weekdays) narrows it to the days a clinician works.
 */
export function dateProblem(iso: string, today: string, clinicianDays?: readonly number[]): DateProblem | null {
  if (!parseISODate(iso) || !parseISODate(today)) return 'invalid';
  const {min, max} = bookingWindow(today);
  if (iso < min) return 'past';
  if (iso > max) return 'too-far';
  if (!isWeekday(iso)) return 'weekend';
  if (clinicianDays && !clinicianDays.includes(isoWeekday(iso))) return 'clinician-off';
  return null;
}

export function isBookableDate(iso: string, today: string, clinicianDays?: readonly number[]): boolean {
  return dateProblem(iso, today, clinicianDays) === null;
}

export function formatLongDate(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}
