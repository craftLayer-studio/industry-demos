/**
 * Cart maths for the Brightwater concept shop. Money is held in whole cents.
 * Prices, bag-size multipliers and the shipping threshold are illustrative.
 */
import {COFFEES, type Coffee} from './catalog';

export type BagSize = '250g' | '500g' | '1kg';
export type Grind = 'whole' | 'filter' | 'espresso' | 'immersion' | 'cafetiere';

export const BAG_SIZES: {value: BagSize; label: string; multiplier: number}[] = [
  {value: '250g', label: '250 g', multiplier: 1},
  {value: '500g', label: '500 g', multiplier: 1.85},
  {value: '1kg', label: '1 kg', multiplier: 3.4},
];

export const GRINDS: {value: Grind; label: string}[] = [
  {value: 'whole', label: 'Whole bean'},
  {value: 'filter', label: 'Filter (pour-over)'},
  {value: 'immersion', label: 'Immersion (AeroPress-style)'},
  {value: 'cafetiere', label: 'Cafetière (coarse)'},
  {value: 'espresso', label: 'Espresso (fine)'},
];

export const MAX_QTY = 10;
/** Sample flat shipping fee and free-shipping threshold, in cents. */
export const SHIPPING_FEE = 550;
export const FREE_SHIPPING_FROM = 4500;

export type CartLine = {
  key: string;
  coffeeId: string;
  size: BagSize;
  grind: Grind;
  qty: number;
};

export function lineKey(coffeeId: string, size: BagSize, grind: Grind): string {
  return `${coffeeId}|${size}|${grind}`;
}

export function sizeMultiplier(size: BagSize): number {
  return BAG_SIZES.find(s => s.value === size)?.multiplier ?? 1;
}

/** Unit price for one bag, rounded to the nearest 5 cents. */
export function unitPrice(coffee: Pick<Coffee, 'price'>, size: BagSize): number {
  return Math.round((coffee.price * sizeMultiplier(size)) / 5) * 5;
}

export function clampQty(qty: number): number {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(MAX_QTY, Math.max(1, Math.round(qty)));
}

export type CartAction =
  | {type: 'add'; coffeeId: string; size: BagSize; grind: Grind; qty: number}
  | {type: 'setQty'; key: string; qty: number}
  | {type: 'remove'; key: string}
  | {type: 'clear'};

export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'add': {
      const key = lineKey(action.coffeeId, action.size, action.grind);
      const existing = state.find(l => l.key === key);
      if (existing) {
        return state.map(l => (l.key === key ? {...l, qty: clampQty(l.qty + action.qty)} : l));
      }
      return [
        ...state,
        {key, coffeeId: action.coffeeId, size: action.size, grind: action.grind, qty: clampQty(action.qty)},
      ];
    }
    case 'setQty':
      if (action.qty <= 0) return state.filter(l => l.key !== action.key);
      return state.map(l => (l.key === action.key ? {...l, qty: clampQty(action.qty)} : l));
    case 'remove':
      return state.filter(l => l.key !== action.key);
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function lineTotal(line: CartLine, catalog: Coffee[] = COFFEES): number {
  const coffee = catalog.find(c => c.id === line.coffeeId);
  return coffee ? unitPrice(coffee, line.size) * line.qty : 0;
}

export function itemCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export type CartTotals = {subtotal: number; shipping: number; total: number; toFreeShipping: number};

export function cartTotals(lines: CartLine[], catalog: Coffee[] = COFFEES): CartTotals {
  const subtotal = lines.reduce((sum, l) => sum + lineTotal(l, catalog), 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    toFreeShipping: subtotal === 0 ? FREE_SHIPPING_FROM : Math.max(0, FREE_SHIPPING_FROM - subtotal),
  };
}
