/** Client-side validation for the Torque & Co. Motors demo forms. Nothing is ever sent or stored. */
import {SERVICES, type ServiceId} from './estimate';
import {plateError} from './plate';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]+$/;

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isPhone(value: string): boolean {
  const v = value.trim();
  if (!PHONE_RE.test(v)) return false;
  const digits = v.replace(/\D/g, '').length;
  return digits >= 7 && digits <= 15;
}

/* ---------- dates ---------- */

export function toISODate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function addDays(d: Date, days: number): Date {
  const next = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  next.setDate(next.getDate() + days);
  return next;
}

export function parseISO(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return toISODate(d) === value ? d : null;
}

/** Earliest drop-off: the next working day. */
export function earliestBookingDate(today: Date): string {
  return toISODate(addDays(today, 1));
}

/** Latest drop-off: eight weeks ahead. */
export function latestBookingDate(today: Date): string {
  return toISODate(addDays(today, 56));
}

/** The fictional workshop takes drop-offs Monday to Saturday. */
export function isWorkshopDay(value: string): boolean {
  const d = parseISO(value);
  return d !== null && d.getDay() !== 0;
}

/* ---------- MOT reminder ---------- */

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export type ReminderValues = {email: string; plate: string; month: string; consent: boolean};
export type ReminderField = keyof ReminderValues;
export type ReminderErrors = Partial<Record<ReminderField, string>>;
export const EMPTY_REMINDER: ReminderValues = {email: '', plate: '', month: '', consent: false};
export const REMINDER_ORDER: ReminderField[] = ['email', 'plate', 'month', 'consent'];

export function validateReminder(v: ReminderValues): ReminderErrors {
  const e: ReminderErrors = {};
  if (!v.email.trim()) e.email = 'Enter an email address.';
  else if (!isEmail(v.email)) e.email = 'Enter an email address like name@example.com.';
  const plate = plateError(v.plate);
  if (plate) e.plate = plate;
  if (!MONTHS.includes(v.month)) e.month = 'Choose the month your MOT is due.';
  if (!v.consent) e.consent = 'Please confirm you understand this is a demo.';
  return e;
}

/* ---------- booking request ---------- */

export const TIME_SLOTS = [
  {value: '08:00', label: '08:00 drop-off'},
  {value: '09:30', label: '09:30 drop-off'},
  {value: '12:00', label: '12:00 drop-off'},
  {value: 'wait', label: 'Wait while we work (MOT and short jobs)'},
];

export const NOTES_MAX = 500;

export type BookingValues = {
  name: string;
  email: string;
  phone: string;
  plate: string;
  service: string;
  date: string;
  slot: string;
  notes: string;
  consent: boolean;
};
export type BookingField = keyof BookingValues;
export type BookingErrors = Partial<Record<BookingField, string>>;

export const EMPTY_BOOKING: BookingValues = {
  name: '',
  email: '',
  phone: '',
  plate: '',
  service: '',
  date: '',
  slot: '',
  notes: '',
  consent: false,
};

export const BOOKING_ORDER: BookingField[] = ['name', 'email', 'phone', 'plate', 'service', 'date', 'slot', 'notes', 'consent'];

export function validateBooking(v: BookingValues, today: Date): BookingErrors {
  const e: BookingErrors = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name.';
  if (!v.email.trim()) e.email = 'Enter an email address.';
  else if (!isEmail(v.email)) e.email = 'Enter an email address like name@example.com.';
  if (v.phone.trim() && !isPhone(v.phone)) e.phone = 'Enter a phone number using digits, or leave it blank.';
  const plate = plateError(v.plate);
  if (plate) e.plate = plate;
  if (!SERVICES.some(s => s.value === (v.service as ServiceId))) e.service = 'Choose a service.';
  if (!v.date) e.date = 'Choose a drop-off date.';
  else if (!parseISO(v.date)) e.date = 'Enter a valid date.';
  else if (v.date < earliestBookingDate(today)) e.date = 'Choose a date from tomorrow onwards.';
  else if (v.date > latestBookingDate(today)) e.date = 'Choose a date within the next eight weeks.';
  else if (!isWorkshopDay(v.date)) e.date = 'The workshop is closed on Sundays. Choose another day.';
  if (!TIME_SLOTS.some(s => s.value === v.slot)) e.slot = 'Choose a drop-off time.';
  if (v.notes.length > NOTES_MAX) e.notes = `Keep the notes under ${NOTES_MAX} characters.`;
  if (!v.consent) e.consent = 'Please confirm you understand this is a demo.';
  return e;
}

export function hasErrors(e: Record<string, string | undefined>): boolean {
  return Object.values(e).some(Boolean);
}

export function firstError<K extends string>(e: Partial<Record<K, string>>, order: K[]): K | undefined {
  return order.find(k => e[k]);
}
