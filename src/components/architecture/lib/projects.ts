/**
 * Fictional project archive for the Ostrander Studio concept demo. Every
 * project, place and figure here is invented for demonstration: none of these
 * buildings exist and none were designed by a real practice.
 */
import type {Volume} from './iso';

export type Sector = 'homes' | 'workplace' | 'hospitality' | 'community' | 'retail';
export type ProjectType = 'residential' | 'extension' | 'commercial' | 'interior';

export type Room = {x: number; y: number; w: number; h: number; label?: string; accent?: boolean};

export type Project = {
  id: string;
  title: string;
  /** Fictional place name. */
  place: string;
  sector: Sector;
  type: ProjectType;
  /** Sample gross internal area in square metres. */
  areaM2: number;
  /** The design stage this fictional study is drawn to. */
  stage: string;
  summary: string;
  brief: string;
  moves: string[];
  materials: string[];
  massing: Volume[];
  /** Ground-floor plan in metres. */
  plan: {w: number; h: number; rooms: Room[]};
};

export const SECTORS: {value: Sector; label: string}[] = [
  {value: 'homes', label: 'Homes'},
  {value: 'workplace', label: 'Workplace'},
  {value: 'hospitality', label: 'Hospitality'},
  {value: 'community', label: 'Community'},
  {value: 'retail', label: 'Retail'},
];

export const TYPES: {value: ProjectType; label: string; plural: string}[] = [
  {value: 'residential', label: 'Residential', plural: 'New homes'},
  {value: 'extension', label: 'Extension', plural: 'Extensions'},
  {value: 'commercial', label: 'Commercial', plural: 'Commercial buildings'},
  {value: 'interior', label: 'Interior', plural: 'Interiors'},
];

export function sectorLabel(s: Sector): string {
  return SECTORS.find(x => x.value === s)?.label ?? s;
}

export function typeLabel(t: ProjectType): string {
  return TYPES.find(x => x.value === t)?.label ?? t;
}

export const projects: Project[] = [
  {
    id: 'hollin-lane',
    title: 'Hollin Lane House',
    place: 'Hollin, a fictional village',
    sector: 'homes',
    type: 'residential',
    areaM2: 186,
    stage: 'Stage 3 study',
    summary: 'A pitched timber house and a low flat-roofed living wing, set at right angles to frame a walled garden.',
    brief: 'A family home on a narrow rural plot that keeps the hedge line and opens to the south without overlooking neighbours.',
    moves: [
      'Two simple volumes: bedrooms under the pitched roof, living space in the single-storey wing.',
      'One long south window that frames the garden rather than the lane.',
      'A plan grid of 1.2 m so every opening lines up inside and out.',
    ],
    materials: ['Charred larch cladding', 'Standing-seam zinc roof', 'Lime-washed brick plinth'],
    massing: [
      {x: 0, y: 0, w: 6, d: 10, h: 5.4, roof: 'gable', rise: 3, ridge: 'y', glaze: ['y']},
      {x: 6, y: 4, w: 7, d: 6, h: 3, accent: true, glaze: ['x']},
    ],
    plan: {
      w: 13,
      h: 10,
      rooms: [
        {x: 0, y: 0, w: 6, h: 4, label: 'Study'},
        {x: 0, y: 4, w: 3, h: 6, label: 'WC'},
        {x: 3, y: 4, w: 3, h: 6, label: 'Hall'},
        {x: 6, y: 4, w: 7, h: 6, label: 'Living', accent: true},
      ],
    },
  },
  {
    id: 'kiln-yard',
    title: 'Kiln Yard Rear Extension',
    place: 'Kiln Yard, a fictional terrace',
    sector: 'homes',
    type: 'extension',
    areaM2: 38,
    stage: 'Stage 2 study',
    summary: 'A single-storey kitchen extension to a brick terrace, with a deep roof light over the old back wall.',
    brief: 'Join a dark galley kitchen to the garden and keep a usable yard on a plot only five metres wide.',
    moves: [
      'Keep the existing back wall as a thick threshold between old and new.',
      'A continuous roof light where the two meet, so daylight reaches the middle of the house.',
      'A full-width sliding screen to the yard, with a built-in bench beneath.',
    ],
    materials: ['Reclaimed stock brick', 'Oak screen and joinery', 'Polished concrete floor'],
    massing: [
      {x: 0, y: 0, w: 5, d: 8, h: 6, roof: 'gable', rise: 2.4, ridge: 'x'},
      {x: 0, y: 8, w: 5, d: 4.5, h: 3, accent: true, glaze: ['y']},
    ],
    plan: {
      w: 5,
      h: 12.5,
      rooms: [
        {x: 0, y: 0, w: 5, h: 4, label: 'Front room'},
        {x: 0, y: 4, w: 5, h: 4, label: 'Dining'},
        {x: 0, y: 8, w: 5, h: 4.5, label: 'Kitchen', accent: true},
      ],
    },
  },
  {
    id: 'marrow-street',
    title: 'Marrow Street Loft',
    place: 'Marrow Street, a fictional town',
    sector: 'homes',
    type: 'interior',
    areaM2: 112,
    stage: 'Stage 4 study',
    summary: 'An open loft in a former print works, reorganised around one freestanding timber core.',
    brief: 'Add a second bedroom and proper storage without losing the long view across the original windows.',
    moves: [
      'All services gathered into a single core so the perimeter stays open.',
      'Sliding panels turn the guest room into part of the living space by day.',
      'Existing steel columns left exposed and painted, not boxed in.',
    ],
    materials: ['Birch plywood core', 'Linoleum floor', 'Painted steel'],
    massing: [
      {x: 0, y: 0, w: 14, d: 8, h: 0.3},
      {x: 5, y: 2.5, w: 4, d: 3, z: 0.3, h: 2.6, accent: true},
      {x: 0, y: 0, w: 0.25, d: 8, z: 0.3, h: 3},
      {x: 0.25, y: 0, w: 13.75, d: 0.25, z: 0.3, h: 3},
      {x: 10.5, y: 5.5, w: 2.4, d: 1, z: 0.3, h: 0.9},
      {x: 1.5, y: 5.5, w: 2, d: 1.6, z: 0.3, h: 0.5},
    ],
    plan: {
      w: 14,
      h: 8,
      rooms: [
        {x: 0, y: 0, w: 5, h: 8, label: 'Bedroom'},
        {x: 5, y: 2.5, w: 4, h: 3, label: 'Core', accent: true},
        {x: 9, y: 0, w: 5, h: 8, label: 'Living'},
      ],
    },
  },
  {
    id: 'tanners-row',
    title: 'Tanners Row Studios',
    place: 'Tanners Row, a fictional city quarter',
    sector: 'workplace',
    type: 'commercial',
    areaM2: 940,
    stage: 'Stage 2 study',
    summary: 'Three stepped floors of small workshops and studios above a public ground-floor yard.',
    brief: 'Affordable workspace for makers on a corner site, with a ground floor that stays open to the street.',
    moves: [
      'Floors step back as they rise to keep daylight in the street.',
      'An exposed frame on a 6 m grid so tenants can partition freely.',
      'The top floor is a shared room and terrace for all tenants.',
    ],
    materials: ['Exposed concrete frame', 'Glazed brick', 'Galvanised steel balustrades'],
    massing: [
      {x: 0, y: 0, w: 14, d: 8, h: 4, glaze: ['x', 'y']},
      {x: 1, y: 1, z: 4, w: 11, d: 6, h: 3.6, glaze: ['y']},
      {x: 2, y: 2, z: 7.6, w: 5, d: 4, h: 3, accent: true, glaze: ['x']},
    ],
    plan: {
      w: 14,
      h: 8,
      rooms: [
        {x: 0, y: 0, w: 6, h: 8, label: 'Yard', accent: true},
        {x: 6, y: 0, w: 4, h: 4, label: 'Unit'},
        {x: 10, y: 0, w: 4, h: 4, label: 'Unit'},
        {x: 6, y: 4, w: 8, h: 4, label: 'Café'},
      ],
    },
  },
  {
    id: 'ferris-wharf',
    title: 'Ferris Wharf Office Fit-out',
    place: 'Ferris Wharf, a fictional harbour',
    sector: 'workplace',
    type: 'interior',
    areaM2: 420,
    stage: 'Stage 4 study',
    summary: 'A warehouse floor turned into a quiet office: long shared desks, one glass meeting room, no ceiling tiles.',
    brief: 'A workplace for forty people that keeps the timber roof visible and gives focused and social space in equal measure.',
    moves: [
      'One glass meeting room as a lantern at the centre of the floor.',
      'Desks run with the roof trusses, not against them.',
      'Acoustic panels hung between trusses instead of a suspended ceiling.',
    ],
    materials: ['Wool acoustic felt', 'Ash desks', 'Low-iron glass'],
    massing: [
      {x: 0, y: 0, w: 16, d: 10, h: 0.3},
      {x: 6, y: 3.5, z: 0.3, w: 4, d: 3, h: 2.7, accent: true, glaze: ['x', 'y']},
      {x: 1, y: 1.5, z: 0.3, w: 4, d: 1.2, h: 0.75},
      {x: 1, y: 4.5, z: 0.3, w: 4, d: 1.2, h: 0.75},
      {x: 1, y: 7.5, z: 0.3, w: 4, d: 1.2, h: 0.75},
      {x: 11, y: 1.5, z: 0.3, w: 4, d: 1.2, h: 0.75},
      {x: 11, y: 4.5, z: 0.3, w: 4, d: 1.2, h: 0.75},
      {x: 11, y: 7.5, z: 0.3, w: 4, d: 1.2, h: 0.75},
    ],
    plan: {
      w: 16,
      h: 10,
      rooms: [
        {x: 0, y: 0, w: 6, h: 10, label: 'Desks'},
        {x: 6, y: 3.5, w: 4, h: 3, label: 'Meet', accent: true},
        {x: 10, y: 0, w: 6, h: 10, label: 'Desks'},
      ],
    },
  },
  {
    id: 'bellhouse',
    title: 'Bellhouse Bakery',
    place: 'Bellhouse Street, a fictional market town',
    sector: 'retail',
    type: 'commercial',
    areaM2: 160,
    stage: 'Stage 3 study',
    summary: 'A two-storey bakery and shop with the ovens on show behind a deep, red-framed shopfront.',
    brief: 'A working bakery that customers can see into, with a small flat above for the owner.',
    moves: [
      'The bakehouse sits at the front, so the street sees bread being made.',
      'A deep shopfront frame doubles as a bench and a canopy.',
      'A separate side door gives the flat its own address.',
    ],
    materials: ['Red-painted steel frame', 'Glazed terracotta tiles', 'Douglas fir counter'],
    massing: [
      {x: 0, y: 0, w: 6, d: 9, h: 6.2, roof: 'gable', rise: 2.6, ridge: 'x', glaze: ['x']},
      {x: 6, y: 1.5, w: 0.8, d: 6, z: 2.6, h: 0.35, accent: true},
    ],
    plan: {
      w: 6.8,
      h: 9,
      rooms: [
        {x: 0, y: 0, w: 3, h: 9, label: 'Bakehouse'},
        {x: 3, y: 0, w: 3.8, h: 9, label: 'Shop', accent: true},
      ],
    },
  },
  {
    id: 'orchard-end',
    title: 'Orchard End Annexe',
    place: 'Orchard End, a fictional hamlet',
    sector: 'homes',
    type: 'extension',
    areaM2: 46,
    stage: 'Stage 3 study',
    summary: 'A mono-pitched garden annexe for an older relative, linked to the cottage by a glazed passage.',
    brief: 'Step-free, independent living close to family, without building over the old orchard.',
    moves: [
      'A single-pitch roof that rises towards the orchard and drops to the lane.',
      'A glazed link so the annexe reads as separate but connected.',
      'Level thresholds and wide doors throughout.',
    ],
    materials: ['Vertical timber boarding', 'Clay pantiles on the cottage', 'Sedum roof'],
    massing: [
      {x: 0, y: 0, w: 5.5, d: 7, h: 5, roof: 'gable', rise: 2.5, ridge: 'y'},
      {x: 5.5, y: 4, w: 1.5, d: 2, h: 2.6, glaze: ['y']},
      {x: 7, y: 2.5, w: 5, d: 5, h: 2.8, roof: 'mono', rise: 1.4, accent: true, glaze: ['x']},
    ],
    plan: {
      w: 12,
      h: 7.5,
      rooms: [
        {x: 0, y: 0, w: 5.5, h: 7, label: 'Cottage'},
        {x: 5.5, y: 4, w: 1.5, h: 2, label: 'Link'},
        {x: 7, y: 2.5, w: 5, h: 5, label: 'Annexe', accent: true},
      ],
    },
  },
  {
    id: 'quarry-hall',
    title: 'Quarry Hall Community Room',
    place: 'Quarry Hill, a fictional parish',
    sector: 'community',
    type: 'extension',
    areaM2: 72,
    stage: 'Stage 1 study',
    summary: 'A new side room for a village hall: a kitchen, toilets and a small meeting space that can open to the main hall.',
    brief: 'Give a well-used hall the facilities it lacks, with a modest budget raised locally.',
    moves: [
      'The new room tucks under a single pitch so the old hall stays the main event.',
      'Folding doors let the room work alone or with the hall.',
      'A simple timber frame volunteers could help finish.',
    ],
    materials: ['Cross-laminated timber', 'Profiled metal roof', 'Rubber floor'],
    massing: [
      {x: 0, y: 0, w: 8, d: 16, h: 5, roof: 'gable', rise: 3, ridge: 'y', glaze: ['y']},
      {x: 8, y: 7, w: 6, d: 6, h: 3.4, roof: 'mono', rise: 1.2, accent: true, glaze: ['x']},
    ],
    plan: {
      w: 14,
      h: 16,
      rooms: [
        {x: 0, y: 0, w: 8, h: 16, label: 'Hall'},
        {x: 8, y: 7, w: 6, h: 3, label: 'Room', accent: true},
        {x: 8, y: 10, w: 3, h: 3, label: 'Kitchen', accent: true},
        {x: 11, y: 10, w: 3, h: 3, label: 'WC', accent: true},
      ],
    },
  },
  {
    id: 'saltgate',
    title: 'Saltgate Café',
    place: 'Saltgate, a fictional seaside town',
    sector: 'hospitality',
    type: 'interior',
    areaM2: 95,
    stage: 'Stage 4 study',
    summary: 'A café interior built around one long red counter that runs the depth of a narrow shop.',
    brief: 'Seat thirty in a narrow unit and make the counter, not the menu board, the thing people remember.',
    moves: [
      'A single 9 m counter that is bar, display and serving hatch in one.',
      'Tables along the opposite wall, sized for one or two.',
      'Light from the street end only, so the back stays calm.',
    ],
    materials: ['Red-lacquered steel counter', 'Terrazzo floor', 'White-painted brick'],
    massing: [
      {x: 0, y: 0, w: 12, d: 6, h: 0.3},
      {x: 1.5, y: 0.6, z: 0.3, w: 9, d: 0.9, h: 1.05, accent: true},
      {x: 2, y: 4.2, z: 0.3, w: 0.8, d: 0.8, h: 0.75},
      {x: 4.5, y: 4.2, z: 0.3, w: 0.8, d: 0.8, h: 0.75},
      {x: 7, y: 4.2, z: 0.3, w: 0.8, d: 0.8, h: 0.75},
      {x: 9.5, y: 4.2, z: 0.3, w: 0.8, d: 0.8, h: 0.75},
    ],
    plan: {
      w: 12,
      h: 6,
      rooms: [
        {x: 0, y: 0, w: 12, h: 2, label: 'Counter', accent: true},
        {x: 0, y: 2, w: 12, h: 4, label: 'Seating'},
      ],
    },
  },
  {
    id: 'weir-cottages',
    title: 'Weir Cottages',
    place: 'Weir Lane, a fictional river village',
    sector: 'homes',
    type: 'residential',
    areaM2: 270,
    stage: 'Stage 2 study',
    summary: 'A short terrace of three small homes, each with its own gable, garden and front bench.',
    brief: 'Three compact, low-energy homes on a backland plot, for local people downsizing or starting out.',
    moves: [
      'Each home reads as its own gable, so the terrace feels like a lane of cottages.',
      'Deep window reveals and a shared plan type keep costs down.',
      'Front benches and low walls instead of parking courts.',
    ],
    materials: ['Handmade brick', 'Slate roof', 'Painted timber windows'],
    massing: [
      {x: 0, y: 0, w: 5, d: 8, h: 5.4, roof: 'gable', rise: 2.6, ridge: 'y', glaze: ['y']},
      {x: 5, y: 0, w: 5, d: 8, h: 5.4, roof: 'gable', rise: 2.6, ridge: 'y', accent: true, glaze: ['y']},
      {x: 10, y: 0, w: 5, d: 8, h: 5.4, roof: 'gable', rise: 2.6, ridge: 'y', glaze: ['y']},
    ],
    plan: {
      w: 15,
      h: 8,
      rooms: [
        {x: 0, y: 0, w: 5, h: 8, label: 'Home 1'},
        {x: 5, y: 0, w: 5, h: 8, label: 'Home 2', accent: true},
        {x: 10, y: 0, w: 5, h: 8, label: 'Home 3'},
      ],
    },
  },
  {
    id: 'linden-library',
    title: 'Linden Library Reading Room',
    place: 'Linden, a fictional borough',
    sector: 'community',
    type: 'interior',
    areaM2: 210,
    stage: 'Stage 3 study',
    summary: 'A tired lending library reset as one reading room, with low shelves and a long shared table under the clerestory.',
    brief: 'More places to sit, study and meet, without reducing the number of books on the shelves.',
    moves: [
      'Shelving lowered to table height so the whole room can be seen from the door.',
      'One long table under the clerestory, wired for laptops.',
      'A children’s corner set down a step, with its own small window.',
    ],
    materials: ['Oak-veneer shelving', 'Cork floor', 'Linen pinboard'],
    massing: [
      {x: 0, y: 0, w: 15, d: 10, h: 0.3},
      {x: 1, y: 1, z: 0.3, w: 0.6, d: 8, h: 1.2},
      {x: 3, y: 1, z: 0.3, w: 0.6, d: 8, h: 1.2},
      {x: 7, y: 4, z: 0.3, w: 7, d: 1.6, h: 0.75, accent: true},
      {x: 0, y: 0, z: 0.3, w: 15, d: 0.25, h: 3.4},
    ],
    plan: {
      w: 15,
      h: 10,
      rooms: [
        {x: 0, y: 0, w: 5, h: 10, label: 'Stacks'},
        {x: 5, y: 0, w: 10, h: 7, label: 'Reading', accent: true},
        {x: 5, y: 7, w: 10, h: 3, label: 'Children'},
      ],
    },
  },
  {
    id: 'northgate',
    title: 'Northgate Guesthouse',
    place: 'Northgate, a fictional coastal town',
    sector: 'hospitality',
    type: 'commercial',
    areaM2: 520,
    stage: 'Stage 2 study',
    summary: 'A twelve-room guesthouse in two pitched wings around a sheltered breakfast courtyard.',
    brief: 'A small hotel that feels like a house, on an exposed site that needs shelter from the sea wind.',
    moves: [
      'Two wings form an L that turns its back on the prevailing wind.',
      'A red-framed entrance at the knuckle where the wings meet.',
      'Every room gets a window seat facing the courtyard.',
    ],
    materials: ['Render and slate', 'Larch window seats', 'Red steel entrance frame'],
    massing: [
      {x: 0, y: 0, w: 14, d: 6, h: 6.4, roof: 'gable', rise: 2.6, ridge: 'x'},
      {x: 8.5, y: 6, w: 5.5, d: 8, h: 4.6, roof: 'gable', rise: 2.2, ridge: 'y', glaze: ['y']},
      {x: 6, y: 6, w: 2.5, d: 2.5, h: 3.2, accent: true, glaze: ['y']},
    ],
    plan: {
      w: 14,
      h: 14,
      rooms: [
        {x: 0, y: 0, w: 14, h: 6, label: 'Rooms'},
        {x: 6, y: 6, w: 2.5, h: 2.5, label: 'In', accent: true},
        {x: 8.5, y: 6, w: 5.5, h: 8, label: 'Breakfast'},
        {x: 0, y: 6, w: 6, h: 8, label: 'Court'},
      ],
    },
  },
];

export function projectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}
