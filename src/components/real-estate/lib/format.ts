import type {ListingMode} from './data';

const gbp = new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP', maximumFractionDigits: 0});
const gbpPence = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatGBP(value: number): string {
  return gbp.format(Math.round(value));
}

export function formatGBPPence(value: number): string {
  return gbpPence.format(value);
}

/** Compact price for selectors: £350k, £1m, £1,250. */
export function formatShortPrice(value: number): string {
  if (value >= 1000000) {
    const m = value / 1000000;
    return `£${Number.isInteger(m) ? m : m.toFixed(1)}m`;
  }
  if (value >= 10000) return `£${Math.round(value / 1000)}k`;
  return formatGBP(value);
}

export function formatListingPrice(price: number, mode: ListingMode): string {
  return mode === 'rent' ? `${formatGBP(price)} pcm` : formatGBP(price);
}

export function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}
