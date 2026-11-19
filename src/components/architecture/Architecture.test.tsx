import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it} from 'vitest';
import {cleanup, render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {StudioProvider} from './StudioProvider';
import {Archive} from './Archive';
import {BriefBuilder} from './BriefBuilder';
import {FeeGuide} from './FeeGuide';
import {Stages} from './Stages';

afterEach(cleanup);

describe('Project archive', () => {
  it('filters by type and shows an honest count', async () => {
    const user = userEvent.setup();
    render(
      <StudioProvider>
        <Archive />
      </StudioProvider>,
    );
    const list = screen.getByRole('list', {name: 'Fictional projects'});
    expect(within(list).getAllByRole('listitem')).toHaveLength(12);

    await user.click(screen.getByRole('button', {name: /^Interior, 4/}));
    expect(within(screen.getByRole('list', {name: 'Fictional projects'})).getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByText('Showing 4 fictional interior projects.')).toHaveAttribute('role', 'status');

    await user.click(screen.getByRole('button', {name: 'Clear filters'}));
    expect(within(screen.getByRole('list', {name: 'Fictional projects'})).getAllByRole('listitem')).toHaveLength(12);
  });
});

describe('Brief builder', () => {
  it('validates each step and ends with a demo-only confirmation', async () => {
    const user = userEvent.setup();
    render(
      <StudioProvider>
        <BriefBuilder />
      </StudioProvider>,
    );

    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(await screen.findByText('One answer needs attention.')).toBeInTheDocument();
    expect(screen.getAllByText('Choose the kind of project.').length).toBeGreaterThan(0);

    await user.click(screen.getByRole('radio', {name: /Extension/}));
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getByRole('heading', {name: 'What is the construction budget?'})).toHaveFocus();

    await user.click(screen.getByRole('radio', {name: /£100k to £250k/}));
    expect(screen.getByText(/Illustrative fee for a extension|Illustrative fee for an extension|Illustrative fee for a/)).toHaveTextContent(
      '£12,000 to £40,000',
    );
    await user.click(screen.getByRole('button', {name: 'Continue'}));

    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getByText('2 answers need attention.')).toBeInTheDocument();
    await user.click(screen.getByRole('radio', {name: /In 3 to 6 months/}));
    await user.click(screen.getByRole('radio', {name: 'Not started'}));
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getByRole('heading', {name: 'How can the studio reach you?'})).toHaveFocus();

    await user.type(screen.getByRole('textbox', {name: /Your name/}), 'Sam Example');
    await user.type(screen.getByRole('textbox', {name: /Email/}), 'sam@example');
    await user.click(screen.getByRole('button', {name: 'Continue'}));
    expect(screen.getAllByText('Enter an email address like name@example.com.').length).toBeGreaterThan(0);
    expect(screen.getByRole('textbox', {name: /Email/})).toHaveFocus();
    await user.type(screen.getByRole('textbox', {name: /Email/}), '.com');
    await user.click(screen.getByRole('button', {name: 'Continue'}));

    expect(screen.getByRole('heading', {name: 'Review your brief'})).toHaveFocus();
    expect(screen.getByText('Sam Example')).toBeInTheDocument();
    expect(screen.getByText(/£100k to £250k/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Send demo brief'}));
    expect(screen.getByRole('heading', {name: 'Brief complete'})).toHaveFocus();
    expect(screen.getByText('Demo only: nothing was sent')).toBeInTheDocument();
  });

  it('is prefilled from the fee guide', async () => {
    const user = userEvent.setup();
    render(
      <StudioProvider>
        <FeeGuide />
        <BriefBuilder />
      </StudioProvider>,
    );
    expect(screen.getByTestId('fee-total')).toHaveTextContent('£12,000 to £40,000');
    await user.click(screen.getByRole('button', {name: 'Use these in a brief'}));
    expect(await screen.findByText(/Prefilled from the fee guide/)).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'When would you like to start?'})).toBeInTheDocument();
  });
});

describe('Design stages', () => {
  it('switches the stage panel', async () => {
    const user = userEvent.setup();
    render(<Stages />);
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('Stage 0: Strategic definition');
    await user.click(screen.getByRole('tab', {name: '4 Technical'}));
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName('Stage 4: Technical design');
  });
});
