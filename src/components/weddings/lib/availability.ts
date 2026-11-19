/**
 * Sample date availability for the fictional Hollin Barn. The pattern is
 * fixed and deterministic (no real diary): it only demonstrates how an
 * availability view could look.
 */
import {daysInMonth, toISODate, weekdayOf} from './dates';

export type DateStatus = 'open' | 'limited' | 'booked' | 'closed';

/** The sample season shown in the availability view. */
export const SAMPLE_YEAR = 2027;
export const SAMPLE_MONTHS = [4, 5, 6, 7, 8, 9, 10] as const;

export const statusLabels: Record<DateStatus, string> = {
  open: 'Available',
  limited: 'On hold, ask us',
  booked: 'Booked',
  closed: 'No events',
};

/** FNV-1a hash of the ISO date, so the sample pattern looks irregular but never changes. */
function hash(iso: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < iso.length; i++) {
    h ^= iso.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  h ^= h >>> 13;
  h = Math.imul(h, 0x5bd1e995) >>> 0;
  h ^= h >>> 15;
  return (h >>> 0) % 100;
}

export function sampleStatus(iso: string): DateStatus {
  const month = Number(iso.slice(5, 7));
  const weekday = weekdayOf(iso);
  if (weekday === 1) return 'closed'; // Mondays: rest day for the barn
  const h = hash(iso);
  const peak = month >= 5 && month <= 9;
  if (weekday === 6) {
    // Saturdays: popular, especially in peak months.
    if (h < (peak ? 75 : 55)) return 'booked';
    return h < (peak ? 88 : 72) ? 'limited' : 'open';
  }
  if (weekday === 5 || weekday === 0) {
    if (h < (peak ? 45 : 25)) return 'booked';
    return h < (peak ? 62 : 40) ? 'limited' : 'open';
  }
  if (h < 12) return 'booked';
  return h < 20 ? 'limited' : 'open';
}

export type DayCell = {iso: string; day: number; weekday: number; status: DateStatus};

/** Weeks (Monday first) for a month. Leading/trailing slots are null. */
export function monthGrid(year: number, month: number): (DayCell | null)[][] {
  const total = daysInMonth(year, month);
  const cells: (DayCell | null)[] = [];
  const first = toISODate(new Date(Date.UTC(year, month - 1, 1)));
  const lead = (weekdayOf(first) + 6) % 7; // Monday = 0
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let day = 1; day <= total; day++) {
    const iso = toISODate(new Date(Date.UTC(year, month - 1, day)));
    cells.push({iso, day, weekday: weekdayOf(iso), status: sampleStatus(iso)});
  }
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (DayCell | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function monthSummary(year: number, month: number): Record<DateStatus, number> {
  const counts: Record<DateStatus, number> = {open: 0, limited: 0, booked: 0, closed: 0};
  for (let day = 1; day <= daysInMonth(year, month); day++) {
    counts[sampleStatus(toISODate(new Date(Date.UTC(year, month - 1, day))))] += 1;
  }
  return counts;
}

/** Open Saturdays in a month: the dates couples ask about first. */
export function openSaturdays(year: number, month: number): string[] {
  const out: string[] = [];
  for (let day = 1; day <= daysInMonth(year, month); day++) {
    const iso = toISODate(new Date(Date.UTC(year, month - 1, day)));
    if (weekdayOf(iso) === 6 && sampleStatus(iso) !== 'booked') out.push(iso);
  }
  return out;
}
