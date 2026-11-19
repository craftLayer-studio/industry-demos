import type {PetType, Service} from './data';

export type PetFilter = PetType | 'all';

/** Services offered for a pet type, in their original order. */
export function filterServices(list: readonly Service[], filter: PetFilter): Service[] {
  if (filter === 'all') return [...list];
  return list.filter(s => s.pets.includes(filter));
}

/** How many services each filter would show. */
export function countByFilter(list: readonly Service[]): Record<PetFilter, number> {
  return {
    all: list.length,
    dog: filterServices(list, 'dog').length,
    cat: filterServices(list, 'cat').length,
    rabbit: filterServices(list, 'rabbit').length,
    small: filterServices(list, 'small').length,
  };
}
