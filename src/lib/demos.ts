export type Demo = {
  slug: 'gym' | 'restaurant' | 'clinic';
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
];
