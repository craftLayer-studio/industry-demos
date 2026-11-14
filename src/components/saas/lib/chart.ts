/**
 * Deterministic sample data and SVG geometry for the Pulsegrid demo charts.
 * Nothing here is real usage data: series are generated from a fixed seed so
 * the server render and the client render always match.
 */

export type RangeId = '7d' | '30d' | '90d';

export const RANGES: {id: RangeId; label: string; days: number}[] = [
  {id: '7d', label: '7 days', days: 7},
  {id: '30d', label: '30 days', days: 30},
  {id: '90d', label: '90 days', days: 90},
];

/** Fixed last day of the sample window, so labels never depend on "today". */
export const SAMPLE_END_DATE = '2026-10-31';

export type Point = {date: string; value: number};

/** mulberry32: tiny seeded PRNG returning floats in [0, 1). */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function addDaysISO(iso: string, delta: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + delta));
  return date.toISOString().slice(0, 10);
}

/**
 * 180 days of sample "daily active users" ending on SAMPLE_END_DATE: a gentle
 * upward trend, weekday/weekend rhythm and seeded noise.
 */
export function generateDailySeries(seed = 7, days = 180): Point[] {
  const rand = seededRandom(seed);
  const points: Point[] = [];
  for (let i = 0; i < days; i++) {
    const date = addDaysISO(SAMPLE_END_DATE, i - (days - 1));
    const dow = new Date(`${date}T00:00:00Z`).getUTCDay();
    const weekend = dow === 0 || dow === 6 ? 0.78 : 1;
    const trend = 1800 + i * 6.5;
    const wave = Math.sin(i / 9) * 70;
    const noise = (rand() - 0.5) * 160;
    points.push({date, value: Math.round((trend + wave + noise) * weekend)});
  }
  return points;
}

const FULL_SERIES = generateDailySeries();

export type RangeSeries = {
  range: RangeId;
  current: Point[];
  previous: Point[];
  total: number;
  average: number;
  peak: Point;
  /** Percentage change of the average versus the previous period, 1 dp. */
  changePct: number;
};

export function seriesFor(range: RangeId, source: Point[] = FULL_SERIES): RangeSeries {
  const days = RANGES.find(r => r.id === range)?.days;
  if (!days) throw new Error(`Unknown range: ${range}`);
  if (source.length < days * 2) throw new Error('Not enough sample data for this range');
  const current = source.slice(-days);
  const previous = source.slice(-days * 2, -days);
  const total = current.reduce((s, p) => s + p.value, 0);
  const prevTotal = previous.reduce((s, p) => s + p.value, 0);
  const average = Math.round(total / days);
  const peak = current.reduce((best, p) => (p.value > best.value ? p : best));
  const changePct = Math.round(((total - prevTotal) / prevTotal) * 1000) / 10;
  return {range, current, previous, total, average, peak, changePct};
}

export type ChartBox = {width: number; height: number; padTop: number; padRight: number; padBottom: number; padLeft: number};

export type ChartGeometry = {
  line: string;
  area: string;
  yTicks: {value: number; y: number}[];
  xLabels: {label: string; x: number}[];
  min: number;
  max: number;
  last: {x: number; y: number};
};

/** Round a value range out to tidy tick bounds. */
export function niceBounds(min: number, max: number, ticks = 4): {lo: number; hi: number; step: number} {
  const span = Math.max(1, max - min);
  const raw = span / ticks;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10) * mag;
  return {lo: Math.floor(min / step) * step, hi: Math.ceil(max / step) * step, step};
}

const fmt = (n: number) => Number(n.toFixed(1));

export function buildChart(points: Point[], box: ChartBox, xLabelCount = 4): ChartGeometry {
  if (points.length < 2) throw new Error('A line chart needs at least two points');
  const values = points.map(p => p.value);
  const {lo, hi, step} = niceBounds(Math.min(...values), Math.max(...values));
  const innerW = box.width - box.padLeft - box.padRight;
  const innerH = box.height - box.padTop - box.padBottom;
  const x = (i: number) => box.padLeft + (i / (points.length - 1)) * innerW;
  const y = (v: number) => box.padTop + (1 - (v - lo) / (hi - lo)) * innerH;

  const coords = points.map((p, i) => [fmt(x(i)), fmt(y(p.value))] as const);
  const line = coords.map(([cx, cy], i) => `${i === 0 ? 'M' : 'L'}${cx} ${cy}`).join(' ');
  const baseY = fmt(box.padTop + innerH);
  const area = `${line} L${coords[coords.length - 1][0]} ${baseY} L${coords[0][0]} ${baseY} Z`;

  const yTicks: {value: number; y: number}[] = [];
  for (let v = lo; v <= hi + step / 2; v += step) yTicks.push({value: v, y: fmt(y(v))});

  const xLabels: {label: string; x: number}[] = [];
  const count = Math.min(xLabelCount, points.length);
  for (let k = 0; k < count; k++) {
    const i = Math.round((k / (count - 1)) * (points.length - 1));
    xLabels.push({label: shortDate(points[i].date), x: fmt(x(i))});
  }

  const [lx, ly] = coords[coords.length - 1];
  return {line, area, yTicks, xLabels, min: lo, max: hi, last: {x: lx, y: ly}};
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function shortDate(iso: string): string {
  const [, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

export function formatCount(n: number): string {
  return n.toLocaleString('en-US');
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${Math.round(n / 1_000)}k`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

/** Group daily points into weekly buckets (sum), for the accessible table of long ranges. */
export function weeklyBuckets(points: Point[]): {start: string; end: string; total: number}[] {
  const out: {start: string; end: string; total: number}[] = [];
  for (let i = 0; i < points.length; i += 7) {
    const chunk = points.slice(i, i + 7);
    out.push({start: chunk[0].date, end: chunk[chunk.length - 1].date, total: chunk.reduce((s, p) => s + p.value, 0)});
  }
  return out;
}
