import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {LegalInteractive} from './LegalInteractive';
import {Enquiry} from './Enquiry';

afterEach(cleanup);

describe('Marlowe & Pike interactive sections', () => {
  it('switches practice area panels with tabs', async () => {
    const user = userEvent.setup();
    render(<LegalInteractive>{null}</LegalInteractive>);
    expect(screen.getByRole('heading', {name: 'Residential and commercial property'})).toBeVisible();
    await user.click(screen.getByRole('tab', {name: 'Wills & probate'}));
    expect(screen.getByRole('tab', {name: 'Wills & probate'})).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', {name: /Wills, probate/})).toBeVisible();
    expect(screen.queryByRole('heading', {name: 'Residential and commercial property'})).not.toBeInTheDocument();
  });

  it('updates the conveyancing estimate when inputs change', async () => {
    const user = userEvent.setup();
    render(<LegalInteractive>{null}</LegalInteractive>);
    // Default: freehold, £325,000, mortgage, not first-time buyer.
    // Fees 1150 + 150 + 30 = 1330, VAT 266, disbursements 320 + 150 + 40 = 510.
    expect(screen.getByTestId('quote-total')).toHaveTextContent('£2,106');
    await user.click(screen.getByRole('radio', {name: 'Leasehold'}));
    expect(screen.getByRole('rowheader', {name: /Leasehold supplement/})).toBeInTheDocument();
    expect(screen.getByTestId('quote-total')).toHaveTextContent('£2,526');
    await user.click(screen.getByRole('checkbox', {name: /first-time buyer/}));
    expect(screen.getByTestId('quote-total')).toHaveTextContent('£2,406');
  });

  it('prefills the enquiry from the estimate', async () => {
    const user = userEvent.setup();
    render(<LegalInteractive>{null}</LegalInteractive>);
    await user.click(screen.getByRole('button', {name: 'Enquire about this estimate'}));
    expect(screen.getByText(/Prefilled from your conveyancing estimate/)).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /How can we help/})).toHaveValue(
      'I would like to discuss a conveyancing estimate. Freehold purchase at £325,000, with a mortgage: sample estimate £2,106 including VAT and disbursements.',
    );
  });

  it('validates the enquiry and ends with a demo-only confirmation', async () => {
    const user = userEvent.setup();
    render(<Enquiry />);
    await user.click(screen.getByRole('button', {name: 'Send enquiry (demo)'}));
    expect(screen.getByText('6 answers need attention.')).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /Full name/})).toHaveFocus();

    await user.type(screen.getByRole('textbox', {name: /Full name/}), 'Sam Example');
    await user.type(screen.getByRole('textbox', {name: /Email/}), 'sam@example.com');
    await user.click(screen.getByRole('combobox', {name: /Practice area/}));
    await user.click(await screen.findByRole('option', {name: 'Family'}));
    await user.click(screen.getByRole('radio', {name: 'Phone call'}));
    await user.type(screen.getByRole('textbox', {name: /How can we help/}), 'We would like help with a separation agreement.');
    await user.click(screen.getByRole('checkbox', {name: /concept demo/}));
    await user.click(screen.getByRole('button', {name: 'Send enquiry (demo)'}));
    expect(screen.getByText('One answer needs attention.')).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /Phone/})).toHaveFocus();

    await user.type(screen.getByRole('textbox', {name: /Phone/}), '0555 010 0199');
    await user.click(screen.getByRole('button', {name: 'Send enquiry (demo)'}));
    expect(screen.getByRole('heading', {name: 'Thank you, Sam'})).toHaveFocus();
    expect(screen.getByText(/Demo only: nothing was sent/)).toHaveAttribute('role', 'status');
  });
});
