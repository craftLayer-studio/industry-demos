import type {CategoryId, Treatment} from './data';

export type TreatmentFilter = 'all' | CategoryId;

/** Treatments in the chosen category, in their original order. */
export function filterTreatments(list: Treatment[], filter: TreatmentFilter): Treatment[] {
  return filter === 'all' ? list : list.filter(t => t.category === filter);
}

export function countLabel(count: number): string {
  return count === 1 ? '1 treatment' : `${count} treatments`;
}
