/**
 * Calendar helpers for the appointment request. Dates are ISO strings
 * (YYYY-MM-DD) handled in UTC so results never depend on the viewer's
 * time zone or daylight-saving changes.
 */
import {openingHours} from './data';

export const BOOKING_WINDOW_DAYS = 45;

const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseISODate(iso: string): Date | null {
  const m = ISO_RE.exec(iso);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return d.toISOString().slice(0, 10) === iso ? d : null;
}

/** The viewer's local calendar date as an ISO string. */
export function localISO(now: Date = new Date()): string {
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

/** ISO weekday: 1 = Monday ... 7 = Sunday. */
export function isoWeekday(iso: string): number {
  const d = parseISODate(iso);
  if (!d) throw new Error(`Invalid ISO date: ${iso}`);
  const day = d.getUTCDay();
  return day === 0 ? 7 : day;
}

/** First and last requestable dates: tomorrow through today + 45 days. */
export function bookingWindow(today: string): {min: string; max: string} {
  return {min: addDays(today, 1), max: addDays(today, BOOKING_WINDOW_DAYS)};
}

export type DateProblem = 'invalid' | 'past' | 'too-far' | 'closed' | 'specialist-off';

export function dateProblem(iso: string, today: string, specialistDays?: readonly number[]): DateProblem | null {
  if (!parseISODate(iso) || !parseISODate(today)) return 'invalid';
  const {min, max} = bookingWindow(today);
  if (iso < min) return 'past';
  if (iso > max) return 'too-far';
  const wd = isoWeekday(iso);
  if (!openingHours[wd]) return 'closed';
  if (specialistDays && !specialistDays.includes(wd)) return 'specialist-off';
  return null;
}

export function isBookableDate(iso: string, today: string, specialistDays?: readonly number[]): boolean {
  return dateProblem(iso, today, specialistDays) === null;
}

export const DATE_PROBLEM_MESSAGES: Record<DateProblem, string> = {
  invalid: 'Enter a valid date.',
  past: 'Choose a date from tomorrow onwards.',
  'too-far': `Choose a date within the next ${BOOKING_WINDOW_DAYS} days.`,
  closed: 'The studio is closed on Mondays. Choose another day.',
  'specialist-off': 'Your chosen specialist does not work that day. Choose another day or “Any specialist”.',
};

export function formatLongDate(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  return new Intl.DateTimeFormat('en-GB', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'}).format(d);
}
