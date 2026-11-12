import {describe, expect, it} from 'vitest';
import {EMPTY_FILTER, MENU, filterMenu, formatMoney, formatPrice, isFiltered, type Dish} from './menu';

const sample: Dish[] = [
  {id: 'a', name: 'Charred leeks', description: 'Hazelnut romesco', price: 1400, category: 'starters', diets: ['vegetarian', 'vegan', 'gluten-free']},
  {id: 'b', name: 'Burrata', description: 'Blood orange, sourdough', price: 1700, category: 'starters', diets: ['vegetarian']},
  {id: 'c', name: 'Trout', description: 'Celeriac purée, capers', price: 3400, category: 'mains', diets: []},
  {id: 'd', name: 'Risotto', description: 'Mushroom, parmesan', price: 2700, category: 'mains', diets: ['vegetarian', 'gluten-free']},
];

describe('filterMenu', () => {
  it('returns everything with the empty filter', () => {
    expect(filterMenu(sample, EMPTY_FILTER)).toHaveLength(4);
  });

  it('filters by category', () => {
    expect(filterMenu(sample, {...EMPTY_FILTER, category: 'mains'}).map((d) => d.id)).toEqual(['c', 'd']);
  });

  it('requires every selected diet (AND)', () => {
    expect(filterMenu(sample, {...EMPTY_FILTER, diets: ['vegetarian']}).map((d) => d.id)).toEqual(['a', 'b', 'd']);
    expect(filterMenu(sample, {...EMPTY_FILTER, diets: ['vegetarian', 'gluten-free']}).map((d) => d.id)).toEqual(['a', 'd']);
    expect(filterMenu(sample, {...EMPTY_FILTER, diets: ['vegan']}).map((d) => d.id)).toEqual(['a']);
  });

  it('searches name and description, case and accent insensitive, all words', () => {
    expect(filterMenu(sample, {...EMPTY_FILTER, query: 'PUREE'}).map((d) => d.id)).toEqual(['c']);
    expect(filterMenu(sample, {...EMPTY_FILTER, query: '  orange  burrata '}).map((d) => d.id)).toEqual(['b']);
    expect(filterMenu(sample, {...EMPTY_FILTER, query: 'orange trout'})).toEqual([]);
  });

  it('combines category, diet and search', () => {
    const result = filterMenu(sample, {category: 'starters', diets: ['vegan'], query: 'romesco'});
    expect(result.map((d) => d.id)).toEqual(['a']);
    expect(filterMenu(sample, {category: 'mains', diets: ['vegan'], query: ''})).toEqual([]);
  });

  it('does not mutate the input', () => {
    const copy = [...sample];
    filterMenu(sample, {...EMPTY_FILTER, category: 'mains'});
    expect(sample).toEqual(copy);
  });
});

describe('menu data', () => {
  it('has unique ids and positive integer prices', () => {
    expect(new Set(MENU.map((d) => d.id)).size).toBe(MENU.length);
    for (const dish of MENU) expect(Number.isInteger(dish.price) && dish.price > 0).toBe(true);
  });

  it('marks every vegan dish as vegetarian too', () => {
    for (const dish of MENU.filter((d) => d.diets.includes('vegan'))) expect(dish.diets).toContain('vegetarian');
  });
});

describe('helpers', () => {
  it('detects active filters', () => {
    expect(isFiltered(EMPTY_FILTER)).toBe(false);
    expect(isFiltered({...EMPTY_FILTER, query: '  '})).toBe(false);
    expect(isFiltered({...EMPTY_FILTER, diets: ['vegan']})).toBe(true);
  });

  it('formats prices', () => {
    expect(formatPrice(1400)).toBe('$14');
    expect(formatPrice(450)).toBe('$4.50');
    expect(formatMoney(1400)).toBe('$14.00');
    expect(formatMoney(5)).toBe('$0.05');
  });
});
