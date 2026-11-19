// Pet health plan calculator. All prices are SAMPLE figures for a fictional
// practice, held in whole pence to avoid floating point drift.
import type {PetType} from './data';

export type AgeBand = 'young' | 'adult' | 'senior';

export const ageBands: {id: AgeBand; label: string; description: string}[] = [
  {id: 'young', label: 'Young', description: 'Under 1 year'},
  {id: 'adult', label: 'Adult', description: '1 to 7 years'},
  {id: 'senior', label: 'Senior', description: '8 years and over'},
];

export type AddOnId = 'dental' | 'parasite' | 'nails' | 'nutrition';

export type AddOn = {
  id: AddOnId;
  label: string;
  description: string;
  /** Sample monthly price in pence. */
  monthly: number;
  pets: PetType[];
};

export const addOns: AddOn[] = [
  {
    id: 'dental',
    label: 'Dental check-ins',
    description: 'Two extra dental checks a year.',
    monthly: 350,
    pets: ['dog', 'cat', 'rabbit'],
  },
  {
    id: 'parasite',
    label: 'Parasite prevention reminders',
    description: 'Routine flea and worm products, posted to you.',
    monthly: 600,
    pets: ['dog', 'cat', 'rabbit'],
  },
  {
    id: 'nails',
    label: 'Unlimited nail clips',
    description: 'Drop in for a trim whenever you like.',
    monthly: 200,
    pets: ['dog', 'cat', 'rabbit', 'small'],
  },
  {
    id: 'nutrition',
    label: 'Nutrition check-ins',
    description: 'Quarterly chats about food and weight.',
    monthly: 250,
    pets: ['dog', 'cat', 'rabbit', 'small'],
  },
];

/** Sample base monthly price in pence for an adult pet of each type. */
export const basePrices: Record<PetType, number> = {
  dog: 1650,
  cat: 1400,
  rabbit: 950,
  small: 600,
};

/** Sample age adjustments in pence, added to the base price. */
export const ageAdjustments: Record<AgeBand, number> = {
  young: 250,
  adult: 0,
  senior: 400,
};

export type PlanInput = {
  pet: PetType;
  age: AgeBand;
  addOns: readonly AddOnId[];
};

export type PlanLine = {label: string; monthly: number};

export type PlanQuote = {
  lines: PlanLine[];
  monthly: number;
  yearly: number;
  /** Add-ons that were requested but are not offered for this pet. */
  ignored: AddOnId[];
};

export function addOnsFor(pet: PetType): AddOn[] {
  return addOns.filter(a => a.pets.includes(pet));
}

export function calculatePlan(input: PlanInput): PlanQuote {
  const lines: PlanLine[] = [{label: 'Core plan', monthly: basePrices[input.pet]}];
  const ageAdj = ageAdjustments[input.age];
  if (ageAdj !== 0) {
    const band = ageBands.find(b => b.id === input.age)!;
    lines.push({label: `${band.label} pet care`, monthly: ageAdj});
  }
  const ignored: AddOnId[] = [];
  const seen = new Set<AddOnId>();
  for (const id of input.addOns) {
    if (seen.has(id)) continue;
    seen.add(id);
    const addOn = addOns.find(a => a.id === id);
    if (!addOn || !addOn.pets.includes(input.pet)) {
      ignored.push(id);
      continue;
    }
    lines.push({label: addOn.label, monthly: addOn.monthly});
  }
  const monthly = lines.reduce((sum, l) => sum + l.monthly, 0);
  return {lines, monthly, yearly: monthly * 12, ignored};
}

/** Formats whole pence as pounds, e.g. 1650 -> "£16.50". */
export function formatPence(pence: number): string {
  const sign = pence < 0 ? '-' : '';
  const abs = Math.abs(Math.round(pence));
  return `${sign}£${Math.floor(abs / 100).toLocaleString('en-GB')}.${String(abs % 100).padStart(2, '0')}`;
}
