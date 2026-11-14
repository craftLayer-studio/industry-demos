/**
 * Content for the Ashgrove Property concept demo. Everything here is
 * fictional: the agency, the town of Wealdbury, its neighbourhoods, every
 * address and every price. Prices are illustrative samples only.
 */

export type ListingMode = 'buy' | 'rent';

export type AreaId = 'market-square' | 'mill-quarter' | 'hollins-rise' | 'saltings' | 'orchard-end' | 'station-fields';

export type FacadeStyle =
  | 'barn'
  | 'semi'
  | 'apartment'
  | 'cottage'
  | 'townhouse'
  | 'newbuild'
  | 'warehouse'
  | 'terrace'
  | 'villa';

/** A room on a simple ground-floor plan, in a 0-100 x 0-70 grid. */
export type PlanRoom = {name: string; x: number; y: number; w: number; h: number};

export type Property = {
  id: string;
  title: string;
  /** Street line, without the town. All addresses are fictional. */
  street: string;
  area: AreaId;
  mode: ListingMode;
  /** Sale price in GBP, or monthly rent in GBP for lettings. Illustrative. */
  price: number;
  beds: number;
  baths: number;
  receptions: number;
  sqft: number;
  kind: string;
  tenure?: 'Freehold' | 'Leasehold' | 'Share of freehold';
  /** Days since the demo listing was added; used for "newest" sorting. */
  listedDaysAgo: number;
  /** Lower number = shown earlier in the default "recommended" order. */
  featuredRank: number;
  summary: string;
  features: string[];
  facade: FacadeStyle;
  /** Wall, trim and door colours for the facade drawing (CSS colours). */
  palette: {wall: string; roof: string; door: string};
  plan: PlanRoom[];
};

export type Area = {
  id: AreaId;
  name: string;
  tagline: string;
  description: string;
  character: string[];
  walkToCentre: string;
};

export const TOWN = 'Wealdbury';

export const areas: Area[] = [
  {
    id: 'market-square',
    name: 'Market Square',
    tagline: 'The old centre, arranged around the corn exchange',
    description:
      'Listed shopfronts with flats above, narrow lanes of brick terraces and the Saturday market under the colonnade. Busy by day, quiet by ten.',
    character: ['Period flats above shops', 'Brick and flint terraces', 'Everything on foot'],
    walkToCentre: 'In the centre',
  },
  {
    id: 'mill-quarter',
    name: 'Mill Quarter',
    tagline: 'Converted maltings and granaries along the leat',
    description:
      'Former industrial buildings turned into lofts and townhouses, with a footpath that follows the mill stream out to the water meadows.',
    character: ['Warehouse and granary conversions', 'Waterside footpaths', 'Studios and small workshops'],
    walkToCentre: 'About 8 minutes on foot',
  },
  {
    id: 'hollins-rise',
    name: 'Hollins Rise',
    tagline: 'Edwardian streets climbing the hill',
    description:
      'Wide, tree-lined roads of bay-fronted semis and detached villas with long gardens and views back across the rooftops.',
    character: ['Bay-fronted family houses', 'Long rear gardens', 'Close to the primary school'],
    walkToCentre: 'About 12 minutes on foot',
  },
  {
    id: 'saltings',
    name: 'The Saltings',
    tagline: 'Georgian townhouses facing the estuary',
    description:
      'A short run of tall stucco houses on the old quay, with ferry steps, a sailing club and big skies over the marsh.',
    character: ['Georgian townhouses', 'Estuary views', 'Quayside walks'],
    walkToCentre: 'About 15 minutes on foot',
  },
  {
    id: 'orchard-end',
    name: 'Orchard End',
    tagline: 'A village edge of cottages and lanes',
    description:
      'Where the town gives way to fields: tile-hung cottages, a green with a cricket pitch and old orchard trees in most back gardens.',
    character: ['Cottages and converted outbuildings', 'Village green', 'Footpaths into open country'],
    walkToCentre: 'About 20 minutes on foot',
  },
  {
    id: 'station-fields',
    name: 'Station Fields',
    tagline: 'New homes by the railway',
    description:
      'A recent neighbourhood of energy-efficient houses and apartments set around a central park, a short walk from the platforms.',
    character: ['New-build houses and flats', 'Next to the station', 'Shared green spaces'],
    walkToCentre: 'About 10 minutes on foot',
  },
];

export function areaById(id: AreaId): Area {
  return areas.find(a => a.id === id)!;
}

export const properties: Property[] = [
  {
    id: 'old-granary',
    title: 'The Old Granary',
    street: 'Leat Walk',
    area: 'mill-quarter',
    mode: 'buy',
    price: 725000,
    beds: 4,
    baths: 3,
    receptions: 2,
    sqft: 2380,
    kind: 'Barn conversion',
    tenure: 'Freehold',
    listedDaysAgo: 6,
    featuredRank: 1,
    summary:
      'A timber-framed granary raised on staddle stones, converted around a double-height living hall with the original king-post trusses left on show.',
    features: ['Double-height living hall', 'Exposed oak trusses', 'Walled garden onto the leat', 'Two parking spaces'],
    facade: 'barn',
    palette: {wall: '#8c6a4f', roof: '#3d3631', door: '#a4472a'},
    plan: [
      {name: 'Living hall', x: 0, y: 0, w: 56, h: 42},
      {name: 'Kitchen', x: 56, y: 0, w: 44, h: 28},
      {name: 'Dining', x: 56, y: 28, w: 44, h: 22},
      {name: 'Study', x: 0, y: 42, w: 28, h: 28},
      {name: 'Hall', x: 28, y: 42, w: 28, h: 28},
      {name: 'Utility', x: 56, y: 50, w: 44, h: 20},
    ],
  },
  {
    id: 'hollins-12',
    title: '12 Hollins Rise',
    street: '12 Hollins Rise',
    area: 'hollins-rise',
    mode: 'buy',
    price: 465000,
    beds: 3,
    baths: 1,
    receptions: 2,
    sqft: 1310,
    kind: 'Edwardian semi-detached',
    tenure: 'Freehold',
    listedDaysAgo: 2,
    featuredRank: 2,
    summary:
      'A bay-fronted semi with its tiled path, stained-glass door and picture rails intact, and a 30 metre garden that ends at the old orchard wall.',
    features: ['Original bay and fireplaces', '30 metre rear garden', 'Kitchen-breakfast room', 'Loft with room to extend'],
    facade: 'semi',
    palette: {wall: '#b8664a', roof: '#4a4440', door: '#2f4a46'},
    plan: [
      {name: 'Front room', x: 0, y: 0, w: 45, h: 32},
      {name: 'Hall', x: 45, y: 0, w: 15, h: 32},
      {name: 'Sitting room', x: 0, y: 32, w: 45, h: 38},
      {name: 'Kitchen', x: 45, y: 32, w: 55, h: 38},
      {name: 'WC', x: 60, y: 0, w: 15, h: 18},
      {name: 'Store', x: 60, y: 18, w: 15, h: 14},
      {name: 'Pantry', x: 75, y: 0, w: 25, h: 32},
    ],
  },
  {
    id: 'wool-exchange-4',
    title: 'Flat 4, The Wool Exchange',
    street: 'Corn Street',
    area: 'market-square',
    mode: 'buy',
    price: 298000,
    beds: 2,
    baths: 1,
    receptions: 1,
    sqft: 820,
    kind: 'Second-floor apartment',
    tenure: 'Share of freehold',
    listedDaysAgo: 14,
    featuredRank: 4,
    summary:
      'Tall sash windows over the market square, high ceilings and a share of the freehold in a handsome 1860s commercial building.',
    features: ['Three tall sash windows', '3.4 metre ceilings', 'Share of freehold', 'Bike store in the courtyard'],
    facade: 'apartment',
    palette: {wall: '#d9c7a8', roof: '#5a524b', door: '#a4472a'},
    plan: [
      {name: 'Living', x: 0, y: 0, w: 55, h: 40},
      {name: 'Kitchen', x: 55, y: 0, w: 45, h: 25},
      {name: 'Bedroom 1', x: 0, y: 40, w: 40, h: 30},
      {name: 'Bedroom 2', x: 40, y: 40, w: 30, h: 30},
      {name: 'Bath', x: 70, y: 40, w: 30, h: 30},
      {name: 'Hall', x: 55, y: 25, w: 45, h: 15},
    ],
  },
  {
    id: 'orchard-cottage',
    title: 'Orchard Cottage',
    street: 'Green Lane',
    area: 'orchard-end',
    mode: 'buy',
    price: 385000,
    beds: 2,
    baths: 1,
    receptions: 1,
    sqft: 960,
    kind: 'Tile-hung cottage',
    tenure: 'Freehold',
    listedDaysAgo: 21,
    featuredRank: 5,
    summary:
      'A low, tile-hung cottage facing the green, with an inglenook, a cosy snug and three old apple trees in a south-facing garden.',
    features: ['Inglenook fireplace', 'South-facing garden', 'Overlooks the village green', 'Timber garden studio'],
    facade: 'cottage',
    palette: {wall: '#efe4d0', roof: '#9a5238', door: '#5c6b55'},
    plan: [
      {name: 'Sitting room', x: 0, y: 0, w: 50, h: 40},
      {name: 'Kitchen', x: 50, y: 0, w: 50, h: 35},
      {name: 'Snug', x: 0, y: 40, w: 35, h: 30},
      {name: 'Bath', x: 50, y: 35, w: 25, h: 35},
      {name: 'Lobby', x: 35, y: 40, w: 15, h: 30},
      {name: 'Boot room', x: 75, y: 35, w: 25, h: 35},
    ],
  },
  {
    id: 'ferry-row-7',
    title: '7 Ferry Row',
    street: '7 Ferry Row',
    area: 'saltings',
    mode: 'buy',
    price: 1150000,
    beds: 5,
    baths: 3,
    receptions: 3,
    sqft: 3240,
    kind: 'Georgian townhouse',
    tenure: 'Freehold',
    listedDaysAgo: 30,
    featuredRank: 3,
    summary:
      'A five-storey stucco townhouse on the old quay, with a first-floor drawing room that runs the full depth of the house and looks out over the estuary.',
    features: ['Full-depth drawing room', 'Estuary views from four floors', 'Cellar and garden room', 'Walled courtyard garden'],
    facade: 'townhouse',
    palette: {wall: '#e9e2d4', roof: '#4f4a46', door: '#2e2a26'},
    plan: [
      {name: 'Dining room', x: 0, y: 0, w: 50, h: 35},
      {name: 'Kitchen', x: 50, y: 0, w: 50, h: 35},
      {name: 'Hall', x: 0, y: 35, w: 20, h: 35},
      {name: 'Morning room', x: 20, y: 35, w: 45, h: 35},
      {name: 'Garden room', x: 65, y: 35, w: 35, h: 35},
    ],
  },
  {
    id: 'station-fields-31',
    title: '31 Larkspur Way',
    street: '31 Larkspur Way',
    area: 'station-fields',
    mode: 'buy',
    price: 349950,
    beds: 3,
    baths: 2,
    receptions: 1,
    sqft: 1080,
    kind: 'New-build end of terrace',
    tenure: 'Freehold',
    listedDaysAgo: 1,
    featuredRank: 6,
    summary:
      'A bright, well-insulated end-of-terrace home facing the central park, with an open-plan ground floor and a heat pump.',
    features: ['Air-source heat pump', 'Open-plan kitchen and living', 'Faces the park', 'Six minutes to the platforms'],
    facade: 'newbuild',
    palette: {wall: '#d8cbb6', roof: '#3f3c3a', door: '#a4472a'},
    plan: [
      {name: 'Kitchen and living', x: 0, y: 0, w: 70, h: 45},
      {name: 'Utility', x: 70, y: 0, w: 30, h: 22},
      {name: 'WC', x: 70, y: 22, w: 30, h: 23},
      {name: 'Hall', x: 0, y: 45, w: 30, h: 25},
      {name: 'Study nook', x: 30, y: 45, w: 70, h: 25},
    ],
  },
  {
    id: 'malthouse-yard-2',
    title: 'Flat 2, Malthouse Yard',
    street: 'Malthouse Yard',
    area: 'mill-quarter',
    mode: 'rent',
    price: 1050,
    beds: 1,
    baths: 1,
    receptions: 1,
    sqft: 540,
    kind: 'Warehouse loft',
    listedDaysAgo: 3,
    featuredRank: 7,
    summary:
      'A one-bedroom loft in the old maltings, with cast-iron columns, a wall of factory windows and a mezzanine study.',
    features: ['Cast-iron columns', 'Mezzanine study', 'Unfurnished', 'Available from next month'],
    facade: 'warehouse',
    palette: {wall: '#9c5a3c', roof: '#3b3532', door: '#2e2a26'},
    plan: [
      {name: 'Living and kitchen', x: 0, y: 0, w: 65, h: 45},
      {name: 'Bedroom', x: 65, y: 0, w: 35, h: 45},
      {name: 'Bath', x: 65, y: 45, w: 35, h: 25},
      {name: 'Entry', x: 0, y: 45, w: 65, h: 25},
    ],
  },
  {
    id: 'chapel-street-18',
    title: '18 Chapel Street',
    street: '18 Chapel Street',
    area: 'market-square',
    mode: 'rent',
    price: 1650,
    beds: 3,
    baths: 1,
    receptions: 1,
    sqft: 1020,
    kind: 'Victorian terrace',
    listedDaysAgo: 9,
    featuredRank: 8,
    summary:
      'A neat flint-and-brick terrace two minutes from the square, freshly decorated, with a sunny courtyard garden.',
    features: ['Courtyard garden', 'Freshly decorated', 'Two minutes to the square', 'Pets considered'],
    facade: 'terrace',
    palette: {wall: '#c6b9a3', roof: '#4a4440', door: '#2f4a46'},
    plan: [
      {name: 'Front room', x: 0, y: 0, w: 55, h: 35},
      {name: 'Hall', x: 55, y: 0, w: 15, h: 35},
      {name: 'Kitchen-diner', x: 0, y: 35, w: 70, h: 35},
      {name: 'Bath', x: 70, y: 35, w: 30, h: 35},
      {name: 'Store', x: 70, y: 0, w: 30, h: 35},
    ],
  },
  {
    id: 'the-lodge',
    title: 'The Lodge, Hollins Rise',
    street: 'Beacon Road',
    area: 'hollins-rise',
    mode: 'rent',
    price: 2400,
    beds: 4,
    baths: 2,
    receptions: 2,
    sqft: 1890,
    kind: 'Detached Arts and Crafts villa',
    listedDaysAgo: 12,
    featuredRank: 9,
    summary:
      'A detached Arts and Crafts villa with a deep porch, oak panelling and a walled garden, offered on a long let.',
    features: ['Deep oak porch', 'Walled garden', 'Garage and driveway', 'Long let preferred'],
    facade: 'villa',
    palette: {wall: '#e6d9c3', roof: '#7c4130', door: '#5c6b55'},
    plan: [
      {name: 'Drawing room', x: 0, y: 0, w: 45, h: 38},
      {name: 'Hall', x: 45, y: 0, w: 20, h: 38},
      {name: 'Kitchen', x: 65, y: 0, w: 35, h: 38},
      {name: 'Dining room', x: 0, y: 38, w: 45, h: 32},
      {name: 'Study', x: 45, y: 38, w: 25, h: 32},
      {name: 'Garden room', x: 70, y: 38, w: 30, h: 32},
    ],
  },
];

export function propertyById(id: string): Property | undefined {
  return properties.find(p => p.id === id);
}

export type SellingStep = {title: string; body: string};

export const sellingSteps: SellingStep[] = [
  {
    title: 'A valuation visit',
    body: 'We walk round the house with you, look at what has sold nearby and give you a written price range with our reasoning shown.',
  },
  {
    title: 'Preparing the listing',
    body: 'Measured floor plans, an architectural line drawing of the front, honest room-by-room copy and photographs taken on a bright day.',
  },
  {
    title: 'Viewings',
    body: 'Accompanied viewings at times that suit you, with written feedback from every visit sent the same evening.',
  },
  {
    title: 'Offers and negotiation',
    body: 'Every offer is passed on in writing with what we know about the buyer’s position, so you can weigh price against certainty.',
  },
  {
    title: 'Through to completion',
    body: 'A named person keeps solicitors, surveyors and the chain moving, with a short weekly update until the keys change hands.',
  },
];

export type Faq = {q: string; a: string};

export const faqs: Faq[] = [
  {
    q: 'Is Ashgrove Property a real estate agency?',
    a: 'No. Ashgrove Property, the town of Wealdbury and every listing on this page are fictional. This is a concept demo designed and built by CraftLayer Studio.',
  },
  {
    q: 'Are the prices and repayments real?',
    a: 'No. Every price is an illustrative sample, and the repayment estimator uses a simple formula with a rate you choose. It is not a mortgage offer and not financial advice.',
  },
  {
    q: 'What happens when I request a viewing?',
    a: 'In this demo, nothing is sent or booked. The form checks your entries in the browser and then shows a confirmation explaining that no request left the page.',
  },
  {
    q: 'How would a real agency use a site like this?',
    a: 'Listings would come from the agency’s property software, viewing requests would go to the branch diary, and floor plans would be drawn from a measured survey.',
  },
  {
    q: 'Why are the pictures drawings instead of photographs?',
    a: 'The demo uses original line drawings so that nothing on the page could be mistaken for a real house. A live site would use the agency’s own photography.',
  },
];

export const office = {
  name: 'Ashgrove Property',
  street: '14 Corn Exchange Street',
  town: TOWN,
  email: 'viewings@example.com',
  hours: [
    {days: 'Monday to Friday', time: '9:00 to 17:30'},
    {days: 'Saturday', time: '9:30 to 15:00'},
    {days: 'Sunday', time: 'Closed'},
  ],
};
