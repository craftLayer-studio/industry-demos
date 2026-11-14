import {describe, expect, it} from 'vitest';
import {COFFEES, DEFAULT_FILTERS, filterAndSort, formatMoney, isFiltered, matchesFilters, sortCoffees} from './catalog';
import {
  FREE_SHIPPING_FROM,
  MAX_QTY,
  SHIPPING_FEE,
  cartReducer,
  cartTotals,
  itemCount,
  lineKey,
  unitPrice,
  type CartLine,
} from './cart';
import {DEFAULT_SUBSCRIPTION, quoteSubscription} from './subscription';
import {GUIDES, clamp, coffeeFor, waterFor} from './brew';
import {EMPTY_WHOLESALE, firstError, hasErrors, isEmail, validateCheckout, validateWholesale, WHOLESALE_ORDER} from './validation';

describe('catalogue filtering and sorting', () => {
  it('has eight coffees with unique ids', () => {
    expect(COFFEES).toHaveLength(8);
    expect(new Set(COFFEES.map(c => c.id)).size).toBe(8);
  });

  it('returns everything with default filters, in featured order', () => {
    const list = filterAndSort(COFFEES, DEFAULT_FILTERS, 'featured');
    expect(list.map(c => c.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(isFiltered(DEFAULT_FILTERS)).toBe(false);
  });

  it('filters by roast and process', () => {
    const light = filterAndSort(COFFEES, {...DEFAULT_FILTERS, roast: 'light'}, 'featured');
    expect(light.every(c => c.roast === 'light')).toBe(true);
    expect(light.map(c => c.id)).toEqual(['lantern', 'tidewater']);
    const honey = filterAndSort(COFFEES, {...DEFAULT_FILTERS, process: 'honey'}, 'featured');
    expect(honey.map(c => c.id)).toEqual(['saltmarsh']);
  });

  it('matches any selected tasting-note family', () => {
    const f = {...DEFAULT_FILTERS, families: ['floral' as const, 'spice' as const]};
    expect(filterAndSort(COFFEES, f, 'name').map(c => c.id)).toEqual(['hollow-pine', 'lantern']);
  });

  it('combines filters and can produce an empty result', () => {
    const f = {roast: 'dark' as const, process: 'honey' as const, families: []};
    expect(filterAndSort(COFFEES, f, 'featured')).toEqual([]);
    expect(isFiltered(f)).toBe(true);
    expect(matchesFilters(COFFEES[0], {...DEFAULT_FILTERS, roast: 'dark'})).toBe(false);
  });

  it('sorts by price both ways and by name without mutating input', () => {
    const before = COFFEES.map(c => c.id);
    const asc = sortCoffees(COFFEES, 'price-asc').map(c => c.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    const desc = sortCoffees(COFFEES, 'price-desc');
    expect(desc[0].id).toBe('tidewater');
    const names = sortCoffees(COFFEES, 'name').map(c => c.name);
    expect(names[0]).toBe('Copper Kettle');
    expect(COFFEES.map(c => c.id)).toEqual(before);
  });

  it('formats cents as dollars', () => {
    expect(formatMoney(1900)).toBe('$19.00');
    expect(formatMoney(3515)).toBe('$35.15');
  });
});

describe('cart maths', () => {
  const lantern = COFFEES.find(c => c.id === 'lantern')!;

  it('prices bag sizes with rounding to 5 cents', () => {
    expect(unitPrice(lantern, '250g')).toBe(1900);
    expect(unitPrice(lantern, '500g')).toBe(3515);
    expect(unitPrice(lantern, '1kg')).toBe(6460);
  });

  it('merges identical lines and keeps variants separate', () => {
    let cart: CartLine[] = [];
    cart = cartReducer(cart, {type: 'add', coffeeId: 'lantern', size: '250g', grind: 'whole', qty: 1});
    cart = cartReducer(cart, {type: 'add', coffeeId: 'lantern', size: '250g', grind: 'whole', qty: 2});
    cart = cartReducer(cart, {type: 'add', coffeeId: 'lantern', size: '250g', grind: 'filter', qty: 1});
    expect(cart).toHaveLength(2);
    expect(cart[0].qty).toBe(3);
    expect(itemCount(cart)).toBe(4);
  });

  it('clamps quantity and removes a line at zero', () => {
    const key = lineKey('night-ferry', '1kg', 'espresso');
    let cart = cartReducer([], {type: 'add', coffeeId: 'night-ferry', size: '1kg', grind: 'espresso', qty: 4});
    cart = cartReducer(cart, {type: 'setQty', key, qty: 99});
    expect(cart[0].qty).toBe(MAX_QTY);
    cart = cartReducer(cart, {type: 'setQty', key, qty: 0});
    expect(cart).toEqual([]);
  });

  it('charges shipping below the threshold and waives it at or above', () => {
    const one = cartReducer([], {type: 'add', coffeeId: 'lantern', size: '250g', grind: 'whole', qty: 1});
    const t1 = cartTotals(one);
    expect(t1).toEqual({subtotal: 1900, shipping: SHIPPING_FEE, total: 1900 + SHIPPING_FEE, toFreeShipping: FREE_SHIPPING_FROM - 1900});
    const three = cartReducer(one, {type: 'setQty', key: one[0].key, qty: 3});
    const t3 = cartTotals(three);
    expect(t3.subtotal).toBe(5700);
    expect(t3.shipping).toBe(0);
    expect(t3.total).toBe(5700);
    expect(t3.toFreeShipping).toBe(0);
  });

  it('has a zero total for an empty cart', () => {
    expect(cartTotals([])).toMatchObject({subtotal: 0, shipping: 0, total: 0});
    expect(cartReducer([{key: 'x', coffeeId: 'lantern', size: '250g', grind: 'whole', qty: 1}], {type: 'clear'})).toEqual([]);
  });
});

describe('subscription pricing', () => {
  it('applies the 10% sample discount per bag', () => {
    const q = quoteSubscription(DEFAULT_SUBSCRIPTION);
    expect(q.listPerBag).toBe(1650);
    expect(q.perBag).toBe(1485);
    expect(q.perDelivery).toBe(1485);
    expect(q.deliveriesPerYear).toBe(26);
    expect(q.monthly).toBe(Math.round((1485 * 26) / 12));
    expect(q.savingPerDelivery).toBe(165);
  });

  it('scales with bag size, bag count and frequency', () => {
    const q = quoteSubscription({style: 'bright', size: '500g', bags: 2, frequency: 'weekly', grind: 'filter'});
    // 1900 * 1.85 = 3515; 3515 * 0.9 = 3163.5 -> 3165
    expect(q.listPerBag).toBe(3515);
    expect(q.perBag).toBe(3165);
    expect(q.perDelivery).toBe(6330);
    expect(q.monthly).toBe(Math.round((6330 * 52) / 12));
  });

  it('monthly frequency equals per-delivery and bags are clamped', () => {
    const q = quoteSubscription({style: 'rich', size: '1kg', bags: 9, frequency: 'monthly', grind: 'espresso'});
    expect(q.perDelivery).toBe(q.perBag * 3);
    expect(q.monthly).toBe(q.perDelivery);
  });
});

describe('brew ratio', () => {
  it('converts coffee to water and back', () => {
    expect(waterFor(18, 16)).toBe(288);
    expect(coffeeFor(250, 15)).toBe(16.7);
    expect(waterFor(18, 2)).toBe(36);
    expect(coffeeFor(waterFor(20, 16), 16)).toBe(20);
  });

  it('returns 0 for invalid input and clamps', () => {
    expect(waterFor(0, 16)).toBe(0);
    expect(coffeeFor(300, 0)).toBe(0);
    expect(waterFor(Number.NaN, 16)).toBe(0);
    expect(clamp(500, {min: 1, max: 100})).toBe(100);
    expect(clamp(Number.NaN, {min: 1, max: 100})).toBe(1);
  });

  it('has a guide for each method with steps', () => {
    expect(GUIDES.map(g => g.method)).toEqual(['pour-over', 'immersion', 'espresso']);
    expect(GUIDES.every(g => g.steps.length >= 5)).toBe(true);
  });
});

describe('form validation', () => {
  it('flags every required wholesale field when empty', () => {
    const e = validateWholesale(EMPTY_WHOLESALE);
    expect(Object.keys(e).sort()).toEqual(['business', 'consent', 'email', 'name', 'type', 'volume']);
    expect(firstError(e, WHOLESALE_ORDER)).toBe('business');
    expect(hasErrors(e)).toBe(true);
  });

  it('accepts a complete wholesale enquiry', () => {
    const e = validateWholesale({
      business: 'Harbour Corner Café',
      name: 'Sam Example',
      email: 'sam@example.com',
      type: 'cafe',
      volume: '5-15',
      message: '',
      consent: true,
    });
    expect(e).toEqual({});
    expect(hasErrors(e)).toBe(false);
  });

  it('rejects bad emails, unknown options and long messages', () => {
    const e = validateWholesale({
      ...EMPTY_WHOLESALE,
      business: 'Ok Co',
      name: 'Al',
      email: 'not-an-email',
      type: 'spaceship',
      volume: '5-15',
      message: 'x'.repeat(601),
      consent: true,
    });
    expect(e.email).toMatch(/example\.com/);
    expect(e.type).toBeDefined();
    expect(e.message).toBeDefined();
    expect(isEmail(' a@b.co ')).toBe(true);
  });

  it('validates the demo checkout', () => {
    expect(validateCheckout({name: '', email: ''})).toEqual({name: 'Enter your name.', email: 'Enter an email address.'});
    expect(validateCheckout({name: 'Jo', email: 'jo@example.com'})).toEqual({});
  });
});
