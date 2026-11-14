/** Static copy for the Common Table concept demo. All places and people are fictional. */

export const CITY = 'Larkfield';

export type ProgrammeId = 'pantries' | 'kitchens' | 'breakfast';

export type Programme = {
  id: ProgrammeId;
  label: string;
  title: string;
  body: string;
  points: string[];
};

export const PROGRAMMES: Programme[] = [
  {
    id: 'pantries',
    label: 'Neighbourhood pantries',
    title: 'Pantries that feel like a corner shop',
    body: 'Visitors choose their own groceries from open shelves, the way you would in any shop. No forms at the door and no questions about why you came.',
    points: ['Fresh fruit and vegetables alongside staples', 'Choose-your-own shelves, not pre-packed boxes', 'Home delivery for neighbours who cannot travel'],
  },
  {
    id: 'kitchens',
    label: 'Community kitchens',
    title: 'Suppers cooked and eaten together',
    body: 'Long tables, shared pots and whoever turns up. Neighbours cook with volunteers, learn a recipe and leave with leftovers for tomorrow.',
    points: ['Pay-what-you-can suppers, including nothing', 'Seasonal cooking sessions for all ages', 'Halal, vegetarian and vegan options every night'],
  },
  {
    id: 'breakfast',
    label: 'School breakfast clubs',
    title: 'A calm, full start to the school day',
    body: 'Before the bell, children sit down to cereal, toast and fruit with friends. Clubs are open to every child at the school, so nobody is singled out.',
    points: ['Open to every pupil, no sign-up lists', 'Run with school staff and parent volunteers', 'Quiet corner for reading and homework'],
  },
];

export type EventKind = 'cook' | 'volunteer' | 'family';

export const EVENT_KINDS: {value: EventKind | 'all'; label: string}[] = [
  {value: 'all', label: 'All events'},
  {value: 'cook', label: 'Cook and eat'},
  {value: 'volunteer', label: 'Volunteer days'},
  {value: 'family', label: 'Family friendly'},
];

export type CommunityEvent = {
  id: string;
  title: string;
  kind: EventKind;
  /** Display date: written out, so nothing depends on the viewer's clock. */
  day: string;
  month: string;
  weekday: string;
  time: string;
  place: string;
  blurb: string;
};

export const EVENTS: CommunityEvent[] = [
  {
    id: 'soup-swap',
    title: 'Winter soup swap',
    kind: 'cook',
    day: '28',
    month: 'Nov',
    weekday: 'Sat',
    time: '12 pm to 2 pm',
    place: 'Orchard Street kitchen',
    blurb: 'Bring a pot, take a different one home. Recipe cards provided.',
  },
  {
    id: 'sort-day',
    title: 'Big winter sort',
    kind: 'volunteer',
    day: '5',
    month: 'Dec',
    weekday: 'Sat',
    time: '10 am to 3 pm',
    place: 'Larder Lane pantry',
    blurb: 'An all-hands day to sort donated stock before the holidays. Drop in for an hour or stay all day.',
  },
  {
    id: 'pancakes',
    title: 'Pancake morning',
    kind: 'family',
    day: '13',
    month: 'Dec',
    weekday: 'Sun',
    time: '9:30 am to 11:30 am',
    place: 'Ferngate Primary hall',
    blurb: 'Flip, stack and top your own. Children must come with a grown-up.',
  },
  {
    id: 'knife-skills',
    title: 'Knife skills for beginners',
    kind: 'cook',
    day: '9',
    month: 'Jan',
    weekday: 'Sat',
    time: '2 pm to 4 pm',
    place: 'Orchard Street kitchen',
    blurb: 'A relaxed session on chopping safely and quickly. Aprons and boards provided.',
  },
  {
    id: 'induction',
    title: 'New volunteer welcome evening',
    kind: 'volunteer',
    day: '13',
    month: 'Jan',
    weekday: 'Wed',
    time: '6 pm to 7:30 pm',
    place: 'Millrace Community Centre',
    blurb: 'Meet the crew, tour a pantry and try each role before you pick a shift.',
  },
  {
    id: 'seed-day',
    title: 'Grow-your-own seed day',
    kind: 'family',
    day: '6',
    month: 'Feb',
    weekday: 'Sat',
    time: '11 am to 1 pm',
    place: 'Millrace Community Centre',
    blurb: 'Plant herbs and salad leaves to take home in a recycled tin.',
  },
];

export function filterEvents(events: CommunityEvent[], kind: EventKind | 'all'): CommunityEvent[] {
  return kind === 'all' ? events : events.filter(e => e.kind === kind);
}

export type Pantry = {
  id: string;
  name: string;
  address: string;
  hours: {days: string; time: string}[];
  notes: string;
};

export const PANTRIES: Pantry[] = [
  {
    id: 'larder-lane',
    name: 'Larder Lane pantry',
    address: '14 Larder Lane, Eastbank, Larkfield',
    hours: [
      {days: 'Mon, Wed, Fri', time: '10 am to 1 pm'},
      {days: 'Sat', time: '10 am to 12 pm'},
    ],
    notes: 'Step-free entrance. Delivery hub.',
  },
  {
    id: 'orchard',
    name: 'Orchard Street kitchen',
    address: '3 Orchard Street, Old Town, Larkfield',
    hours: [
      {days: 'Tue to Sat', time: 'Supper from 5:30 pm'},
      {days: 'Sun', time: 'Lunch from 12:30 pm'},
    ],
    notes: 'Pay what you can, including nothing.',
  },
  {
    id: 'millrace',
    name: 'Millrace Community Centre',
    address: '88 Millrace Road, Riverside, Larkfield',
    hours: [
      {days: 'Tue, Thu', time: '11 am to 2 pm'},
      {days: 'Sat, Sun', time: '11 am to 1 pm'},
    ],
    notes: 'Baby supplies and hygiene items too.',
  },
];

export const FAQS: {q: string; a: string}[] = [
  {
    q: 'Is Common Table a real organisation?',
    a: 'No. Common Table, the city of Larkfield and every place, event and shift on this page are fictional. This is a concept demo by CraftLayer Studio showing how a community food network website could work.',
  },
  {
    q: 'Can I actually donate here?',
    a: 'No. The donation form is a working demonstration of the flow only. No payment details are asked for, no money is taken and nothing you type is sent or stored.',
  },
  {
    q: 'Where do the "how a gift is used" figures come from?',
    a: 'They are an illustrative sample model for a fictional organisation, made up to show how a website could explain spending clearly. They are not real budget figures.',
  },
  {
    q: 'Do I need to prove I need help to visit a pantry?',
    a: 'In this concept, no. The pantries are designed around dignity: visitors walk in, choose their groceries and leave, without referral letters or questions.',
  },
  {
    q: 'Do volunteers need experience?',
    a: 'Not in this concept. Every shift is designed to start with a short briefing, and the welcome evening lets new volunteers try each role first.',
  },
];
