/** Client-side validation for the Brightwater demo forms. Nothing is ever sent. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export const BUSINESS_TYPES = [
  {value: 'cafe', label: 'Café or coffee bar'},
  {value: 'restaurant', label: 'Restaurant or bakery'},
  {value: 'office', label: 'Office or workplace'},
  {value: 'retail', label: 'Shop or grocer'},
  {value: 'other', label: 'Something else'},
];

export const VOLUMES = [
  {value: 'under-5', label: 'Under 5 kg a week'},
  {value: '5-15', label: '5 to 15 kg a week'},
  {value: '15-40', label: '15 to 40 kg a week'},
  {value: '40-plus', label: 'More than 40 kg a week'},
  {value: 'unsure', label: 'Not sure yet'},
];

export const MESSAGE_MAX = 600;

export type WholesaleValues = {
  business: string;
  name: string;
  email: string;
  type: string;
  volume: string;
  message: string;
  consent: boolean;
};

export type WholesaleField = keyof WholesaleValues;
export type Errors<K extends string> = Partial<Record<K, string>>;

export const EMPTY_WHOLESALE: WholesaleValues = {
  business: '',
  name: '',
  email: '',
  type: '',
  volume: '',
  message: '',
  consent: false,
};

export const WHOLESALE_ORDER: WholesaleField[] = ['business', 'name', 'email', 'type', 'volume', 'message', 'consent'];

export function validateWholesale(v: WholesaleValues): Errors<WholesaleField> {
  const e: Errors<WholesaleField> = {};
  if (v.business.trim().length < 2) e.business = 'Enter your business name.';
  if (v.name.trim().length < 2) e.name = 'Enter your name.';
  if (!v.email.trim()) e.email = 'Enter an email address.';
  else if (!isEmail(v.email)) e.email = 'Enter an email address like name@example.com.';
  if (!BUSINESS_TYPES.some(t => t.value === v.type)) e.type = 'Choose the kind of business.';
  if (!VOLUMES.some(t => t.value === v.volume)) e.volume = 'Choose an estimated volume.';
  if (v.message.length > MESSAGE_MAX) e.message = `Keep the message under ${MESSAGE_MAX} characters.`;
  if (!v.consent) e.consent = 'Please confirm you understand this is a demo.';
  return e;
}

export type CheckoutValues = {name: string; email: string};
export type CheckoutField = keyof CheckoutValues;

export function validateCheckout(v: CheckoutValues): Errors<CheckoutField> {
  const e: Errors<CheckoutField> = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name.';
  if (!v.email.trim()) e.email = 'Enter an email address.';
  else if (!isEmail(v.email)) e.email = 'Enter an email address like name@example.com.';
  return e;
}

export function hasErrors(e: Record<string, string | undefined>): boolean {
  return Object.values(e).some(Boolean);
}

export function firstError<K extends string>(e: Errors<K>, order: K[]): K | undefined {
  return order.find(k => e[k]);
}
