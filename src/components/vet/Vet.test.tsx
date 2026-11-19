import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Services} from './Services';
import {PlanCalculator} from './PlanCalculator';
import {AppointmentForm} from './AppointmentForm';
import {services} from './lib/data';
import {filterServices} from './lib/services';

afterEach(cleanup);

describe('Services filter', () => {
  it('shows only services for the chosen pet type', async () => {
    const user = userEvent.setup();
    render(<Services />);
    expect(screen.getAllByRole('heading', {level: 3})).toHaveLength(services.length);
    await user.click(screen.getByRole('button', {name: 'Rabbits'}));
    const expected = filterServices(services, 'rabbit');
    expect(screen.getAllByRole('heading', {level: 3})).toHaveLength(expected.length);
    expect(screen.getByRole('heading', {name: 'Rabbit diet and housing chats'})).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name: 'Quiet cat hours'})).toBeNull();
    expect(screen.getByText(`Showing ${expected.length} services for rabbits.`)).toHaveAttribute('role', 'status');
  });
});

describe('Plan calculator', () => {
  it('updates the sample monthly price', async () => {
    const user = userEvent.setup();
    render(<PlanCalculator />);
    // Default: adult dog with dental check-ins = 16.50 + 3.50.
    expect(screen.getByText('£20.00')).toBeInTheDocument();
    await user.click(screen.getByRole('radio', {name: 'Small pet'}));
    // Dental is not offered for small pets, so it drops out.
    expect(screen.queryByRole('checkbox', {name: /Dental/})).toBeNull();
    expect(screen.getAllByText('£6.00').length).toBeGreaterThan(0);
    await user.click(screen.getByRole('checkbox', {name: /Unlimited nail clips/}));
    expect(screen.getByText('£8.00')).toBeInTheDocument();
    expect(screen.getByText(/Illustrative only/)).toBeInTheDocument();
  });
});

describe('Appointment form', () => {
  it('reports errors on an empty submit and focuses the first invalid field', async () => {
    const user = userEvent.setup();
    render(<AppointmentForm />);
    await user.click(screen.getByRole('button', {name: 'Send demo request'}));
    expect(await screen.findByText(/Please fix 7 fields/)).toHaveAttribute('role', 'alert');
    expect(screen.getByRole('textbox', {name: /Your name/})).toHaveFocus();
    expect(screen.getByText('Enter your name.')).toBeInTheDocument();
    expect(screen.queryByText('Demo request complete')).toBeNull();
  });
});
