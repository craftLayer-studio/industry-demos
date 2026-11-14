/**
 * Deterministic sample cohort schedule. Every live course starts a new cohort
 * every four weeks on a Monday, offset within a fixed cycle that began on
 * CYCLE_ANCHOR. Given "today", the upcoming starts are always the same, so
 * the calendar is reproducible and testable. All arithmetic is in UTC.
 */
import type {Course} from './data';

export const CYCLE_ANCHOR = '2026-01-05'; // a Monday
export const CYCLE_WEEKS = 4;
const DAY_MS = 24 * 60 * 60 * 1000;

export type CohortStart = {courseId: string; date: string};

function toUTC(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

function toISO(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  return toISO(toUTC(iso) + days * DAY_MS);
}

/** The viewer's local calendar date as YYYY-MM-DD. */
export function localTodayISO(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** The next `count` cohort start dates strictly after `today` for one live course. */
export function upcomingStarts(course: Course, today: string, count = 3): string[] {
  if (course.format !== 'live' || course.cycleOffset === undefined) return [];
  const first = toUTC(CYCLE_ANCHOR) + course.cycleOffset * 7 * DAY_MS;
  const period = CYCLE_WEEKS * 7 * DAY_MS;
  const t = toUTC(today);
  let k = Math.max(0, Math.floor((t - first) / period));
  let start = first + k * period;
  while (start <= t) {
    k += 1;
    start = first + k * period;
  }
  const out: string[] = [];
  for (let i = 0; i < count; i += 1) out.push(toISO(start + i * period));
  return out;
}

/** All live cohort starts in the `weeks` after `today`, sorted by date then title order. */
export function cohortCalendar(list: readonly Course[], today: string, weeks = 8): CohortStart[] {
  const end = toUTC(addDays(today, weeks * 7));
  const starts: CohortStart[] = [];
  for (const course of list) {
    for (const date of upcomingStarts(course, today, weeks)) {
      if (toUTC(date) <= end) starts.push({courseId: course.id, date});
    }
  }
  return starts.sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? -1 : 1));
}

export function groupByMonth(starts: readonly CohortStart[]): {month: string; starts: CohortStart[]}[] {
  const groups: {month: string; starts: CohortStart[]}[] = [];
  for (const s of starts) {
    const month = s.date.slice(0, 7);
    const last = groups[groups.length - 1];
    if (last && last.month === month) last.starts.push(s);
    else groups.push({month, starts: [s]});
  }
  return groups;
}

// Hand-rolled formatting keeps output identical across browsers and ICU builds.
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function parts(iso: string) {
  const d = new Date(toUTC(iso));
  return {day: d.getUTCDate(), month: MONTHS[d.getUTCMonth()], year: d.getUTCFullYear(), weekday: WEEKDAYS[d.getUTCDay()]};
}

/** e.g. "Mon 7 December 2026" */
export function formatLongDate(iso: string): string {
  const p = parts(iso);
  return `${p.weekday} ${p.day} ${p.month} ${p.year}`;
}
/** "2026-12" to "December 2026" */
export function formatMonth(isoMonth: string): string {
  const p = parts(`${isoMonth}-01`);
  return `${p.month} ${p.year}`;
}
export function formatDay(iso: string): {day: string; weekday: string} {
  const p = parts(iso);
  return {day: String(p.day), weekday: p.weekday};
}

export type CohortOption = {value: string; label: string};

/** Preferred-start choices for the enquiry form. `today` is null before hydration. */
export function cohortOptions(course: Course | undefined, today: string | null): CohortOption[] {
  const notSure = {value: 'not-sure', label: 'Not sure yet'};
  if (!course) return [];
  if (course.format === 'self-paced') {
    return [{value: 'anytime', label: 'Start any time (self-paced)'}, notSure];
  }
  const dates = today ? upcomingStarts(course, today, 3) : [];
  return [
    ...dates.map(d => ({value: d, label: `Cohort starting ${formatLongDate(d)}`})),
    {value: 'later', label: 'A later cohort'},
    notSure,
  ];
}
