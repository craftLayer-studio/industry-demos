import {days, programmes, trainers, type DayId, type GymClass, type Intensity, type ProgrammeId} from './data';

export const ALL = 'all' as const;

export type ScheduleFilters = {
  day: DayId | typeof ALL;
  programme: ProgrammeId | typeof ALL;
  intensity: Intensity | typeof ALL;
};

export const defaultFilters: ScheduleFilters = {day: ALL, programme: ALL, intensity: ALL};

const dayOrder = new Map(days.map((d, i) => [d.id, i]));

/** Sort by weekday (Monday first), then start time. */
export function sortClasses(classes: readonly GymClass[]): GymClass[] {
  return [...classes].sort(
    (a, b) => (dayOrder.get(a.day) ?? 0) - (dayOrder.get(b.day) ?? 0) || a.start.localeCompare(b.start),
  );
}

/** Pure filter: every non-"all" filter must match. Result is sorted. */
export function filterClasses(classes: readonly GymClass[], filters: ScheduleFilters): GymClass[] {
  return sortClasses(
    classes.filter(
      c =>
        (filters.day === ALL || c.day === filters.day) &&
        (filters.programme === ALL || c.programme === filters.programme) &&
        (filters.intensity === ALL || c.intensity === filters.intensity),
    ),
  );
}

export function isFiltered(filters: ScheduleFilters): boolean {
  return filters.day !== ALL || filters.programme !== ALL || filters.intensity !== ALL;
}

/** Group already-sorted classes by day, keeping weekday order and skipping empty days. */
export function groupByDay(classes: readonly GymClass[]): {day: (typeof days)[number]; classes: GymClass[]}[] {
  return days
    .map(day => ({day, classes: classes.filter(c => c.day === day.id)}))
    .filter(group => group.classes.length > 0);
}

/** "18:00" + 60 -> "19:00" */
export function endTime(start: string, minutes: number): string {
  const [h, m] = start.split(':').map(Number);
  const total = (h * 60 + m + minutes) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export function programmeName(id: ProgrammeId): string {
  return programmes.find(p => p.id === id)?.name ?? id;
}

export function coachName(id: string): string {
  return trainers.find(t => t.id === id)?.name ?? id;
}

export function dayName(id: DayId): string {
  return days.find(d => d.id === id)?.long ?? id;
}

/** Human summary used for the live result count. */
export function resultSummary(count: number, filters: ScheduleFilters): string {
  const noun = count === 1 ? 'class' : 'classes';
  if (!isFiltered(filters)) return `Showing all ${count} ${noun} this week`;
  return count === 0 ? 'No classes match these filters' : `Showing ${count} ${noun} matching your filters`;
}

/** Label used in the booking form's class picker. */
export function classLabel(c: GymClass): string {
  return `${c.name}, ${dayName(c.day)} ${c.start}`;
}
