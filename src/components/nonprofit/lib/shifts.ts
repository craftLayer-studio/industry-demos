/**
 * Volunteer rota for the Common Table concept demo. Shifts are generated
 * deterministically from the static tables below (no dates, no randomness), so
 * the server render, client render and tests always agree. Nothing is booked.
 */
import {requireEmail, requireName} from './validation';

export const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export type Day = (typeof DAYS)[number];

export const DAY_LABELS: Record<Day, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

export type RoleId = 'packing' | 'kitchen' | 'breakfast' | 'driver' | 'welcome';

export type Role = {
  id: RoleId;
  label: string;
  description: string;
  site: string;
  /** Start and end as 24h "HH:MM" strings. */
  start: string;
  end: string;
  /** Days this role runs; school breakfast clubs only run on school days. */
  days: Day[];
};

export const ROLES: Role[] = [
  {
    id: 'packing',
    label: 'Pantry packer',
    description: 'Sort donations and pack grocery bags.',
    site: 'Larder Lane pantry',
    start: '10:00',
    end: '13:00',
    days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
  },
  {
    id: 'kitchen',
    label: 'Kitchen helper',
    description: 'Chop, stir and serve at a shared supper.',
    site: 'Orchard Street kitchen',
    start: '16:30',
    end: '19:30',
    days: ['tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  },
  {
    id: 'breakfast',
    label: 'Breakfast club host',
    description: 'Set out cereal and fruit, then tidy up.',
    site: 'Ferngate Primary hall',
    start: '07:15',
    end: '08:45',
    days: ['mon', 'tue', 'wed', 'thu', 'fri'],
  },
  {
    id: 'driver',
    label: 'Delivery driver',
    description: 'Drop parcels to neighbours who cannot travel.',
    site: 'Larder Lane pantry',
    start: '13:30',
    end: '16:00',
    days: ['mon', 'wed', 'fri', 'sat'],
  },
  {
    id: 'welcome',
    label: 'Front-door welcomer',
    description: 'Greet visitors and help them find what they need.',
    site: 'Millrace Community Centre',
    start: '11:00',
    end: '14:00',
    days: ['tue', 'thu', 'sat', 'sun'],
  },
];

export type Shift = {
  id: string;
  role: RoleId;
  day: Day;
  start: string;
  end: string;
  site: string;
  /** Sample places left; 0 means the shift is full. */
  spotsLeft: number;
};

/** Build the weekly rota from the role table. Pure and deterministic. */
export function generateShifts(roles: Role[] = ROLES): Shift[] {
  const shifts: Shift[] = [];
  DAYS.forEach((day, d) => {
    roles.forEach((role, r) => {
      if (!role.days.includes(day)) return;
      shifts.push({
        id: `${role.id}-${day}`,
        role: role.id,
        day,
        start: role.start,
        end: role.end,
        site: role.site,
        spotsLeft: (d * 3 + r * 2 + 1) % 5,
      });
    });
  });
  return shifts.sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.start.localeCompare(b.start));
}

export const SHIFTS: Shift[] = generateShifts();

export type ShiftFilter = {role: RoleId | 'all'; days: Day[]; hideFull: boolean};

export const DEFAULT_FILTER: ShiftFilter = {role: 'all', days: [], hideFull: false};

/** An empty `days` list means "any day". */
export function filterShifts(shifts: Shift[], filter: ShiftFilter): Shift[] {
  return shifts.filter(
    s =>
      (filter.role === 'all' || s.role === filter.role) &&
      (filter.days.length === 0 || filter.days.includes(s.day)) &&
      (!filter.hideFull || s.spotsLeft > 0),
  );
}

export function toggleDay(days: Day[], day: Day, on: boolean): Day[] {
  const next = on ? [...new Set([...days, day])] : days.filter(d => d !== day);
  return DAYS.filter(d => next.includes(d));
}

/** "07:15" -> "7:15 am", "16:30" -> "4:30 pm", "13:00" -> "1 pm". */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour} ${suffix}` : `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function roleById(id: RoleId): Role {
  const role = ROLES.find(r => r.id === id);
  if (!role) throw new Error(`Unknown role ${id}`);
  return role;
}

export function describeShift(s: Shift): string {
  return `${DAY_LABELS[s.day]}, ${formatTime(s.start)} to ${formatTime(s.end)}`;
}

export type VolunteerDraft = {shiftId: string; name: string; email: string; isFirstTime: boolean; agreed: boolean};

export const EMPTY_VOLUNTEER: VolunteerDraft = {shiftId: '', name: '', email: '', isFirstTime: true, agreed: false};

export type VolunteerErrors = Partial<Record<'shiftId' | 'name' | 'email' | 'agreed', string>>;

export function validateVolunteer(draft: VolunteerDraft, shifts: Shift[] = SHIFTS): VolunteerErrors {
  const errors: VolunteerErrors = {};
  const shift = shifts.find(s => s.id === draft.shiftId);
  if (!shift) errors.shiftId = 'Pick a shift from the list.';
  else if (shift.spotsLeft === 0) errors.shiftId = 'That shift is full. Pick another one.';
  const name = requireName(draft.name);
  if (name) errors.name = name;
  const email = requireEmail(draft.email);
  if (email) errors.email = email;
  if (!draft.agreed) errors.agreed = 'Tick the box to confirm you are 16 or over.';
  return errors;
}
