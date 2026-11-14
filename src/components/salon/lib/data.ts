/**
 * Fernlight Salon & Spa is a fictional concept demo by CraftLayer Studio.
 * Every name, service, price and duration here is invented sample content.
 */

export type CategoryId = 'hair' | 'colour' | 'skin' | 'spa';

export type Category = {id: CategoryId; name: string; summary: string};

export type Service = {
  id: string;
  category: CategoryId;
  name: string;
  /** Duration in minutes. */
  duration: number;
  /** Sample price in GBP, illustrative only. */
  price: number;
  /** True when the sample price is a "from" price. */
  isFrom?: boolean;
  description: string;
  note?: string;
};

export type Specialist = {
  id: string;
  name: string;
  initials: string;
  role: string;
  categories: readonly CategoryId[];
  focus: string;
  /** ISO weekdays (1 = Monday ... 7 = Sunday) the specialist works. */
  days: readonly number[];
  /** Which botanical motif frames the monogram portrait. */
  motif: 'fern' | 'leaf' | 'stone' | 'steam';
};

export const categories: readonly Category[] = [
  {id: 'hair', name: 'Hair', summary: 'Cuts, finishing and treatments for every length and texture.'},
  {id: 'colour', name: 'Colour', summary: 'Gloss, balayage and full colour, always with a patch test first.'},
  {id: 'skin', name: 'Skin', summary: 'Facials and skin rituals tailored to how your skin feels today.'},
  {id: 'spa', name: 'Spa', summary: 'Massage, stone therapy and slow rituals in our quiet rooms.'},
];

export function categoryById(id: CategoryId): Category {
  const c = categories.find(x => x.id === id);
  if (!c) throw new Error(`Unknown category: ${id}`);
  return c;
}

const PATCH_NOTE = 'Needs a skin patch test at least 48 hours before your visit.';

export const services: readonly Service[] = [
  {id: 'signature-cut', category: 'hair', name: 'Signature cut and finish', duration: 60, price: 68, description: 'Consultation, wash, precision cut and a soft blow-dry.'},
  {id: 'restyle', category: 'hair', name: 'Restyle consultation and cut', duration: 90, price: 92, description: 'A bigger change, planned together before the first snip.'},
  {id: 'blow-dry', category: 'hair', name: 'Wash and blow-dry', duration: 45, price: 38, description: 'Smooth, bouncy or undone: finished the way you like it.'},
  {id: 'scalp-ritual', category: 'hair', name: 'Botanical scalp ritual', duration: 30, price: 32, description: 'Exfoliating scalp massage and a fern-oil conditioning mask.'},
  {id: 'gloss', category: 'colour', name: 'Colour gloss', duration: 60, price: 55, description: 'Sheer tone and shine between colour appointments.', note: PATCH_NOTE},
  {id: 'roots', category: 'colour', name: 'Root colour', duration: 90, price: 78, description: 'Permanent colour at the roots, blended to your lengths.', note: PATCH_NOTE},
  {id: 'balayage', category: 'colour', name: 'Hand-painted balayage', duration: 180, price: 185, isFrom: true, description: 'Soft, lived-in lightness painted freehand, with toner and finish.', note: PATCH_NOTE},
  {id: 'full-colour', category: 'colour', name: 'Full head colour', duration: 120, price: 112, isFrom: true, description: 'Single-process colour from roots to ends.', note: PATCH_NOTE},
  {id: 'fern-facial', category: 'skin', name: 'Fernlight signature facial', duration: 60, price: 85, description: 'Cleanse, gentle exfoliation, massage and a cooling botanical mask.'},
  {id: 'calm-facial', category: 'skin', name: 'Calm skin facial', duration: 45, price: 65, description: 'Low-fragrance, sensitive-skin friendly and very quiet.'},
  {id: 'brow-shape', category: 'skin', name: 'Brow shape and tint', duration: 30, price: 28, description: 'Wax or thread shaping with a soft tint.', note: PATCH_NOTE},
  {id: 'deep-hydration', category: 'skin', name: 'Deep hydration ritual', duration: 75, price: 98, description: 'Layered hydration with lymphatic facial massage.'},
  {id: 'hot-stone', category: 'spa', name: 'Warm stone massage', duration: 75, price: 95, description: 'Basalt stones and slow, long strokes to melt tension.'},
  {id: 'deep-tissue', category: 'spa', name: 'Deep tissue massage', duration: 60, price: 82, description: 'Focused, firmer work on the back, neck and shoulders.'},
  {id: 'steam-ritual', category: 'spa', name: 'Steam and body polish', duration: 90, price: 110, description: 'Herbal steam, a sea-salt polish and a rich body balm.'},
  {id: 'foot-ritual', category: 'spa', name: 'Grounding foot ritual', duration: 30, price: 35, description: 'Warm soak, scrub and pressure-point foot massage.'},
];

export function serviceById(id: string): Service | undefined {
  return services.find(s => s.id === id);
}

export function servicesIn(category: CategoryId): Service[] {
  return services.filter(s => s.category === category);
}

export const specialists: readonly Specialist[] = [
  {id: 'iris', name: 'Iris Okafor', initials: 'IO', role: 'Senior stylist', categories: ['hair', 'colour'], focus: 'Curly and coily cuts, shaping with the natural pattern.', days: [2, 3, 4, 6], motif: 'fern'},
  {id: 'mateo', name: 'Mateo Lindqvist', initials: 'ML', role: 'Colour specialist', categories: ['colour'], focus: 'Hand-painted balayage and soft, low-maintenance blondes.', days: [3, 4, 5, 6], motif: 'leaf'},
  {id: 'priya', name: 'Priya Raman', initials: 'PR', role: 'Stylist', categories: ['hair'], focus: 'Precision bobs, fringes and polished blow-dries.', days: [2, 4, 5, 7], motif: 'fern'},
  {id: 'hana', name: 'Hana Moreau', initials: 'HM', role: 'Skin therapist', categories: ['skin'], focus: 'Sensitive and reactive skin, calm unhurried facials.', days: [2, 3, 5, 6], motif: 'leaf'},
  {id: 'tomas', name: 'Tomás Reyes', initials: 'TR', role: 'Massage therapist', categories: ['spa'], focus: 'Warm stone and deep tissue work for desk-bound shoulders.', days: [3, 5, 6, 7], motif: 'stone'},
  {id: 'wren', name: 'Wren Adeyemi', initials: 'WA', role: 'Spa and skin therapist', categories: ['spa', 'skin'], focus: 'Steam rituals, body polishes and hydration facials.', days: [2, 4, 6, 7], motif: 'steam'},
];

export function specialistById(id: string): Specialist | undefined {
  return specialists.find(s => s.id === id);
}

/** Opening hours by ISO weekday, minutes from midnight. Monday is closed. */
export type DayHours = {open: number; close: number} | null;

export const openingHours: Readonly<Record<number, DayHours>> = {
  1: null,
  2: {open: 9 * 60, close: 19 * 60},
  3: {open: 9 * 60, close: 19 * 60},
  4: {open: 9 * 60, close: 20 * 60},
  5: {open: 9 * 60, close: 19 * 60},
  6: {open: 9 * 60, close: 17 * 60},
  7: {open: 10 * 60, close: 16 * 60},
};

export const WEEKDAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export type SpaPackage = {
  id: string;
  name: string;
  duration: number;
  price: number;
  summary: string;
  includes: readonly string[];
  isFeatured?: boolean;
};

export const packageFeatures = [
  'Herbal steam room',
  'Warm stone massage',
  'Signature facial',
  'Scalp ritual',
  'Body polish',
  'Botanical tea and quiet lounge',
] as const;

export const spaPackages: readonly SpaPackage[] = [
  {id: 'frond', name: 'Frond', duration: 120, price: 140, summary: 'A slow two hours to reset.', includes: ['Herbal steam room', 'Warm stone massage', 'Botanical tea and quiet lounge']},
  {id: 'canopy', name: 'Canopy', duration: 180, price: 210, summary: 'A balanced half day of steam, stone and skin.', includes: ['Herbal steam room', 'Warm stone massage', 'Signature facial', 'Scalp ritual', 'Botanical tea and quiet lounge'], isFeatured: true},
  {id: 'grove', name: 'Grove', duration: 300, price: 320, summary: 'The whole ritual, unhurried.', includes: [...packageFeatures]},
];

export const giftAmounts = [25, 50, 100] as const;

export const firstVisitSteps = [
  {title: 'Arrive ten minutes early', body: 'Settle in with a botanical tea. There is a quiet lounge and somewhere to leave your coat.'},
  {title: 'A short consultation', body: 'Your specialist asks what you want, how you live with your hair or skin, and anything to avoid.'},
  {title: 'Your treatment, at your pace', body: 'Talk or rest; both are welcome. Tell us at any time if pressure, temperature or product feel wrong.'},
  {title: 'Aftercare notes', body: 'You leave with simple written aftercare and, if you want one, a suggested time for your next visit.'},
] as const;

export const faqs = [
  {q: 'Do I need a patch test for colour or tinting?', a: 'Yes. Any colour, gloss or tint needs a small skin patch test at least 48 hours before your appointment. In a real salon this would be arranged when you book.'},
  {q: 'What is your cancellation policy?', a: 'This sample policy asks for 24 hours’ notice to move or cancel. Fernlight is fictional, so no fees are ever taken in this demo.'},
  {q: 'Can I request a specific stylist or therapist?', a: 'Yes. Choose them in the appointment request, or pick “Any specialist” for the widest choice of times.'},
  {q: 'Are your treatments suitable during pregnancy?', a: 'Many are, with adjustments. A real salon would ask you to mention it when you book so your therapist can plan. Please speak to a healthcare professional if you are unsure.'},
  {q: 'Is the salon accessible?', a: 'The fictional studio is described as step-free at street level with an accessible washroom. A real business would list its access details in full here.'},
  {q: 'Do gift cards expire?', a: 'In this sample, gift cards are valid for 12 months. The gift card builder on this page is a demo: no card is issued and nothing is charged.'},
] as const;

export const ADDRESS = {
  line1: '14 Linden Row',
  line2: 'Marrowfield',
  note: 'Fictional address for a concept demo',
  email: 'hello@fernlight.example.com',
} as const;
