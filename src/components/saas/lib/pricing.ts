/**
 * Pulsegrid pricing model (fictional sample prices for a concept demo).
 *
 * Every plan has a base price that includes some seats and some monthly
 * tracked events. Extra seats and extra events are billed on top. Annual
 * billing takes ANNUAL_DISCOUNT off every line. All amounts are whole US
 * dollars per month unless a name says otherwise.
 */

export type Billing = 'monthly' | 'annual';
export type PlanId = 'starter' | 'team' | 'scale';

export type Plan = {
  id: PlanId;
  name: string;
  summary: string;
  /** Monthly base price in dollars before any discount. */
  base: number;
  includedSeats: number;
  /** Hard ceiling on seats, or null for unlimited. */
  maxSeats: number | null;
  includedEvents: number;
  /** Hard ceiling on monthly events, or null for unlimited. */
  maxEvents: number | null;
  /** Price per extra seat per month. */
  seatPrice: number;
  /** Price per extra block of EVENT_BLOCK events per month. */
  eventBlockPrice: number;
  highlights: string[];
  isFeatured?: boolean;
};

export const ANNUAL_DISCOUNT = 0.2;
export const EVENT_BLOCK = 1_000_000;

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    summary: 'For a side project or a first product experiment.',
    base: 0,
    includedSeats: 3,
    maxSeats: 3,
    includedEvents: 100_000,
    maxEvents: 100_000,
    seatPrice: 0,
    eventBlockPrice: 0,
    highlights: ['Up to 3 seats', '100k events a month', '30-day history', 'Funnels and retention'],
  },
  {
    id: 'team',
    name: 'Team',
    summary: 'For a product team shipping every week.',
    base: 49,
    includedSeats: 5,
    maxSeats: 50,
    includedEvents: 1_000_000,
    maxEvents: 50_000_000,
    seatPrice: 9,
    eventBlockPrice: 8,
    highlights: ['5 seats included', '1M events a month', '13-month history', 'Experiments and alerts'],
    isFeatured: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    summary: 'For several squads sharing one source of truth.',
    base: 199,
    includedSeats: 15,
    maxSeats: null,
    includedEvents: 10_000_000,
    maxEvents: null,
    seatPrice: 7,
    eventBlockPrice: 5,
    highlights: ['15 seats included', '10M events a month', 'Unlimited history', 'Roles, audit log, SSO'],
  },
];

/** Event volumes the calculator slider steps through. */
export const EVENT_STEPS = [
  100_000, 250_000, 500_000, 1_000_000, 2_000_000, 5_000_000, 10_000_000, 20_000_000, 50_000_000, 100_000_000,
];

export const MIN_SEATS = 1;
export const MAX_SEATS = 200;

export type Quote = {
  plan: PlanId;
  billing: Billing;
  isEligible: boolean;
  /** Why the plan cannot cover the inputs, when not eligible. */
  reason?: string;
  extraSeats: number;
  extraEventBlocks: number;
  /** Monthly line items after any annual discount, in dollars (2 dp). */
  baseMonthly: number;
  seatsMonthly: number;
  eventsMonthly: number;
  /** Effective monthly price, in dollars (2 dp). */
  monthly: number;
  /** Amount charged per billing period: one month, or twelve for annual. */
  billedAmount: number;
  /** What annual billing saves over a year versus monthly billing. */
  annualSaving: number;
};

const round2 = (n: number) => Math.round(n * 100) / 100;

export function clampSeats(seats: number): number {
  if (!Number.isFinite(seats)) return MIN_SEATS;
  return Math.min(MAX_SEATS, Math.max(MIN_SEATS, Math.round(seats)));
}

export function getPlan(id: PlanId): Plan {
  const plan = plans.find(p => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

/** Monthly list price of a plan's base, with the annual discount applied when relevant. */
export function basePrice(plan: Plan, billing: Billing): number {
  return round2(plan.base * (billing === 'annual' ? 1 - ANNUAL_DISCOUNT : 1));
}

export function quote(planId: PlanId, seatsInput: number, events: number, billing: Billing): Quote {
  const plan = getPlan(planId);
  const seats = clampSeats(seatsInput);
  const factor = billing === 'annual' ? 1 - ANNUAL_DISCOUNT : 1;

  let reason: string | undefined;
  if (plan.maxSeats !== null && seats > plan.maxSeats) {
    reason = `${plan.name} allows up to ${plan.maxSeats} seats.`;
  } else if (plan.maxEvents !== null && events > plan.maxEvents) {
    reason = `${plan.name} covers up to ${formatEvents(plan.maxEvents)} events a month.`;
  }

  const extraSeats = Math.max(0, seats - plan.includedSeats);
  const extraEventBlocks = Math.max(0, Math.ceil((events - plan.includedEvents) / EVENT_BLOCK));

  const baseMonthly = round2(plan.base * factor);
  const seatsMonthly = round2(extraSeats * plan.seatPrice * factor);
  const eventsMonthly = round2(extraEventBlocks * plan.eventBlockPrice * factor);
  const monthly = round2(baseMonthly + seatsMonthly + eventsMonthly);

  const undiscounted = plan.base + extraSeats * plan.seatPrice + extraEventBlocks * plan.eventBlockPrice;
  const annualSaving = billing === 'annual' ? round2(undiscounted * 12 - monthly * 12) : 0;

  return {
    plan: plan.id,
    billing,
    isEligible: reason === undefined,
    reason,
    extraSeats,
    extraEventBlocks,
    baseMonthly,
    seatsMonthly,
    eventsMonthly,
    monthly,
    billedAmount: billing === 'annual' ? round2(monthly * 12) : monthly,
    annualSaving,
  };
}

/** Cheapest plan that covers the inputs. Ties go to the earlier (smaller) plan. */
export function recommend(seats: number, events: number, billing: Billing): Quote {
  const eligible = plans.map(p => quote(p.id, seats, events, billing)).filter(q => q.isEligible);
  // Scale has no ceilings, so there is always at least one eligible quote.
  return eligible.reduce((best, q) => (q.monthly < best.monthly ? q : best));
}

export function formatEvents(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `${Number.isInteger(m) ? m : m.toFixed(1)}M`;
  }
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return String(n);
}

export function formatUsd(n: number): string {
  const hasCents = Math.round(n * 100) % 100 !== 0;
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  });
}
