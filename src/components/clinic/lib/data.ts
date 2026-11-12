/**
 * All content for the Northstar Clinic concept demo. Every clinician,
 * address, phone number and email here is FICTIONAL. Northstar Clinic is not
 * a real healthcare provider.
 */

export type SpecialtyId =
  | 'family-medicine'
  | 'paediatrics'
  | 'dermatology'
  | 'cardiology'
  | 'physiotherapy'
  | 'womens-health';

export type Specialty = {
  id: SpecialtyId;
  name: string;
  summary: string;
  visitLength: number; // minutes
};

export const specialties: Specialty[] = [
  {
    id: 'family-medicine',
    name: 'Family medicine',
    summary: 'Everyday appointments for adults and families: check-ins, follow-ups and coordinating care with other teams.',
    visitLength: 20,
  },
  {
    id: 'paediatrics',
    name: 'Paediatrics',
    summary: 'Unhurried visits for babies, children and teenagers, with time set aside for parents’ questions.',
    visitLength: 30,
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    summary: 'Consultations about skin, hair and nails, including routine skin checks by appointment.',
    visitLength: 20,
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    summary: 'Specialist consultations about heart health, with in-clinic checks arranged when a clinician requests them.',
    visitLength: 30,
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy',
    summary: 'One-to-one sessions focused on movement, mobility and a plan you can follow at home.',
    visitLength: 45,
  },
  {
    id: 'womens-health',
    name: 'Women’s health',
    summary: 'Private, respectful appointments covering routine screening conversations and life-stage care.',
    visitLength: 30,
  },
];

export type Clinician = {
  id: string;
  name: string;
  title: string;
  specialty: SpecialtyId;
  /** ISO weekday numbers the clinician sees patients: 1 = Monday … 5 = Friday. */
  days: number[];
  languages: string[];
  bio: string;
};

export const clinicians: Clinician[] = [
  {
    id: 'amara-okafor',
    name: 'Dr Amara Okafor',
    title: 'Family physician',
    specialty: 'family-medicine',
    days: [1, 2, 4],
    languages: ['English', 'Igbo'],
    bio: 'Likes clear plans and plain language.',
  },
  {
    id: 'lukas-brenner',
    name: 'Dr Lukas Brenner',
    title: 'Family physician',
    specialty: 'family-medicine',
    days: [3, 5],
    languages: ['English', 'German'],
    bio: 'Focuses on long-term follow-up care.',
  },
  {
    id: 'priya-raman',
    name: 'Dr Priya Raman',
    title: 'Paediatrician',
    specialty: 'paediatrics',
    days: [1, 3, 5],
    languages: ['English', 'Tamil'],
    bio: 'Keeps visits calm for younger patients.',
  },
  {
    id: 'mateo-alvarez',
    name: 'Dr Mateo Alvarez',
    title: 'Paediatrician',
    specialty: 'paediatrics',
    days: [2, 4],
    languages: ['English', 'Spanish'],
    bio: 'Sees children from newborn to 16.',
  },
  {
    id: 'hana-sato',
    name: 'Dr Hana Sato',
    title: 'Dermatologist',
    specialty: 'dermatology',
    days: [2, 3, 4],
    languages: ['English', 'Japanese'],
    bio: 'Runs the routine skin-check clinic.',
  },
  {
    id: 'elias-mendel',
    name: 'Dr Elias Mendel',
    title: 'Cardiologist',
    specialty: 'cardiology',
    days: [1, 4],
    languages: ['English', 'Hebrew'],
    bio: 'Coordinates closely with family physicians.',
  },
  {
    id: 'grace-whitfield',
    name: 'Dr Grace Whitfield',
    title: 'Cardiologist',
    specialty: 'cardiology',
    days: [2, 5],
    languages: ['English'],
    bio: 'Explains results step by step.',
  },
  {
    id: 'noor-haddad',
    name: 'Noor Haddad',
    title: 'Physiotherapist',
    specialty: 'physiotherapy',
    days: [1, 2, 3, 4, 5],
    languages: ['English', 'Arabic'],
    bio: 'Builds simple routines for home.',
  },
  {
    id: 'sam-whitaker',
    name: 'Sam Whitaker',
    title: 'Physiotherapist',
    specialty: 'physiotherapy',
    days: [2, 4],
    languages: ['English'],
    bio: 'Works with active people of all ages.',
  },
  {
    id: 'ingrid-solberg',
    name: 'Dr Ingrid Solberg',
    title: 'Women’s health physician',
    specialty: 'womens-health',
    days: [1, 3, 5],
    languages: ['English', 'Norwegian'],
    bio: 'Makes room for every question.',
  },
  {
    id: 'leila-moradi',
    name: 'Dr Leila Moradi',
    title: 'Women’s health physician',
    specialty: 'womens-health',
    days: [2, 4],
    languages: ['English', 'Farsi'],
    bio: 'Offers early and late appointments.',
  },
];

export const services = [
  {title: 'Same-week appointments', text: 'Request a visit online and the (fictional) front desk would confirm a time that suits you.'},
  {title: 'Routine health checks', text: 'Scheduled check-ins with a family physician, booked at a pace that works for you.'},
  {title: 'Vaccination clinics', text: 'Seasonal clinic sessions, with times published at the front desk.'},
  {title: 'Video follow-ups', text: 'Short follow-up conversations by video when an in-person visit is not needed.'},
  {title: 'Referral coordination', text: 'Help arranging appointments between our specialties under one roof.'},
  {title: 'Accessible clinic', text: 'Step-free entrance, a lift to every floor and quiet rooms on request.'},
];

export const hours = [
  {day: 'Monday', hours: '8:00 – 18:00'},
  {day: 'Tuesday', hours: '8:00 – 18:00'},
  {day: 'Wednesday', hours: '8:00 – 19:30'},
  {day: 'Thursday', hours: '8:00 – 18:00'},
  {day: 'Friday', hours: '8:00 – 17:00'},
  {day: 'Saturday', hours: 'Closed'},
  {day: 'Sunday', hours: 'Closed'},
];

export const faqs = [
  {
    q: 'Is Northstar Clinic a real clinic?',
    a: 'No. Northstar Clinic is a fictional brand created by CraftLayer Studio to demonstrate a healthcare website. The clinicians, address, phone number and email are invented, and no appointments can be booked.',
  },
  {
    q: 'What happens when I submit the appointment form?',
    a: 'Nothing is sent or stored. The form runs entirely in your browser to show how a booking flow could work, and it clears when you leave or reload the page.',
  },
  {
    q: 'Do I need a referral to see a specialist?',
    a: 'In this demo, any specialty can be requested directly. A real clinic would explain its own referral rules here.',
  },
  {
    q: 'Can I bring someone with me to an appointment?',
    a: 'In this fictional clinic, you are welcome to bring a family member, carer or interpreter to any appointment.',
  },
  {
    q: 'How do I cancel or change an appointment?',
    a: 'A real clinic would offer a link in the confirmation email or a phone line. This demo has no real appointments to change.',
  },
  {
    q: 'What should I do in an emergency?',
    a: 'Contact your local emergency number straight away. Online booking forms, including this demo, are never the right place for urgent help.',
  },
];

export const contact = {
  phoneDisplay: '(555) 010-0142',
  phoneHref: 'tel:+15550100142',
  email: 'hello@example.com',
  addressLines: ['48 Harbour Lane, Level 2', 'Brookfield 00000'],
};

export function specialtyById(id: SpecialtyId): Specialty {
  const found = specialties.find(s => s.id === id);
  if (!found) throw new Error(`Unknown specialty ${id}`);
  return found;
}

export function clinicianById(id: string): Clinician | undefined {
  return clinicians.find(c => c.id === id);
}
