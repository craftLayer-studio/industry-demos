/**
 * Viewing request validation for the fictional Hollin Barn. Light,
 * client-side checks only: nothing is ever sent or booked.
 */
import {addDays, daysBetween, isISODate, weekdayOf} from './dates';

export const VIEWING_WINDOW_DAYS = 120;
export const MESSAGE_MAX = 600;
/** Sample viewing days: Tuesday, Thursday and Saturday. */
export const VIEWING_WEEKDAYS = [2, 4, 6];

export type ViewingDraft = {
  name: string;
  partner: string;
  email: string;
  viewingDate: string;
  slot: string;
  guests: string;
  message: string;
  acknowledge: boolean;
};

export type ViewingField = keyof ViewingDraft;
export type ViewingErrors = Partial<Record<ViewingField, string>>;

export const FIELD_ORDER: ViewingField[] = ['name', 'partner', 'email', 'viewingDate', 'slot', 'guests', 'message', 'acknowledge'];

export const EMPTY_VIEWING: ViewingDraft = {
  name: '',
  partner: '',
  email: '',
  viewingDate: '',
  slot: '',
  guests: '',
  message: '',
  acknowledge: false,
};

export const slotOptions = [
  {value: 'morning', label: '10:30 am', description: 'Quiet barn, best light in the orchard'},
  {value: 'afternoon', label: '2:00 pm', description: 'See the Hayloft set for an evening'},
  {value: 'golden', label: '5:30 pm', description: 'Golden hour on the meadow (Apr to Sep)'},
];

export const guestOptions = [
  {value: 'under-50', label: 'Fewer than 50'},
  {value: '50-80', label: '50 to 80'},
  {value: '80-120', label: '80 to 120'},
  {value: 'unsure', label: 'Not sure yet'},
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function viewingWindow(today: string): {min: string; max: string} {
  return {min: addDays(today, 1), max: addDays(today, VIEWING_WINDOW_DAYS)};
}

export function isViewingDay(iso: string): boolean {
  return VIEWING_WEEKDAYS.includes(weekdayOf(iso));
}

export function validateViewing(d: ViewingDraft, today: string): ViewingErrors {
  const e: ViewingErrors = {};
  const name = d.name.trim();
  if (!name) e.name = 'Enter your name.';
  else if (name.length < 2) e.name = 'Enter at least 2 characters.';

  if (d.partner.trim().length === 1) e.partner = 'Enter at least 2 characters, or leave it blank.';

  const email = d.email.trim();
  if (!email) e.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(email)) e.email = 'Enter an email address like name@example.com.';

  if (!isISODate(d.viewingDate)) e.viewingDate = 'Choose a viewing date.';
  else {
    const offset = daysBetween(today, d.viewingDate);
    if (offset < 1) e.viewingDate = 'Choose a date from tomorrow onwards.';
    else if (offset > VIEWING_WINDOW_DAYS) e.viewingDate = `Choose a date within the next ${VIEWING_WINDOW_DAYS} days.`;
    else if (!isViewingDay(d.viewingDate)) e.viewingDate = 'Viewings run on Tuesdays, Thursdays and Saturdays.';
  }

  if (!slotOptions.some(s => s.value === d.slot)) e.slot = 'Choose a viewing time.';
  if (!guestOptions.some(g => g.value === d.guests)) e.guests = 'Choose a rough guest count.';
  if (d.message.length > MESSAGE_MAX) e.message = `Keep your message under ${MESSAGE_MAX} characters.`;
  if (!d.acknowledge) e.acknowledge = 'Confirm that you understand this is a demo.';
  return e;
}

export function hasErrors(e: ViewingErrors): boolean {
  return Object.keys(e).length > 0;
}
