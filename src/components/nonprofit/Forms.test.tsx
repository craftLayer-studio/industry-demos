import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it} from 'vitest';
import {cleanup, render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Donate} from './Donate';
import {Volunteer} from './Volunteer';
import {Newsletter} from './Newsletter';
import {SHIFTS} from './lib/shifts';

afterEach(cleanup);

describe('Donate form', () => {
  it('switches to monthly, validates a custom amount and ends with an honest demo message', async () => {
    const user = userEvent.setup();
    render(<Donate />);

    expect(screen.getByRole('button', {name: 'Donate $30 (demo)'})).toBeInTheDocument();
    await user.click(screen.getByRole('radio', {name: 'Monthly'}));
    expect(screen.getByRole('button', {name: 'Donate $10 monthly (demo)'})).toBeInTheDocument();
    expect(screen.getByText('That is $120 over twelve months.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Other'}));
    const custom = screen.getByRole('textbox', {name: /Other amount/});
    await user.type(custom, '1');
    await user.click(screen.getByRole('button', {name: 'Donate (demo)'}));
    expect(screen.getByText('3 answers need attention.')).toBeInTheDocument();
    expect(screen.getAllByText('The smallest sample gift is $2.').length).toBeGreaterThan(0);
    expect(custom).toHaveFocus();

    await user.clear(custom);
    await user.type(custom, '12.50');
    expect(screen.getByText('That is $150 over twelve months.')).toBeInTheDocument();

    await user.click(screen.getByRole('checkbox', {name: /Dedicate this gift/}));
    await user.type(screen.getByRole('textbox', {name: /Your name/}), 'Ari Example');
    await user.type(screen.getByRole('textbox', {name: /Email/}), 'ari@example.com');
    await user.click(screen.getByRole('button', {name: 'Donate $12.50 monthly (demo)'}));
    expect(screen.getAllByText(/Enter who this gift is in honour of/).length).toBeGreaterThan(0);

    await user.type(screen.getByRole('textbox', {name: /In honour of/}), 'Gran');
    await user.click(screen.getByRole('button', {name: 'Donate $12.50 monthly (demo)'}));
    expect(screen.getByRole('heading', {name: 'Thank you, Ari Example'})).toHaveFocus();
    expect(screen.getByText('Demo only: no payment was taken and nothing was sent.')).toBeInTheDocument();
    expect(screen.getByText(/\$12.50 monthly gift in honour of Gran/)).toBeInTheDocument();
  });
});

describe('Volunteer sign-up', () => {
  it('filters shifts by day and hides full ones, then validates and confirms', async () => {
    const user = userEvent.setup();
    render(<Volunteer />);

    expect(screen.getByText(`${SHIFTS.length} shifts match`)).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', {name: 'Sunday'}));
    expect(screen.getByText('2 shifts match')).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', {name: 'Sunday'}));

    await user.click(screen.getByRole('checkbox', {name: 'Hide full shifts'}));
    const openCount = SHIFTS.filter(s => s.spotsLeft > 0).length;
    expect(screen.getByText(`${openCount} shifts match`)).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Sign up for this shift (demo)'}));
    expect(screen.getByText('4 answers need attention.')).toBeInTheDocument();
    expect(screen.getByText('Pick a shift from the list.')).toBeInTheDocument();

    const list = screen.getByRole('radiogroup', {name: 'Available shifts'});
    const first = within(list).getAllByRole('radio')[0];
    await user.click(first);
    await user.type(screen.getByRole('textbox', {name: /Your name/}), 'Sam Example');
    await user.type(screen.getByRole('textbox', {name: /Email/}), 'sam@example.com');
    await user.click(screen.getByRole('checkbox', {name: /16 or over/}));
    await user.click(screen.getByRole('button', {name: 'Sign up for this shift (demo)'}));

    expect(screen.getByRole('heading', {name: 'See you at the table, Sam Example'})).toHaveFocus();
    expect(screen.getByText('Demo only: no shift was booked and nothing was sent.')).toBeInTheDocument();
  });
});

describe('Newsletter', () => {
  it('rejects an invalid email and confirms honestly', async () => {
    const user = userEvent.setup();
    render(<Newsletter />);
    await user.click(screen.getByRole('button', {name: 'Sign up (demo)'}));
    expect(screen.getAllByText('Enter your email address.').length).toBeGreaterThan(0);
    await user.type(screen.getByRole('textbox', {name: /Email/}), 'you@example.com');
    await user.click(screen.getByRole('button', {name: 'Sign up (demo)'}));
    expect(screen.getByText(/Demo only: you have not been subscribed/)).toBeInTheDocument();
  });
});
