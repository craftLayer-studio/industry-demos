/**
 * Registration-plate style "lookup" for the Torque & Co. Motors concept demo.
 *
 * There is no DVLA or any other real lookup. The characters typed are hashed
 * locally to pick one of a handful of sample vehicle profiles, so the same
 * plate always gives the same sample. Nothing leaves the browser.
 */
import type {EngineBand, Fuel, VehicleClass} from './estimate';

export type SampleVehicle = {
  id: string;
  label: string;
  vehicle: VehicleClass;
  engine: EngineBand;
  fuel: Fuel;
};

export const SAMPLE_VEHICLES: SampleVehicle[] = [
  {id: 'city-petrol', label: 'City hatchback, petrol', vehicle: 'city', engine: 'small', fuel: 'petrol'},
  {id: 'family-diesel', label: 'Family estate, diesel', vehicle: 'family', engine: 'medium', fuel: 'diesel'},
  {id: 'family-hybrid', label: 'Family saloon, hybrid', vehicle: 'family', engine: 'medium', fuel: 'hybrid'},
  {id: 'suv-petrol', label: 'Large SUV, petrol', vehicle: 'suv', engine: 'large', fuel: 'petrol'},
  {id: 'city-electric', label: 'Compact hatchback, electric', vehicle: 'city', engine: 'small', fuel: 'electric'},
  {id: 'van-diesel', label: 'Small panel van, diesel', vehicle: 'van', engine: 'medium', fuel: 'diesel'},
  {id: 'suv-electric', label: 'Crossover SUV, electric', vehicle: 'suv', engine: 'medium', fuel: 'electric'},
];

export const PLATE_MAX = 8;

/** Uppercase and strip everything except letters and digits. */
export function normalisePlate(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/** Loose plate-shape check: 2 to 8 letters or digits with at least one of each. */
export function plateError(raw: string): string | undefined {
  const p = normalisePlate(raw);
  if (!p) return 'Enter a registration, for example AB12 CDE (it can be made up).';
  if (p.length < 2 || p.length > PLATE_MAX) return `Use 2 to ${PLATE_MAX} letters and numbers.`;
  if (!/[A-Z]/.test(p) || !/\d/.test(p)) return 'A registration needs at least one letter and one number.';
  return undefined;
}

/** Display a plate the way it is printed: current-style AB12CDE becomes AB12 CDE. */
export function formatPlate(raw: string): string {
  const p = normalisePlate(raw);
  return /^[A-Z]{2}\d{2}[A-Z]{3}$/.test(p) ? `${p.slice(0, 4)} ${p.slice(4)}` : p;
}

/** Small deterministic string hash (FNV-1a, 32-bit). */
export function hashPlate(plate: string): number {
  let h = 0x811c9dc5;
  for (const ch of normalisePlate(plate)) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** Pick a sample vehicle from the plate characters. Returns undefined for an invalid plate. */
export function sampleVehicleFor(raw: string): SampleVehicle | undefined {
  if (plateError(raw)) return undefined;
  return SAMPLE_VEHICLES[hashPlate(raw) % SAMPLE_VEHICLES.length];
}
