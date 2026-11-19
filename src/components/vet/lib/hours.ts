import {dayNames, type DayHours} from './data';

export type OpenStatus =
  | {isOpen: true; closesAt: number; label: string}
  | {isOpen: false; nextOpenDay: number | null; nextOpenAt: number | null; label: string};

/** Formats minutes from midnight as a 12-hour time, e.g. 1110 -> "6:30pm". */
export function formatMinutes(minutes: number): string {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const suffix = h24 < 12 ? 'am' : 'pm';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, '0')}${suffix}`;
}

export function formatDayHours(hours: DayHours): string {
  return hours ? `${formatMinutes(hours.open)} to ${formatMinutes(hours.close)}` : 'Closed';
}

/**
 * Whether the practice is open at `now` (read in the viewer's local time),
 * and when it next closes or opens. Opening is inclusive, closing exclusive.
 */
export function getOpenStatus(now: Date, week: readonly DayHours[]): OpenStatus {
  const day = now.getDay();
  const minute = now.getHours() * 60 + now.getMinutes();
  const today = week[day];

  if (today && minute >= today.open && minute < today.close) {
    return {isOpen: true, closesAt: today.close, label: `Open now, closes at ${formatMinutes(today.close)}`};
  }

  if (today && minute < today.open) {
    return {
      isOpen: false,
      nextOpenDay: day,
      nextOpenAt: today.open,
      label: `Closed now, opens today at ${formatMinutes(today.open)}`,
    };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const d = (day + offset) % 7;
    const h = week[d];
    if (h) {
      const when = offset === 1 ? 'tomorrow' : dayNames[d];
      return {
        isOpen: false,
        nextOpenDay: d,
        nextOpenAt: h.open,
        label: `Closed now, opens ${when} at ${formatMinutes(h.open)}`,
      };
    }
  }

  return {isOpen: false, nextOpenDay: null, nextOpenAt: null, label: 'Closed'};
}
