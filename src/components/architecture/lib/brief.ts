/**
 * Pure state and validation for the multi-step brief builder. Nothing here
 * is sent anywhere: the demo keeps answers in memory only.
 */
import type {ProjectType} from './projects';
import type {BudgetBand} from './fees';

export type Timeline = 'asap' | '3-6-months' | '6-12-months' | 'over-a-year' | 'exploring';
export type PlanningStatus = 'not-started' | 'in-progress' | 'granted' | 'not-sure';

export const TIMELINES: {value: Timeline; label: string; description: string}[] = [
  {value: 'asap', label: 'As soon as possible', description: 'Ready to appoint and start the brief now.'},
  {value: '3-6-months', label: 'In 3 to 6 months', description: 'Funding or site is mostly in place.'},
  {value: '6-12-months', label: 'In 6 to 12 months', description: 'Still lining up site, funding or permissions.'},
  {value: 'over-a-year', label: 'More than a year away', description: 'A longer-term plan.'},
  {value: 'exploring', label: 'Just exploring', description: 'Testing whether the idea is worth pursuing.'},
];

export const PLANNING: {value: PlanningStatus; label: string}[] = [
  {value: 'not-started', label: 'Not started'},
  {value: 'in-progress', label: 'Application in progress'},
  {value: 'granted', label: 'Permission granted'},
  {value: 'not-sure', label: 'Not sure if it is needed'},
];

export const NOTE_MAX = 400;

export type BriefDraft = {
  type: ProjectType | '';
  note: string;
  budget: BudgetBand | '';
  timeline: Timeline | '';
  planning: PlanningStatus | '';
  name: string;
  email: string;
  phone: string;
};

export const EMPTY_BRIEF: BriefDraft = {
  type: '',
  note: '',
  budget: '',
  timeline: '',
  planning: '',
  name: '',
  email: '',
  phone: '',
};

export type BriefField = 'type' | 'note' | 'budget' | 'timeline' | 'planning' | 'name' | 'email' | 'phone';
export type BriefErrors = Partial<Record<BriefField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/** Optional phone: blank, or 7 to 15 digits with common separators. */
export function isValidPhone(value: string): boolean {
  const v = value.trim();
  if (!v) return true;
  if (!/^[+\d][\d\s().-]*$/.test(v)) return false;
  const digits = v.replace(/\D/g, '').length;
  return digits >= 7 && digits <= 15;
}

export const BRIEF_STEPS = ['Project', 'Budget', 'Timeline', 'Contact', 'Review'] as const;

export function validateBriefStep(step: number, d: BriefDraft): BriefErrors {
  const e: BriefErrors = {};
  if (step === 0) {
    if (!d.type) e.type = 'Choose the kind of project.';
    if (d.note.length > NOTE_MAX) e.note = `Keep the note under ${NOTE_MAX} characters.`;
  } else if (step === 1) {
    if (!d.budget) e.budget = 'Choose a construction budget band.';
  } else if (step === 2) {
    if (!d.timeline) e.timeline = 'Choose when you hope to start.';
    if (!d.planning) e.planning = 'Choose a planning status.';
  } else if (step === 3) {
    if (!d.name.trim()) e.name = 'Enter your name.';
    else if (d.name.trim().length < 2) e.name = 'Enter at least 2 characters.';
    if (!d.email.trim()) e.email = 'Enter an email address.';
    else if (!isValidEmail(d.email)) e.email = 'Enter an email address like name@example.com.';
    if (!isValidPhone(d.phone)) e.phone = 'Enter a phone number with 7 to 15 digits, or leave it blank.';
  }
  return e;
}

export function validateBrief(d: BriefDraft): BriefErrors {
  return {...validateBriefStep(0, d), ...validateBriefStep(1, d), ...validateBriefStep(2, d), ...validateBriefStep(3, d)};
}

export function hasErrors(e: BriefErrors): boolean {
  return Object.values(e).some(Boolean);
}

/** The first step that still has a problem, or -1 when the brief is complete. */
export function firstInvalidStep(d: BriefDraft): number {
  for (let s = 0; s < 4; s++) {
    if (hasErrors(validateBriefStep(s, d))) return s;
  }
  return -1;
}
