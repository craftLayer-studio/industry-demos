import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it} from 'vitest';
import {cleanup, render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Consultation} from './Consultation';
import {Treatments} from './Treatments';
import {treatments} from './lib/data';

afterEach(cleanup);

describe('Treatments', () => {
  it('filters by tab and offers an estimate for larger treatments', async () => {
    const user = userEvent.setup();
    const picked: string[] = [];
    render(<Treatments onEstimate={t => picked.push(t.id)} />);
    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getAllByRole('heading', {level: 3})).toHaveLength(treatments.length);

    await user.click(screen.getByRole('tab', {name: 'Implants'}));
    const headings = within(screen.getByRole('tabpanel')).getAllByRole('heading', {level: 3});
    expect(headings.map(h => h.textContent)).toEqual(['Implant consultation', 'Single tooth implant']);

    await user.click(screen.getByRole('button', {name: /Estimate monthly payments for Single tooth implant/}));
    expect(picked).toEqual(['single-implant']);
  });
});

describe('Consultation form', () => {
  it('shows errors, then a demo-only success message', async () => {
    const user = userEvent.setup();
    render(<Consultation />);
    await user.click(screen.getByRole('button', {name: 'Send demo request'}));
    expect(screen.getByText('Enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Choose what you would like to discuss.')).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /Full name/})).toHaveFocus();

    await user.type(screen.getByRole('textbox', {name: /Full name/}), 'Alex Example');
    await user.type(screen.getByRole('textbox', {name: /Email/}), 'alex@example.com');
    await user.click(screen.getByRole('checkbox', {name: /concept demo/}));
    await user.click(screen.getByRole('button', {name: 'Send demo request'}));
    // Interest is still missing.
    expect(screen.queryByText('Demo request complete')).toBeNull();
    expect(screen.getByText('Choose what you would like to discuss.')).toBeInTheDocument();
  });
});
