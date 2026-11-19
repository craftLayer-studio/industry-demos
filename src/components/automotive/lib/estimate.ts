/**
 * Illustrative service price estimator for the fictional Torque & Co. Motors.
 *
 * Every rate below is an invented sample figure chosen to feel plausible. It
 * is not a quote, not market data and not linked to any real garage.
 */

export type VehicleClass = 'city' | 'family' | 'suv' | 'van';
export type EngineBand = 'small' | 'medium' | 'large';
export type Fuel = 'petrol' | 'diesel' | 'hybrid' | 'electric';
export type ServiceId = 'interim' | 'full' | 'major' | 'mot' | 'brakes' | 'aircon' | 'ev';

export type EstimateInput = {
  vehicle: VehicleClass;
  engine: EngineBand;
  fuel: Fuel;
  service: ServiceId;
};

export type LineItem = {key: string; label: string; amount: number};

export type Estimate =
  | {
      ok: true;
      low: number;
      high: number;
      hours: number;
      items: LineItem[];
      notes: string[];
    }
  | {ok: false; reason: string};

export const VEHICLE_CLASSES: {value: VehicleClass; label: string; example: string}[] = [
  {value: 'city', label: 'City car', example: 'Small three or five-door hatchback'},
  {value: 'family', label: 'Family car', example: 'Hatchback, saloon or estate'},
  {value: 'suv', label: 'SUV / 4x4', example: 'Crossover, SUV or 4x4'},
  {value: 'van', label: 'Small van', example: 'Car-derived or small panel van'},
];

export const ENGINE_BANDS: {value: EngineBand; label: string}[] = [
  {value: 'small', label: 'Up to 1.4 L'},
  {value: 'medium', label: '1.4 to 2.0 L'},
  {value: 'large', label: 'Over 2.0 L'},
];

export const FUELS: {value: Fuel; label: string}[] = [
  {value: 'petrol', label: 'Petrol'},
  {value: 'diesel', label: 'Diesel'},
  {value: 'hybrid', label: 'Hybrid'},
  {value: 'electric', label: 'Electric'},
];

export type ServiceDef = {
  value: ServiceId;
  label: string;
  short: string;
  /** Sample labour hours for a family car. */
  hours: number;
  /** Sample parts and consumables for a family car, in pounds. */
  parts: number;
  /** Does labour and parts scale with vehicle class and engine size? */
  scales: boolean;
  /** Fixed-fee services ignore class and engine. */
  fixed?: number;
};

/** Sample labour rate per hour, in pounds (illustrative). */
export const LABOUR_RATE = 72;
/** Sample spread: estimates show a range rather than a single figure. */
export const RANGE_SPREAD = 0.12;

export const SERVICES: ServiceDef[] = [
  {value: 'interim', label: 'Interim service', short: 'Interim', hours: 1, parts: 48, scales: true},
  {value: 'full', label: 'Full service', short: 'Full', hours: 2, parts: 92, scales: true},
  {value: 'major', label: 'Major service', short: 'Major', hours: 3.5, parts: 168, scales: true},
  {value: 'mot', label: 'MOT test', short: 'MOT', hours: 0.75, parts: 0, scales: false, fixed: 45},
  {value: 'brakes', label: 'Brake pads and discs (front)', short: 'Brakes', hours: 1.5, parts: 135, scales: true},
  {value: 'aircon', label: 'Air-con regas and check', short: 'Air-con', hours: 0.75, parts: 38, scales: false},
  {value: 'ev', label: 'EV / hybrid health check', short: 'EV health', hours: 1.25, parts: 0, scales: false},
];

const CLASS_FACTOR: Record<VehicleClass, number> = {city: 0.85, family: 1, suv: 1.2, van: 1.15};
const ENGINE_FACTOR: Record<EngineBand, number> = {small: 0.9, medium: 1, large: 1.2};

/** Fuel adjustments to parts for routine services (sample figures). */
const FUEL_PARTS: Record<Fuel, number> = {petrol: 0, diesel: 18, hybrid: 10, electric: -40};
/** Electric cars skip oil and filters, so routine labour is shorter (sample). */
const FUEL_HOURS: Record<Fuel, number> = {petrol: 1, diesel: 1.1, hybrid: 1, electric: 0.7};

const ROUTINE: ServiceId[] = ['interim', 'full', 'major'];

export const DEFAULT_INPUT: EstimateInput = {vehicle: 'family', engine: 'medium', fuel: 'petrol', service: 'full'};

export function serviceById(id: ServiceId): ServiceDef {
  const s = SERVICES.find(x => x.value === id);
  if (!s) throw new Error(`Unknown service ${id}`);
  return s;
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

/** Engine size does not apply to electric cars. */
export function engineApplies(fuel: Fuel): boolean {
  return fuel !== 'electric';
}

export function estimate(input: EstimateInput): Estimate {
  const svc = serviceById(input.service);
  const isEV = input.fuel === 'electric';
  const isElectrified = isEV || input.fuel === 'hybrid';

  if (svc.value === 'ev' && !isElectrified) {
    return {ok: false, reason: 'The EV / hybrid health check is only for hybrid and electric vehicles. Choose another service or fuel type.'};
  }

  const notes: string[] = [];
  const items: LineItem[] = [];

  if (svc.fixed !== undefined) {
    items.push({key: 'fee', label: 'Test fee (sample fixed fee)', amount: svc.fixed});
    notes.push('Any repairs needed to pass would be quoted separately before work starts.');
    return {ok: true, low: svc.fixed, high: svc.fixed, hours: svc.hours, items, notes};
  }

  const classF = svc.scales ? CLASS_FACTOR[input.vehicle] : 1;
  const engineF = svc.scales && ROUTINE.includes(svc.value) && !isEV ? ENGINE_FACTOR[input.engine] : 1;
  const fuelH = ROUTINE.includes(svc.value) ? FUEL_HOURS[input.fuel] : 1;

  const hours = roundTo(svc.hours * classF * fuelH, 0.25);
  const labour = roundTo(hours * LABOUR_RATE, 1);
  let parts = svc.parts * classF * engineF;
  if (ROUTINE.includes(svc.value)) parts += FUEL_PARTS[input.fuel];
  parts = Math.max(0, roundTo(parts, 1));

  items.push({key: 'labour', label: `Labour, ${formatHours(hours)} at £${LABOUR_RATE}/h (sample rate)`, amount: labour});
  if (parts > 0) items.push({key: 'parts', label: partsLabel(svc.value, input.fuel), amount: parts});

  if (isEV && ROUTINE.includes(svc.value)) notes.push('No oil or oil filter on an electric car, so routine labour is shorter.');
  if (input.fuel === 'diesel' && ROUTINE.includes(svc.value)) notes.push('Diesel services include a fuel filter allowance.');
  if (svc.value === 'brakes' && isElectrified) notes.push('Regenerative braking often means pads last longer; we would measure first.');
  if (svc.value === 'major') notes.push('Spark plugs, cabin and air filters included where your vehicle needs them.');

  const subtotal = labour + parts;
  const low = roundTo(subtotal * (1 - RANGE_SPREAD), 5);
  const high = roundTo(subtotal * (1 + RANGE_SPREAD), 5);
  return {ok: true, low, high, hours, items, notes};
}

function partsLabel(service: ServiceId, fuel: Fuel): string {
  if (service === 'brakes') return 'Pads, discs and fittings (sample)';
  if (service === 'aircon') return 'Refrigerant and dye (sample)';
  if (fuel === 'electric') return 'Cabin filter, fluids and wipers (sample)';
  return 'Oil, filters and consumables (sample)';
}

export function formatHours(h: number): string {
  return `${h % 1 === 0 ? h.toFixed(0) : h.toFixed(2).replace(/0$/, '')} h`;
}

export function formatMoney(n: number): string {
  return `£${n.toLocaleString('en-GB', {maximumFractionDigits: 0})}`;
}

export function formatRange(e: Estimate): string {
  if (!e.ok) return 'Not available';
  return e.low === e.high ? formatMoney(e.low) : `${formatMoney(e.low)} to ${formatMoney(e.high)}`;
}
