import type {Clinician, SpecialtyId} from './data';

export type SpecialtyFilter = SpecialtyId | 'all';

/** Clinicians for one specialty, or everyone for 'all'. Keeps source order. */
export function filterClinicians(list: readonly Clinician[], filter: SpecialtyFilter): Clinician[] {
  return filter === 'all' ? [...list] : list.filter(c => c.specialty === filter);
}

export function countLabel(count: number): string {
  return count === 1 ? 'Showing 1 clinician' : `Showing ${count} clinicians`;
}
