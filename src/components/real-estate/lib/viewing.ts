/**
 * Viewing request rules: dates are weekdays from tomorrow up to 30 days
 * ahead, and contact details get light client-side checks. ISO calendar
 * strings (YYYY-MM-DD) are handled in UTC so results do not depend on the
 * viewer's time zone.
 */

export const VIEWING_WINDOW_DAYS = 30;

export const timeSlots = [
  {value: '09:30', label: '9:30 am', description: 'First viewing of the morning'},
  {value: '11:00', label: '11:00 am', description: 'Late morning'},
  {value: '13:30', label: '1:30 pm', description: 'Early afternoon'},
  {value: '16:00', label: '4:00 pm', description: 'Late afternoon'},
  {value: '17:30', label: '5:30 pm', description: 'After work'},
] as const;

export type ViewingDraft = {
  propertyId: string;
  date: string;
  slot: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export type ViewingErrors = Partial<Record<keyof ViewingDraft, string>>;

export const EMPTY_VIEWING: ViewingDraft = {propertyId: '', date: '', slot: '', name: '', email: '', phone: '', notes: ''};

export const NOTES_MAX = 400;

const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseISODate(iso: string): Date | null {
  const m = ISO_RE.exec(iso);
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return d.toISOString().slice(0, 10) === iso ? d : null;
}

export function localToday(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(iso: string, days: number): string {
  const d = parseISODate(iso);
  if (!d) throw new Error(`Invalid ISO date: ${iso}`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function isWeekdayISO(iso: string): boolean {
  const d = parseISODate(iso);
  if (!d) return false;
  const day = d.getUTCDay();
  return day !== 0 && day !== 6;
}

/** Local-time check for calendar Date objects passed by DateInput. */
export function isWeekdayDate(d: Date): boolean {
  const day = d.getDay();
  return day !== 0 && day !== 6;
}

export function viewingWindow(today: string): {min: string; max: string} {
  return {min: addDays(today, 1), max: addDays(today, VIEWING_WINDOW_DAYS)};
}

export function dateError(iso: string, today: string): string | undefined {
  if (!iso) return 'Choose a date for the viewing.';
  if (!parseISODate(iso)) return 'Enter a valid date.';
  const {min, max} = viewingWindow(today);
  if (iso < min) return 'Choose a date from tomorrow onwards.';
  if (iso > max) return `Choose a date within the next ${VIEWING_WINDOW_DAYS} days.`;
  if (!isWeekdayISO(iso)) return 'Viewings run on weekdays only. Choose Monday to Friday.';
  return undefined;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function validateViewing(v: ViewingDraft, today: string, knownProperty: (id: string) => boolean): ViewingErrors {
  const e: ViewingErrors = {};
  if (!v.propertyId || !knownProperty(v.propertyId)) e.propertyId = 'Choose the home you would like to see.';
  const d = dateError(v.date, today);
  if (d) e.date = d;
  if (!v.slot) e.slot = 'Choose a time slot.';
  else if (!timeSlots.some(s => s.value === v.slot)) e.slot = 'Choose one of the listed time slots.';

  const name = v.name.trim();
  if (!name) e.name = 'Enter your name.';
  else if (name.length < 2) e.name = 'Enter at least 2 characters.';
  else if (name.length > 80) e.name = 'Keep your name under 80 characters.';

  const email = v.email.trim();
  if (!email) e.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(email)) e.email = 'Enter an email address like name@example.com.';

  const phone = v.phone.trim();
  if (!phone) e.phone = 'Enter a phone number so the branch could confirm.';
  else if (/[^\d\s()+.-]/.test(phone)) e.phone = 'Use digits, spaces, brackets, dashes or a leading +.';
  else {
    const digits = phoneDigits(phone).length;
    if (digits < 7 || digits > 15) e.phone = 'Enter a phone number with 7 to 15 digits.';
  }

  if (v.notes.length > NOTES_MAX) e.notes = `Keep notes under ${NOTES_MAX} characters.`;
  return e;
}

export function hasErrors(e: ViewingErrors): boolean {
  return Object.keys(e).length > 0;
}

/** Order the form's fields appear in, used to focus the first problem. */
export const FIELD_ORDER: (keyof ViewingDraft)[] = ['propertyId', 'date', 'slot', 'name', 'email', 'phone', 'notes'];

export function formatLongDate(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}
