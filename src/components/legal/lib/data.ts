/** Copy for the fictional Marlowe & Pike concept demo. Everything is invented. */

export type PracticeId = 'property' | 'family' | 'wills' | 'employment' | 'business';

export type PracticeArea = {
  id: PracticeId;
  label: string;
  title: string;
  summary: string;
  helpWith: string[];
  feeApproach: string;
  feeKind: 'Fixed fee' | 'Fixed fee or hourly' | 'Agreed scope';
};

export const practiceAreas: PracticeArea[] = [
  {
    id: 'property',
    label: 'Property',
    title: 'Residential and commercial property',
    summary:
      'Buying, selling or remortgaging, explained one stage at a time, with a named solicitor and a fixed fee agreed before any work begins.',
    helpWith: [
      'Freehold and leasehold purchases and sales',
      'Remortgages and transfers of equity',
      'Lease extensions and reviewing management packs',
      'Small commercial leases for shops and studios',
    ],
    feeApproach: 'Fixed fees for most residential transactions. Try the sample estimator below.',
    feeKind: 'Fixed fee',
  },
  {
    id: 'family',
    label: 'Family',
    title: 'Family and relationships',
    summary:
      'Calm, practical support when a relationship changes, with the focus kept on children, fairness and avoiding court wherever possible.',
    helpWith: [
      'Separation and divorce paperwork',
      'Financial arrangements and consent orders',
      'Arrangements for children',
      'Cohabitation and pre-nuptial agreements',
    ],
    feeApproach: 'A fixed fee for defined stages, or an agreed hourly rate with a written estimate.',
    feeKind: 'Fixed fee or hourly',
  },
  {
    id: 'wills',
    label: 'Wills & probate',
    title: 'Wills, probate and lasting powers of attorney',
    summary:
      'Plain-English wills that say what you mean, and steady help for families administering an estate after a death.',
    helpWith: [
      'Single and mirror wills',
      'Lasting powers of attorney',
      'Applying for a grant of probate',
      'Full estate administration',
    ],
    feeApproach: 'Fixed fees for wills and powers of attorney. Estate work is scoped and quoted in writing.',
    feeKind: 'Fixed fee',
  },
  {
    id: 'employment',
    label: 'Employment',
    title: 'Employment, for people and employers',
    summary:
      'Clear guidance on the documents and conversations that shape working life, from first contract to a negotiated exit.',
    helpWith: [
      'Reviewing settlement agreements',
      'Contracts and staff handbooks',
      'Disciplinary and grievance processes',
      'Redundancy planning',
    ],
    feeApproach: 'Fixed fees for settlement agreement reviews. Other matters are scoped before work starts.',
    feeKind: 'Agreed scope',
  },
  {
    id: 'business',
    label: 'Business',
    title: 'Business and commercial',
    summary:
      'Practical legal support for founders and owner-managed companies, written for the people who have to use the documents.',
    helpWith: [
      'Company formation and shareholder agreements',
      'Terms of business and supplier contracts',
      'Buying or selling a small business',
      'Partnership and LLP agreements',
    ],
    feeApproach: 'Fixed fees for standard documents. Larger matters are scoped and capped in writing.',
    feeKind: 'Agreed scope',
  },
];

export function practiceById(id: string): PracticeArea | undefined {
  return practiceAreas.find(p => p.id === id);
}

export const steps = [
  {
    title: 'A short, confidential first conversation',
    body: 'Tell us what has happened and what you would like to achieve. We check for conflicts of interest before discussing any detail.',
  },
  {
    title: 'A written scope and fee',
    body: 'You receive a letter setting out what we will do, who will do it, what it will cost and what is not included.',
  },
  {
    title: 'One named solicitor',
    body: 'Your solicitor stays with the matter from start to finish and replies within an agreed timeframe.',
  },
  {
    title: 'Plain-English updates at each stage',
    body: 'We explain each decision before it is made, and you always know what happens next.',
  },
];

export type Solicitor = {
  id: string;
  name: string;
  initials: string;
  role: string;
  focus: string[];
  note: string;
};

export const solicitors: Solicitor[] = [
  {
    id: 'eleanor',
    name: 'Eleanor Marlowe',
    initials: 'EM',
    role: 'Partner, property',
    focus: ['Residential conveyancing', 'Leasehold'],
    note: 'Leads the property team and reviews every fixed-fee quote before it is sent.',
  },
  {
    id: 'thomas',
    name: 'Thomas Pike',
    initials: 'TP',
    role: 'Partner, business and employment',
    focus: ['Shareholder agreements', 'Settlement agreements'],
    note: 'Works with owner-managed companies and the people who work for them.',
  },
  {
    id: 'priya',
    name: 'Priya Okafor-Hale',
    initials: 'PO',
    role: 'Solicitor, family',
    focus: ['Separation', 'Arrangements for children'],
    note: 'Focuses on agreements reached outside court wherever that is possible.',
  },
  {
    id: 'callum',
    name: 'Callum Reid',
    initials: 'CR',
    role: 'Solicitor, wills and probate',
    focus: ['Wills', 'Estate administration'],
    note: 'Helps families through probate and keeps executors informed at every step.',
  },
];

export const faqs = [
  {
    q: 'Is anything on this page legal advice?',
    a: 'No. Marlowe & Pike is a fictional firm created as a design concept by CraftLayer Studio. Nothing here is legal advice, and you should speak to a qualified, regulated adviser about your own situation.',
  },
  {
    q: 'What does a fixed fee include?',
    a: 'In this concept, a fixed fee covers the work described in your scope letter. Disbursements paid to third parties, such as searches and registration fees, are listed separately so you can see them clearly.',
  },
  {
    q: 'Does the conveyancing estimate include Stamp Duty?',
    a: 'No. The estimator shows illustrative legal fees and sample disbursements only. Stamp Duty Land Tax depends on your circumstances and current rates, so check the official government guidance.',
  },
  {
    q: 'Is my enquiry confidential?',
    a: 'A real firm would treat enquiries confidentially. On this demo page nothing you type is sent, stored or seen by anyone: the form only checks your answers in your browser.',
  },
  {
    q: 'Can I meet my solicitor in person?',
    a: 'The concept offers video calls, phone calls or a meeting at the fictional office. Your solicitor would confirm the format in writing.',
  },
];
