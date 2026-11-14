import type {AreaId, ListingMode, Property} from './data';

export type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'newest' | 'beds-desc';

export type SearchFilters = {
  mode: ListingMode;
  area: AreaId | 'all';
  /** Inclusive lower bound in GBP (sale price or monthly rent); 0 = no minimum. */
  minPrice: number;
  /** Inclusive upper bound in GBP; 0 = no maximum. */
  maxPrice: number;
  /** Minimum bedrooms; 0 = any. */
  minBeds: number;
};

export const DEFAULT_FILTERS: SearchFilters = {mode: 'buy', area: 'all', minPrice: 0, maxPrice: 0, minBeds: 0};

export const sortOptions: {value: SortKey; label: string}[] = [
  {value: 'recommended', label: 'Recommended'},
  {value: 'newest', label: 'Newest first'},
  {value: 'price-asc', label: 'Price: low to high'},
  {value: 'price-desc', label: 'Price: high to low'},
  {value: 'beds-desc', label: 'Most bedrooms'},
];

/** Price steps offered in the min and max selectors for each mode. */
export const priceSteps: Record<ListingMode, number[]> = {
  buy: [250000, 300000, 350000, 400000, 500000, 600000, 750000, 1000000],
  rent: [750, 1000, 1250, 1500, 2000, 2500],
};

export const bedOptions = [0, 1, 2, 3, 4, 5];

export function matchesFilters(p: Property, f: SearchFilters): boolean {
  if (p.mode !== f.mode) return false;
  if (f.area !== 'all' && p.area !== f.area) return false;
  if (f.minPrice > 0 && p.price < f.minPrice) return false;
  if (f.maxPrice > 0 && p.price > f.maxPrice) return false;
  if (f.minBeds > 0 && p.beds < f.minBeds) return false;
  return true;
}

export function sortProperties(list: readonly Property[], sort: SortKey): Property[] {
  const out = [...list];
  const byRank = (a: Property, b: Property) => a.featuredRank - b.featuredRank;
  switch (sort) {
    case 'price-asc':
      return out.sort((a, b) => a.price - b.price || byRank(a, b));
    case 'price-desc':
      return out.sort((a, b) => b.price - a.price || byRank(a, b));
    case 'newest':
      return out.sort((a, b) => a.listedDaysAgo - b.listedDaysAgo || byRank(a, b));
    case 'beds-desc':
      return out.sort((a, b) => b.beds - a.beds || a.price - b.price);
    default:
      return out.sort(byRank);
  }
}

export function searchProperties(list: readonly Property[], f: SearchFilters, sort: SortKey): Property[] {
  return sortProperties(
    list.filter(p => matchesFilters(p, f)),
    sort,
  );
}

/** Number of filters that differ from "any" (the buy/rent mode is not counted). */
export function activeFilterCount(f: SearchFilters): number {
  return [f.area !== 'all', f.minPrice > 0, f.maxPrice > 0, f.minBeds > 0].filter(Boolean).length;
}

/**
 * Switching between buy and rent resets the price bounds, because sale
 * prices and monthly rents use different scales.
 */
export function withMode(f: SearchFilters, mode: ListingMode): SearchFilters {
  if (f.mode === mode) return f;
  return {...f, mode, minPrice: 0, maxPrice: 0};
}

/**
 * Set a price bound, clearing the opposite bound if the new value would make
 * the range impossible (for example a minimum above the maximum).
 */
export function withPriceBound(f: SearchFilters, bound: 'min' | 'max', value: number): SearchFilters {
  if (bound === 'min') {
    const clearMax = value > 0 && f.maxPrice > 0 && value > f.maxPrice;
    return {...f, minPrice: value, maxPrice: clearMax ? 0 : f.maxPrice};
  }
  const clearMin = value > 0 && f.minPrice > 0 && value < f.minPrice;
  return {...f, maxPrice: value, minPrice: clearMin ? 0 : f.minPrice};
}

export function resultSummary(count: number, mode: ListingMode): string {
  const noun = mode === 'buy' ? 'for sale' : 'to rent';
  if (count === 0) return `No sample homes ${noun} match these filters.`;
  return `${count} sample ${count === 1 ? 'home' : 'homes'} ${noun}.`;
}
