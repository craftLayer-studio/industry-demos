/**
 * Pure catalogue search, filtering and sorting for the Quillmark Academy demo.
 */
import type {Course, Format, Level, SubjectId} from './data';
import {instructorById, subjectLabel} from './data';

export type DurationBucket = 'short' | 'medium' | 'long';
export type SortKey = 'recommended' | 'title' | 'shortest' | 'price-low' | 'price-high';

export type CatalogueFilters = {
  query: string;
  subject: SubjectId | 'all';
  level: Level | 'all';
  format: Format | 'all';
  duration: DurationBucket | 'all';
};

export const DEFAULT_FILTERS: CatalogueFilters = {
  query: '',
  subject: 'all',
  level: 'all',
  format: 'all',
  duration: 'all',
};

export const durationBuckets: {id: DurationBucket; label: string}[] = [
  {id: 'short', label: 'Up to 4 weeks'},
  {id: 'medium', label: '5 to 8 weeks'},
  {id: 'long', label: '9 weeks or more'},
];

export const sortOptions: {id: SortKey; label: string}[] = [
  {id: 'recommended', label: 'Recommended order'},
  {id: 'title', label: 'Title A to Z'},
  {id: 'shortest', label: 'Shortest first'},
  {id: 'price-low', label: 'Sample price: low to high'},
  {id: 'price-high', label: 'Sample price: high to low'},
];

export function durationBucket(weeks: number): DurationBucket {
  if (weeks <= 4) return 'short';
  if (weeks <= 8) return 'medium';
  return 'long';
}

/** Lower-case and strip diacritics so "tomas" matches "Tomás". */
export function normalise(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function searchText(course: Course): string {
  return normalise(
    [
      course.title,
      course.summary,
      subjectLabel(course.subject),
      instructorById(course.instructorId)?.name ?? '',
      ...course.modules.map(m => m.title),
    ].join(' '),
  );
}

/** Every whitespace-separated term in the query must appear somewhere in the course. */
export function matchesQuery(course: Course, query: string): boolean {
  const terms = normalise(query).split(' ').filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = searchText(course);
  return terms.every(t => haystack.includes(t));
}

export function filterCourses(list: readonly Course[], filters: CatalogueFilters): Course[] {
  return list.filter(
    c =>
      (filters.subject === 'all' || c.subject === filters.subject) &&
      (filters.level === 'all' || c.level === filters.level) &&
      (filters.format === 'all' || c.format === filters.format) &&
      (filters.duration === 'all' || durationBucket(c.weeks) === filters.duration) &&
      matchesQuery(c, filters.query),
  );
}

export function sortCourses(list: readonly Course[], sort: SortKey): Course[] {
  // Index keeps the original (recommended) order as a stable tie-breaker.
  const indexed = list.map((course, index) => ({course, index}));
  const by: Record<SortKey, (a: (typeof indexed)[number], b: (typeof indexed)[number]) => number> = {
    recommended: () => 0,
    title: (a, b) => a.course.title.localeCompare(b.course.title, 'en'),
    shortest: (a, b) => a.course.weeks - b.course.weeks,
    'price-low': (a, b) => a.course.price - b.course.price,
    'price-high': (a, b) => b.course.price - a.course.price,
  };
  return indexed.sort((a, b) => by[sort](a, b) || a.index - b.index).map(x => x.course);
}

export function queryCatalogue(list: readonly Course[], filters: CatalogueFilters, sort: SortKey): Course[] {
  return sortCourses(filterCourses(list, filters), sort);
}

export function activeFilterCount(filters: CatalogueFilters): number {
  return (
    (filters.query.trim() ? 1 : 0) +
    (filters.subject !== 'all' ? 1 : 0) +
    (filters.level !== 'all' ? 1 : 0) +
    (filters.format !== 'all' ? 1 : 0) +
    (filters.duration !== 'all' ? 1 : 0)
  );
}

export function resultSummary(count: number, total: number): string {
  if (count === 0) return 'No courses match these filters.';
  if (count === total) return `Showing all ${total} courses.`;
  return `Showing ${count} of ${total} courses.`;
}
