// Illustrative monthly payment maths for the Arbour Dental concept demo.
// Not a credit offer: no lender, no eligibility check, no real rates.

export const MIN_COST = 250;
export const MAX_COST = 20000;
export const MIN_FINANCED = 250;
export const MIN_TERM = 6;
export const MAX_TERM = 36;
export const TERM_STEP = 6;
/** Sample interest-free option is only illustrated for shorter terms. */
export const ZERO_APR_MAX_TERM = 12;

export type AprOption = {id: '0' | '9.9'; rate: number; label: string};

export const APR_OPTIONS: AprOption[] = [
  {id: '0', rate: 0, label: '0% APR (sample)'},
  {id: '9.9', rate: 9.9, label: '9.9% APR (sample)'},
];

export type EstimateInput = {cost: number; deposit: number; termMonths: number; aprPercent: number};

export type EstimateErrors = Partial<Record<'cost' | 'deposit' | 'term' | 'apr', string>>;

export type Estimate = {
  financed: number;
  monthly: number;
  payments: number;
  totalInterest: number;
  totalRepayable: number;
  totalCost: number;
};

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export function aprAllowedForTerm(aprPercent: number, termMonths: number): boolean {
  return aprPercent > 0 || termMonths <= ZERO_APR_MAX_TERM;
}

export function validateEstimate({cost, deposit, termMonths, aprPercent}: EstimateInput): EstimateErrors {
  const errors: EstimateErrors = {};
  if (!Number.isFinite(cost) || cost < MIN_COST || cost > MAX_COST) {
    errors.cost = `Enter a treatment cost between £${MIN_COST.toLocaleString('en-GB')} and £${MAX_COST.toLocaleString('en-GB')}.`;
  }
  if (!Number.isFinite(deposit) || deposit < 0) {
    errors.deposit = 'Deposit cannot be negative.';
  } else if (!errors.cost && cost - deposit < MIN_FINANCED) {
    errors.deposit = `Leave at least £${MIN_FINANCED} to spread. Lower the deposit or raise the cost.`;
  }
  if (
    !Number.isInteger(termMonths) ||
    termMonths < MIN_TERM ||
    termMonths > MAX_TERM ||
    termMonths % TERM_STEP !== 0
  ) {
    errors.term = `Choose a term between ${MIN_TERM} and ${MAX_TERM} months.`;
  }
  if (!APR_OPTIONS.some(o => o.rate === aprPercent)) {
    errors.apr = 'Choose one of the sample APR options.';
  } else if (!errors.term && !aprAllowedForTerm(aprPercent, termMonths)) {
    errors.apr = `The sample 0% option is only illustrated for terms up to ${ZERO_APR_MAX_TERM} months.`;
  }
  return errors;
}

/**
 * Monthly rate from an APR, treating APR as an effective annual rate:
 * (1 + APR)^(1/12) - 1.
 */
export function monthlyRate(aprPercent: number): number {
  return aprPercent <= 0 ? 0 : Math.pow(1 + aprPercent / 100, 1 / 12) - 1;
}

/** Level monthly payment for a principal over n months (standard annuity formula). */
export function monthlyPayment(principal: number, aprPercent: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = monthlyRate(aprPercent);
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

/** Full illustrative breakdown, or null when the inputs are invalid. */
export function estimate(input: EstimateInput): Estimate | null {
  if (Object.keys(validateEstimate(input)).length > 0) return null;
  const financed = round2(input.cost - input.deposit);
  const monthly = round2(monthlyPayment(financed, input.aprPercent, input.termMonths));
  const totalRepayable = round2(monthly * input.termMonths);
  return {
    financed,
    monthly,
    payments: input.termMonths,
    totalInterest: round2(Math.max(0, totalRepayable - financed)),
    totalRepayable,
    totalCost: round2(totalRepayable + input.deposit),
  };
}

/** Term marks for the slider: 6, 12, ..., 36. */
export const TERM_MARKS = Array.from({length: (MAX_TERM - MIN_TERM) / TERM_STEP + 1}, (_, i) => MIN_TERM + i * TERM_STEP);

/** A starting cost for a treatment: the midpoint of its sample range, rounded to £50 and clamped. */
export function startingCostFor(priceFrom: number, priceTo: number): number {
  const mid = Math.round((priceFrom + priceTo) / 2 / 50) * 50;
  return Math.min(MAX_COST, Math.max(MIN_COST, mid));
}
