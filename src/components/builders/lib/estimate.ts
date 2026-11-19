/**
 * Extension cost estimator for the fictional Keystone Build Co. demo.
 *
 * Every rate below is an invented, illustrative sample chosen to make the
 * calculator feel plausible. It is not market data and not a quote.
 */

export type Storeys = 'single' | 'double';
export type Finish = 'essential' | 'standard' | 'premium';
export type RegionBand = 'a' | 'b' | 'c' | 'd';

export type EstimateInput = {
  /** Ground-floor footprint of the extension in square metres. */
  size: number;
  storeys: Storeys;
  finish: Finish;
  region: RegionBand;
};

export type Range = {low: number; high: number};

export type EstimateLine = {key: 'build' | 'design' | 'contingency'; label: string} & Range;

export type Estimate = {
  /** Footprint after clamping to the supported range. */
  size: number;
  /** Total internal floor area built (footprint x storeys). */
  floorArea: number;
  lines: EstimateLine[];
  total: Range;
  perSquareMetre: Range;
  /** Indicative build duration on site, in weeks. */
  weeks: Range;
};

export const MIN_SIZE = 8;
export const MAX_SIZE = 80;
export const ROUND_TO = 500;

/** Sample construction rate per m² of floor area, by finish level. */
export const FINISH_RATES: Record<Finish, Range> = {
  essential: {low: 1700, high: 2100},
  standard: {low: 2100, high: 2600},
  premium: {low: 2700, high: 3500},
};

export const FINISHES: {value: Finish; label: string; description: string}[] = [
  {value: 'essential', label: 'Essential', description: 'Durable standard fittings, painted plaster, laminate or vinyl floors.'},
  {value: 'standard', label: 'Standard', description: 'Mid-range fittings, engineered timber floors, one roof light.'},
  {value: 'premium', label: 'Premium', description: 'Large-format glazing, bespoke joinery, stone or tiled floors.'},
];

/**
 * A second storey shares foundations and a roof with the first, so the
 * per-m² rate for the total floor area drops. Sample factor only.
 */
export const STOREY_FACTOR: Record<Storeys, number> = {single: 1, double: 0.86};

export const STOREYS: {value: Storeys; label: string}[] = [
  {value: 'single', label: 'Single storey'},
  {value: 'double', label: 'Double storey'},
];

/** Sample regional price bands. Fictional, not tied to any real area. */
export const REGION_FACTOR: Record<RegionBand, number> = {a: 0.9, b: 1, c: 1.12, d: 1.3};

export const REGIONS: {value: RegionBand; label: string; description: string}[] = [
  {value: 'a', label: 'Band A: rural and small towns', description: 'Sample factor 0.90'},
  {value: 'b', label: 'Band B: suburban', description: 'Sample factor 1.00'},
  {value: 'c', label: 'Band C: large city', description: 'Sample factor 1.12'},
  {value: 'd', label: 'Band D: capital and prime areas', description: 'Sample factor 1.30'},
];

/** Sample fixed fees for measured survey, drawings, structural design and approvals. */
export const DESIGN_FEES: Record<Storeys, Range> = {
  single: {low: 3500, high: 6000},
  double: {low: 5000, high: 8500},
};

/** Suggested contingency, as a share of the build cost. */
export const CONTINGENCY: Range = {low: 0.08, high: 0.12};

export const DEFAULT_INPUT: EstimateInput = {size: 24, storeys: 'single', finish: 'standard', region: 'b'};

export function clampSize(size: number): number {
  if (!Number.isFinite(size)) return MIN_SIZE;
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(size)));
}

export function roundTo(value: number, step = ROUND_TO): number {
  return Math.round(value / step) * step;
}

export function estimate(input: EstimateInput): Estimate {
  const size = clampSize(input.size);
  const storeyCount = input.storeys === 'double' ? 2 : 1;
  const floorArea = size * storeyCount;
  const rate = FINISH_RATES[input.finish];
  const factor = STOREY_FACTOR[input.storeys] * REGION_FACTOR[input.region];

  const build: Range = {
    low: roundTo(floorArea * rate.low * factor),
    high: roundTo(floorArea * rate.high * factor),
  };
  const fees = DESIGN_FEES[input.storeys];
  const design: Range = {
    low: roundTo(fees.low * REGION_FACTOR[input.region]),
    high: roundTo(fees.high * REGION_FACTOR[input.region]),
  };
  const contingency: Range = {
    low: roundTo(build.low * CONTINGENCY.low),
    high: roundTo(build.high * CONTINGENCY.high),
  };
  const total: Range = {
    low: build.low + design.low + contingency.low,
    high: build.high + design.high + contingency.high,
  };

  const baseWeeks = 8 + Math.ceil(size / 10);
  const weeks: Range = {
    low: baseWeeks + (storeyCount === 2 ? 4 : 0) + (input.finish === 'premium' ? 2 : 0),
    high: baseWeeks + 4 + (storeyCount === 2 ? 6 : 0) + (input.finish === 'premium' ? 3 : 0),
  };

  return {
    size,
    floorArea,
    lines: [
      {key: 'build', label: 'Construction and fit-out', ...build},
      {key: 'design', label: 'Survey, drawings and approvals', ...design},
      {key: 'contingency', label: 'Suggested contingency', ...contingency},
    ],
    total,
    perSquareMetre: {low: Math.round(total.low / floorArea), high: Math.round(total.high / floorArea)},
    weeks,
  };
}

const gbp = new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP', maximumFractionDigits: 0});

export function formatMoney(value: number): string {
  return gbp.format(value);
}

export function formatRange(range: Range): string {
  return `${formatMoney(range.low)} to ${formatMoney(range.high)}`;
}
