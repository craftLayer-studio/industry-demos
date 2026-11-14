import {describe, expect, it} from 'vitest';
import {courses, courseById} from './data';
import {
  DEFAULT_FILTERS,
  activeFilterCount,
  durationBucket,
  filterCourses,
  matchesQuery,
  queryCatalogue,
  resultSummary,
  sortCourses,
} from './catalogue';
import {cohortCalendar, cohortOptions, formatLongDate, groupByMonth, upcomingStarts} from './cohorts';
import {formatPrice, instalment} from './format';
import {EMPTY_ENQUIRY, GOALS_MAX, characterLength, hasErrors, orderedErrors, validateEnquiry} from './validation';

const ids = courses.map(c => c.id);

describe('course data', () => {
  it('has twelve courses with unique ids and live courses carry a cycle offset', () => {
    expect(courses).toHaveLength(12);
    expect(new Set(ids).size).toBe(12);
    for (const c of courses) {
      if (c.format === 'live') expect(c.cycleOffset).toBeTypeOf('number');
      expect(c.modules.length).toBeGreaterThan(0);
    }
  });
});

describe('catalogue filtering', () => {
  it('returns everything with default filters', () => {
    expect(filterCourses(courses, DEFAULT_FILTERS)).toHaveLength(12);
  });

  it('filters by subject, level, format and duration together', () => {
    const result = filterCourses(courses, {...DEFAULT_FILTERS, subject: 'web', format: 'live'});
    expect(result.map(c => c.id)).toEqual(['javascript-essentials', 'react-apps']);
    const short = filterCourses(courses, {...DEFAULT_FILTERS, duration: 'short'});
    expect(short.every(c => c.weeks <= 4)).toBe(true);
    const beginnerData = filterCourses(courses, {...DEFAULT_FILTERS, subject: 'data', level: 'beginner'});
    expect(beginnerData.map(c => c.id)).toEqual(['spreadsheets-to-insight']);
  });

  it('buckets durations at the boundaries', () => {
    expect(durationBucket(4)).toBe('short');
    expect(durationBucket(5)).toBe('medium');
    expect(durationBucket(8)).toBe('medium');
    expect(durationBucket(9)).toBe('long');
  });

  it('searches title, modules and instructor names, ignoring case and accents', () => {
    const sql = courseById('sql-analysis')!;
    expect(matchesQuery(sql, 'WINDOW functions')).toBe(true);
    expect(matchesQuery(courseById('html-css')!, 'tomas')).toBe(true);
    expect(matchesQuery(sql, 'window watercolour')).toBe(false);
    expect(matchesQuery(sql, '   ')).toBe(true);
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterCourses(courses, {...DEFAULT_FILTERS, query: 'underwater basket weaving'})).toEqual([]);
  });

  it('counts active filters', () => {
    expect(activeFilterCount(DEFAULT_FILTERS)).toBe(0);
    expect(activeFilterCount({...DEFAULT_FILTERS, query: ' sql ', level: 'advanced'})).toBe(2);
  });
});

describe('catalogue sorting', () => {
  it('keeps recommended order by default', () => {
    expect(sortCourses(courses, 'recommended').map(c => c.id)).toEqual(ids);
  });
  it('sorts by price both ways and by duration with stable ties', () => {
    const low = sortCourses(courses, 'price-low').map(c => c.price);
    expect(low).toEqual([...low].sort((a, b) => a - b));
    const high = sortCourses(courses, 'price-high').map(c => c.price);
    expect(high).toEqual([...low].reverse());
    const shortest = sortCourses(courses, 'shortest');
    expect(shortest[0].id).toBe('clear-writing');
    // 4-week courses keep catalogue order between themselves.
    const fourWeeks = shortest.filter(c => c.weeks === 4).map(c => c.id);
    expect(fourWeeks).toEqual(['web-accessibility', 'spreadsheets-to-insight']);
  });
  it('sorts by title alphabetically', () => {
    const titles = sortCourses(courses, 'title').map(c => c.title);
    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b, 'en')));
  });
  it('does not mutate the input', () => {
    const copy = [...courses];
    queryCatalogue(courses, DEFAULT_FILTERS, 'price-high');
    expect(courses).toEqual(copy);
  });
  it('summarises the result count', () => {
    expect(resultSummary(0, 12)).toBe('No courses match these filters.');
    expect(resultSummary(12, 12)).toBe('Showing all 12 courses.');
    expect(resultSummary(3, 12)).toBe('Showing 3 of 12 courses.');
  });
});

describe('cohort schedule', () => {
  const foundations = courseById('design-foundations')!; // offset 0
  const systems = courseById('design-systems')!; // offset 1

  it('computes starts every four weeks after today, on Mondays', () => {
    expect(upcomingStarts(foundations, '2026-11-14', 3)).toEqual(['2026-12-07', '2027-01-04', '2027-02-01']);
    expect(upcomingStarts(systems, '2026-11-14', 2)).toEqual(['2026-11-16', '2026-12-14']);
    for (const d of upcomingStarts(foundations, '2026-11-14', 5)) {
      expect(new Date(`${d}T00:00:00Z`).getUTCDay()).toBe(1);
    }
  });

  it('never returns today itself and handles dates before the anchor', () => {
    expect(upcomingStarts(foundations, '2026-12-07', 1)).toEqual(['2027-01-04']);
    expect(upcomingStarts(foundations, '2025-12-01', 1)).toEqual(['2026-01-05']);
  });

  it('returns nothing for self-paced courses', () => {
    expect(upcomingStarts(courseById('html-css')!, '2026-11-14')).toEqual([]);
  });

  it('builds a sorted calendar for a window and groups it by month', () => {
    const cal = cohortCalendar(courses, '2026-11-14', 8);
    expect(cal.length).toBeGreaterThan(0);
    const dates = cal.map(s => s.date);
    expect(dates).toEqual([...dates].sort());
    expect(dates.every(d => d > '2026-11-14' && d <= '2027-01-09')).toBe(true);
    const groups = groupByMonth(cal);
    expect(groups.map(g => g.month)).toEqual(['2026-11', '2026-12', '2027-01']);
  });

  it('formats dates in UTC', () => {
    expect(formatLongDate('2026-12-07')).toBe('Mon 7 December 2026');
  });

  it('offers cohort options per course format', () => {
    expect(cohortOptions(undefined, '2026-11-14')).toEqual([]);
    expect(cohortOptions(courseById('html-css'), null).map(o => o.value)).toEqual(['anytime', 'not-sure']);
    expect(cohortOptions(foundations, null).map(o => o.value)).toEqual(['later', 'not-sure']);
    expect(cohortOptions(foundations, '2026-11-14').map(o => o.value)).toEqual([
      '2026-12-07',
      '2027-01-04',
      '2027-02-01',
      'later',
      'not-sure',
    ]);
  });
});

describe('enquiry validation', () => {
  const valid = {
    ...EMPTY_ENQUIRY,
    name: 'Sam Rivera',
    email: 'sam@example.com',
    courseId: 'sql-analysis',
    cohort: 'not-sure',
    experience: 'beginner' as const,
    consent: true,
  };

  it('accepts a complete draft', () => {
    expect(validateEnquiry(valid, ids)).toEqual({});
  });

  it('reports every missing required field in form order', () => {
    const errors = validateEnquiry(EMPTY_ENQUIRY, ids);
    expect(hasErrors(errors)).toBe(true);
    expect(orderedErrors(errors).map(e => e.field)).toEqual([
      'name',
      'email',
      'courseId',
      'cohort',
      'experience',
      'consent',
    ]);
  });

  it('rejects malformed email, unknown course and short names', () => {
    const errors = validateEnquiry({...valid, name: 'S', email: 'sam@', courseId: 'nope'}, ids);
    expect(errors.name).toMatch(/at least 2/);
    expect(errors.email).toMatch(/name@example.com/);
    expect(errors.courseId).toMatch(/from the list/);
  });

  it('limits goals to 300 characters, counting emoji as one', () => {
    expect(validateEnquiry({...valid, goals: 'a'.repeat(GOALS_MAX)}, ids).goals).toBeUndefined();
    expect(validateEnquiry({...valid, goals: 'a'.repeat(GOALS_MAX + 1)}, ids).goals).toMatch(/300/);
    expect(characterLength('👩🏽‍💻ab')).toBe(3);
  });
});

describe('price formatting', () => {
  it('formats dollars with thousands separators', () => {
    expect(formatPrice(890)).toBe('$890');
    expect(formatPrice(1240)).toBe('$1,240');
    expect(formatPrice(1234567)).toBe('$1,234,567');
  });
  it('splits into instalments rounded up', () => {
    expect(instalment(890)).toBe(297);
    expect(instalment(1200)).toBe(400);
  });
});
