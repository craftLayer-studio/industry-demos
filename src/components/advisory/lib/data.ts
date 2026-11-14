/**
 * Content for the fictional Halden & Rowe concept demo. Everything here is
 * invented, general and illustrative. It is not tax, legal or financial advice.
 */
import type {ServiceId} from './fees';

export type PracticeArea = {
  id: ServiceId;
  title: string;
  summary: string;
  includes: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    id: 'bookkeeping',
    title: 'Bookkeeping',
    summary: 'Tidy, reconciled books every month, so the numbers are ready before anyone asks for them.',
    includes: ['Bank and card reconciliations', 'Receipt and invoice capture', 'Monthly close checklist', 'A short written month-end note'],
  },
  {
    id: 'year-end',
    title: 'Year-end accounts',
    summary: 'Year-end statements prepared from books you already trust, on a timetable agreed in advance.',
    includes: ['Year-end adjustments and accruals', 'Draft statements for your review', 'Filing calendar and reminders', 'A walkthrough call on the results'],
  },
  {
    id: 'tax',
    title: 'Tax planning support',
    summary: 'Organised records and a clear calendar, so planning conversations happen early rather than at the deadline.',
    includes: ['Deadline tracking for your entity', 'Records gathered in one place', 'Planning sessions ahead of key dates', 'Coordination with your specialist advisers'],
  },
  {
    id: 'payroll',
    title: 'Payroll',
    summary: 'Accurate, on-time pay runs with the paperwork handled quietly in the background.',
    includes: ['Scheduled pay runs', 'Joiner and leaver set-up', 'Payslips and pay-run summaries', 'Journals posted to your books'],
  },
  {
    id: 'fundraising',
    title: 'Fundraising readiness',
    summary: 'Get the financial side of a raise in order: a model, a data room and answers that agree with each other.',
    includes: ['Three-statement financial model', 'Data room structure and checklist', 'Metric definitions written down', 'Practice runs of the finance questions'],
  },
  {
    id: 'cfo',
    title: 'Fractional CFO',
    summary: 'Senior finance thinking a few days a month, without hiring a full-time executive too early.',
    includes: ['Monthly management pack', 'Budget and cash forecast', 'Board meeting preparation', 'Pricing and hiring scenarios'],
  },
];

export type Audience = {title: string; body: string; typical: string[]};

export const audiences: Audience[] = [
  {
    title: 'Founders',
    body: 'For teams moving quickly, where the books need to keep up with hiring, product launches and investor updates.',
    typical: ['First finance hire is still a way off', 'Investors ask for monthly reporting', 'Planning a raise in the next year'],
  },
  {
    title: 'Small businesses',
    body: 'For owner-run studios, shops and practices that would rather spend evenings on the business than on spreadsheets.',
    typical: ['Books are a few months behind', 'Payroll for a small team', 'Wants a clear view of cash each month'],
  },
  {
    title: 'Non-profits',
    body: 'For community organisations and charities that need careful records and reporting their trustees can read easily.',
    typical: ['Restricted and unrestricted funds', 'Reports for a board or trustees', 'Volunteer treasurer needs support'],
  },
];

export type ProcessStep = {title: string; body: string; timing: string};

export const processSteps: ProcessStep[] = [
  {
    title: 'Introductory conversation',
    body: 'A 30-minute call to understand where the business is, what is working and what keeps slipping.',
    timing: 'Week 1',
  },
  {
    title: 'Scope and proposal',
    body: 'A written scope with a fixed monthly fee, what is included and what is not. No surprises later.',
    timing: 'Week 1–2',
  },
  {
    title: 'Onboarding and clean-up',
    body: 'We connect systems, review the opening position and tidy anything that needs it before the first close.',
    timing: 'Weeks 2–5',
  },
  {
    title: 'A steady monthly rhythm',
    body: 'Books closed on a set day, a short note on what changed, and a standing check-in with your partner.',
    timing: 'Ongoing',
  },
];

export type Partner = {name: string; role: string; focus: string; bio: string};

export const partners: Partner[] = [
  {
    name: 'Margit Halden',
    role: 'Founding partner',
    focus: 'Year-end accounts and tax planning support',
    bio: 'Leads the accounts practice and likes a filing calendar that is agreed in January, not discovered in December.',
  },
  {
    name: 'Julian Rowe',
    role: 'Founding partner',
    focus: 'Fractional CFO and fundraising readiness',
    bio: 'Works with founders on models, board packs and the questions that come up before a raise.',
  },
  {
    name: 'Adaeze Okonkwo',
    role: 'Partner',
    focus: 'Bookkeeping and payroll',
    bio: 'Runs the monthly close team and designs the checklists that keep every client on the same reliable rhythm.',
  },
  {
    name: 'Tomás Ferreira',
    role: 'Partner',
    focus: 'Non-profit and community organisations',
    bio: 'Helps boards and volunteer treasurers turn fund records into reports that are easy to read aloud at a meeting.',
  },
];

export type Insight = {
  id: string;
  category: string;
  title: string;
  dek: string;
  minutes: number;
  body: string[];
};

export const insights: Insight[] = [
  {
    id: 'month-end',
    category: 'Operations',
    title: 'What a calm month-end close looks like',
    dek: 'Five habits that turn the first week of the month from a scramble into a routine.',
    minutes: 3,
    body: [
      'A good close is mostly about rhythm. When the same tasks happen on the same days, the books stop being a surprise and start being a reference you can rely on.',
      'Most calm closes share a few habits: receipts are captured as they happen rather than at the end, bank feeds are reviewed weekly, and anything unusual is noted while it is still fresh.',
      'A short written note at the end of each month helps too. Three or four sentences about what changed and why is often more useful to a busy owner than a long report.',
      'Finally, agree a close date and keep it. A predictable date makes it easier for everyone, from the person approving invoices to the person reading the numbers.',
    ],
  },
  {
    id: 'data-room',
    category: 'Fundraising',
    title: 'Building a data room before you need one',
    dek: 'Why a tidy folder structure saves weeks once conversations with investors begin.',
    minutes: 4,
    body: [
      'A data room is simply an organised set of documents that someone reviewing your company might ask to see. Starting it early means you add to it calmly instead of assembling it under pressure.',
      'A simple structure works well: company documents, financials, commercial agreements, team, and product. Inside each, keep one current version of every file and a short index at the top.',
      'Consistency matters more than volume. If a figure appears in your deck, your model and your monthly reports, it should match in all three, and the definition behind it should be written down.',
      'Review the room every quarter. Removing stale files is as important as adding new ones.',
    ],
  },
  {
    id: 'separate-accounts',
    category: 'Getting started',
    title: 'Keeping business and personal spending apart',
    dek: 'A small set-up step that makes every later conversation about your numbers easier.',
    minutes: 2,
    body: [
      'Mixing personal and business spending is one of the most common reasons books fall behind. Every mixed transaction needs a decision, and those decisions pile up.',
      'A dedicated business account and card, used only for the business, removes most of that work. It also makes it far simpler to see how the business is actually doing.',
      'If something personal does slip through, note it straight away. A quick comment on the transaction is easier than reconstructing the story months later.',
    ],
  },
  {
    id: 'cash-view',
    category: 'Planning',
    title: 'A one-page view of cash',
    dek: 'How a simple weekly cash summary can make decisions feel less like guesswork.',
    minutes: 3,
    body: [
      'Profit and cash are related but not the same. A business can look healthy on paper while cash is tight, especially when customers pay slowly or costs arrive in lumps.',
      'A one-page cash view keeps the essentials together: money in the bank today, what is expected in and out over the next few weeks, and any larger items further ahead.',
      'Updating it weekly takes a few minutes once the habit forms. The value is less in precision and more in noticing changes early, while there is still time to plan around them.',
    ],
  },
];

export type Faq = {q: string; a: string};

export const faqs: Faq[] = [
  {
    q: 'Is Halden & Rowe a real firm?',
    a: 'No. Halden & Rowe is a fictional concept demo created by CraftLayer Studio. The people, address, prices and articles are invented, and nothing you enter on this page is sent anywhere.',
  },
  {
    q: 'How are fees set?',
    a: 'In this demo, fees are fixed monthly amounts based on business type, volume and the services chosen. The estimator shows illustrative sample pricing only, not a quote.',
  },
  {
    q: 'Can we start with one service and add more later?',
    a: 'Yes. Most engagements in this demo start with bookkeeping or a year-end, then add payroll or CFO support as the business grows. The scope is reviewed together each year.',
  },
  {
    q: 'Do you replace our existing software?',
    a: 'Usually not. The fictional team works inside the accounting and payroll tools you already use where possible, and only suggests changes when a tool is clearly holding you back.',
  },
  {
    q: 'What happens in the first conversation?',
    a: 'A relaxed 30-minute call about where the business is today and what you would like to change. There is no obligation, and in this demo no call is actually booked.',
  },
  {
    q: 'Is anything on this page advice?',
    a: 'No. All content is general and illustrative. It is not tax, legal, accounting or financial advice. Speak to a qualified professional about your own circumstances.',
  },
];

export const office = {
  street: '18 Ledger Row, Second floor',
  city: 'Fairhaven, FH 00000',
  phone: '(555) 014-2280',
  phoneHref: 'tel:+15550142280',
  email: 'hello@example.com',
  hours: [
    {days: 'Monday to Thursday', time: '8:30 am – 6:00 pm'},
    {days: 'Friday', time: '8:30 am – 4:00 pm'},
    {days: 'Weekends', time: 'Closed'},
  ],
};
