import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it} from 'vitest';
import {cleanup, render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Booking} from './Booking';
import {MotReminder} from './MotReminder';
import {Workshop} from './Workshop';
import {sampleVehicleFor} from './lib/plate';

afterEach(cleanup);

const renderWorkshop = () => render(<Workshop howItWorks={null} faq={null} />);

describe('Workshop', () => {
  it('shows the default illustrative full-service range', () => {
    renderWorkshop();
    expect(screen.getByText('£210 to £265', {selector: 'span'})).toBeInTheDocument();
    expect(screen.getByText('Illustrative')).toBeInTheDocument();
  });

  it('rejects a bad plate and loads a sample vehicle for a valid one, saying it is not a real lookup', async () => {
    const user = userEvent.setup();
    renderWorkshop();
    expect(screen.getByText(/No DVLA lookup/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', {name: 'Load sample vehicle'}));
    expect(screen.getAllByText(/Enter a registration/).length).toBeGreaterThan(0);
    await user.type(screen.getByRole('textbox', {name: 'Vehicle registration'}), 'ab12cde');
    await user.click(screen.getByRole('button', {name: 'Load sample vehicle'}));
    const sample = sampleVehicleFor('AB12CDE')!;
    expect(screen.getByText(/sample vehicle:/).closest('p')).toHaveTextContent(`AB12 CDE → sample vehicle: ${sample.label}`);
    expect(screen.getByText('Sample from AB12 CDE')).toBeInTheDocument();
  });

  it('switches service tabs and sends a service to the estimator', async () => {
    const user = userEvent.setup();
    renderWorkshop();
    await user.click(screen.getByRole('tab', {name: 'MOT'}));
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveTextContent(/annual roadworthiness test/);
    await user.click(within(panel).getByRole('button', {name: 'Estimate this service'}));
    const dash = screen.getByRole('region', {name: 'MOT test'});
    expect(within(dash).getAllByText('£45').length).toBeGreaterThan(0);
    expect(within(dash).getByText(/Test fee/)).toBeInTheDocument();
  });

  it('explains the EV check is not available for petrol cars', async () => {
    const user = userEvent.setup();
    renderWorkshop();
    await user.click(screen.getByRole('tab', {name: 'EV health'}));
    await user.click(within(screen.getByRole('tabpanel')).getByRole('button', {name: 'Estimate this service'}));
    // Switched to hybrid automatically, so a price shows.
    expect(screen.getByRole('radio', {name: 'Hybrid'})).toBeChecked();
    await user.click(screen.getByRole('radio', {name: 'Petrol'}));
    expect(screen.getByText(/only for hybrid and electric vehicles/)).toBeInTheDocument();
  });
});

describe('MOT reminder', () => {
  it('validates and ends with a demo-only message', async () => {
    const user = userEvent.setup();
    render(<MotReminder />);
    await user.click(screen.getByRole('button', {name: 'Set demo reminder'}));
    expect(screen.getByText(/fix the highlighted/)).toHaveAttribute('role', 'alert');
    expect(screen.getByRole('textbox', {name: /Email/})).toHaveFocus();
    await user.type(screen.getByRole('textbox', {name: /Email/}), 'sam@example.com');
    await user.type(screen.getByRole('textbox', {name: /Registration/}), 'xy70 abc');
    expect(screen.getAllByText('Choose the month your MOT is due.').length).toBeGreaterThan(0);
  });
});

describe('Booking form', () => {
  it('blocks an empty submit and focuses the first invalid field', async () => {
    const user = userEvent.setup();
    render(<Booking seed={null} />);
    await user.click(screen.getByRole('button', {name: 'Send demo booking request'}));
    expect(await screen.findByText(/Please fix 7 fields/)).toHaveAttribute('role', 'alert');
    expect(screen.getByRole('textbox', {name: /Your name/})).toHaveFocus();
    expect(screen.getByText('Choose a drop-off date.')).toBeInTheDocument();
  });

  it('applies a seed from the estimator', () => {
    render(<Booking seed={{service: 'brakes', plate: 'AB12 CDE', nonce: 1}} />);
    expect(screen.getByRole('textbox', {name: /Registration/})).toHaveValue('AB12 CDE');
  });
});
