// Content for the fictional Arbour Dental concept demo. Every name, price and
// detail here is invented. Prices are illustrative sample ranges only.

export type CategoryId = 'general' | 'hygiene' | 'whitening' | 'aligners' | 'implants' | 'aesthetics';

export type Category = {id: CategoryId; label: string; blurb: string};

export const categories: Category[] = [
  {id: 'general', label: 'General', blurb: 'Check-ups, fillings and everyday care.'},
  {id: 'hygiene', label: 'Hygiene', blurb: 'Hygienist visits and gum care routines.'},
  {id: 'whitening', label: 'Whitening', blurb: 'Professional whitening options.'},
  {id: 'aligners', label: 'Clear aligners', blurb: 'Removable clear aligner treatment.'},
  {id: 'implants', label: 'Implants', blurb: 'Replacing missing teeth.'},
  {id: 'aesthetics', label: 'Facial aesthetics', blurb: 'Non-surgical facial treatments.'},
];

export type Treatment = {
  id: string;
  category: CategoryId;
  name: string;
  summary: string;
  /** Sample price range in whole pounds. */
  priceFrom: number;
  priceTo: number;
  /** What the price covers, e.g. "per visit". */
  unit: string;
  visits: string;
};

export const treatments: Treatment[] = [
  {
    id: 'check-up',
    category: 'general',
    name: 'New patient examination',
    summary: 'A relaxed first look at your teeth and gums, a chat about any concerns and a written plan if you need one.',
    priceFrom: 70,
    priceTo: 110,
    unit: 'per visit',
    visits: '1 visit, about 45 minutes',
  },
  {
    id: 'filling',
    category: 'general',
    name: 'Tooth-coloured fillings',
    summary: 'Composite fillings matched to the shade of your tooth, priced by size once your dentist has assessed it.',
    priceFrom: 120,
    priceTo: 260,
    unit: 'per tooth',
    visits: 'Usually 1 visit',
  },
  {
    id: 'crown',
    category: 'general',
    name: 'Crowns',
    summary: 'A custom-made cap for a weakened tooth, discussed in detail at a consultation before anything goes ahead.',
    priceFrom: 650,
    priceTo: 1100,
    unit: 'per tooth',
    visits: '2 visits',
  },
  {
    id: 'hygiene-visit',
    category: 'hygiene',
    name: 'Hygienist appointment',
    summary: 'A gentle scale and polish with practical tips for brushing and cleaning between teeth.',
    priceFrom: 65,
    priceTo: 95,
    unit: 'per visit',
    visits: '30 to 45 minutes',
  },
  {
    id: 'gum-care',
    category: 'hygiene',
    name: 'Gum care programme',
    summary: 'A short course of longer hygiene visits for people who want extra support looking after their gums.',
    priceFrom: 280,
    priceTo: 520,
    unit: 'per course',
    visits: '3 to 4 visits',
  },
  {
    id: 'home-whitening',
    category: 'whitening',
    name: 'Take-home whitening',
    summary: 'Custom trays made for you plus a supply of whitening gel, after a check that whitening is suitable.',
    priceFrom: 295,
    priceTo: 395,
    unit: 'per course',
    visits: '2 visits',
  },
  {
    id: 'combined-whitening',
    category: 'whitening',
    name: 'In-practice and home whitening',
    summary: 'An in-practice session followed by a take-home kit. Your dentist will explain what is realistic for you.',
    priceFrom: 450,
    priceTo: 650,
    unit: 'per course',
    visits: '2 to 3 visits',
  },
  {
    id: 'aligners-mild',
    category: 'aligners',
    name: 'Clear aligners: minor alignment',
    summary: 'A short series of removable clear aligners for small alignment changes, planned from a digital scan.',
    priceFrom: 1500,
    priceTo: 2500,
    unit: 'per course',
    visits: 'Reviews every 6 to 10 weeks',
  },
  {
    id: 'aligners-full',
    category: 'aligners',
    name: 'Clear aligners: comprehensive',
    summary: 'A longer clear aligner course for more involved alignment, with retainers discussed before you start.',
    priceFrom: 3000,
    priceTo: 4800,
    unit: 'per course',
    visits: 'Reviews every 6 to 10 weeks',
  },
  {
    id: 'implant-consult',
    category: 'implants',
    name: 'Implant consultation',
    summary: 'A detailed conversation about replacing a missing tooth, the options available and their costs.',
    priceFrom: 95,
    priceTo: 150,
    unit: 'per consultation',
    visits: '1 visit, about 60 minutes',
  },
  {
    id: 'single-implant',
    category: 'implants',
    name: 'Single tooth implant',
    summary: 'Implant, abutment and crown for one tooth. The full plan and fee are confirmed in writing first.',
    priceFrom: 2400,
    priceTo: 3200,
    unit: 'per tooth',
    visits: 'Several visits over a few months',
  },
  {
    id: 'aesthetics-consult',
    category: 'aesthetics',
    name: 'Facial aesthetics consultation',
    summary: 'An unhurried conversation about what you would like, what is suitable and what is not, with no obligation.',
    priceFrom: 0,
    priceTo: 50,
    unit: 'per consultation',
    visits: '1 visit, about 30 minutes',
  },
  {
    id: 'anti-wrinkle',
    category: 'aesthetics',
    name: 'Anti-wrinkle injections',
    summary: 'Offered only after a consultation and medical history review, with a cooling-off period before treatment.',
    priceFrom: 180,
    priceTo: 350,
    unit: 'per area group',
    visits: '1 visit plus a review',
  },
  {
    id: 'dermal-filler',
    category: 'aesthetics',
    name: 'Dermal fillers',
    summary: 'Discussed in depth at a consultation first. Your practitioner will talk through risks and alternatives.',
    priceFrom: 250,
    priceTo: 450,
    unit: 'per treatment',
    visits: '1 visit plus a review',
  },
];

export type JourneyStep = {title: string; body: string};

export const journey: JourneyStep[] = [
  {
    title: 'Send a consultation request',
    body: 'Tell us what you are interested in and how you would like us to get in touch. It takes about two minutes.',
  },
  {
    title: 'A short welcome call',
    body: 'A treatment coordinator calls or emails to find a time, answer early questions and explain what to bring.',
  },
  {
    title: 'Your first visit',
    body: 'A relaxed examination and conversation. Ask anything; there is no pressure to decide on the day.',
  },
  {
    title: 'A written plan with costs',
    body: 'You receive your options in plain language, with fees itemised so you can take your time to decide.',
  },
  {
    title: 'Treatment and aftercare',
    body: 'If you go ahead, we book visits around you and explain how to look after things at home afterwards.',
  },
];

export type TeamMember = {name: string; role: string; focus: string; note: string};

export const team: TeamMember[] = [
  {
    name: 'Imogen Hart',
    role: 'Principal dentist',
    focus: 'General and restorative dentistry',
    note: 'Likes to explain every option with a diagram before anything is decided.',
  },
  {
    name: 'Rafael Okoye',
    role: 'Dentist',
    focus: 'Clear aligners and whitening',
    note: 'Walks you through a digital scan so you can see the plan on screen.',
  },
  {
    name: 'Saoirse Lindqvist',
    role: 'Dental hygienist',
    focus: 'Hygiene and gum care',
    note: 'Keeps advice practical: small changes you can actually stick to.',
  },
  {
    name: 'Priya Castellane',
    role: 'Treatment coordinator',
    focus: 'Plans, fees and appointments',
    note: 'Your first point of contact for questions about costs and timings.',
  },
];

export type Faq = {q: string; a: string};

export const faqs: Faq[] = [
  {
    q: 'Is Arbour Dental a real practice?',
    a: 'No. Arbour Dental is a fictional concept demo designed and built by CraftLayer Studio. The team, prices and contact details are invented, and nothing on this page is dental or medical advice.',
  },
  {
    q: 'Are the prices on this page real?',
    a: 'No. They are illustrative sample ranges to show how a practice could present fees clearly. In a real practice, fees are confirmed in a written plan after an examination.',
  },
  {
    q: 'Is the payment estimator a credit offer?',
    a: 'No. It is an illustrative calculator only. It does not check eligibility, make a credit decision or involve any lender. Real finance would be subject to status and the lender’s own terms.',
  },
  {
    q: 'What happens at a first visit?',
    a: 'In this concept, a first visit is an unhurried examination and conversation about what you would like. You leave with a written summary of options and there is no expectation to decide on the day.',
  },
  {
    q: 'I feel anxious about the dentist. Can I say so?',
    a: 'Yes. The consultation form has space to mention anything that would help you feel more comfortable, such as longer appointments or a quieter time of day.',
  },
  {
    q: 'Does the consultation form book an appointment?',
    a: 'No. The form checks your entries in your browser and shows a confirmation, but nothing is sent, stored or booked.',
  },
];

export const categoryById = (id: CategoryId) => categories.find(c => c.id === id);
export const treatmentById = (id: string) => treatments.find(t => t.id === id);
