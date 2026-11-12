/** Pure mock-cart state. Nothing here talks to a server; amounts are in cents. */

export const MAX_QUANTITY = 20;
/** Illustrative only: not a real tax rate for any jurisdiction. */
export const EXAMPLE_TAX_RATE = 0.08;

export type CartLine = {id: string; name: string; price: number; quantity: number};
export type CartState = {lines: CartLine[]};

export type CartAction =
  | {type: 'add'; item: {id: string; name: string; price: number}}
  | {type: 'decrement'; id: string}
  | {type: 'setQuantity'; id: string; quantity: number}
  | {type: 'remove'; id: string}
  | {type: 'clear'};

export const EMPTY_CART: CartState = {lines: []};

function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 0;
  return Math.max(0, Math.min(MAX_QUANTITY, Math.floor(quantity)));
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.lines.find((line) => line.id === action.item.id);
      if (existing) {
        return {
          lines: state.lines.map((line) =>
            line.id === action.item.id ? {...line, quantity: clampQuantity(line.quantity + 1)} : line,
          ),
        };
      }
      return {lines: [...state.lines, {...action.item, quantity: 1}]};
    }
    case 'decrement': {
      return cartReducer(state, {
        type: 'setQuantity',
        id: action.id,
        quantity: (state.lines.find((line) => line.id === action.id)?.quantity ?? 0) - 1,
      });
    }
    case 'setQuantity': {
      const quantity = clampQuantity(action.quantity);
      if (quantity === 0) return {lines: state.lines.filter((line) => line.id !== action.id)};
      return {lines: state.lines.map((line) => (line.id === action.id ? {...line, quantity} : line))};
    }
    case 'remove':
      return {lines: state.lines.filter((line) => line.id !== action.id)};
    case 'clear':
      return EMPTY_CART;
    default:
      return state;
  }
}

export function itemCount(state: CartState): number {
  return state.lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function quantityOf(state: CartState, id: string): number {
  return state.lines.find((line) => line.id === id)?.quantity ?? 0;
}

export type CartTotals = {subtotal: number; tax: number; total: number};

export function cartTotals(state: CartState, taxRate: number = EXAMPLE_TAX_RATE): CartTotals {
  const subtotal = state.lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const tax = Math.round(subtotal * taxRate);
  return {subtotal, tax, total: subtotal + tax};
}
