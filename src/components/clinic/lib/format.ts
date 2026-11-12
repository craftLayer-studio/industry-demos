const DAY_NAMES = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_NAMES_LONG = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** [1, 2, 4] -> "Mon, Tue, Thu"; all five weekdays -> "Mon – Fri". */
export function formatDays(days: readonly number[], long = false): string {
  const sorted = [...days].sort((a, b) => a - b);
  const names = long ? DAY_NAMES_LONG : DAY_NAMES;
  if (sorted.join() === '1,2,3,4,5') return `${names[1]} to ${names[5]}`;
  return sorted.map(d => names[d]).join(', ');
}
