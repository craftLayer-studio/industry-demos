import {days, schedule, type GymClass} from './data';

export type ExperienceLevel = '' | 'new' | 'returning' | 'regular' | 'competitive';

export const experienceOptions: {value: Exclude<ExperienceLevel, ''>; label: string; description: string}[] = [
  {value: 'new', label: 'New to training', description: 'Little or no gym experience.'},
  {value: 'returning', label: 'Returning', description: 'Trained before, coming back after a break.'},
  {value: 'regular', label: 'Training regularly', description: 'Two or more sessions most weeks.'},
  {value: 'competitive', label: 'Competitive', description: 'Training for a sport or event.'},
];

export type BookingValues = {
  name: string;
  email: string;
  phone: string;
  classId: string;
  date: string;
  experience: ExperienceLevel;
  consent: boolean;
};

export type BookingField = keyof BookingValues;
export type BookingErrors = Partial<Record<BookingField, string>>;

export const emptyBooking: BookingValues = {
  name: '',
  email: '',
  phone: '',
  classId: '',
  date: '',
  experience: '',
  consent: false,
};

/** How far ahead a trial can be booked. */
export const MAX_DAYS_AHEAD = 60;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Parse YYYY-MM-DD as a local calendar date (no timezone shift). */
export function parseISODate(value: string): Date | null {
  const match = ISO_DATE_RE.exec(value);
  if (!match) return null;
  const [, y, m, d] = match.map(Number);
  const date = new Date(y, m - 1, d);
  // Reject roll-overs such as 2026-02-31.
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, n: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
}

export function findClass(id: string, classes: readonly GymClass[] = schedule): GymClass | undefined {
  return classes.find(c => c.id === id);
}

/** Next date (today included) that falls on the class's weekday. */
export function nextDateForClass(c: GymClass, today: Date): string {
  const target = days.find(d => d.id === c.day)?.index ?? 0;
  const base = startOfDay(today);
  const diff = (target - base.getDay() + 7) % 7;
  return toISODate(addDays(base, diff));
}

export function validateField(
  field: BookingField,
  values: BookingValues,
  today: Date,
  classes: readonly GymClass[] = schedule,
): string | undefined {
  switch (field) {
    case 'name': {
      const name = values.name.trim();
      if (!name) return 'Enter your name.';
      if (name.length < 2) return 'Name must be at least 2 characters.';
      if (name.length > 80) return 'Name must be 80 characters or fewer.';
      return undefined;
    }
    case 'email': {
      const email = values.email.trim();
      if (!email) return 'Enter your email address.';
      if (!EMAIL_RE.test(email)) return 'Enter an email address like name@example.com.';
      return undefined;
    }
    case 'phone': {
      const phone = values.phone.trim();
      if (!phone) return 'Enter a phone number.';
      if (!/^[+()\d\s.-]+$/.test(phone)) return 'Use digits, spaces and + ( ) - only.';
      const digits = phone.replace(/\D/g, '').length;
      if (digits < 7 || digits > 15) return 'Enter a phone number with 7 to 15 digits.';
      return undefined;
    }
    case 'classId':
      if (!values.classId) return 'Choose a class from the timetable.';
      if (!findClass(values.classId, classes)) return 'That class is no longer on the timetable.';
      return undefined;
    case 'date': {
      if (!values.date) return 'Choose a date for your trial.';
      const date = parseISODate(values.date);
      if (!date) return 'Enter a valid date.';
      const base = startOfDay(today);
      if (date < base) return 'Choose today or a future date.';
      if (date > addDays(base, MAX_DAYS_AHEAD)) return `Choose a date within the next ${MAX_DAYS_AHEAD} days.`;
      const c = findClass(values.classId, classes);
      if (c) {
        const day = days.find(d => d.id === c.day);
        if (day && date.getDay() !== day.index) return `${c.name} runs on ${day.long}s. Choose a ${day.long}.`;
      }
      return undefined;
    }
    case 'experience':
      return values.experience ? undefined : 'Tell us your training experience.';
    case 'consent':
      return values.consent ? undefined : 'Tick the box to confirm you agree to be contacted about your trial.';
  }
}

export const bookingFields: BookingField[] = ['name', 'email', 'phone', 'classId', 'date', 'experience', 'consent'];

export function validateBooking(
  values: BookingValues,
  today: Date,
  classes: readonly GymClass[] = schedule,
): BookingErrors {
  const errors: BookingErrors = {};
  for (const field of bookingFields) {
    const message = validateField(field, values, today, classes);
    if (message) errors[field] = message;
  }
  return errors;
}

export function hasErrors(errors: BookingErrors): boolean {
  return Object.keys(errors).length > 0;
}
