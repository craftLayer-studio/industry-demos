const gbp = new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP', maximumFractionDigits: 0});

export function formatPrice(amount: number, isFrom = false): string {
  return `${isFrom ? 'from ' : ''}${gbp.format(amount)}`;
}

/** 45 -> "45 min", 60 -> "1 hr", 90 -> "1 hr 30 min". */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Minutes from midnight to "HH:MM". */
export function formatTime(minutes: number): string {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

/** Minutes from midnight to "9am", "1:30pm". */
export function formatClock(minutes: number): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 >= 12 ? 'pm' : 'am';
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0 ? `${h}${suffix}` : `${h}:${pad(m)}${suffix}`;
}

const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** ISO weekdays to "Tue, Wed, Sat". */
export function formatDays(days: readonly number[]): string {
  return days.map(d => DAY_SHORT[d - 1]).join(', ');
}
