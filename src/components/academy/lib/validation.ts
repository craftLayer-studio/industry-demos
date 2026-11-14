/**
 * Validation for the demo enrolment enquiry. Nothing is ever sent anywhere.
 */
import type {Level} from './data';

export type ExperienceLevel = Level | 'unsure';

export type EnquiryDraft = {
  name: string;
  email: string;
  courseId: string;
  cohort: string;
  experience: ExperienceLevel | '';
  goals: string;
  consent: boolean;
};

export type EnquiryField = keyof EnquiryDraft;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const GOALS_MAX = 300;
export const EMPTY_ENQUIRY: EnquiryDraft = {
  name: '',
  email: '',
  courseId: '',
  cohort: '',
  experience: '',
  goals: '',
  consent: false,
};

/** Field order used for the error summary and for moving focus. */
export const FIELD_ORDER: EnquiryField[] = ['name', 'email', 'courseId', 'cohort', 'experience', 'goals', 'consent'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Counts user-perceived characters so emoji count as one, like the TextArea counter. */
export function characterLength(value: string): number {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const seg = new Intl.Segmenter('en', {granularity: 'grapheme'});
    return Array.from(seg.segment(value)).length;
  }
  return Array.from(value).length;
}

export function validateEnquiry(draft: EnquiryDraft, validCourseIds: readonly string[]): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = draft.name.trim();
  if (!name) errors.name = 'Enter your name.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';
  else if (name.length > 80) errors.name = 'Name must be 80 characters or fewer.';

  const email = draft.email.trim();
  if (!email) errors.email = 'Enter your email address.';
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = 'Enter an email address like name@example.com.';

  if (!draft.courseId) errors.courseId = 'Choose the course you are interested in.';
  else if (!validCourseIds.includes(draft.courseId)) errors.courseId = 'Choose a course from the list.';

  if (!draft.cohort) errors.cohort = 'Choose a preferred start.';

  if (!draft.experience) errors.experience = 'Choose the option closest to your experience.';

  if (characterLength(draft.goals) > GOALS_MAX) errors.goals = `Keep your goals to ${GOALS_MAX} characters or fewer.`;

  if (!draft.consent) errors.consent = 'Confirm you understand this is a demo before sending.';
  return errors;
}

export function orderedErrors(errors: EnquiryErrors): {field: EnquiryField; message: string}[] {
  return FIELD_ORDER.filter(f => errors[f]).map(f => ({field: f, message: errors[f] as string}));
}

export function hasErrors(errors: EnquiryErrors): boolean {
  return Object.keys(errors).length > 0;
}
