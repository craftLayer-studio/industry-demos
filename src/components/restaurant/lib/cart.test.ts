import {describe, expect, it} from 'vitest';
import {EMPTY_CART, MAX_QUANTITY, cartReducer, cartTotals, itemCount, quantityOf, type CartState} from './cart';

const leeks = {id: 'leeks', name: 'Charred leeks', price: 1400};
const cake = {id: 'cake', name: 'Olive oil cake', price: 1250};

function withItems(...items: (typeof leeks)[]): CartState {
  return items.reduce((state, item) => cartReducer(state, {type: 'add', item}), EMPTY_CART);
}

describe('cartReducer', () => {
  it('adds new lines and increments existing ones', () => {
    const state = withItems(leeks, cake, leeks);
    expect(state.lines).toEqual([
      {...leeks, quantity: 2},
      {...cake, quantity: 1},
    ]);
    expect(itemCount(state)).toBe(3);
    expect(quantityOf(state, 'leeks')).toBe(2);
    expect(quantityOf(state, 'missing')).toBe(0);
  });

  it('decrements and removes a line at zero', () => {
    let state = withItems(leeks, leeks);
    state = cartReducer(state, {type: 'decrement', id: 'leeks'});
    expect(quantityOf(state, 'leeks')).toBe(1);
    state = cartReducer(state, {type: 'decrement', id: 'leeks'});
    expect(state.lines).toEqual([]);
  });

  it('sets quantity with clamping and ignores non-finite values', () => {
    let state = withItems(leeks);
    state = cartReducer(state, {type: 'setQuantity', id: 'leeks', quantity: 4.7});
    expect(quantityOf(state, 'leeks')).toBe(4);
    state = cartReducer(state, {type: 'setQuantity', id: 'leeks', quantity: 999});
    expect(quantityOf(state, 'leeks')).toBe(MAX_QUANTITY);
    state = cartReducer(state, {type: 'setQuantity', id: 'leeks', quantity: Number.NaN});
    expect(state.lines).toEqual([]);
  });

  it('does not exceed the max when adding', () => {
    let state = withItems(leeks);
    for (let i = 0; i < 30; i += 1) state = cartReducer(state, {type: 'add', item: leeks});
    expect(quantityOf(state, 'leeks')).toBe(MAX_QUANTITY);
  });

  it('removes lines and clears the cart', () => {
    let state = withItems(leeks, cake);
    state = cartReducer(state, {type: 'remove', id: 'leeks'});
    expect(state.lines.map((l) => l.id)).toEqual(['cake']);
    expect(cartReducer(state, {type: 'clear'})).toEqual(EMPTY_CART);
  });

  it('does not mutate previous state', () => {
    const before = withItems(leeks);
    const snapshot = JSON.stringify(before);
    cartReducer(before, {type: 'add', item: leeks});
    expect(JSON.stringify(before)).toBe(snapshot);
  });
});

describe('cartTotals', () => {
  it('computes subtotal, rounded example tax and total in cents', () => {
    const state = withItems(leeks, leeks, cake);
    expect(cartTotals(state, 0.08)).toEqual({subtotal: 4050, tax: 324, total: 4374});
    expect(cartTotals(withItems(cake), 0.0875)).toEqual({subtotal: 1250, tax: 109, total: 1359});
  });

  it('is zero for an empty cart', () => {
    expect(cartTotals(EMPTY_CART)).toEqual({subtotal: 0, tax: 0, total: 0});
  });
});
