/**
 * Illustrative package pricing for the fictional Hollin Barn venue.
 * Every figure here is invented sample data for a concept demo: it is not a
 * quote and does not reflect any real venue's prices.
 */
import {monthOf, weekdayOf} from './dates';

export type Season = 'peak' | 'shoulder' | 'winter';
export type DayType = 'midweek' | 'fri-sun' | 'saturday';
export type AddOnId = 'arbour' | 'late' | 'suite' | 'firepit' | 'brunch' | 'games';

export const MIN_DAY_GUESTS = 30;
export const MAX_DAY_GUESTS = 120; // Long Barn seated dining capacity
export const MAX_EVENING_EXTRA = 60;
export const EVENING_CAPACITY = 180; // Hayloft evening capacity
export const PER_HEAD = 84; // wedding breakfast and drinks reception
export const EVENING_PER_HEAD = 19; // evening food for evening-only guests
/** Peak Saturdays carry a minimum number of charged day guests. */
export const PEAK_SATURDAY_MIN_CHARGED = 70;

export const seasons: {value: Season; label: string; months: string}[] = [
  {value: 'peak', label: 'Peak', months: 'May to September'},
  {value: 'shoulder', label: 'Shoulder', months: 'April and October'},
  {value: 'winter', label: 'Winter', months: 'November to March'},
];

export const dayTypes: {value: DayType; label: string; detail: string}[] = [
  {value: 'midweek', label: 'Midweek', detail: 'midweek'},
  {value: 'fri-sun', label: 'Fri / Sun', detail: 'Friday or Sunday'},
  {value: 'saturday', label: 'Saturday', detail: 'Saturday'},
];

export const VENUE_HIRE: Record<Season, number> = {peak: 6400, shoulder: 4900, winter: 3600};
export const DAY_FACTOR: Record<DayType, number> = {midweek: 0.7, 'fri-sun': 0.85, saturday: 1};

export type AddOn = {id: AddOnId; label: string; description: string; price: number; per: 'event' | 'day-guest'};

export const addOns: AddOn[] = [
  {id: 'arbour', label: 'Meadow arbour ceremony', description: 'Outdoor vows under the willow arbour, rain plan included.', price: 450, per: 'event'},
  {id: 'late', label: 'Late licence to 1 am', description: 'One extra hour of music and bar in the Hayloft.', price: 600, per: 'event'},
  {id: 'suite', label: 'Wagon House suite', description: 'One night in the on-site suite for the couple.', price: 380, per: 'event'},
  {id: 'firepit', label: 'Firepit and blankets', description: 'Lit firepit on the orchard terrace from dusk, with wool blankets.', price: 260, per: 'event'},
  {id: 'games', label: 'Lawn games', description: 'Croquet, quoits and giant dominoes set out on the lawn.', price: 140, per: 'event'},
  {id: 'brunch', label: 'Morning-after brunch', description: 'Next-day brunch in the Long Barn, priced per day guest.', price: 22, per: 'day-guest'},
];

export type PackageInput = {
  season: Season;
  dayType: DayType;
  dayGuests: number;
  eveningGuests: number;
  addOns: AddOnId[];
};

export const DEFAULT_PACKAGE: PackageInput = {season: 'peak', dayType: 'saturday', dayGuests: 80, eveningGuests: 30, addOns: []};

export type Issue =
  | {code: 'day-guests-low'}
  | {code: 'day-guests-high'}
  | {code: 'evening-high'}
  | {code: 'evening-capacity'}
  | {code: 'not-integer'};

export type Line = {id: string; label: string; detail: string; amount: number};

export type Quote = {ok: boolean; issues: Issue[]; lines: Line[]; total: number; perGuest: number};

export function seasonForMonth(month: number): Season {
  if (month >= 5 && month <= 9) return 'peak';
  if (month === 4 || month === 10) return 'shoulder';
  return 'winter';
}

export function dayTypeForWeekday(weekday: number): DayType {
  if (weekday === 6) return 'saturday';
  if (weekday === 5 || weekday === 0) return 'fri-sun';
  return 'midweek';
}

/** Season and day type for a specific ISO date. */
export function classifyDate(iso: string): {season: Season; dayType: DayType} {
  return {season: seasonForMonth(monthOf(iso)), dayType: dayTypeForWeekday(weekdayOf(iso))};
}

export function issueMessage(issue: Issue): string {
  switch (issue.code) {
    case 'day-guests-low':
      return `Day guests start at ${MIN_DAY_GUESTS}.`;
    case 'day-guests-high':
      return `The Long Barn seats up to ${MAX_DAY_GUESTS} day guests.`;
    case 'evening-high':
      return `Add up to ${MAX_EVENING_EXTRA} evening-only guests.`;
    case 'evening-capacity':
      return `The Hayloft holds ${EVENING_CAPACITY} people in the evening.`;
    case 'not-integer':
      return 'Guest numbers must be whole numbers.';
  }
}

export function validatePackage(input: PackageInput): Issue[] {
  const issues: Issue[] = [];
  const {dayGuests, eveningGuests} = input;
  if (!Number.isInteger(dayGuests) || !Number.isInteger(eveningGuests)) {
    issues.push({code: 'not-integer'});
    return issues;
  }
  if (dayGuests < MIN_DAY_GUESTS) issues.push({code: 'day-guests-low'});
  if (dayGuests > MAX_DAY_GUESTS) issues.push({code: 'day-guests-high'});
  if (eveningGuests < 0 || eveningGuests > MAX_EVENING_EXTRA) issues.push({code: 'evening-high'});
  else if (dayGuests + eveningGuests > EVENING_CAPACITY) issues.push({code: 'evening-capacity'});
  return issues;
}

/** Whole pounds, rounded to the nearest 10 for venue hire so figures read as sample prices. */
function roundTo10(n: number): number {
  return Math.round(n / 10) * 10;
}

export function chargedDayGuests(input: Pick<PackageInput, 'season' | 'dayType' | 'dayGuests'>): number {
  if (input.season === 'peak' && input.dayType === 'saturday') return Math.max(input.dayGuests, PEAK_SATURDAY_MIN_CHARGED);
  return input.dayGuests;
}

export function quotePackage(input: PackageInput): Quote {
  const issues = validatePackage(input);
  if (issues.length > 0) return {ok: false, issues, lines: [], total: 0, perGuest: 0};

  const lines: Line[] = [];
  const seasonLabel = seasons.find(s => s.value === input.season)!.label;
  const day = dayTypes.find(d => d.value === input.dayType)!;
  lines.push({
    id: 'venue',
    label: 'Exclusive venue hire',
    detail: `${seasonLabel} season, ${day.detail}`,
    amount: roundTo10(VENUE_HIRE[input.season] * DAY_FACTOR[input.dayType]),
  });

  const charged = chargedDayGuests(input);
  lines.push({
    id: 'dining',
    label: 'Wedding breakfast and drinks reception',
    detail:
      charged > input.dayGuests
        ? `${charged} guests charged (peak Saturday minimum) at £${PER_HEAD} each`
        : `${charged} day guests at £${PER_HEAD} each`,
    amount: charged * PER_HEAD,
  });

  if (input.eveningGuests > 0) {
    lines.push({
      id: 'evening',
      label: 'Evening food for evening guests',
      detail: `${input.eveningGuests} evening-only guests at £${EVENING_PER_HEAD} each`,
      amount: input.eveningGuests * EVENING_PER_HEAD,
    });
  }

  for (const a of addOns) {
    if (!input.addOns.includes(a.id)) continue;
    const amount = a.per === 'day-guest' ? a.price * input.dayGuests : a.price;
    lines.push({
      id: a.id,
      label: a.label,
      detail: a.per === 'day-guest' ? `${input.dayGuests} day guests at £${a.price} each` : 'Flat fee',
      amount,
    });
  }

  const total = lines.reduce((sum, l) => sum + l.amount, 0);
  const people = input.dayGuests + input.eveningGuests;
  return {ok: true, issues: [], lines, total, perGuest: Math.round(total / people)};
}

const gbp = new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP', maximumFractionDigits: 0});

export function formatGBP(n: number): string {
  return gbp.format(n);
}
