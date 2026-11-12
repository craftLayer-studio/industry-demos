import {describe, expect, it} from 'vitest';
import {schedule, type GymClass} from './data';
import {ALL, defaultFilters, endTime, filterClasses, groupByDay, isFiltered, resultSummary, sortClasses} from './schedule';

const sample: GymClass[] = [
  {id: 'c', name: 'C', programme: 'boxing', day: 'sun', start: '10:00', minutes: 45, intensity: 'high', coach: 'theo'},
  {id: 'a2', name: 'A2', programme: 'strength', day: 'mon', start: '18:00', minutes: 60, intensity: 'moderate', coach: 'mara'},
  {id: 'a1', name: 'A1', programme: 'mobility', day: 'mon', start: '06:30', minutes: 30, intensity: 'low', coach: 'ines'},
  {id: 'b', name: 'B', programme: 'boxing', day: 'wed', start: '07:00', minutes: 50, intensity: 'moderate', coach: 'theo'},
];

describe('filterClasses', () => {
  it('returns everything, sorted Monday first, with default filters', () => {
    expect(filterClasses(sample, defaultFilters).map(c => c.id)).toEqual(['a1', 'a2', 'b', 'c']);
  });

  it('filters by day', () => {
    expect(filterClasses(sample, {...defaultFilters, day: 'mon'}).map(c => c.id)).toEqual(['a1', 'a2']);
  });

  it('filters by programme', () => {
    expect(filterClasses(sample, {...defaultFilters, programme: 'boxing'}).map(c => c.id)).toEqual(['b', 'c']);
  });

  it('filters by intensity', () => {
    expect(filterClasses(sample, {...defaultFilters, intensity: 'moderate'}).map(c => c.id)).toEqual(['a2', 'b']);
  });

  it('combines filters with AND', () => {
    expect(filterClasses(sample, {day: 'wed', programme: 'boxing', intensity: 'moderate'}).map(c => c.id)).toEqual(['b']);
    expect(filterClasses(sample, {day: 'mon', programme: 'boxing', intensity: ALL})).toEqual([]);
  });

  it('does not mutate the input', () => {
    const copy = [...sample];
    filterClasses(sample, defaultFilters);
    expect(sample).toEqual(copy);
  });

  it('every real class matches at least one combination and data ids are unique', () => {
    const ids = new Set(schedule.map(c => c.id));
    expect(ids.size).toBe(schedule.length);
    for (const c of schedule) {
      expect(filterClasses(schedule, {day: c.day, programme: c.programme, intensity: c.intensity})).toContainEqual(c);
    }
  });
});

describe('helpers', () => {
  it('groups by day in weekday order and drops empty days', () => {
    const groups = groupByDay(sortClasses(sample));
    expect(groups.map(g => g.day.id)).toEqual(['mon', 'wed', 'sun']);
    expect(groups[0].classes.map(c => c.id)).toEqual(['a1', 'a2']);
  });

  it('computes end times, including past midnight', () => {
    expect(endTime('18:00', 60)).toBe('19:00');
    expect(endTime('06:30', 45)).toBe('07:15');
    expect(endTime('23:30', 45)).toBe('00:15');
  });

  it('knows when filters are active and summarises results', () => {
    expect(isFiltered(defaultFilters)).toBe(false);
    expect(isFiltered({...defaultFilters, intensity: 'low'})).toBe(true);
    expect(resultSummary(4, defaultFilters)).toBe('Showing all 4 classes this week');
    expect(resultSummary(1, {...defaultFilters, day: 'mon'})).toBe('Showing 1 class matching your filters');
    expect(resultSummary(0, {...defaultFilters, day: 'mon'})).toBe('No classes match these filters');
  });
});
