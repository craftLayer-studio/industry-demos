/**
 * Booking request validation. Stay details (room, dates, guests) are
 * checked with the same rules as the rate calculator; contact details get
 * light client-side checks. Nothing is ever sent.
 */
import {issueMessage, quoteStay, type QuoteIssue} from './rates';
import {addDays, daysBetween, formatShortDate, isISODate} from './dates';

export const BOOKING_WINDOW_DAYS = 365;
export const REQUESTS_MAX = 500;

export type ContactDraft = {
  name: string;
  email: string;
  phone: string;
  arrival: string;
  requests: string;
  acknowledge: boolean;
};

export type StayDraft = {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  breakfast: boolean;
};

export type BookingField = 'roomId' | 'checkIn' | 'checkOut' | 'guests' | keyof ContactDraft;
export type BookingErrors = Partial<Record<BookingField, string>>;

export const FIELD_ORDER: BookingField[] = ['roomId', 'checkIn', 'checkOut', 'guests', 'name', 'email', 'phone', 'arrival', 'requests', 'acknowledge'];

export const EMPTY_CONTACT: ContactDraft = {name: '', email: '', phone: '', arrival: '', requests: '', acknowledge: false};

export const arrivalOptions = [
  {value: 'afternoon', label: '3 pm to 5 pm'},
  {value: 'evening', label: '5 pm to 8 pm'},
  {value: 'late', label: 'After 8 pm'},
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Allowed check-in range: today up to a year ahead. */
export function bookingWindow(today: string): {min: string; max: string} {
  return {min: today, max: addDays(today, BOOKING_WINDOW_DAYS)};
}

function fieldForIssue(issue: QuoteIssue): BookingField {
  switch (issue.code) {
    case 'room':
      return 'roomId';
    case 'capacity':
      return 'guests';
    case 'dates':
    case 'order':
    case 'max-stay':
    case 'min-stay':
    case 'unavailable':
      return 'checkOut';
  }
}

export function validateBooking(stay: StayDraft, contact: ContactDraft, today: string): BookingErrors {
  const errors: BookingErrors = {};

  // Dates first: specific messages for each field.
  if (!isISODate(stay.checkIn)) errors.checkIn = 'Choose a check-in date.';
  else if (daysBetween(today, stay.checkIn) < 0) errors.checkIn = 'Check-in cannot be in the past.';
  else if (daysBetween(today, stay.checkIn) > BOOKING_WINDOW_DAYS) errors.checkIn = 'Check-in must be within a year from today.';
  if (!isISODate(stay.checkOut)) errors.checkOut = 'Choose a check-out date.';

  const quote = quoteStay(stay);
  for (const issue of quote.issues) {
    if (issue.code === 'dates') continue; // covered above
    const field = fieldForIssue(issue);
    if (!errors[field]) errors[field] = issueMessage(issue, formatShortDate);
  }

  const name = contact.name.trim();
  if (!name) errors.name = 'Enter your name.';
  else if (name.length < 2) errors.name = 'Enter at least 2 characters.';

  const email = contact.email.trim();
  if (!email) errors.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter an email address like name@example.com.';

  const digits = contact.phone.replace(/\D/g, '');
  if (contact.phone.trim() && (digits.length < 7 || digits.length > 15)) errors.phone = 'Enter a phone number with 7 to 15 digits, or leave it blank.';

  if (!contact.arrival) errors.arrival = 'Choose an arrival time.';
  if (contact.requests.length > REQUESTS_MAX) errors.requests = `Keep requests under ${REQUESTS_MAX} characters.`;
  if (!contact.acknowledge) errors.acknowledge = 'Confirm that you understand this is a demo.';

  return errors;
}

export function hasErrors(e: BookingErrors): boolean {
  return Object.keys(e).length > 0;
}
