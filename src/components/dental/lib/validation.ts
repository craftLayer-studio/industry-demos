// Consultation request validation for the Arbour Dental concept demo.

export const MESSAGE_MAX = 500;

export type ContactMethod = 'email' | 'phone';
export type PreferredTime = 'morning' | 'afternoon' | 'evening' | 'any';

export type ConsultationForm = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  contactMethod: ContactMethod;
  preferredTime: PreferredTime;
  message: string;
  consent: boolean;
};

export type ConsultationErrors = Partial<Record<keyof ConsultationForm, string>>;

export const EMPTY_FORM: ConsultationForm = {
  name: '',
  email: '',
  phone: '',
  interest: '',
  contactMethod: 'email',
  preferredTime: 'any',
  message: '',
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateName(name: string): string | undefined {
  const v = name.trim();
  if (!v) return 'Enter your name.';
  if (v.length < 2) return 'Name must be at least 2 characters.';
  if (v.length > 80) return 'Name must be 80 characters or fewer.';
  return undefined;
}

export function validateEmail(email: string): string | undefined {
  const v = email.trim();
  if (!v) return 'Enter your email address.';
  if (!EMAIL_RE.test(v)) return 'Enter an email address like name@example.com.';
  return undefined;
}

/** Phone is required only when the person asks to be phoned. */
export function validatePhone(phone: string, required: boolean): string | undefined {
  const v = phone.trim();
  if (!v) return required ? 'Enter a phone number, or choose email as your contact method.' : undefined;
  if (!/^\+?[\d\s()-]+$/.test(v)) return 'Use digits, spaces, brackets, dashes and an optional leading +.';
  const digits = v.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return 'Enter a phone number with 7 to 15 digits.';
  return undefined;
}

export function validateConsultation(form: ConsultationForm, validInterests: string[]): ConsultationErrors {
  const errors: ConsultationErrors = {};
  const name = validateName(form.name);
  if (name) errors.name = name;
  const email = validateEmail(form.email);
  if (email) errors.email = email;
  const phone = validatePhone(form.phone, form.contactMethod === 'phone');
  if (phone) errors.phone = phone;
  if (!form.interest) errors.interest = 'Choose what you would like to discuss.';
  else if (!validInterests.includes(form.interest)) errors.interest = 'Choose an option from the list.';
  if (form.message.length > MESSAGE_MAX) errors.message = `Keep your message to ${MESSAGE_MAX} characters or fewer.`;
  if (!form.consent) errors.consent = 'Please confirm you understand this is a demo.';
  return errors;
}

/** Field order used to move focus to the first problem. */
export const FIELD_ORDER: (keyof ConsultationForm)[] = [
  'name',
  'email',
  'phone',
  'interest',
  'contactMethod',
  'preferredTime',
  'message',
  'consent',
];

export function firstError(errors: ConsultationErrors): keyof ConsultationForm | undefined {
  return FIELD_ORDER.find(k => errors[k]);
}
