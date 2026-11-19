import type {PetType} from './data';

export type VisitReason = 'checkup' | 'vaccination' | 'nails' | 'other';
export type TimeOfDay = 'morning' | 'afternoon';

export type AppointmentRequest = {
  ownerName: string;
  email: string;
  petName: string;
  pet: PetType | '';
  reason: VisitReason | '';
  date: string;
  timeOfDay: TimeOfDay;
  notes: string;
  understood: boolean;
};

export type AppointmentErrors = Partial<Record<keyof AppointmentRequest, string>>;

export const NOTES_MAX = 400;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Parses an ISO YYYY-MM-DD string as a local calendar date. */
export function parseISODate(value: string): Date | null {
  if (!ISO_RE.test(value)) return null;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Requests can be for tomorrow up to 60 days ahead, never on a Sunday (closed). */
export function isRequestableDate(date: Date, today: Date): boolean {
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60);
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return day >= start && day <= end && day.getDay() !== 0;
}

export function validateAppointment(req: AppointmentRequest, today: Date): AppointmentErrors {
  const errors: AppointmentErrors = {};
  if (req.ownerName.trim().length < 2) errors.ownerName = 'Enter your name.';
  if (!req.email.trim()) errors.email = 'Enter an email address.';
  else if (!EMAIL_RE.test(req.email.trim())) errors.email = 'Enter an email address like name@example.com.';
  if (!req.petName.trim()) errors.petName = 'Enter your pet’s name.';
  if (!req.pet) errors.pet = 'Choose the type of pet.';
  if (!req.reason) errors.reason = 'Choose a reason for the visit.';
  if (!req.date) errors.date = 'Choose a preferred date.';
  else {
    const date = parseISODate(req.date);
    if (!date) errors.date = 'Enter a valid date.';
    else if (!isRequestableDate(date, today))
      errors.date = 'Choose a date from tomorrow up to 60 days ahead. The practice is closed on Sundays.';
  }
  if (req.notes.length > NOTES_MAX) errors.notes = `Keep notes under ${NOTES_MAX} characters.`;
  if (!req.understood) errors.understood = 'Confirm you understand this is a demo.';
  return errors;
}

export function hasErrors(errors: AppointmentErrors): boolean {
  return Object.keys(errors).length > 0;
}
