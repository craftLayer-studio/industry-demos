/** Invented content for the fictional Hollin Barn concept demo. */

export type SpaceId = 'ceremony' | 'dining' | 'evening';

export type Space = {
  id: SpaceId;
  moment: string;
  name: string;
  capacity: number;
  capacityLabel: string;
  description: string;
  details: string[];
};

export const spaces: Space[] = [
  {
    id: 'ceremony',
    moment: 'Ceremony',
    name: 'The Meadow Arbour',
    capacity: 140,
    capacityLabel: 'Up to 140 seated',
    description: 'A willow arbour at the top of the wildflower meadow, facing west across the valley. Rows of oak benches run down the grass aisle.',
    details: ['Wet-weather fallback in the Long Barn', 'Gentle slope with a level, step-free path', 'Sound system for vows and readings'],
  },
  {
    id: 'dining',
    moment: 'Wedding breakfast',
    name: 'The Long Barn',
    capacity: 120,
    capacityLabel: 'Up to 120 seated',
    description: 'A restored threshing barn with oak trusses, limewashed walls and doors that open onto the orchard terrace for drinks.',
    details: ['Long banquet or round tables', 'Underfloor heating for winter weddings', 'Orchard terrace for the drinks reception'],
  },
  {
    id: 'evening',
    moment: 'Evening',
    name: 'The Hayloft',
    capacity: 180,
    capacityLabel: 'Up to 180 standing',
    description: 'The upper floor of the old cart shed, strung with festoon lights, with a sprung dance floor and a bar built from reclaimed gates.',
    details: ['Lift and stair access', 'Music until midnight as standard', 'Firepit terrace just outside'],
  },
];

export const included = [
  {title: 'The whole estate, just for you', body: 'Exclusive use of the barn, meadow, orchard and grounds from 11 am to midnight. One wedding a day.'},
  {title: 'Furniture and linen', body: 'Oak banquet tables, cross-back chairs, linen tablecloths and napkins, set up and cleared by our team.'},
  {title: 'A wedding coordinator', body: 'One planner from first viewing to the last dance, plus an on-the-day manager.'},
  {title: 'Seasonal menu tasting', body: 'A tasting for two with the in-house kitchen once your date is confirmed.'},
  {title: 'Candles and festoon lights', body: 'Pillar candles, storm lanterns and lit festoons throughout the barn and terrace.'},
  {title: 'Parking and a getting-ready room', body: 'Parking for 60 cars and a quiet room with a mirror wall for the morning.'},
];

export const travel = [
  {mode: 'By train', detail: 'Ashby Halt (fictional) is a 6 minute taxi ride away. We can share a list of local taxi firms.'},
  {mode: 'By car', detail: 'Take the B-road from Wendlebury (fictional), then follow Hollin Lane for half a mile. Parking for 60 cars on site.'},
  {mode: 'Guest coaches', detail: 'A coach turning circle sits by the gate. Last carriages are usually booked for 12:15 am.'},
  {mode: 'Staying nearby', detail: 'Three inns and a handful of cottages sit within 4 miles. The Wagon House suite on site sleeps two.'},
];

export const faqs = [
  {q: 'Is Hollin Barn a real venue?', a: 'No. Hollin Barn is a fictional venue created by CraftLayer Studio to show how a wedding venue website could work. Nothing on this page can be booked.'},
  {q: 'Where do the package prices come from?', a: 'They are illustrative sample figures for this demo. A real venue would set its own prices, and this builder would read them from its own data.'},
  {q: 'Can we bring our own caterer?', a: 'In this sample setup the in-house kitchen caters the wedding breakfast, and you are welcome to bring a cake maker, sweet table or late-night food truck.'},
  {q: 'Is there a wet-weather plan for an outdoor ceremony?', a: 'Yes. The Long Barn is laid out for the ceremony as a fallback, and the decision is made with you on the morning.'},
  {q: 'Is the venue accessible?', a: 'The ceremony meadow has a level, step-free path, the Long Barn is on the ground floor and the Hayloft has a lift. Accessible toilets are on both floors.'},
  {q: 'How long can we hold a date?', a: 'In this sample setup a date can be held for 7 days after a viewing while you decide. Dates marked "on hold" in the calendar are held by another couple.'},
];
