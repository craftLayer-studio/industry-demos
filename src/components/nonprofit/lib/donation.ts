/**
 * Donation maths for the Common Table concept demo. Everything here is
 * illustrative: no payment is ever taken, and the "how a gift is used" split is
 * a sample model for a fictional organisation, not a real budget.
 */
import {requireEmail, requireName} from './validation';

export type Frequency = 'once' | 'monthly';

export const CURRENCY = '$';
export const MIN_AMOUNT = 2;
export const MAX_AMOUNT = 5000;
export const DEDICATION_MAX = 120;

export const PRESETS: Record<Frequency, number[]> = {
  once: [15, 30, 60, 120],
  monthly: [5, 10, 20, 40],
};

export const DEFAULT_PRESET: Record<Frequency, number> = {once: 30, monthly: 10};

/** Format a whole or fractional amount as "$30" or "$12.50". */
export function formatMoney(value: number): string {
  const cents = Math.round(value * 100);
  const whole = cents % 100 === 0;
  return `${CURRENCY}${(cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export type AmountResult = {ok: true; value: number} | {ok: false; error: string};

/** Parse and validate a typed custom amount ("25", "$12.50", "1,000"). */
export function parseAmount(raw: string): AmountResult {
  const cleaned = raw.trim().replace(/^\$/, '').replace(/,/g, '').trim();
  if (!cleaned) return {ok: false, error: 'Enter an amount.'};
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) {
    return {ok: false, error: 'Use numbers only, with at most 2 decimal places (for example 25 or 12.50).'};
  }
  const value = Number(cleaned);
  if (value < MIN_AMOUNT) return {ok: false, error: `The smallest sample gift is ${formatMoney(MIN_AMOUNT)}.`};
  if (value > MAX_AMOUNT) return {ok: false, error: `The largest sample gift is ${formatMoney(MAX_AMOUNT)}.`};
  return {ok: true, value};
}

/** Total over twelve months: a monthly gift repeats, a one-off gift does not. */
export function yearlyTotal(amount: number, frequency: Frequency): number {
  return frequency === 'monthly' ? Math.round(amount * 12 * 100) / 100 : amount;
}

export type AllocationShare = {id: string; label: string; detail: string; percent: number};

/** Sample model only. Percentages always add up to 100. */
export const ILLUSTRATIVE_SPLIT: AllocationShare[] = [
  {id: 'food', label: 'Food and pantry stock', detail: 'Fresh produce, staples and storage', percent: 50},
  {id: 'kitchens', label: 'Community kitchens', detail: 'Ingredients, gas and cooking kit', percent: 20},
  {id: 'breakfast', label: 'School breakfast clubs', detail: 'Cereal, fruit, milk and bowls', percent: 15},
  {id: 'volunteers', label: 'Volunteer support', detail: 'Training, aprons and travel', percent: 10},
  {id: 'running', label: 'Running costs', detail: 'Rent, insurance and admin', percent: 5},
];

export type Allocation = AllocationShare & {amount: number};

/**
 * Split an amount by the illustrative model, rounded to cents with the largest
 * remainder method so the parts always add up exactly to the amount.
 */
export function allocate(amount: number, split: AllocationShare[] = ILLUSTRATIVE_SPLIT): Allocation[] {
  const totalCents = Math.round(amount * 100);
  const raw = split.map(s => (totalCents * s.percent) / 100);
  const floors = raw.map(Math.floor);
  let remainder = totalCents - floors.reduce((a, b) => a + b, 0);
  const order = raw
    .map((r, i) => ({i, frac: r - Math.floor(r)}))
    .sort((a, b) => b.frac - a.frac || a.i - b.i);
  for (const {i} of order) {
    if (remainder <= 0) break;
    floors[i] += 1;
    remainder -= 1;
  }
  return split.map((s, i) => ({...s, amount: floors[i] / 100}));
}

export type DonationDraft = {
  frequency: Frequency;
  preset: string; // a preset amount as a string, or 'custom'
  custom: string;
  hasDedication: boolean;
  dedicationName: string;
  dedicationNote: string;
  name: string;
  email: string;
};

export const EMPTY_DONATION: DonationDraft = {
  frequency: 'once',
  preset: String(DEFAULT_PRESET.once),
  custom: '',
  hasDedication: false,
  dedicationName: '',
  dedicationNote: '',
  name: '',
  email: '',
};

export type DonationErrors = Partial<Record<'custom' | 'dedicationName' | 'dedicationNote' | 'name' | 'email', string>>;

/** The chosen amount, or null while a custom amount is invalid. */
export function selectedAmount(draft: DonationDraft): number | null {
  if (draft.preset !== 'custom') return Number(draft.preset);
  const parsed = parseAmount(draft.custom);
  return parsed.ok ? parsed.value : null;
}

export function validateDonation(draft: DonationDraft): DonationErrors {
  const errors: DonationErrors = {};
  if (draft.preset === 'custom') {
    const parsed = parseAmount(draft.custom);
    if (!parsed.ok) errors.custom = parsed.error;
  }
  if (draft.hasDedication) {
    if (!draft.dedicationName.trim()) errors.dedicationName = 'Enter who this gift is in honour of, or turn off the dedication.';
    else if (draft.dedicationName.trim().length > 80) errors.dedicationName = 'Use 80 characters or fewer.';
    if (draft.dedicationNote.length > DEDICATION_MAX) {
      errors.dedicationNote = `Keep the note to ${DEDICATION_MAX} characters or fewer.`;
    }
  }
  const name = requireName(draft.name);
  if (name) errors.name = name;
  const email = requireEmail(draft.email);
  if (email) errors.email = email;
  return errors;
}
