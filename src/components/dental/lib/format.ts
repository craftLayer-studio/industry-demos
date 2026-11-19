const whole = new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP', maximumFractionDigits: 0});
const pence = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPounds(value: number): string {
  return whole.format(value);
}

export function formatMoney(value: number): string {
  return pence.format(value);
}

/** "£70 to £110", or "Free to £50" when the range starts at zero. */
export function formatRange(from: number, to: number): string {
  const start = from === 0 ? 'Free' : formatPounds(from);
  return from === to ? start : `${start} to ${formatPounds(to)}`;
}
