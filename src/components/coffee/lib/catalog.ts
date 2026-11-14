/**
 * Brightwater Coffee sample catalogue. Every coffee, origin region and price
 * is fictional and illustrative: Brightwater is a concept demo, not a shop.
 * Origins are named only by country and region; no real farms, cooperatives
 * or people are referenced.
 */

export type Roast = 'light' | 'medium' | 'dark';
export type Process = 'washed' | 'natural' | 'honey' | 'wet-hulled';
export type NoteFamily = 'fruity' | 'floral' | 'chocolate' | 'nutty' | 'caramel' | 'spice';
export type Motif = 'sunrise' | 'road' | 'ferry' | 'tide' | 'kettle' | 'pines' | 'marsh' | 'firefly';

export type Coffee = {
  id: string;
  name: string;
  origin: string;
  region: string;
  process: Process;
  roast: Roast;
  /** 1 (lightest) to 5 (darkest), for the roast scale. */
  roastScale: 1 | 2 | 3 | 4 | 5;
  notes: string[];
  families: NoteFamily[];
  /** Sample price for a 250 g bag, in whole cents. */
  price: number;
  altitude: string;
  description: string;
  isDecaf?: boolean;
  motif: Motif;
  /** Label art palette: [label background, ink, highlight]. */
  palette: [string, string, string];
  /** Featured order for the default sort. */
  order: number;
};

export const ROAST_LABELS: Record<Roast, string> = {light: 'Light', medium: 'Medium', dark: 'Dark'};
export const PROCESS_LABELS: Record<Process, string> = {
  washed: 'Washed',
  natural: 'Natural',
  honey: 'Honey',
  'wet-hulled': 'Wet-hulled',
};
export const FAMILY_LABELS: Record<NoteFamily, string> = {
  fruity: 'Fruity',
  floral: 'Floral',
  chocolate: 'Chocolate',
  nutty: 'Nutty',
  caramel: 'Caramel and sugar',
  spice: 'Spice and earth',
};

export const COFFEES: Coffee[] = [
  {
    id: 'lantern',
    name: 'Lantern',
    origin: 'Ethiopia',
    region: 'Guji',
    process: 'washed',
    roast: 'light',
    roastScale: 1,
    notes: ['Jasmine', 'Bergamot', 'White peach'],
    families: ['floral', 'fruity'],
    price: 1900,
    altitude: '1,900 to 2,200 m',
    description: 'A bright, tea-like cup with a long floral finish. Our sample filter favourite for slow mornings.',
    motif: 'sunrise',
    palette: ['#F2BE7C', '#2A1A12', '#FFF1DC'],
    order: 1,
  },
  {
    id: 'ember-road',
    name: 'Ember Road',
    origin: 'Colombia',
    region: 'Huila',
    process: 'washed',
    roast: 'medium',
    roastScale: 3,
    notes: ['Caramel', 'Red apple', 'Cocoa'],
    families: ['caramel', 'fruity', 'chocolate'],
    price: 1600,
    altitude: '1,600 to 1,900 m',
    description: 'Round and sweet with a crisp apple edge. Works as well in a cafetière as it does in a flat white.',
    motif: 'road',
    palette: ['#C9552B', '#FFF1DC', '#F2BE7C'],
    order: 2,
  },
  {
    id: 'night-ferry',
    name: 'Night Ferry',
    origin: 'Brazil',
    region: 'Minas Gerais',
    process: 'natural',
    roast: 'dark',
    roastScale: 5,
    notes: ['Dark chocolate', 'Hazelnut', 'Molasses'],
    families: ['chocolate', 'nutty', 'caramel'],
    price: 1400,
    altitude: '1,000 to 1,250 m',
    description: 'Heavy body and low acidity for dense, syrupy espresso and milk drinks with plenty of backbone.',
    motif: 'ferry',
    palette: ['#24364A', '#F3E6D3', '#E3A35A'],
    order: 3,
  },
  {
    id: 'tidewater',
    name: 'Tidewater',
    origin: 'Kenya',
    region: 'Nyeri',
    process: 'washed',
    roast: 'light',
    roastScale: 2,
    notes: ['Blackcurrant', 'Grapefruit', 'Brown sugar'],
    families: ['fruity', 'caramel'],
    price: 2100,
    altitude: '1,700 to 1,900 m',
    description: 'Juicy and vivid, with a savoury-sweet depth that opens up as the cup cools.',
    motif: 'tide',
    palette: ['#8FC1CF', '#1A2A33', '#F3E6D3'],
    order: 4,
  },
  {
    id: 'copper-kettle',
    name: 'Copper Kettle',
    origin: 'Guatemala',
    region: 'Huehuetenango',
    process: 'washed',
    roast: 'medium',
    roastScale: 3,
    notes: ['Milk chocolate', 'Orange zest', 'Almond'],
    families: ['chocolate', 'fruity', 'nutty'],
    price: 1700,
    altitude: '1,500 to 1,800 m',
    description: 'A balanced, everyday coffee: chocolatey up front with a gentle citrus lift.',
    motif: 'kettle',
    palette: ['#B86A1C', '#1A100B', '#F8E2C6'],
    order: 5,
  },
  {
    id: 'hollow-pine',
    name: 'Hollow Pine',
    origin: 'Indonesia',
    region: 'Sumatra',
    process: 'wet-hulled',
    roast: 'dark',
    roastScale: 4,
    notes: ['Cedar', 'Cocoa nib', 'Clove'],
    families: ['spice', 'chocolate'],
    price: 1650,
    altitude: '1,200 to 1,500 m',
    description: 'Earthy and full, with woody spice. A cup for cold evenings and stovetop pots.',
    motif: 'pines',
    palette: ['#3F5B3A', '#F3E6D3', '#D9C27A'],
    order: 6,
  },
  {
    id: 'saltmarsh',
    name: 'Saltmarsh',
    origin: 'Costa Rica',
    region: 'Tarrazú',
    process: 'honey',
    roast: 'medium',
    roastScale: 2,
    notes: ['Honey', 'Apricot', 'Toasted almond'],
    families: ['caramel', 'fruity', 'nutty'],
    price: 1800,
    altitude: '1,400 to 1,800 m',
    description: 'Silky and sweet with stone fruit and a nutty close. Lovely as an AeroPress-style immersion brew.',
    motif: 'marsh',
    palette: ['#E8D3A8', '#3B2418', '#9DB38E'],
    order: 7,
  },
  {
    id: 'firefly-decaf',
    name: 'Firefly Decaf',
    origin: 'Peru',
    region: 'Cajamarca',
    process: 'washed',
    roast: 'medium',
    roastScale: 3,
    notes: ['Toffee', 'Cocoa', 'Plum'],
    families: ['caramel', 'chocolate', 'fruity'],
    price: 1700,
    altitude: '1,600 to 1,900 m',
    description: 'Decaffeinated with a water process in this concept, keeping a toffee sweetness for late cups.',
    isDecaf: true,
    motif: 'firefly',
    palette: ['#2E2440', '#F3E6D3', '#F2BE7C'],
    order: 8,
  },
];

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

export const SORT_OPTIONS: {value: SortKey; label: string}[] = [
  {value: 'featured', label: 'Featured'},
  {value: 'price-asc', label: 'Price: low to high'},
  {value: 'price-desc', label: 'Price: high to low'},
  {value: 'name', label: 'Name: A to Z'},
];

export type Filters = {
  roast: Roast | 'all';
  process: Process | 'all';
  /** Selected tasting-note families. A coffee matches if it has ANY of them. */
  families: NoteFamily[];
};

export const DEFAULT_FILTERS: Filters = {roast: 'all', process: 'all', families: []};

export function matchesFilters(coffee: Coffee, filters: Filters): boolean {
  if (filters.roast !== 'all' && coffee.roast !== filters.roast) return false;
  if (filters.process !== 'all' && coffee.process !== filters.process) return false;
  if (filters.families.length > 0 && !filters.families.some(f => coffee.families.includes(f))) return false;
  return true;
}

export function sortCoffees(list: Coffee[], sort: SortKey): Coffee[] {
  const copy = [...list];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy.sort((a, b) => a.order - b.order);
  }
}

export function filterAndSort(list: Coffee[], filters: Filters, sort: SortKey): Coffee[] {
  return sortCoffees(
    list.filter(c => matchesFilters(c, filters)),
    sort,
  );
}

export function isFiltered(filters: Filters): boolean {
  return filters.roast !== 'all' || filters.process !== 'all' || filters.families.length > 0;
}

export function getCoffee(id: string): Coffee | undefined {
  return COFFEES.find(c => c.id === id);
}

export function formatMoney(cents: number): string {
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(cents / 100);
}
