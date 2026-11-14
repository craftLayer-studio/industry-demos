import '@testing-library/jest-dom/vitest';
import {afterEach, describe, expect, it} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {EstateProvider} from './EstateProvider';
import {ViewingRequest} from './ViewingRequest';

afterEach(cleanup);

describe('Viewing request form', () => {
  it('reports every missing field and focuses the first one', async () => {
    const user = userEvent.setup();
    render(
      <EstateProvider>
        <ViewingRequest />
      </EstateProvider>,
    );

    await user.click(screen.getByRole('button', {name: 'Send demo request'}));
    expect(await screen.findByText('6 fields need attention.')).toBeInTheDocument();
    expect(screen.getAllByText('Choose the home you would like to see.').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Choose a date for the viewing.').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Choose a time slot.').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Enter your name.').length).toBeGreaterThan(0);

    await user.type(screen.getByRole('textbox', {name: /Full name/}), 'Sam Example');
    await user.type(screen.getByRole('textbox', {name: /Email/}), 'sam@example');
    await user.type(screen.getByRole('textbox', {name: /Phone/}), '123');
    await user.click(screen.getByRole('radio', {name: /11:00 am/}));

    expect(screen.getAllByText('Enter an email address like name@example.com.').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Enter a phone number with 7 to 15 digits.').length).toBeGreaterThan(0);
    expect(screen.queryByText('Enter your name.')).not.toBeInTheDocument();
    expect(screen.queryByText('Choose a time slot.')).not.toBeInTheDocument();
    expect(screen.getByText('4 fields need attention.')).toBeInTheDocument();
  });
});
