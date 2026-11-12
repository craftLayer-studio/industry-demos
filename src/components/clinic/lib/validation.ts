/**
 * Validation for the demo booking contact step. Asks for the minimum needed
 * to request an appointment. Nothing is ever sent anywhere.
 */

export type ContactDetails = {
  name: string;
  email: string;
  phone: string;
  reason: string;
};

export type ContactErrors = Partial<Record<keyof ContactDetails, string>>;

export const REASON_MAX = 200;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS_RE = /^[+()\-.\s\d]+$/;

export function validateName(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Enter your name.';
  if (v.length < 2) return 'Name must be at least 2 characters.';
  if (v.length > 80) return 'Name must be 80 characters or fewer.';
  if (/\d/.test(v)) return 'Name should not contain numbers.';
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Enter an email address.';
  if (v.length > 254 || !EMAIL_RE.test(v)) return 'Enter an email address like name@example.com.';
  return undefined;
}

export function validatePhone(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Enter a phone number.';
  if (!PHONE_CHARS_RE.test(v)) return 'Use only digits, spaces and + ( ) - characters.';
  const digits = v.replace(/\D/g, '').length;
  if (digits < 7 || digits > 15) return 'Phone number must have 7 to 15 digits.';
  return undefined;
}

export function validateReason(value: string): string | undefined {
  if (value.length > REASON_MAX) return `Keep the reason to ${REASON_MAX} characters or fewer.`;
  return undefined;
}

export function validateContact(details: ContactDetails): ContactErrors {
  const errors: ContactErrors = {};
  const name = validateName(details.name);
  const email = validateEmail(details.email);
  const phone = validatePhone(details.phone);
  const reason = validateReason(details.reason);
  if (name) errors.name = name;
  if (email) errors.email = email;
  if (phone) errors.phone = phone;
  if (reason) errors.reason = reason;
  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Booking state needed before each step may be left. */
export type BookingDraft = {
  specialty: string | null;
  clinician: string | null;
  date: string | null;
  time: string | null;
};

export function stepError(step: number, draft: BookingDraft): string | null {
  if (step === 0 && !draft.specialty) return 'Choose a specialty to continue.';
  if (step === 1 && !draft.clinician) return 'Choose a clinician to continue.';
  if (step === 2 && !draft.date) return 'Choose a date to continue.';
  if (step === 2 && !draft.time) return 'Choose an available time to continue.';
  return null;
}
