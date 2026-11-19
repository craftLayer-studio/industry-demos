/**
 * Sample content for The Saltmarsh, a fictional boutique hotel in the
 * fictional estuary village of Wrenmouth. Rooms, rates, places and people are
 * invented for this concept demo.
 */

export type RoomType = 'room' | 'suite' | 'cottage';
export type RoomView = 'sea' | 'marsh' | 'garden';

export type Room = {
  id: string;
  name: string;
  type: RoomType;
  view: RoomView;
  /** Sample base nightly rate in GBP, Sunday to Thursday nights. */
  baseRate: number;
  sleeps: number;
  sizeSqm: number;
  bed: string;
  /** Minimum nights for any stay in this room (the weekend rule can raise it). */
  minNights: number;
  summary: string;
  description: string;
  features: string[];
  /** Palette and motif for the room illustration. */
  art: {wall: string; textile: string; motif: 'waves' | 'reeds' | 'shells' | 'gulls' | 'boats' | 'dunes'};
};

export const roomTypeLabels: Record<RoomType, string> = {
  room: 'Room',
  suite: 'Suite',
  cottage: 'Cottage',
};

export const viewLabels: Record<RoomView, string> = {
  sea: 'Sea view',
  marsh: 'Marsh view',
  garden: 'Garden view',
};

export const rooms: Room[] = [
  {
    id: 'tideline',
    name: 'Tideline Room',
    type: 'room',
    view: 'sea',
    baseRate: 195,
    sleeps: 2,
    sizeSqm: 22,
    bed: 'King bed',
    minNights: 1,
    summary: 'A bright corner room with a window seat facing the open water.',
    description:
      'Limewashed walls, a deep window seat and a writing desk turned towards the horizon. On clear mornings the light comes straight off the sea.',
    features: ['Window seat with sea view', 'Walk-in rain shower', 'Linen bedding and wool throws', 'Tea tray with local biscuits'],
    art: {wall: 'var(--saltmarsh-glass-soft)', textile: 'var(--saltmarsh-terracotta)', motif: 'waves'},
  },
  {
    id: 'reedbed',
    name: 'Reedbed Room',
    type: 'room',
    view: 'marsh',
    baseRate: 165,
    sleeps: 2,
    sizeSqm: 19,
    bed: 'Double bed',
    minNights: 1,
    summary: 'A calm, low-lit room looking over the reeds and the creek.',
    description:
      'Our quietest room, on the landward side. Watch the reeds move in the wind and the herons work the creek at dusk.',
    features: ['Marsh and creek view', 'Shower room', 'Blackout linen blinds', 'Field guide to marsh birds'],
    art: {wall: 'var(--saltmarsh-sand)', textile: 'var(--saltmarsh-sea)', motif: 'reeds'},
  },
  {
    id: 'harbourlight',
    name: 'Harbourlight Twin',
    type: 'room',
    view: 'garden',
    baseRate: 150,
    sleeps: 2,
    sizeSqm: 20,
    bed: 'Two single beds',
    minNights: 1,
    summary: 'Two singles, a striped rug and a view of the walled kitchen garden.',
    description:
      'A cheerful twin for friends or walkers. The window looks over the kitchen garden, where the chefs pick herbs each morning.',
    features: ['Kitchen garden view', 'Bath with overhead shower', 'Boot rack and drying rail', 'Two reading lamps'],
    art: {wall: 'var(--saltmarsh-sky)', textile: 'var(--saltmarsh-clay)', motif: 'boats'},
  },
  {
    id: 'samphire',
    name: 'Samphire Suite',
    type: 'suite',
    view: 'sea',
    baseRate: 285,
    sleeps: 3,
    sizeSqm: 34,
    bed: 'King bed and a day bed',
    minNights: 1,
    summary: 'A split-level suite with a freestanding bath under the eaves.',
    description:
      'Step down from the bedroom into a sitting room with a day bed and wide sea views. The copper-toned bath sits beneath a skylight.',
    features: ['Freestanding bath under a skylight', 'Separate sitting room', 'Day bed for a third guest', 'Sea-facing balcony'],
    art: {wall: 'var(--saltmarsh-terracotta-soft)', textile: 'var(--saltmarsh-deep)', motif: 'shells'},
  },
  {
    id: 'lookout',
    name: 'Lookout Suite',
    type: 'suite',
    view: 'sea',
    baseRate: 340,
    sleeps: 4,
    sizeSqm: 42,
    bed: 'King bed and a sofa bed',
    minNights: 2,
    summary: 'The top-floor suite with a telescope and a wraparound view.',
    description:
      'Our largest suite takes the whole top floor. Windows on three sides, a telescope for ship-spotting and a sofa bed for a family.',
    features: ['Windows on three sides', 'Brass telescope', 'Sofa bed for two more guests', 'Bath and separate shower'],
    art: {wall: 'var(--saltmarsh-glass)', textile: 'var(--saltmarsh-terracotta)', motif: 'gulls'},
  },
  {
    id: 'boathouse',
    name: 'Boathouse Cottage',
    type: 'cottage',
    view: 'marsh',
    baseRate: 310,
    sleeps: 4,
    sizeSqm: 55,
    bed: 'King bed and two singles',
    minNights: 3,
    summary: 'A converted boathouse at the end of the garden, with its own wood stove.',
    description:
      'A self-contained cottage with a wood-burning stove, a small kitchen and a deck over the creek. Dogs are welcome here.',
    features: ['Wood-burning stove', 'Kitchenette and dining table', 'Private deck over the creek', 'Dog-friendly, with a towel and bowl'],
    art: {wall: 'var(--saltmarsh-sand-deep)', textile: 'var(--saltmarsh-sea)', motif: 'dunes'},
  },
];

export function roomById(id: string): Room | undefined {
  return rooms.find(r => r.id === id);
}

export const MAX_GUESTS = 4;

export const guestOptions = Array.from({length: MAX_GUESTS}, (_, i) => ({
  value: String(i + 1),
  label: i === 0 ? '1 guest' : `${i + 1} guests`,
}));

export type Place = {
  id: string;
  name: string;
  kind: string;
  distance: string;
  blurb: string;
  /** Position on the illustrated map, in viewBox units (0-400 x 0-260). */
  x: number;
  y: number;
};

export const places: Place[] = [
  {
    id: 'spit',
    name: 'Wrenmouth Spit',
    kind: 'Walk',
    distance: '12 min walk',
    blurb: 'A shingle spit with a seal colony offshore. Go at low tide and keep to the marked path.',
    x: 312,
    y: 196,
  },
  {
    id: 'creek',
    name: 'Fennick Creek boardwalk',
    kind: 'Nature',
    distance: '3 min walk',
    blurb: 'A raised timber path through the reedbeds. Bring binoculars for avocets and little egrets.',
    x: 92,
    y: 152,
  },
  {
    id: 'harbour',
    name: 'The old harbour',
    kind: 'Village',
    distance: '8 min walk',
    blurb: 'Crab sheds, a chandlery and a bakery that sells out of saffron buns by ten.',
    x: 236,
    y: 92,
  },
  {
    id: 'lighthouse',
    name: 'Gullhead Light',
    kind: 'Landmark',
    distance: '35 min coast path',
    blurb: 'A white lighthouse on the headland. The coast path there is gentle and well signed.',
    x: 360,
    y: 54,
  },
  {
    id: 'church',
    name: 'St Bride on the Marsh',
    kind: 'History',
    distance: '20 min walk',
    blurb: 'A small flint church half sunk in the reeds, with ship graffiti scratched into the porch.',
    x: 60,
    y: 70,
  },
];

export type Faq = {q: string; a: string};

export const faqs: Faq[] = [
  {
    q: 'What time are check-in and check-out?',
    a: 'Rooms are ready from 3 pm and we ask for them back by 11 am. On a real hotel site this answer would come from the hotel; here it is sample copy.',
  },
  {
    q: 'Why do some stays need two or three nights?',
    a: 'In this demo, any stay that includes a Saturday night needs at least two nights, the Lookout Suite always needs two and the Boathouse Cottage needs three. The rate calculator checks these rules for you.',
  },
  {
    q: 'How are the sample rates worked out?',
    a: 'Each room has a sample Sunday to Thursday rate. Friday and Saturday nights carry a 25% weekend uplift. Breakfast is an optional add-on per guest per night. No taxes or fees are added because nothing here is real.',
  },
  {
    q: 'Can I bring my dog?',
    a: 'In this concept, dogs are welcome in the Boathouse Cottage, which has its own garden gate and a deck. The main house is dog-free.',
  },
  {
    q: 'Is there parking?',
    a: 'The fictional Saltmarsh has a small gravel car park behind the kitchen garden. The village is also on a fictional coastal bus route.',
  },
  {
    q: 'Will submitting the booking form reserve a room?',
    a: 'No. The Saltmarsh is a fictional hotel built as a concept demo. The form checks your answers in the browser, then shows a confirmation. Nothing is booked, sent or charged.',
  },
];

export const dining = [
  {name: 'Crab on toasted sourdough', note: 'brown butter, samphire', price: 14},
  {name: 'Hake, mussels and cider', note: 'leeks from the kitchen garden', price: 26},
  {name: 'Salt-baked beetroot', note: 'whipped goat curd, hazelnut', price: 12},
  {name: 'Burnt honey tart', note: 'sea-salt ice cream', price: 9},
];

export const treatments = [
  {name: 'Tidehouse float and steam', note: 'Sauna, cold plunge and a seaweed bath', minutes: 90, price: 55},
  {name: 'Marsh herb massage', note: 'Full body, warm oil infused with garden herbs', minutes: 60, price: 85},
  {name: 'Salt scrub and wrap', note: 'Fine sea salt and a calming clay wrap', minutes: 50, price: 70},
];

export const breakfastItems = [
  'Oats soaked overnight with orchard apple',
  'Smoked fish and soft eggs',
  'Bakery saffron buns and salted butter',
  'Kitchen garden juice of the day',
];
