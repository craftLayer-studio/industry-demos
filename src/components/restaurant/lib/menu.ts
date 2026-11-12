/** Juniper Kitchen menu data and pure filtering logic. All dishes are fictional. */

export type Category = 'starters' | 'mains' | 'sides' | 'desserts' | 'drinks';
export type Diet = 'vegetarian' | 'vegan' | 'gluten-free';

export type Dish = {
  id: string;
  name: string;
  description: string;
  /** Price in cents. */
  price: number;
  category: Category;
  diets: Diet[];
  /** Short note shown as an accent line. */
  note?: string;
};

export const CATEGORIES: {value: Category; label: string}[] = [
  {value: 'starters', label: 'Starters'},
  {value: 'mains', label: 'Mains'},
  {value: 'sides', label: 'Sides'},
  {value: 'desserts', label: 'Desserts'},
  {value: 'drinks', label: 'Drinks'},
];

export const DIETS: {value: Diet; label: string; short: string}[] = [
  {value: 'vegetarian', label: 'Vegetarian', short: 'V'},
  {value: 'vegan', label: 'Vegan', short: 'VG'},
  {value: 'gluten-free', label: 'Gluten-free', short: 'GF'},
];

export const MENU: Dish[] = [
  {
    id: 'charred-leeks',
    name: 'Charred leeks',
    description: 'Hazelnut romesco, pickled shallot, toasted buckwheat.',
    price: 1400,
    category: 'starters',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'burrata',
    name: 'Burrata & blood orange',
    description: 'Fennel pollen, peppery olive oil, grilled sourdough.',
    price: 1700,
    category: 'starters',
    diets: ['vegetarian'],
  },
  {
    id: 'crudo',
    name: 'Hamachi crudo',
    description: 'Juniper-cured, green apple, horseradish cream, dill oil.',
    price: 1900,
    category: 'starters',
    diets: ['gluten-free'],
    note: 'Our namesake cure',
  },
  {
    id: 'squash-soup',
    name: 'Roasted squash soup',
    description: 'Brown butter, sage, crisp pepitas.',
    price: 1200,
    category: 'starters',
    diets: ['vegetarian', 'gluten-free'],
  },
  {
    id: 'half-chicken',
    name: 'Wood-fired half chicken',
    description: 'Salsa verde, charred lemon, schmaltz potatoes.',
    price: 3200,
    category: 'mains',
    diets: ['gluten-free'],
    note: 'Cooked over oak embers',
  },
  {
    id: 'trout',
    name: 'Brown-butter trout',
    description: 'Celeriac purée, capers, watercress, almond crumb.',
    price: 3400,
    category: 'mains',
    diets: [],
  },
  {
    id: 'risotto',
    name: 'Wild mushroom risotto',
    description: 'Aged parmesan, thyme, a drizzle of black garlic.',
    price: 2700,
    category: 'mains',
    diets: ['vegetarian', 'gluten-free'],
  },
  {
    id: 'lamb',
    name: 'Slow lamb shoulder',
    description: 'White beans, rosemary, preserved lemon gremolata.',
    price: 3800,
    category: 'mains',
    diets: ['gluten-free'],
  },
  {
    id: 'cauliflower',
    name: 'Whole-roast cauliflower',
    description: 'Tahini, pomegranate, herb salad, dukkah.',
    price: 2400,
    category: 'mains',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'tagliatelle',
    name: 'Hand-cut tagliatelle',
    description: 'Slow-cooked tomato, basil, ricotta salata.',
    price: 2500,
    category: 'mains',
    diets: ['vegetarian'],
  },
  {
    id: 'greens',
    name: 'Garden greens',
    description: 'Soft herbs, radish, mustard vinaigrette.',
    price: 900,
    category: 'sides',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'potatoes',
    name: 'Crushed potatoes',
    description: 'Rosemary salt, garlic confit.',
    price: 900,
    category: 'sides',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'bread',
    name: 'Sourdough & cultured butter',
    description: 'Baked each morning; smoked sea salt.',
    price: 700,
    category: 'sides',
    diets: ['vegetarian'],
  },
  {
    id: 'olive-cake',
    name: 'Olive oil cake',
    description: 'Poached pear, crème fraîche, honeycomb.',
    price: 1200,
    category: 'desserts',
    diets: ['vegetarian'],
  },
  {
    id: 'chocolate',
    name: 'Dark chocolate pot',
    description: 'Sea salt, coconut cream, toasted cacao nibs.',
    price: 1100,
    category: 'desserts',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'sorbet',
    name: 'Seasonal sorbet',
    description: 'Three scoops, churned in house this week.',
    price: 900,
    category: 'desserts',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'juniper-spritz',
    name: 'Juniper spritz',
    description: 'Gin, elderflower, bitter citrus, soda.',
    price: 1400,
    category: 'drinks',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
    note: 'House cocktail',
  },
  {
    id: 'garden-tonic',
    name: 'Garden tonic',
    description: 'Alcohol-free: cucumber, basil, tonic, lime.',
    price: 900,
    category: 'drinks',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'orange-wine',
    name: 'Skin-contact white',
    description: 'By the glass; ask about this week’s bottle.',
    price: 1500,
    category: 'drinks',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Single-origin beans, roasted nearby.',
    price: 450,
    category: 'drinks',
    diets: ['vegetarian', 'vegan', 'gluten-free'],
  },
];

export type MenuFilter = {
  /** 'all' or one category. */
  category: Category | 'all';
  /** Every selected diet must be satisfied (AND). */
  diets: Diet[];
  /** Case- and accent-insensitive match on name and description; every word must match. */
  query: string;
};

export const EMPTY_FILTER: MenuFilter = {category: 'all', diets: [], query: ''};

function normalise(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

export function filterMenu(dishes: readonly Dish[], filter: MenuFilter): Dish[] {
  const terms = normalise(filter.query).split(/\s+/).filter(Boolean);
  return dishes.filter((dish) => {
    if (filter.category !== 'all' && dish.category !== filter.category) return false;
    if (!filter.diets.every((diet) => dish.diets.includes(diet))) return false;
    if (terms.length === 0) return true;
    const haystack = normalise(`${dish.name} ${dish.description}`);
    return terms.every((term) => haystack.includes(term));
  });
}

export function isFiltered(filter: MenuFilter): boolean {
  return filter.category !== 'all' || filter.diets.length > 0 || filter.query.trim() !== '';
}

export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return `$${Number.isInteger(dollars) ? dollars.toFixed(0) : dollars.toFixed(2)}`;
}

export function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
