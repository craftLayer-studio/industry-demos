import {serviceById, specialistById} from './data';
import {dateProblem, DATE_PROBLEM_MESSAGES} from './dates';
import {EMAIL_RE} from './giftCard';
import {generateSlots} from './slots';

export const NOTES_MAX = 300;
/** Sentinel for "any specialist". */
export const ANY = 'any';

export type AppointmentDraft = {
  service: string | null;
  /** A specialist id, ANY, or null when not chosen yet. */
  specialist: string | null;
  date: string | null;
  time: string | null;
};

export type ContactDetails = {name: string; email: string; phone: string; notes: string};
export type ContactErrors = Partial<Record<keyof ContactDetails, string>>;

export const STEP_IDS = ['service', 'specialist', 'date', 'time', 'contact', 'review'] as const;
export type StepId = (typeof STEP_IDS)[number];

/** Problem with a selection step, or null when the user may continue. */
export function stepError(step: StepId, d: AppointmentDraft, today: string | null): string | null {
  const service = d.service ? serviceById(d.service) : undefined;
  if (step === 'service') return service ? null : 'Choose a service to continue.';
  if (step === 'specialist') {
    if (!d.specialist) return 'Choose a specialist, or “Any specialist”.';
    if (d.specialist === ANY) return null;
    const s = specialistById(d.specialist);
    if (!s) return 'Choose a specialist, or “Any specialist”.';
    if (service && !s.categories.includes(service.category)) return `${s.name} does not offer this service.`;
    return null;
  }
  if (step === 'date') {
    if (!d.date) return 'Choose a date to continue.';
    if (!today) return 'Dates are still loading.';
    const s = d.specialist && d.specialist !== ANY ? specialistById(d.specialist) : undefined;
    const p = dateProblem(d.date, today, s?.days);
    return p ? DATE_PROBLEM_MESSAGES[p] : null;
  }
  if (step === 'time') {
    if (!d.time) return 'Choose a time to continue.';
    if (!service || !d.date || !today) return 'Choose a service and date first.';
    const slots = generateSlots({
      iso: d.date,
      today,
      duration: service.duration,
      specialistId: d.specialist && d.specialist !== ANY ? d.specialist : null,
      categoryIds: [service.category],
    });
    return slots.some(s => s.time === d.time) ? null : 'That time is no longer available. Choose another.';
  }
  return null;
}

const PHONE_RE = /^[+()\d][\d\s()+-]{6,19}$/;

export function validateContact(c: ContactDetails): ContactErrors {
  const e: ContactErrors = {};
  const name = c.name.trim();
  if (!name) e.name = 'Enter your name.';
  else if (name.length < 2) e.name = 'Enter at least 2 characters.';
  else if (name.length > 80) e.name = 'Keep your name under 80 characters.';

  const email = c.email.trim();
  if (!email) e.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(email)) e.email = 'Enter an email like name@example.com.';

  const phone = c.phone.trim();
  if (phone && (!PHONE_RE.test(phone) || phone.replace(/\D/g, '').length < 7))
    e.phone = 'Enter a phone number with at least 7 digits, or leave it blank.';

  if (c.notes.length > NOTES_MAX) e.notes = `Keep notes to ${NOTES_MAX} characters.`;
  return e;
}
