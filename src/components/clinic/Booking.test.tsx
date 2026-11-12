import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it} from 'vitest';
import {cleanup, render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Booking} from './Booking';
import {Clinicians} from './Clinicians';

afterEach(cleanup);

describe('Booking flow', () => {
  it('blocks Continue without a choice and moves focus to the step heading', async () => {
    const user = userEvent.setup();
    render(<Booking />);
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(await screen.findByRole('alert')).toHaveTextContent('Choose a specialty to continue.');

    await user.click(screen.getByRole('radio', {name: /Cardiology/}));
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    const heading = screen.getByRole('heading', {name: 'Choose a clinician'});
    expect(heading).toHaveFocus();

    // Only cardiology clinicians are offered.
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    expect(screen.getByRole('radio', {name: /Elias Mendel/})).toBeInTheDocument();
    expect(screen.queryByRole('radio', {name: /Hana Sato/})).toBeNull();

    await user.click(screen.getByRole('button', {name: 'Back'}));
    expect(screen.getByRole('heading', {name: 'Choose a specialty'})).toHaveFocus();
  });

  it('walks through date, time, details, review and demo confirmation', async () => {
    const user = userEvent.setup();
    render(<Booking />);
    await user.click(screen.getByRole('radio', {name: /Physiotherapy/}));
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    await user.click(screen.getByRole('radio', {name: /Noor Haddad/}));
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getByRole('heading', {name: 'Pick a date and time'})).toHaveFocus();

    // Continue without a date is blocked.
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(await screen.findByRole('alert')).toHaveTextContent(/date/);

    const grid = screen.getByRole('grid');
    const enabled = within(grid)
      .getAllByRole('gridcell')
      .map(cell => cell.querySelector('button') ?? cell)
      .filter(el => el.getAttribute('aria-disabled') !== 'true' && !(el as HTMLButtonElement).disabled);
    expect(enabled.length).toBeGreaterThan(0);
    await user.click(enabled[0]);

    const times = within(screen.getByRole('group', {name: /Available times on/})).getAllByRole('button');
    expect(times.length).toBeGreaterThanOrEqual(2);
    await user.click(times[0]);
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getByRole('heading', {name: 'Your contact details'})).toHaveFocus();

    // Invalid details are rejected.
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getByRole('heading', {name: 'Your contact details'})).toBeInTheDocument();
    expect(screen.getByText('Enter your name.')).toBeInTheDocument();

    await user.type(screen.getByRole('textbox', {name: /Full name/}), 'Alex Example');
    await user.type(screen.getByRole('textbox', {name: /Email/}), 'alex@example.com');
    await user.type(screen.getByRole('textbox', {name: /Phone/}), '(555) 010-0199');
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getByRole('heading', {name: 'Review your request'})).toHaveFocus();
    expect(screen.getByText('Noor Haddad')).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Send demo request'}));
    expect(screen.getByRole('heading', {name: 'Demo request complete'})).toHaveFocus();
    expect(screen.getByText('No appointment was booked and nothing was sent')).toBeInTheDocument();
  });
});

describe('Clinician filter', () => {
  it('filters cards by specialty', async () => {
    const user = userEvent.setup();
    render(<Clinicians onRequest={() => {}} />);
    expect(screen.getAllByRole('heading', {level: 3})).toHaveLength(11);
    await user.click(screen.getByRole('button', {name: 'Dermatology'}));
    expect(screen.getAllByRole('heading', {level: 3}).map(h => h.textContent)).toEqual(['Dr Hana Sato']);
    expect(screen.getByText('Showing 1 clinician in Dermatology')).toBeInTheDocument();
    await user.click(screen.getByRole('button', {name: 'All'}));
    expect(screen.getAllByRole('heading', {level: 3})).toHaveLength(11);
  });
});
