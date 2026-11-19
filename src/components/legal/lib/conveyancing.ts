/**
 * Fixed-fee conveyancing estimator for the fictional Marlowe & Pike demo.
 * Every figure here is an illustrative sample, not a real price list, and
 * the estimate deliberately excludes Stamp Duty Land Tax.
 */

export type Tenure = 'freehold' | 'leasehold';

export type ConveyancingInput = {
  price: number;
  tenure: Tenure;
  mortgage: boolean;
  firstTimeBuyer: boolean;
};

export type FeeLine = {
  id: string;
  label: string;
  detail: string;
  amount: number;
  group: 'fee' | 'disbursement';
};

export type ConveyancingEstimate = {
  lines: FeeLine[];
  feeSubtotal: number;
  vat: number;
  disbursements: number;
  total: number;
};

export const PRICE_LIMITS = {min: 50_000, max: 3_000_000, step: 5_000} as const;
export const VAT_RATE = 0.2;

/** Sample legal fee bands by purchase price (upper bound inclusive). */
export const FEE_BANDS: {upTo: number; fee: number}[] = [
  {upTo: 250_000, fee: 950},
  {upTo: 500_000, fee: 1_150},
  {upTo: 1_000_000, fee: 1_450},
  {upTo: Infinity, fee: 1_850},
];

/** Sample registration fee bands by purchase price (upper bound inclusive). */
export const REGISTRATION_BANDS: {upTo: number; fee: number}[] = [
  {upTo: 200_000, fee: 95},
  {upTo: 500_000, fee: 150},
  {upTo: 1_000_000, fee: 295},
  {upTo: Infinity, fee: 500},
];

export const SUPPLEMENTS = {
  leasehold: 350,
  mortgage: 150,
  firstTimeBuyerSaving: 100,
  searches: 320,
  transferFee: 40,
  idChecks: 30,
} as const;

export function clampPrice(value: number): number {
  if (!Number.isFinite(value)) return PRICE_LIMITS.min;
  return Math.min(PRICE_LIMITS.max, Math.max(PRICE_LIMITS.min, Math.round(value)));
}

function band(bands: {upTo: number; fee: number}[], price: number): number {
  return (bands.find(b => price <= b.upTo) ?? bands[bands.length - 1]).fee;
}

export function legalFeeFor(price: number): number {
  return band(FEE_BANDS, clampPrice(price));
}

export function registrationFeeFor(price: number): number {
  return band(REGISTRATION_BANDS, clampPrice(price));
}

/** Round to whole pence to avoid floating point drift. */
function pence(n: number): number {
  return Math.round(n * 100) / 100;
}

export function estimateConveyancing(input: ConveyancingInput): ConveyancingEstimate {
  const price = clampPrice(input.price);
  const lines: FeeLine[] = [
    {
      id: 'legal-fee',
      label: 'Legal fee',
      detail: `Fixed fee for a purchase at ${formatGBP(price)}`,
      amount: legalFeeFor(price),
      group: 'fee',
    },
  ];
  if (input.tenure === 'leasehold') {
    lines.push({
      id: 'leasehold',
      label: 'Leasehold supplement',
      detail: 'Reviewing the lease, management pack and service charges',
      amount: SUPPLEMENTS.leasehold,
      group: 'fee',
    });
  }
  if (input.mortgage) {
    lines.push({
      id: 'mortgage',
      label: 'Mortgage supplement',
      detail: 'Acting for your lender as well as for you',
      amount: SUPPLEMENTS.mortgage,
      group: 'fee',
    });
  }
  if (input.firstTimeBuyer) {
    lines.push({
      id: 'first-time',
      label: 'First-time buyer saving',
      detail: 'Sample reduction on the legal fee',
      amount: -SUPPLEMENTS.firstTimeBuyerSaving,
      group: 'fee',
    });
  }
  lines.push(
    {
      id: 'id-checks',
      label: 'Identity checks',
      detail: 'Electronic ID verification per buyer',
      amount: SUPPLEMENTS.idChecks,
      group: 'fee',
    },
    {
      id: 'searches',
      label: 'Property searches',
      detail: 'Local authority, drainage and environmental (sample pack)',
      amount: SUPPLEMENTS.searches,
      group: 'disbursement',
    },
    {
      id: 'registration',
      label: 'Registration fee',
      detail: 'Registering you as the new owner (sample band)',
      amount: registrationFeeFor(price),
      group: 'disbursement',
    },
    {
      id: 'transfer',
      label: 'Bank transfer fee',
      detail: 'Sending completion funds',
      amount: SUPPLEMENTS.transferFee,
      group: 'disbursement',
    },
  );

  const feeSubtotal = pence(lines.filter(l => l.group === 'fee').reduce((s, l) => s + l.amount, 0));
  const vat = pence(feeSubtotal * VAT_RATE);
  const disbursements = pence(lines.filter(l => l.group === 'disbursement').reduce((s, l) => s + l.amount, 0));
  return {lines, feeSubtotal, vat, disbursements, total: pence(feeSubtotal + vat + disbursements)};
}

export function formatGBP(n: number): string {
  const hasPence = Math.round(n * 100) % 100 !== 0;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: hasPence ? 2 : 0,
    maximumFractionDigits: hasPence ? 2 : 0,
  }).format(n);
}
