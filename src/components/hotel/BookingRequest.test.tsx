import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {StayProvider, type Stay} from './StayProvider';
import {BookingRequest} from './BookingRequest';
import {Rooms} from './Rooms';
import {addDays, localToday, nextFriday, stayNights} from './lib/dates';
import {isNightAvailable} from './lib/rates';

afterEach(cleanup);

/** A Monday-to-Wednesday stay at least a week out where the room is free. */
function freeMidweek(roomId: string): {checkIn: string; checkOut: string} {
  let start = addDays(nextFriday(addDays(localToday(), 7)), 3); // a Monday
  for (let i = 0; i < 52; i++) {
    const out = addDays(start, 2);
    if (stayNights(start, out).every(d => isNightAvailable(roomId, d))) return {checkIn: start, checkOut: out};
    start = addDays(start, 7);
  }
  throw new Error('no free run');
}

describe('Booking request form', () => {
  it('reports missing fields, then shows an honest demo-only confirmation', async () => {
    const user = userEvent.setup();
    const {checkIn, checkOut} = freeMidweek('reedbed');
    const initial: Stay = {roomId: '', checkIn: '', checkOut: '', guests: 2, breakfast: false};
    const {unmount} = render(
      <StayProvider initialStay={initial}>
        <BookingRequest />
      </StayProvider>,
    );

    await user.click(screen.getByRole('button', {name: 'Send demo request'}));
    expect(await screen.findByText('7 fields need attention.')).toBeInTheDocument();
    expect(screen.getAllByText('Choose a check-in date.').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Enter your email address.').length).toBeGreaterThan(0);
    unmount();

    render(
      <StayProvider initialStay={{roomId: 'reedbed', checkIn, checkOut, guests: 2, breakfast: true}}>
        <BookingRequest />
      </StayProvider>,
    );
    await user.type(screen.getByRole('textbox', {name: /Full name/}), 'Sam Example');
    await user.type(screen.getByRole('textbox', {name: /Email/}), 'sam@example.com');
    await user.click(screen.getByRole('radio', {name: /5 pm to 8 pm/}));
    await user.click(screen.getByRole('checkbox', {name: /I understand this is a demo/}));
    await user.click(screen.getByRole('button', {name: 'Send demo request'}));

    expect(await screen.findByRole('heading', {name: 'Demo request complete'})).toBeInTheDocument();
    expect(screen.getByText('Nothing was booked, sent or charged')).toBeInTheDocument();
    // Reedbed: 2 midweek nights at 165 plus breakfast 2 guests x 2 nights x 18.
    expect(screen.getByText('£402')).toBeInTheDocument();
  });
});

describe('Room filters', () => {
  it('filters by type and sea view, with an empty state', async () => {
    const user = userEvent.setup();
    render(
      <StayProvider>
        <Rooms />
      </StayProvider>,
    );
    expect(screen.getByText(/Showing all 6 sample rooms/)).toBeInTheDocument();
    await user.click(screen.getByRole('radio', {name: 'Suites'}));
    expect(screen.getByText(/Showing 2 of 6 sample rooms/)).toBeInTheDocument();
    await user.click(screen.getByRole('radio', {name: 'Cottage'}));
    await user.click(screen.getByRole('switch', {name: 'Sea view only'}));
    expect(screen.getByText('No sample rooms match')).toBeInTheDocument();
  });
});
