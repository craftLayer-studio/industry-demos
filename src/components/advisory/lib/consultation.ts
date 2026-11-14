/**
 * Pure state and validation for the multi-step consultation request.
 * Nothing here is sent anywhere: the demo keeps answers in memory only.
 */
import type {CompanySize, ServiceId} from './fees';

export type Topic = ServiceId | 'other';
export type Stage = 'idea' | 'early' | 'growing' | 'established';
export type Format = 'video' | 'in-person';
export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';
export type TimeOfDay = 'morning' | 'midday' | 'afternoon';
/** A weekday time window, for example "tue-morning". */
export type WindowId = `${Weekday}-${TimeOfDay}`;

export const WEEKDAYS: {id: Weekday; label: string; short: string}[] = [
  {id: 'mon', label: 'Monday', short: 'Mon'},
  {id: 'tue', label: 'Tuesday', short: 'Tue'},
  {id: 'wed', label: 'Wednesday', short: 'Wed'},
  {id: 'thu', label: 'Thursday', short: 'Thu'},
  {id: 'fri', label: 'Friday', short: 'Fri'},
];

export const TIMES: {id: TimeOfDay; label: string; range: string}[] = [
  {id: 'morning', label: 'Morning', range: '9–11 am'},
  {id: 'midday', label: 'Midday', range: '11 am–2 pm'},
  {id: 'afternoon', label: 'Afternoon', range: '2–5 pm'},
];

export const REQUIRED_WINDOWS = 3;
export const NOTE_MAX = 400;

export const SIZES: {value: CompanySize; label: string}[] = [
  {value: 'solo', label: 'Just me'},
  {value: '2-10', label: '2–10 people'},
  {value: '11-50', label: '11–50 people'},
  {value: '51-250', label: '51–250 people'},
];

export const STAGES: {value: Stage; label: string}[] = [
  {value: 'idea', label: 'Idea or pre-revenue'},
  {value: 'early', label: 'Early revenue'},
  {value: 'growing', label: 'Growing steadily'},
  {value: 'established', label: 'Established'},
];

export type ConsultDraft = {
  topics: Topic[];
  note: string;
  name: string;
  email: string;
  company: string;
  size: CompanySize | '';
  stage: Stage | '';
  format: Format | '';
  windows: WindowId[];
};

export const EMPTY_DRAFT: ConsultDraft = {
  topics: [],
  note: '',
  name: '',
  email: '',
  company: '',
  size: '',
  stage: '',
  format: '',
  windows: [],
};

export type DraftErrors = Partial<Record<'topics' | 'note' | 'name' | 'email' | 'company' | 'size' | 'stage' | 'format' | 'windows', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateTopics(d: Pick<ConsultDraft, 'topics' | 'note'>): DraftErrors {
  const e: DraftErrors = {};
  if (d.topics.length === 0) e.topics = 'Choose at least one topic to discuss.';
  if (d.note.length > NOTE_MAX) e.note = `Keep the note under ${NOTE_MAX} characters.`;
  return e;
}

export function validateDetails(d: Pick<ConsultDraft, 'name' | 'email' | 'company' | 'size' | 'stage'>): DraftErrors {
  const e: DraftErrors = {};
  const name = d.name.trim();
  if (!name) e.name = 'Enter your name.';
  else if (name.length < 2) e.name = 'Name looks too short.';
  const email = d.email.trim();
  if (!email) e.email = 'Enter an email address.';
  else if (!EMAIL_RE.test(email)) e.email = 'Enter an email address like name@example.com.';
  if (!d.company.trim()) e.company = 'Enter a company or organisation name.';
  if (!d.size) e.size = 'Choose a company size.';
  if (!d.stage) e.stage = 'Choose a stage.';
  return e;
}

export function validateSchedule(d: Pick<ConsultDraft, 'format' | 'windows'>): DraftErrors {
  const e: DraftErrors = {};
  if (!d.format) e.format = 'Choose video call or in person.';
  const unique = new Set(d.windows);
  if (unique.size !== REQUIRED_WINDOWS) {
    const left = REQUIRED_WINDOWS - unique.size;
    e.windows =
      left > 0
        ? `Choose ${left} more time window${left === 1 ? '' : 's'} (${REQUIRED_WINDOWS} in total).`
        : `Choose exactly ${REQUIRED_WINDOWS} time windows.`;
  }
  return e;
}

/** Validation for a step index (0 topics, 1 details, 2 schedule). Review has none. */
export function validateStep(step: number, d: ConsultDraft): DraftErrors {
  if (step === 0) return validateTopics(d);
  if (step === 1) return validateDetails(d);
  if (step === 2) return validateSchedule(d);
  return {};
}

export function hasErrors(e: DraftErrors): boolean {
  return Object.values(e).some(Boolean);
}

/** Toggle a window, never holding more than the required number. */
export function toggleWindow(windows: WindowId[], id: WindowId): WindowId[] {
  if (windows.includes(id)) return windows.filter(w => w !== id);
  if (windows.length >= REQUIRED_WINDOWS) return windows;
  return [...windows, id];
}

export function describeWindow(id: WindowId): string {
  const [day, time] = id.split('-') as [Weekday, TimeOfDay];
  const d = WEEKDAYS.find(w => w.id === day);
  const t = TIMES.find(x => x.id === time);
  return `${d?.label ?? day} ${t?.label.toLowerCase() ?? time} (${t?.range ?? ''})`;
}

/** Order windows by weekday then time so the review reads naturally. */
export function sortWindows(windows: WindowId[]): WindowId[] {
  const dayIdx = (w: WindowId) => WEEKDAYS.findIndex(d => w.startsWith(d.id));
  const timeIdx = (w: WindowId) => TIMES.findIndex(t => w.endsWith(t.id));
  return [...windows].sort((a, b) => dayIdx(a) - dayIdx(b) || timeIdx(a) - timeIdx(b));
}
