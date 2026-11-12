import {isBookableDate} from './dates';

/**
 * Deterministic, fake availability. The same clinician + date always yields
 * the same slots, so the demo is stable across reloads and testable without
 * mocking randomness. Nothing here reflects real availability.
 */

export type Slot = {time: string; label: string};

const DAY_START = 9 * 60; // 09:00
const DAY_END = 17 * 60; // last slot starts before 17:00
const LUNCH_START = 12 * 60 + 30;
const LUNCH_END = 13 * 60 + 30;
const STEP = 30;

/** FNV-1a 32-bit hash: tiny, stable, good enough for spreading demo slots. */
export function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatTime(minutes: number): string {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

/** Every slot start time in a working day, before availability is applied. */
export function dayTemplate(): number[] {
  const out: number[] = [];
  for (let m = DAY_START; m < DAY_END; m += STEP) {
    if (m >= LUNCH_START && m < LUNCH_END) continue;
    out.push(m);
  }
  return out;
}

/**
 * Available slots for a clinician on a date. Returns [] when the date is not
 * bookable (past, weekend, beyond 60 days, or a day the clinician is off).
 * Roughly half the template is "taken", chosen by a per-slot hash, but at
 * least two slots stay free on any bookable day.
 */
export function generateSlots(
  clinicianId: string,
  iso: string,
  today: string,
  clinicianDays?: readonly number[],
): Slot[] {
  if (!isBookableDate(iso, today, clinicianDays)) return [];
  const template = dayTemplate();
  let free = template.filter(m => hashString(`${clinicianId}|${iso}|${m}`) % 100 >= 45);
  if (free.length < 2) {
    const seed = hashString(`${clinicianId}|${iso}`);
    const a = template[seed % template.length];
    const b = template[(seed + 5) % template.length];
    free = [...new Set([...free, a, b])].sort((x, y) => x - y);
  }
  return free.map(m => ({time: formatTime(m), label: formatTime(m)}));
}
