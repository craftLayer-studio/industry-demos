import {describe, expect, it} from 'vitest';
import {EVENTS, filterEvents} from './content';
import {validateNewsletter} from './validation';

describe('events filter', () => {
  it('shows all events or only the chosen kind', () => {
    expect(filterEvents(EVENTS, 'all')).toHaveLength(EVENTS.length);
    const cook = filterEvents(EVENTS, 'cook');
    expect(cook.length).toBeGreaterThan(0);
    expect(cook.every(e => e.kind === 'cook')).toBe(true);
  });
});

describe('newsletter validation', () => {
  it('requires a plausible email', () => {
    expect(validateNewsletter('').email).toBe('Enter your email address.');
    expect(validateNewsletter('a@b').email).toMatch(/example.com/);
    expect(validateNewsletter('a@example.com')).toEqual({email: undefined});
  });
});
