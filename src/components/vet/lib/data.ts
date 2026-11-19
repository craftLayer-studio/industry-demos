// All content for the Meadowlark Vets concept demo. Meadowlark Vets is a
// fictional practice: the services, team, hours and prices are invented for
// demonstration and are not veterinary advice.

export type PetType = 'dog' | 'cat' | 'rabbit' | 'small';

export const petTypes: {id: PetType; label: string; plural: string}[] = [
  {id: 'dog', label: 'Dog', plural: 'Dogs'},
  {id: 'cat', label: 'Cat', plural: 'Cats'},
  {id: 'rabbit', label: 'Rabbit', plural: 'Rabbits'},
  {id: 'small', label: 'Small pet', plural: 'Small pets'},
];

export function petLabel(id: PetType): string {
  return petTypes.find(p => p.id === id)?.label ?? id;
}

export type Service = {
  id: string;
  name: string;
  summary: string;
  pets: PetType[];
};

export const services: Service[] = [
  {
    id: 'wellness',
    name: 'Wellness check-ups',
    summary: 'An unhurried nose-to-tail visit to talk through how your pet is eating, moving and settling at home.',
    pets: ['dog', 'cat', 'rabbit', 'small'],
  },
  {
    id: 'vaccinations',
    name: 'Vaccination appointments',
    summary: 'Routine vaccination visits, with reminders so you know when the next one is due.',
    pets: ['dog', 'cat', 'rabbit'],
  },
  {
    id: 'dental',
    name: 'Dental checks',
    summary: 'A look at teeth and gums, plus tips on home care that suit your pet and your routine.',
    pets: ['dog', 'cat', 'rabbit'],
  },
  {
    id: 'puppy-kitten',
    name: 'Puppy and kitten visits',
    summary: 'Gentle first visits to get young pets used to the practice, with time for all your new-owner questions.',
    pets: ['dog', 'cat'],
  },
  {
    id: 'nails',
    name: 'Nail clips',
    summary: 'Quick, calm nail trims booked as a short appointment on their own or alongside another visit.',
    pets: ['dog', 'cat', 'rabbit', 'small'],
  },
  {
    id: 'microchip',
    name: 'Microchipping',
    summary: 'Microchip appointments and a check that your contact details are up to date on the register.',
    pets: ['dog', 'cat', 'rabbit'],
  },
  {
    id: 'rabbit-diet',
    name: 'Rabbit diet and housing chats',
    summary: 'Time with the team to talk through hay, greens, space and companionship for happy bunnies.',
    pets: ['rabbit'],
  },
  {
    id: 'small-handling',
    name: 'Small pet handling sessions',
    summary: 'Hamsters, guinea pigs, rats and gerbils seen in a quiet room, away from barking and busy corridors.',
    pets: ['small'],
  },
  {
    id: 'senior',
    name: 'Senior pet visits',
    summary: 'Longer appointments for older pets, focused on comfort, mobility and keeping routines easy.',
    pets: ['dog', 'cat', 'rabbit'],
  },
  {
    id: 'cat-quiet',
    name: 'Quiet cat hours',
    summary: 'A calmer waiting room set aside for cats on weekday mornings, with covered carrier shelves.',
    pets: ['cat'],
  },
  {
    id: 'dog-weigh',
    name: 'Drop-in weigh-ins',
    summary: 'Pop in during opening hours to use the scales and note your dog’s weight between visits.',
    pets: ['dog'],
  },
];

/** Fictional opening hours. Minutes from midnight; `null` means closed. */
export type DayHours = {open: number; close: number} | null;

/** Indexed by JavaScript day number: 0 = Sunday ... 6 = Saturday. */
export const weeklyHours: DayHours[] = [
  null,
  {open: 8 * 60, close: 19 * 60},
  {open: 8 * 60, close: 19 * 60},
  {open: 8 * 60, close: 20 * 60},
  {open: 8 * 60, close: 19 * 60},
  {open: 8 * 60, close: 18 * 60},
  {open: 9 * 60, close: 13 * 60},
];

export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  pet: PetType;
  petName: string;
};

export const team: TeamMember[] = [
  {
    name: 'Hattie Brennan',
    role: 'Vet',
    bio: 'Enjoys first puppy visits and explaining things without jargon.',
    pet: 'dog',
    petName: 'Biscuit',
  },
  {
    name: 'Omar Feld',
    role: 'Vet',
    bio: 'The person cats seem to forgive first. Runs the quiet cat mornings.',
    pet: 'cat',
    petName: 'Pepper',
  },
  {
    name: 'Rosa Quill',
    role: 'Veterinary nurse',
    bio: 'Keeps the rabbit room stocked with hay and patience in equal measure.',
    pet: 'rabbit',
    petName: 'Clover',
  },
  {
    name: 'Ben Achterberg',
    role: 'Client care',
    bio: 'Answers the phone, remembers every pet’s name and keeps the treat jar full.',
    pet: 'small',
    petName: 'Pip',
  },
];

export const faqs: {q: string; a: string}[] = [
  {
    q: 'Is Meadowlark Vets a real practice?',
    a: 'No. Meadowlark Vets is a fictional brand created by CraftLayer Studio to show what a veterinary website could look like. Nothing on this page is veterinary advice, and no appointments, plans or payments are real.',
  },
  {
    q: 'Which pets would the practice see?',
    a: 'In this concept, dogs, cats, rabbits and small pets such as guinea pigs, hamsters, rats and gerbils. Use the filter in the services section to see what each pet type could book.',
  },
  {
    q: 'How do the health plan prices work?',
    a: 'The calculator uses sample monthly prices to show how a plan builder could work. They are illustrative only and are not a quote or an offer.',
  },
  {
    q: 'What should I bring to a first visit?',
    a: 'In a real practice you would usually bring any previous records, a list of food and any medicines, and a secure carrier or lead. Always check with your own vet.',
  },
  {
    q: 'What if my pet needs help urgently?',
    a: 'Contact your nearest out-of-hours veterinary service straight away. This demo practice cannot help with emergencies.',
  },
];
