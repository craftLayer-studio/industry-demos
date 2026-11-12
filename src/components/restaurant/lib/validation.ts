/** Pure form validation for the reservation and pickup checkout flows. */

import {
  BOOKING_WINDOW_DAYS,
  addDays,
  isOpenDay,
  parseISODate,
  pickupSlots,
  reservationSlots,
  toISODate,
  DAY_NAMES,
} from './hours';

export const MIN_PARTY = 1;
export const MAX_PARTY = 12;
export const MAX_REQUESTS_LENGTH = 300;

export type Errors<K extends string> = Partial<Record<K, string>>;

export function validateName(value: string, subject: 'booking' | 'order' = 'booking'): string | undefined {
  const name = value.trim();
  if (!name) return `Please enter a name for the ${subject}.`;
  if (name.length < 2) return 'Name must be at least 2 characters.';
  if (name.length > 80) return 'Name must be 80 characters or fewer.';
  if (!/\p{L}/u.test(name)) return 'Name should include letters.';
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const email = value.trim();
  if (!email) return 'Please enter an email address.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return 'Enter an email like name@example.com.';
  return undefined;
}

export function validatePhone(value: string): string | undefined {
  const phone = value.trim();
  if (!phone) return 'Please enter a phone number.';
  if (!/^\+?[\d\s().-]+$/.test(phone)) return 'Use digits, spaces, brackets, dashes or a leading +.';
  const digits = phone.replace(/\D/g, '').length;
  if (digits < 7 || digits > 15) return 'Phone number should have 7 to 15 digits.';
  return undefined;
}

export type ReservationValues = {
  date: string;
  time: string;
  partySize: number | null;
  name: string;
  email: string;
  phone: string;
  requests: string;
};

export type ReservationField = keyof ReservationValues;

export const EMPTY_RESERVATION: ReservationValues = {
  date: '',
  time: '',
  partySize: 2,
  name: '',
  email: '',
  phone: '',
  requests: '',
};

export function validateDate(value: string, now: Date): string | undefined {
  if (!value) return 'Choose a date.';
  const date = parseISODate(value);
  if (!date) return 'Enter a valid date.';
  const today = toISODate(now);
  if (value < today) return 'That date has passed. Choose today or later.';
  if (value > toISODate(addDays(now, BOOKING_WINDOW_DAYS)))
    return `We take bookings up to ${BOOKING_WINDOW_DAYS} days ahead.`;
  if (!isOpenDay(date)) return `We are closed on ${DAY_NAMES[date.getDay()]}s. Please pick another day.`;
  return undefined;
}

export function validatePartySize(value: number | null): string | undefined {
  if (value === null || Number.isNaN(value)) return 'Enter the number of guests.';
  if (!Number.isInteger(value)) return 'Party size must be a whole number.';
  if (value < MIN_PARTY) return `Party size must be at least ${MIN_PARTY}.`;
  if (value > MAX_PARTY) return `We seat up to ${MAX_PARTY} online. For larger groups, please call us.`;
  return undefined;
}

export function validateReservation(values: ReservationValues, now: Date): Errors<ReservationField> {
  const errors: Errors<ReservationField> = {};
  const dateError = validateDate(values.date, now);
  if (dateError) errors.date = dateError;

  if (!values.time) {
    errors.time = 'Choose a time.';
  } else if (!dateError) {
    const date = parseISODate(values.date) as Date;
    if (!reservationSlots(date, now).includes(values.time)) {
      errors.time = 'That time is outside our opening hours or has passed.';
    }
  }

  const party = validatePartySize(values.partySize);
  if (party) errors.partySize = party;
  const name = validateName(values.name);
  if (name) errors.name = name;
  const email = validateEmail(values.email);
  if (email) errors.email = email;
  const phone = validatePhone(values.phone);
  if (phone) errors.phone = phone;
  if (values.requests.length > MAX_REQUESTS_LENGTH)
    errors.requests = `Keep requests under ${MAX_REQUESTS_LENGTH} characters.`;
  return errors;
}

export type CheckoutValues = {name: string; pickup: string};
export type CheckoutField = keyof CheckoutValues;

export function validateCheckout(values: CheckoutValues, now: Date): Errors<CheckoutField> {
  const errors: Errors<CheckoutField> = {};
  const name = validateName(values.name, 'order');
  if (name) errors.name = name;
  if (!values.pickup) errors.pickup = 'Choose a pickup time.';
  else if (!pickupSlots(now).some((slot) => slot.value === values.pickup))
    errors.pickup = 'That pickup time is no longer available. Choose another.';
  return errors;
}

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(Boolean);
}
