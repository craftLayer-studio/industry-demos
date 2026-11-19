/**
 * Illustrative fee maths for the concept demo. These percentages are invented
 * sample figures, not a quotation, a benchmark or industry guidance.
 */
import type {ProjectType} from './projects';

export type BudgetBand = 'under-100k' | '100-250k' | '250-500k' | '500k-1m' | 'over-1m';

export const BUDGET_BANDS: {value: BudgetBand; label: string; min: number; max: number | null}[] = [
  {value: 'under-100k', label: 'Under £100k', min: 40000, max: 100000},
  {value: '100-250k', label: '£100k to £250k', min: 100000, max: 250000},
  {value: '250-500k', label: '£250k to £500k', min: 250000, max: 500000},
  {value: '500k-1m', label: '£500k to £1m', min: 500000, max: 1000000},
  {value: 'over-1m', label: 'Over £1m', min: 1000000, max: null},
];

/** Sample fee as a share of construction cost, low to high, plus a minimum fee. */
export const FEE_RATES: Record<ProjectType, {low: number; high: number; minimum: number}> = {
  residential: {low: 0.1, high: 0.14, minimum: 18000},
  extension: {low: 0.12, high: 0.16, minimum: 6000},
  commercial: {low: 0.08, high: 0.12, minimum: 20000},
  interior: {low: 0.1, high: 0.15, minimum: 8000},
};

/** How a total fee might be spread across design stages (sample shares). */
export const STAGE_SHARES: {stages: string; label: string; share: number}[] = [
  {stages: '0–1', label: 'Strategy and brief', share: 0.05},
  {stages: '2', label: 'Concept design', share: 0.15},
  {stages: '3', label: 'Spatial coordination and planning', share: 0.2},
  {stages: '4', label: 'Technical design', share: 0.3},
  {stages: '5', label: 'Construction', share: 0.25},
  {stages: '6–7', label: 'Handover and in use', share: 0.05},
];

export type FeeRange = {low: number; high: number | null};

export function bandById(band: BudgetBand) {
  const b = BUDGET_BANDS.find(x => x.value === band);
  if (!b) throw new Error(`Unknown budget band: ${band}`);
  return b;
}

/** Round to the nearest £500 so figures never look more precise than they are. */
export function roundFee(n: number): number {
  return Math.round(n / 500) * 500;
}

/**
 * Indicative total fee range for a project type and construction budget band.
 * The upper bound is null for open-ended bands ("over £1m").
 */
export function indicativeFee(type: ProjectType, band: BudgetBand): FeeRange {
  const rate = FEE_RATES[type];
  const b = bandById(band);
  const low = roundFee(Math.max(rate.minimum, b.min * rate.low));
  const high = b.max === null ? null : roundFee(Math.max(rate.minimum, b.max * rate.high));
  return {low, high};
}

/** Split a fee range by stage shares. */
export function feeByStage(range: FeeRange): {stages: string; label: string; share: number; low: number; high: number | null}[] {
  return STAGE_SHARES.map(s => ({
    ...s,
    low: roundFee(range.low * s.share),
    high: range.high === null ? null : roundFee(range.high * s.share),
  }));
}

const gbp = new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP', maximumFractionDigits: 0});

export function formatGBP(n: number): string {
  return gbp.format(n);
}

export function formatRange(r: FeeRange): string {
  if (r.high === null) return `From ${formatGBP(r.low)}`;
  if (r.high === r.low) return formatGBP(r.low);
  return `${formatGBP(r.low)} to ${formatGBP(r.high)}`;
}

export function formatPercent(n: number): string {
  return `${Math.round(n * 100)}%`;
}
