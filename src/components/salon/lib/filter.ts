import type {CategoryId, Specialist} from './data';

export type SpecialtyFilter = CategoryId | 'all';

export function filterSpecialists(list: readonly Specialist[], filter: SpecialtyFilter): Specialist[] {
  return filter === 'all' ? [...list] : list.filter(s => s.categories.includes(filter));
}
