/** Client-side validation for the Keystone site survey request. Nothing is ever sent. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Loose phone check: digits, spaces, +, (, ) and hyphens, 7 to 15 digits. */
const PHONE_RE = /^[+()\d\s-]+$/;

export const PROJECT_TYPES = [
  {value: 'extension', label: 'Extension'},
  {value: 'loft', label: 'Loft conversion'},
  {value: 'kitchen', label: 'Kitchen'},
  {value: 'renovation', label: 'Renovation'},
  {value: 'unsure', label: 'Not sure yet'},
];

export const PROPERTY_TYPES = [
  {value: 'terrace', label: 'Terraced'},
  {value: 'semi', label: 'Semi-detached'},
  {value: 'detached', label: 'Detached'},
  {value: 'flat', label: 'Flat or maisonette'},
];

export const NOTES_MAX = 600;

export type SurveyValues = {
  name: string;
  email: string;
  phone: string;
  area: string;
  project: string;
  property: string;
  date: string;
  notes: string;
  consent: boolean;
};

export type SurveyField = keyof SurveyValues;
export type Errors = Partial<Record<SurveyField, string>>;

export const EMPTY_SURVEY: SurveyValues = {
  name: '',
  email: '',
  phone: '',
  area: '',
  project: '',
  property: '',
  date: '',
  notes: '',
  consent: false,
};

export const SURVEY_ORDER: SurveyField[] = ['name', 'email', 'phone', 'area', 'project', 'property', 'date', 'notes', 'consent'];

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isPhone(value: string): boolean {
  const v = value.trim();
  if (!PHONE_RE.test(v)) return false;
  const digits = v.replace(/\D/g, '').length;
  return digits >= 7 && digits <= 15;
}

/** Local ISO date (YYYY-MM-DD) for a Date, without timezone shifts. */
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

/** Earliest bookable survey date: two days from today. */
export function earliestSurveyDate(today: Date): string {
  return toISODate(addDays(today, 2));
}

/** Latest bookable survey date: twelve weeks from today. */
export function latestSurveyDate(today: Date): string {
  return toISODate(addDays(today, 84));
}

function parseISO(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return toISODate(d) === value ? d : null;
}

/** Surveys run Monday to Saturday in this concept. */
export function isSurveyDay(value: string): boolean {
  const d = parseISO(value);
  return d !== null && d.getDay() !== 0;
}

export function validateSurvey(v: SurveyValues, today: Date): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name.';
  if (!v.email.trim()) e.email = 'Enter an email address.';
  else if (!isEmail(v.email)) e.email = 'Enter an email address like name@example.com.';
  if (v.phone.trim() && !isPhone(v.phone)) e.phone = 'Enter a phone number using digits, or leave it blank.';
  if (v.area.trim().length < 2) e.area = 'Enter a town or area (it can be made up).';
  if (!PROJECT_TYPES.some(t => t.value === v.project)) e.project = 'Choose the kind of project.';
  if (!PROPERTY_TYPES.some(t => t.value === v.property)) e.property = 'Choose the property type.';
  if (!v.date) e.date = 'Choose a preferred survey date.';
  else if (!parseISO(v.date)) e.date = 'Enter a valid date.';
  else if (v.date < earliestSurveyDate(today)) e.date = 'Choose a date at least two days from today.';
  else if (v.date > latestSurveyDate(today)) e.date = 'Choose a date within the next twelve weeks.';
  else if (!isSurveyDay(v.date)) e.date = 'Surveys run Monday to Saturday. Choose another day.';
  if (v.notes.length > NOTES_MAX) e.notes = `Keep the notes under ${NOTES_MAX} characters.`;
  if (!v.consent) e.consent = 'Please confirm you understand this is a demo.';
  return e;
}

export function hasErrors(e: Errors): boolean {
  return Object.values(e).some(Boolean);
}

export function firstError(e: Errors, order: SurveyField[] = SURVEY_ORDER): SurveyField | undefined {
  return order.find(k => e[k]);
}
