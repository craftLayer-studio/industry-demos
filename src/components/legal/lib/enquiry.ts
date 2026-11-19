import type {PracticeId} from './data';

export type ContactMethod = 'email' | 'phone';

export type EnquiryDraft = {
  name: string;
  email: string;
  phone: string;
  area: PracticeId | '';
  contact: ContactMethod | '';
  otherParty: string;
  message: string;
  consent: boolean;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryDraft, string>>;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 1000;

export const EMPTY_ENQUIRY: EnquiryDraft = {
  name: '',
  email: '',
  phone: '',
  area: '',
  contact: '',
  otherParty: '',
  message: '',
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;

export function validateEnquiry(d: EnquiryDraft): EnquiryErrors {
  const e: EnquiryErrors = {};
  const name = d.name.trim();
  if (!name) e.name = 'Enter your name.';
  else if (name.length < 2) e.name = 'Enter at least 2 characters.';

  const email = d.email.trim();
  if (!email) e.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(email)) e.email = 'Enter an email address like name@example.com.';

  const phone = d.phone.trim();
  if (d.contact === 'phone' && !phone) e.phone = 'Enter a phone number, or choose email instead.';
  else if (phone && (!PHONE_RE.test(phone) || phone.replace(/\D/g, '').length < 7))
    e.phone = 'Enter a phone number using digits, spaces or +.';

  if (!d.area) e.area = 'Choose the area your enquiry relates to.';
  if (!d.contact) e.contact = 'Choose how you would like us to reply.';

  const message = d.message.trim();
  if (!message) e.message = 'Briefly describe what you need help with.';
  else if (message.length < MESSAGE_MIN) e.message = `Write at least ${MESSAGE_MIN} characters.`;
  else if (message.length > MESSAGE_MAX) e.message = `Keep it under ${MESSAGE_MAX} characters.`;

  if (!d.consent) e.consent = 'Confirm you understand this is a demo and not legal advice.';
  return e;
}

export function hasErrors(e: EnquiryErrors): boolean {
  return Object.values(e).some(Boolean);
}

/** First name for the confirmation message. */
export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? '';
}
