import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it} from 'vitest';
import {cleanup, render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AdvisoryInteractive} from './AdvisoryInteractive';
import {Consultation} from './Consultation';

afterEach(cleanup);

describe('Consultation request', () => {
  it('validates each step, moves focus to step headings and ends with a demo confirmation', async () => {
    const user = userEvent.setup();
    render(<Consultation />);

    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(await screen.findByText('One answer needs attention.')).toBeInTheDocument();
    expect(screen.getAllByText('Choose at least one topic to discuss.').length).toBeGreaterThan(0);

    await user.click(screen.getByRole('checkbox', {name: 'Payroll'}));
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getByRole('heading', {name: 'About you and your company'})).toHaveFocus();

    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getByText('5 answers need attention.')).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /Your name/})).toHaveFocus();

    await user.type(screen.getByRole('textbox', {name: /Your name/}), 'Sam Example');
    await user.type(screen.getByRole('textbox', {name: /Email/}), 'sam@example.com');
    await user.type(screen.getByRole('textbox', {name: /Company or organisation/}), 'Example Studio');
    await user.click(screen.getByRole('combobox', {name: /Company size/}));
    await user.click(await screen.findByRole('option', {name: '2–10 people'}));
    await user.click(screen.getByRole('combobox', {name: /Stage/}));
    await user.click(await screen.findByRole('option', {name: 'Early revenue'}));
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getByRole('heading', {name: 'How and when to meet'})).toHaveFocus();

    await user.click(screen.getByRole('radio', {name: /Video call/}));
    const monday = screen.getByRole('group', {name: 'Monday'});
    await user.click(within(monday).getByRole('button', {name: 'Morning'}));
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getByText('Choose 2 more time windows (3 in total).')).toHaveFocus();

    await user.click(within(screen.getByRole('group', {name: 'Wednesday'})).getByRole('button', {name: 'Midday'}));
    await user.click(within(screen.getByRole('group', {name: 'Friday'})).getByRole('button', {name: 'Afternoon'}));
    // A fourth window cannot be added.
    const extra = within(screen.getByRole('group', {name: 'Tuesday'})).getByRole('button', {name: 'Morning'});
    expect(extra).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByText(/3 of 3 chosen/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getByRole('heading', {name: 'Review your request'})).toHaveFocus();
    expect(screen.getByText('Sam Example')).toBeInTheDocument();
    expect(screen.getByText('Wednesday midday (11 am–2 pm)')).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Send demo request'}));
    expect(screen.getByRole('heading', {name: 'Request complete'})).toHaveFocus();
    expect(screen.getByText('Demo only: no consultation was booked and nothing was sent')).toBeInTheDocument();
  });
});

describe('Fee estimator handoff', () => {
  it('updates the total and prefills consultation topics', async () => {
    const user = userEvent.setup();
    render(<AdvisoryInteractive after={null}>{null}</AdvisoryInteractive>);

    const total = screen.getByTestId('estimate-total');
    const before = total.textContent;
    await user.click(within(screen.getByRole('group', {name: /Services needed/})).getByRole('checkbox', {name: /Fractional CFO/}));
    expect(screen.getByTestId('estimate-total').textContent).not.toBe(before);

    await user.click(screen.getByRole('radio', {name: /Annual/}));
    expect(screen.getByRole('row', {name: /Annual billing/})).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Discuss this estimate'}));
    expect(screen.getByRole('heading', {name: 'What would you like to discuss?'})).toHaveFocus();
    expect(screen.getByText(/Prefilled from your fee estimate/)).toHaveTextContent('billed annually');

    const topics = screen.getByRole('group', {name: /Topics/});
    expect(within(topics).getByRole('checkbox', {name: 'Bookkeeping'})).toBeChecked();
    expect(within(topics).getByRole('checkbox', {name: 'Fractional CFO'})).toBeChecked();
    expect(within(topics).getByRole('checkbox', {name: 'Tax planning support'})).not.toBeChecked();
  });
});
