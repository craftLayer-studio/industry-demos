import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Estimator} from './Estimator';
import {Projects} from './Projects';
import {Services} from './Services';
import {Survey} from './Survey';

afterEach(cleanup);

describe('Estimator', () => {
  it('shows the default sample range and updates for double storey', async () => {
    const user = userEvent.setup();
    render(<Estimator />);
    expect(screen.getByText(/Illustrative range £58,000 to £76,000/)).toBeInTheDocument();
    await user.click(screen.getByRole('radio', {name: 'Double storey'}));
    expect(screen.queryByText(/Illustrative range £58,000 to £76,000/)).toBeNull();
    expect(screen.getByText(/for 48 square metres/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', {name: 'Reset to defaults'}));
    expect(screen.getByText(/Illustrative range £58,000 to £76,000/)).toBeInTheDocument();
  });

  it('labels the figures as sample figures', () => {
    render(<Estimator />);
    expect(screen.getByText('Sample figures')).toBeInTheDocument();
    expect(screen.getByText(/Not a quote/)).toBeInTheDocument();
  });
});

describe('Services tabs', () => {
  it('switches the visible panel', async () => {
    const user = userEvent.setup();
    render(<Services />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/extensions/i);
    await user.click(screen.getByRole('tab', {name: 'Loft conversions'}));
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/Dormer, hip-to-gable/);
  });
});

describe('Projects filter', () => {
  it('filters sample projects by service', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    expect(screen.getAllByRole('heading', {level: 3})).toHaveLength(6);
    await user.click(screen.getByRole('radio', {name: 'Lofts'}));
    expect(screen.getAllByRole('heading', {level: 3})).toHaveLength(2);
    expect(screen.getByText('Showing 2 sample projects')).toBeInTheDocument();
  });
});

describe('Survey form', () => {
  it('blocks an empty submit and focuses the first invalid field', async () => {
    const user = userEvent.setup();
    render(<Survey />);
    await user.click(screen.getByRole('button', {name: 'Request demo survey'}));
    expect(await screen.findByText(/Please fix 7 fields/)).toHaveAttribute('role', 'alert');
    expect(screen.getByRole('textbox', {name: /Your name/})).toHaveFocus();
    expect(screen.getByText('Enter your name.')).toBeInTheDocument();
  });
});
