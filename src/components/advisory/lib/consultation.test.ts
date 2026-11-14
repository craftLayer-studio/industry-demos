import {describe, expect, it} from 'vitest';
import {
  EMPTY_DRAFT,
  describeWindow,
  hasErrors,
  NOTE_MAX,
  sortWindows,
  toggleWindow,
  validateDetails,
  validateSchedule,
  validateStep,
  validateTopics,
} from './consultation';

describe('validateTopics', () => {
  it('requires at least one topic', () => {
    expect(validateTopics(EMPTY_DRAFT).topics).toBeTruthy();
    expect(hasErrors(validateTopics({topics: ['payroll'], note: ''}))).toBe(false);
  });
  it('limits the note length', () => {
    expect(validateTopics({topics: ['tax'], note: 'x'.repeat(NOTE_MAX + 1)}).note).toBeTruthy();
  });
});

describe('validateDetails', () => {
  const ok = {name: 'Sam Example', email: 'sam@example.com', company: 'Example Co', size: '2-10', stage: 'early'} as const;
  it('accepts complete details', () => {
    expect(validateDetails(ok)).toEqual({});
  });
  it('flags each missing or malformed field', () => {
    const e = validateDetails({name: ' ', email: 'not-an-email', company: '', size: '', stage: ''});
    expect(Object.keys(e).sort()).toEqual(['company', 'email', 'name', 'size', 'stage']);
    expect(e.email).toMatch(/name@example.com/);
    expect(validateDetails({...ok, name: 'A'}).name).toMatch(/short/);
    expect(validateDetails({...ok, email: ''}).email).toBe('Enter an email address.');
  });
});

describe('schedule', () => {
  it('requires a format and exactly three windows', () => {
    const e = validateSchedule({format: '', windows: ['mon-morning']});
    expect(e.format).toBeTruthy();
    expect(e.windows).toBe('Choose 2 more time windows (3 in total).');
    expect(validateSchedule({format: 'video', windows: ['mon-morning', 'tue-midday']}).windows).toBe(
      'Choose 1 more time window (3 in total).',
    );
    expect(validateSchedule({format: 'video', windows: ['mon-morning', 'tue-midday', 'fri-afternoon']})).toEqual({});
  });

  it('toggles windows and caps the selection at three', () => {
    let w = toggleWindow([], 'mon-morning');
    w = toggleWindow(w, 'tue-midday');
    w = toggleWindow(w, 'wed-afternoon');
    expect(toggleWindow(w, 'thu-morning')).toEqual(w);
    expect(toggleWindow(w, 'tue-midday')).toEqual(['mon-morning', 'wed-afternoon']);
  });

  it('describes and sorts windows', () => {
    expect(describeWindow('tue-midday')).toBe('Tuesday midday (11 am–2 pm)');
    expect(sortWindows(['fri-morning', 'mon-afternoon', 'mon-morning'])).toEqual([
      'mon-morning',
      'mon-afternoon',
      'fri-morning',
    ]);
  });
});

describe('validateStep', () => {
  it('dispatches by step and has no checks on review', () => {
    expect(validateStep(0, EMPTY_DRAFT).topics).toBeTruthy();
    expect(validateStep(1, EMPTY_DRAFT).name).toBeTruthy();
    expect(validateStep(2, EMPTY_DRAFT).format).toBeTruthy();
    expect(validateStep(3, EMPTY_DRAFT)).toEqual({});
  });
});
