/**
 * Illustrative repayment-mortgage maths for the estimator. This is a plain
 * amortisation formula with a fixed rate for the whole term: no fees, no
 * product switches, no lender criteria. Not financial advice.
 */

export type MortgageInput = {
  price: number;
  deposit: number;
  termYears: number;
  /** Annual interest rate in percent, e.g. 4.5. */
  ratePercent: number;
};

export type MortgageResult = {
  loan: number;
  /** Loan-to-value as a percentage of the price (0-100). */
  ltv: number;
  monthly: number;
  totalRepaid: number;
  totalInterest: number;
  months: number;
};

export type MortgageErrors = Partial<Record<keyof MortgageInput, string>>;

export const LIMITS = {
  priceMin: 50000,
  priceMax: 5000000,
  termMin: 5,
  termMax: 40,
  rateMin: 0,
  rateMax: 15,
};

export const DEFAULT_MORTGAGE: MortgageInput = {price: 465000, deposit: 93000, termYears: 25, ratePercent: 4.5};

/** Monthly payment for a repayment loan. A 0% rate divides the loan evenly. */
export function monthlyRepayment(loan: number, ratePercent: number, termYears: number): number {
  const n = Math.round(termYears * 12);
  if (loan <= 0 || n <= 0) return 0;
  const r = ratePercent / 100 / 12;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

export function validateMortgage(input: MortgageInput): MortgageErrors {
  const e: MortgageErrors = {};
  if (!Number.isFinite(input.price) || input.price < LIMITS.priceMin || input.price > LIMITS.priceMax) {
    e.price = `Enter a price between £${LIMITS.priceMin.toLocaleString('en-GB')} and £${LIMITS.priceMax.toLocaleString('en-GB')}.`;
  }
  if (!Number.isFinite(input.deposit) || input.deposit < 0) {
    e.deposit = 'Enter a deposit of £0 or more.';
  } else if (!e.price && input.deposit >= input.price) {
    e.deposit = 'The deposit must be less than the price.';
  }
  if (!Number.isFinite(input.termYears) || input.termYears < LIMITS.termMin || input.termYears > LIMITS.termMax) {
    e.termYears = `Choose a term between ${LIMITS.termMin} and ${LIMITS.termMax} years.`;
  }
  if (!Number.isFinite(input.ratePercent) || input.ratePercent < LIMITS.rateMin || input.ratePercent > LIMITS.rateMax) {
    e.ratePercent = `Enter a rate between ${LIMITS.rateMin}% and ${LIMITS.rateMax}%.`;
  }
  return e;
}

export function estimateMortgage(input: MortgageInput): MortgageResult | null {
  if (Object.keys(validateMortgage(input)).length > 0) return null;
  const loan = input.price - input.deposit;
  const months = Math.round(input.termYears * 12);
  const monthly = monthlyRepayment(loan, input.ratePercent, input.termYears);
  const totalRepaid = monthly * months;
  return {
    loan,
    ltv: (loan / input.price) * 100,
    monthly,
    totalRepaid,
    totalInterest: totalRepaid - loan,
    months,
  };
}

/** A sensible illustrative deposit for a price: 20%, rounded to £1,000. */
export function suggestedDeposit(price: number): number {
  return Math.round((price * 0.2) / 1000) * 1000;
}
