/** Brew guides and ratio maths. Ratios are starting points, not rules. */

export type Method = 'pour-over' | 'immersion' | 'espresso';

export type Guide = {
  method: Method;
  label: string;
  summary: string;
  ratio: number;
  defaultCoffee: number;
  grind: string;
  temperature: string;
  time: string;
  steps: string[];
};

export const GUIDES: Guide[] = [
  {
    method: 'pour-over',
    label: 'Pour-over',
    summary: 'Clean, layered cups that show off light roasts.',
    ratio: 16,
    defaultCoffee: 18,
    grind: 'Medium-fine, like table salt',
    temperature: '93 to 96 °C',
    time: '2:45 to 3:30',
    steps: [
      'Rinse the paper filter with hot water and discard the rinse water.',
      'Add the ground coffee and level the bed with a gentle shake.',
      'Bloom: pour about twice the coffee weight in water and wait 40 seconds.',
      'Pour in slow spirals to about 60% of the total water by 1:15.',
      'Pour the rest by 2:00, then give the brewer one gentle swirl.',
      'Let it draw down. Finer if it ran fast and tasted sour, coarser if slow and bitter.',
    ],
  },
  {
    method: 'immersion',
    label: 'Immersion',
    summary: 'An AeroPress-style steep: forgiving, sweet and full.',
    ratio: 15,
    defaultCoffee: 15,
    grind: 'Medium, like coarse sand',
    temperature: '85 to 92 °C',
    time: '2:00 to 2:30',
    steps: [
      'Rinse the filter cap and set the brewer on a sturdy mug.',
      'Add the coffee, then all of the water in one steady pour.',
      'Stir three times so every ground is wet.',
      'Fit the plunger to stop dripping and steep for 90 seconds.',
      'Press slowly for about 30 seconds and stop at the first hiss.',
      'Taste, then top up with hot water if you prefer a longer cup.',
    ],
  },
  {
    method: 'espresso',
    label: 'Espresso',
    summary: 'Short, concentrated and the base of every milk drink.',
    ratio: 2,
    defaultCoffee: 18,
    grind: 'Fine, like powdered sugar with grit',
    temperature: '92 to 94 °C',
    time: '25 to 32 seconds',
    steps: [
      'Dose the coffee into a dry, clean basket.',
      'Distribute evenly, then tamp level with firm, consistent pressure.',
      'Lock in and start the shot straight away.',
      'Stop at the target liquid weight shown in the calculator.',
      'Fast and sour? Grind finer. Slow and harsh? Grind coarser.',
    ],
  },
];

export const COFFEE_LIMITS = {min: 1, max: 100};
export const WATER_LIMITS = {min: 10, max: 2000};
export const RATIO_LIMITS = {min: 1, max: 20};

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Water (or espresso yield) in grams for a coffee dose at 1:ratio. */
export function waterFor(coffeeGrams: number, ratio: number): number {
  if (!(coffeeGrams > 0) || !(ratio > 0)) return 0;
  return round1(coffeeGrams * ratio);
}

/** Coffee dose in grams for a water weight at 1:ratio. */
export function coffeeFor(waterGrams: number, ratio: number): number {
  if (!(waterGrams > 0) || !(ratio > 0)) return 0;
  return round1(waterGrams / ratio);
}

export function clamp(n: number, {min, max}: {min: number; max: number}): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}
