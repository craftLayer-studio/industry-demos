export type Demo = {
  slug: 'gym' | 'restaurant' | 'clinic' | 'saas' | 'academy' | 'advisory' | 'real-estate' | 'salon' | 'nonprofit' | 'coffee';
  name: string;
  industry: string;
  summary: string;
  href: string;
};

export const demos: Demo[] = [
  {
    slug: 'gym',
    name: 'Forge Fitness',
    industry: 'Fitness',
    summary: 'Programmes, trainers, memberships, a filterable class timetable and a validated trial booking form.',
    href: '/gym/',
  },
  {
    slug: 'restaurant',
    name: 'Juniper Kitchen',
    industry: 'Restaurants and hospitality',
    summary: 'Filterable menu, dish cards, a mock order cart and a validated table reservation flow.',
    href: '/restaurant/',
  },
  {
    slug: 'clinic',
    name: 'Northstar Clinic',
    industry: 'Healthcare',
    summary: 'Specialties, clinicians, FAQs and a multi-step appointment request with validation.',
    href: '/clinic/',
  },
  {
    slug: 'saas',
    name: 'Pulsegrid',
    industry: 'Startups and SaaS',
    summary: 'Product launch page for a fictional analytics SaaS: feature tour, interactive pricing calculator, plan comparison and a validated waitlist form.',
    href: '/saas/',
  },
  {
    slug: 'academy',
    name: 'Quillmark Academy',
    industry: 'Education',
    summary: 'Fictional online academy: searchable course catalogue with filters, curriculum previews, instructor profiles and a validated enrolment enquiry.',
    href: '/academy/',
  },
  {
    slug: 'advisory',
    name: 'Halden & Rowe',
    industry: 'Professional services',
    summary: 'Fictional accounting and advisory firm: practice areas, a fee estimator, team profiles, insights and a multi-step consultation request.',
    href: '/advisory/',
  },
  {
    slug: 'real-estate',
    name: 'Ashgrove Property',
    industry: 'Real estate',
    summary: 'Fictional estate agency: filterable property listings, a listing detail dialog, a mortgage estimator and a viewing request.',
    href: '/real-estate/',
  },
  {
    slug: 'salon',
    name: 'Fernlight Salon & Spa',
    industry: 'Beauty and wellness',
    summary: 'Fictional salon and spa: service menu with durations, stylist profiles, gift cards and a step-by-step appointment request.',
    href: '/salon/',
  },
  {
    slug: 'nonprofit',
    name: 'Common Table',
    industry: 'Nonprofit',
    summary: 'Fictional community food network: programmes, a donation form with impact explainer, volunteer shift sign-up and events.',
    href: '/nonprofit/',
  },
  {
    slug: 'coffee',
    name: 'Brightwater Coffee',
    industry: 'E-commerce and retail',
    summary: 'Fictional coffee roaster store: filterable coffee shop, product dialog, a mock cart and a subscription builder.',
    href: '/coffee/',
  },
];
