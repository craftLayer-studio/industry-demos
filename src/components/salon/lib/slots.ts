/**
 * Demo availability. Start times run from opening time to closing time minus
 * the service duration, so a treatment always finishes before the studio
 * closes. A stable hash marks some times as "taken" so the demo looks
 * plausible; the same inputs always produce the same slots. Nothing here
 * reflects real availability.
 */
import {openingHours, specialists, type DayHours} from './data';
import {isoWeekday, isBookableDate} from './dates';
import {formatTime} from './format';

export const SLOT_STEP = 30;

export type Slot = {time: string; minutes: number; ends: string};

/** FNV-1a 32-bit hash. */
export function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Every start time (minutes from midnight) that fits a service of `duration`
 * minutes inside the opening hours, on a `step`-minute grid.
 */
export function fittingStarts(hours: DayHours, duration: number, step = SLOT_STEP): number[] {
  if (!hours || duration <= 0) return [];
  const out: number[] = [];
  for (let m = hours.open; m + duration <= hours.close; m += step) out.push(m);
  return out;
}

function isTaken(key: string, minutes: number): boolean {
  return hashString(`${key}|${minutes}`) % 100 < 35;
}

/**
 * Bookable slots on `iso` for a service of `duration` minutes.
 * `specialistId` null means "any specialist": a time is free if any
 * specialist who offers the category and works that day is free.
 */
export function generateSlots(args: {
  iso: string;
  today: string;
  duration: number;
  specialistId: string | null;
  categoryIds?: readonly string[];
}): Slot[] {
  const {iso, today, duration, specialistId} = args;
  const specialist = specialistId ? specialists.find(s => s.id === specialistId) : undefined;
  if (!isBookableDate(iso, today, specialist?.days)) return [];
  const starts = fittingStarts(openingHours[isoWeekday(iso)], duration);
  if (starts.length === 0) return [];

  const team = specialist
    ? [specialist]
    : specialists.filter(
        s =>
          s.days.includes(isoWeekday(iso)) &&
          (!args.categoryIds || s.categories.some(c => args.categoryIds!.includes(c))),
      );
  if (team.length === 0) return [];

  let free = starts.filter(m => team.some(s => !isTaken(`${s.id}|${iso}`, m)));
  if (free.length < 2) {
    const seed = hashString(`${team[0].id}|${iso}`);
    free = [...new Set([...free, starts[seed % starts.length], starts[(seed + 3) % starts.length]])].sort(
      (a, b) => a - b,
    );
  }
  return free.map(m => ({time: formatTime(m), minutes: m, ends: formatTime(m + duration)}));
}
