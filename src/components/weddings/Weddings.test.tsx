import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it} from 'vitest';
import {cleanup, render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Planner} from './Planner';
import {ViewingRequest} from './ViewingRequest';
import {formatGBP, quotePackage, DEFAULT_PACKAGE, classifyDate} from './lib/pricing';
import {sampleStatus} from './lib/availability';

afterEach(cleanup);

describe('Planner', () => {
  it('shows the default sample total and prices a date picked in the calendar', async () => {
    const user = userEvent.setup();
    render(<Planner />);
    expect(screen.getByText(formatGBP(quotePackage(DEFAULT_PACKAGE).total))).toBeInTheDocument();
    expect(screen.getByText('Illustrative')).toBeInTheDocument();

    // First open midweek date in June 2027 (the month shown by default).
    let iso = '';
    for (let d = 1; d <= 30; d++) {
      const candidate = `2027-06-${String(d).padStart(2, '0')}`;
      if (sampleStatus(candidate) === 'open' && classifyDate(candidate).dayType === 'midweek') {
        iso = candidate;
        break;
      }
    }
    expect(iso).not.toBe('');
    const calendar = screen.getByRole('table', {name: 'June 2027'});
    const dayNumber = Number(iso.slice(8));
    const dayButton = within(calendar)
      .getAllByRole('button')
      .find(b => b.textContent === String(dayNumber))!;
    await user.click(dayButton);
    expect(dayButton).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', {name: 'Price this date'}));

    const expected = quotePackage({...DEFAULT_PACKAGE, season: 'peak', dayType: 'midweek'}).total;
    expect(await screen.findByText(formatGBP(expected))).toBeInTheDocument();
    expect(screen.getByText(/Priced for/)).toBeInTheDocument();
  });
});

describe('Viewing request form', () => {
  it('reports every missing required field without sending anything', async () => {
    const user = userEvent.setup();
    render(<ViewingRequest />);
    await user.click(screen.getByRole('button', {name: 'Send demo request'}));
    expect(await screen.findByText('6 fields need attention.')).toBeInTheDocument();
    expect(screen.getAllByText('Enter your name.').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Choose a viewing date.').length).toBeGreaterThan(0);
    expect(screen.queryByText('Demo request complete')).not.toBeInTheDocument();
  });
});
