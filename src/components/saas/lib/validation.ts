/** Waitlist form validation (pure, so it can be unit tested). */

export type WaitlistValues = {
  email: string;
  teamSize: string;
  role: string;
  useCase: string;
  consent: boolean;
};

export type WaitlistField = keyof WaitlistValues;
export type WaitlistErrors = Partial<Record<WaitlistField, string>>;

export const TEAM_SIZES = [
  {value: '1', label: 'Just me'},
  {value: '2-5', label: '2 to 5 people'},
  {value: '6-15', label: '6 to 15 people'},
  {value: '16-50', label: '16 to 50 people'},
  {value: '51+', label: 'More than 50 people'},
];

export const ROLES = [
  {value: 'product', label: 'Product'},
  {value: 'engineering', label: 'Engineering'},
  {value: 'design', label: 'Design'},
  {value: 'founder', label: 'Founder'},
  {value: 'other', label: 'Other'},
];

export const USE_CASE_MAX = 400;

export const EMPTY_WAITLIST: WaitlistValues = {email: '', teamSize: '', role: '', useCase: '', consent: false};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  return trimmed.length <= 254 && EMAIL_RE.test(trimmed);
}

export function validateWaitlist(v: WaitlistValues): WaitlistErrors {
  const errors: WaitlistErrors = {};
  if (!v.email.trim()) errors.email = 'Enter your work email.';
  else if (!isValidEmail(v.email)) errors.email = 'Enter an email like name@example.com.';
  if (!TEAM_SIZES.some(t => t.value === v.teamSize)) errors.teamSize = 'Choose your team size.';
  if (!ROLES.some(r => r.value === v.role)) errors.role = 'Choose the role closest to yours.';
  if ([...v.useCase].length > USE_CASE_MAX) errors.useCase = `Keep this under ${USE_CASE_MAX} characters.`;
  if (!v.consent) errors.consent = 'Tick the box to confirm you understand this is a demo.';
  return errors;
}

export function hasErrors(errors: WaitlistErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Order used to move focus to the first invalid field. */
export const FIELD_ORDER: WaitlistField[] = ['email', 'teamSize', 'role', 'useCase', 'consent'];

export function firstError(errors: WaitlistErrors): WaitlistField | undefined {
  return FIELD_ORDER.find(f => errors[f]);
}
