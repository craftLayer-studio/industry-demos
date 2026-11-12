/**
 * Forge Fitness content. Everything here is fictional: the gym, the people,
 * the address and the prices exist only for this concept demo.
 */

export type ProgrammeId = 'strength' | 'conditioning' | 'boxing' | 'mobility' | 'engine' | 'foundations';
export type Intensity = 'low' | 'moderate' | 'high';
export type DayId = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type Programme = {
  id: ProgrammeId;
  name: string;
  tagline: string;
  description: string;
  focus: string[];
};

export const programmes: Programme[] = [
  {
    id: 'strength',
    name: 'Strength',
    tagline: 'Barbell. Progressive. Measured.',
    description:
      'Coached squat, hinge, press and pull cycles built in six-week blocks, with every session logged so the load moves when you do.',
    focus: ['Barbell technique', '6-week blocks', 'Logged progress'],
  },
  {
    id: 'conditioning',
    name: 'Conditioning',
    tagline: 'Work capacity, on purpose.',
    description:
      'Intervals on sleds, rowers and bikes, paced by heart-rate zones rather than guesswork, so hard days are hard and easy days stay easy.',
    focus: ['Zone-based pacing', 'Sled lane', 'Rower and bike'],
  },
  {
    id: 'boxing',
    name: 'Boxing',
    tagline: 'Footwork first. Then power.',
    description:
      'Pad work, bag rounds and drills in our ring room. No sparring unless you ask for it, and never before your coach says you are ready.',
    focus: ['Pads and bags', 'Footwork drills', 'Non-contact by default'],
  },
  {
    id: 'mobility',
    name: 'Mobility',
    tagline: 'Range you can actually load.',
    description:
      'Slow, deliberate sessions that build end-range strength in hips, shoulders and spine, designed to make every other class feel better.',
    focus: ['Joint control', 'Breathing', 'Recovery days'],
  },
  {
    id: 'engine',
    name: 'Engine',
    tagline: 'Strength meets sweat.',
    description:
      'Hybrid sessions that pair a short strength piece with a conditioning finisher. The class most members take twice a week.',
    focus: ['Hybrid format', 'Kettlebells', '45 minutes'],
  },
  {
    id: 'foundations',
    name: 'Foundations',
    tagline: 'New here? Start here.',
    description:
      'Small-group sessions that teach the movement patterns used across the timetable, at a pace that suits first-timers and returners.',
    focus: ['Small groups', 'Movement basics', 'Beginner friendly'],
  },
];

export type Trainer = {
  id: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  specialties: string[];
  programmes: ProgrammeId[];
};

export const trainers: Trainer[] = [
  {
    id: 'mara',
    name: 'Mara Okafor-Lind',
    initials: 'MO',
    role: 'Head of Strength',
    bio: 'Former rower turned barbell obsessive. Writes the six-week strength blocks and believes a good warm-up is half the session.',
    specialties: ['Powerlifting', 'Programming'],
    programmes: ['strength', 'foundations'],
  },
  {
    id: 'theo',
    name: 'Theo Vasquez-Hart',
    initials: 'TV',
    role: 'Boxing Lead',
    bio: 'Runs the ring room with a stopwatch and a calm voice. Known for footwork drills that look easy until round three.',
    specialties: ['Pad work', 'Footwork'],
    programmes: ['boxing', 'conditioning'],
  },
  {
    id: 'ines',
    name: 'Ines Achterberg',
    initials: 'IA',
    role: 'Mobility Coach',
    bio: 'Background in dance and physiotherapy assistance. Teaches people to own the positions they already train in.',
    specialties: ['Joint control', 'Breathwork'],
    programmes: ['mobility', 'foundations'],
  },
  {
    id: 'kofi',
    name: 'Kofi Brannigan',
    initials: 'KB',
    role: 'Conditioning Coach',
    bio: 'Endurance athlete who swapped long runs for short, brutal intervals. Paces every session by heart-rate zone.',
    specialties: ['Intervals', 'Engine work'],
    programmes: ['conditioning', 'engine'],
  },
];

export const days: {id: DayId; short: string; long: string; index: number}[] = [
  {id: 'mon', short: 'Mon', long: 'Monday', index: 1},
  {id: 'tue', short: 'Tue', long: 'Tuesday', index: 2},
  {id: 'wed', short: 'Wed', long: 'Wednesday', index: 3},
  {id: 'thu', short: 'Thu', long: 'Thursday', index: 4},
  {id: 'fri', short: 'Fri', long: 'Friday', index: 5},
  {id: 'sat', short: 'Sat', long: 'Saturday', index: 6},
  {id: 'sun', short: 'Sun', long: 'Sunday', index: 0},
];

export const intensities: {id: Intensity; label: string; level: 1 | 2 | 3}[] = [
  {id: 'low', label: 'Low', level: 1},
  {id: 'moderate', label: 'Moderate', level: 2},
  {id: 'high', label: 'High', level: 3},
];

export type GymClass = {
  id: string;
  name: string;
  programme: ProgrammeId;
  day: DayId;
  /** 24h start time, HH:MM */
  start: string;
  minutes: number;
  intensity: Intensity;
  coach: string;
};

export const schedule: GymClass[] = [
  {id: 'mon-0630-engine', name: 'Engine 45', programme: 'engine', day: 'mon', start: '06:30', minutes: 45, intensity: 'high', coach: 'kofi'},
  {id: 'mon-1215-mobility', name: 'Lunch Mobility', programme: 'mobility', day: 'mon', start: '12:15', minutes: 30, intensity: 'low', coach: 'ines'},
  {id: 'mon-1800-strength', name: 'Barbell Block', programme: 'strength', day: 'mon', start: '18:00', minutes: 60, intensity: 'moderate', coach: 'mara'},
  {id: 'mon-1915-boxing', name: 'Ring Rounds', programme: 'boxing', day: 'mon', start: '19:15', minutes: 50, intensity: 'high', coach: 'theo'},
  {id: 'tue-0630-conditioning', name: 'Sled Lane', programme: 'conditioning', day: 'tue', start: '06:30', minutes: 40, intensity: 'high', coach: 'kofi'},
  {id: 'tue-0930-foundations', name: 'Foundations', programme: 'foundations', day: 'tue', start: '09:30', minutes: 50, intensity: 'low', coach: 'mara'},
  {id: 'tue-1830-boxing', name: 'Pads and Footwork', programme: 'boxing', day: 'tue', start: '18:30', minutes: 50, intensity: 'moderate', coach: 'theo'},
  {id: 'wed-0630-strength', name: 'Barbell Block', programme: 'strength', day: 'wed', start: '06:30', minutes: 60, intensity: 'moderate', coach: 'mara'},
  {id: 'wed-1215-engine', name: 'Engine 45', programme: 'engine', day: 'wed', start: '12:15', minutes: 45, intensity: 'high', coach: 'kofi'},
  {id: 'wed-1900-mobility', name: 'Deep Range', programme: 'mobility', day: 'wed', start: '19:00', minutes: 45, intensity: 'low', coach: 'ines'},
  {id: 'thu-0630-boxing', name: 'Ring Rounds', programme: 'boxing', day: 'thu', start: '06:30', minutes: 50, intensity: 'high', coach: 'theo'},
  {id: 'thu-1800-conditioning', name: 'Zone Intervals', programme: 'conditioning', day: 'thu', start: '18:00', minutes: 45, intensity: 'moderate', coach: 'kofi'},
  {id: 'thu-1915-foundations', name: 'Foundations', programme: 'foundations', day: 'thu', start: '19:15', minutes: 50, intensity: 'low', coach: 'ines'},
  {id: 'fri-0630-engine', name: 'Engine 45', programme: 'engine', day: 'fri', start: '06:30', minutes: 45, intensity: 'high', coach: 'kofi'},
  {id: 'fri-1730-strength', name: 'Heavy Friday', programme: 'strength', day: 'fri', start: '17:30', minutes: 60, intensity: 'high', coach: 'mara'},
  {id: 'sat-0900-conditioning', name: 'Saturday Grinder', programme: 'conditioning', day: 'sat', start: '09:00', minutes: 60, intensity: 'high', coach: 'kofi'},
  {id: 'sat-1030-boxing', name: 'Open Bag Session', programme: 'boxing', day: 'sat', start: '10:30', minutes: 45, intensity: 'moderate', coach: 'theo'},
  {id: 'sat-1200-foundations', name: 'Foundations', programme: 'foundations', day: 'sat', start: '12:00', minutes: 50, intensity: 'low', coach: 'mara'},
  {id: 'sun-1000-mobility', name: 'Sunday Reset', programme: 'mobility', day: 'sun', start: '10:00', minutes: 60, intensity: 'low', coach: 'ines'},
];

export type Billing = 'monthly' | 'annual';

export type Tier = {
  id: string;
  name: string;
  summary: string;
  /** Price per month when billed monthly, in whole dollars. */
  monthly: number;
  features: string[];
  isFeatured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: 'spark',
    name: 'Spark',
    summary: 'Off-peak access for flexible schedules.',
    monthly: 49,
    features: ['Open gym 10:00 to 16:00 weekdays', 'Weekend open gym', '4 classes a month', 'Locker and towel service'],
  },
  {
    id: 'forge',
    name: 'Forge',
    summary: 'Full access to everything on the timetable.',
    monthly: 89,
    features: ['Open gym, all hours', 'Unlimited classes', 'Quarterly movement check-in', 'Bring a friend once a month'],
    isFeatured: true,
  },
  {
    id: 'forge-plus',
    name: 'Forge Plus',
    summary: 'Unlimited, plus a coach in your corner.',
    monthly: 159,
    features: ['Everything in Forge', 'Two 1:1 coaching sessions a month', 'Personal programme in the app', 'Recovery room priority'],
  },
];

/** Annual plans charge 10 months for 12. */
export const ANNUAL_MONTHS_CHARGED = 10;

export const contact = {
  addressLines: ['Hall 3, The Anvil Works', '101 Sample Lane', 'Calder City (fictional)'],
  phoneDisplay: '(555) 014-2290',
  phoneHref: 'tel:+15550142290',
  email: 'hello@example.com',
};

export const hours: {days: string; open: string}[] = [
  {days: 'Monday to Friday', open: '05:30 to 22:00'},
  {days: 'Saturday', open: '07:00 to 20:00'},
  {days: 'Sunday', open: '08:00 to 18:00'},
  {days: 'Public holidays', open: '08:00 to 14:00'},
];

export const navItems = [
  {href: '#programmes', label: 'Programmes'},
  {href: '#coaches', label: 'Coaches'},
  {href: '#membership', label: 'Membership'},
  {href: '#schedule', label: 'Timetable'},
  {href: '#visit', label: 'Visit'},
];
