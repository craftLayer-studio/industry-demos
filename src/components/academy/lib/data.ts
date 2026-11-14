/**
 * Content for the Quillmark Academy concept demo. Every course, instructor,
 * price and date here is fictional sample content written for this demo.
 */

export type SubjectId = 'design' | 'web' | 'data' | 'writing';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Format = 'live' | 'self-paced';

export type Module = {title: string; detail: string};

export type Course = {
  id: string;
  title: string;
  subject: SubjectId;
  level: Level;
  format: Format;
  weeks: number;
  hoursPerWeek: string;
  /** Sample price in US dollars. */
  price: number;
  summary: string;
  outcome: string;
  modules: Module[];
  prerequisites: string[];
  /** Weekly rhythm for live cohorts, or how self-paced study is structured. */
  schedule: string;
  instructorId: string;
  /** Week offset (0-3) inside the four-week sample cohort cycle. Live courses only. */
  cycleOffset?: number;
};

export type Instructor = {
  id: string;
  name: string;
  role: string;
  bio: string;
  teaches: SubjectId[];
};

export const subjects: {id: SubjectId; label: string}[] = [
  {id: 'design', label: 'Product design'},
  {id: 'web', label: 'Web development'},
  {id: 'data', label: 'Data analysis'},
  {id: 'writing', label: 'Writing'},
];

export const levels: {id: Level; label: string}[] = [
  {id: 'beginner', label: 'Beginner'},
  {id: 'intermediate', label: 'Intermediate'},
  {id: 'advanced', label: 'Advanced'},
];

export const formats: {id: Format; label: string}[] = [
  {id: 'live', label: 'Live cohort'},
  {id: 'self-paced', label: 'Self-paced'},
];

export function subjectLabel(id: SubjectId): string {
  return subjects.find(s => s.id === id)?.label ?? id;
}
export function levelLabel(id: Level): string {
  return levels.find(l => l.id === id)?.label ?? id;
}
export function formatLabel(id: Format): string {
  return formats.find(f => f.id === id)?.label ?? id;
}

export const instructors: Instructor[] = [
  {
    id: 'ines',
    name: 'Ines Okafor-Lind',
    role: 'Product design',
    bio: 'Runs the design studio sessions. Cares about research you can act on and prototypes you can test by Friday.',
    teaches: ['design'],
  },
  {
    id: 'tomas',
    name: 'Tomás Reyes',
    role: 'Web development',
    bio: 'Teaches HTML, CSS and JavaScript from the browser up, with accessibility treated as part of done.',
    teaches: ['web'],
  },
  {
    id: 'priya',
    name: 'Priya Hallworth',
    role: 'Data analysis',
    bio: 'Turns spreadsheets into clear questions, honest charts and short written findings people actually read.',
    teaches: ['data'],
  },
  {
    id: 'august',
    name: 'August Mbeki',
    role: 'Writing',
    bio: 'Edits with a pencil and a kind eye. Focuses on structure first, then sentences, then the last ten percent.',
    teaches: ['writing'],
  },
  {
    id: 'mei',
    name: 'Mei Lindqvist',
    role: 'Front-end and design systems',
    bio: 'Bridges design and code: tokens, components and the conversations that keep them in sync.',
    teaches: ['web', 'design'],
  },
  {
    id: 'rafa',
    name: 'Rafaela Duarte',
    role: 'Data and writing',
    bio: 'Coaches analysts on telling the story behind the numbers without overselling what the data can say.',
    teaches: ['data', 'writing'],
  },
];

export function instructorById(id: string): Instructor | undefined {
  return instructors.find(i => i.id === id);
}

export const courses: Course[] = [
  {
    id: 'design-foundations',
    title: 'Product Design Foundations',
    subject: 'design',
    level: 'beginner',
    format: 'live',
    weeks: 8,
    hoursPerWeek: '6-8 hours',
    price: 890,
    summary: 'Learn the full loop of product design by redesigning one everyday app flow from research to tested prototype.',
    outcome: 'A documented case study of one redesigned flow, from interview notes to a clickable prototype.',
    modules: [
      {title: 'Seeing the problem', detail: 'Framing a design question and planning five short interviews.'},
      {title: 'Research you can use', detail: 'Affinity mapping, jobs to be done and writing a sharp problem statement.'},
      {title: 'Flows and sketches', detail: 'User flows, crazy eights and choosing a direction with critique.'},
      {title: 'Wireframes', detail: 'Layout, hierarchy and content-first wireframes in a shared file.'},
      {title: 'Visual basics', detail: 'Type, colour, spacing and accessible contrast in practice.'},
      {title: 'Prototyping', detail: 'Interactive prototypes that answer a specific question.'},
      {title: 'Usability testing', detail: 'Running and synthesising three remote test sessions.'},
      {title: 'Telling the story', detail: 'Writing the case study and presenting it to the cohort.'},
    ],
    prerequisites: ['No design experience needed', 'A laptop that runs a free browser-based design tool'],
    schedule: 'Two live sessions a week (Tuesday and Thursday, 18:30-20:00 UTC) plus one studio critique on Saturday.',
    instructorId: 'ines',
    cycleOffset: 0,
  },
  {
    id: 'ux-research',
    title: 'Practical UX Research',
    subject: 'design',
    level: 'intermediate',
    format: 'live',
    weeks: 6,
    hoursPerWeek: '5-7 hours',
    price: 760,
    summary: 'Plan, run and synthesise research that changes decisions: interviews, diary studies and lightweight surveys.',
    outcome: 'A research plan, a synthesis board and a one-page findings memo for a real or practice product.',
    modules: [
      {title: 'Research questions', detail: 'From vague curiosity to questions a study can answer.'},
      {title: 'Recruiting ethically', detail: 'Screeners, consent and respecting participants’ time.'},
      {title: 'Interviewing', detail: 'Open questions, silence and following the thread.'},
      {title: 'Diary studies and surveys', detail: 'When to use each and how to keep them light.'},
      {title: 'Synthesis', detail: 'Coding notes, finding patterns and avoiding confirmation bias.'},
      {title: 'Sharing findings', detail: 'Memos, clips and workshops that lead to action.'},
    ],
    prerequisites: ['Some exposure to product or design work', 'Comfortable running a video call'],
    schedule: 'One live workshop a week (Wednesday, 17:00-19:00 UTC) and a weekly small-group check-in.',
    instructorId: 'ines',
    cycleOffset: 2,
  },
  {
    id: 'design-systems',
    title: 'Design Systems in Practice',
    subject: 'design',
    level: 'advanced',
    format: 'live',
    weeks: 10,
    hoursPerWeek: '6-8 hours',
    price: 1240,
    summary: 'Build and document a small component library with tokens, usage guidance and a contribution model.',
    outcome: 'A token set, twelve documented components and a short governance guide for a team.',
    modules: [
      {title: 'Auditing an interface', detail: 'Inventorying patterns and spotting drift.'},
      {title: 'Design tokens', detail: 'Naming, theming and dark mode without chaos.'},
      {title: 'Core components', detail: 'Buttons, inputs and cards with every state accounted for.'},
      {title: 'Accessibility by default', detail: 'Focus, contrast and keyboard behaviour baked in.'},
      {title: 'Documentation', detail: 'Usage notes people read: do, don’t and why.'},
      {title: 'Working with engineers', detail: 'Handoff, parity checks and shared vocabulary.'},
      {title: 'Contribution and governance', detail: 'How a system grows without losing its shape.'},
      {title: 'Showcase', detail: 'Presenting the system and planning its next quarter.'},
    ],
    prerequisites: ['Product Design Foundations or equivalent experience', 'Working knowledge of a component-based design tool'],
    schedule: 'Two live sessions a week (Monday and Wednesday, 18:00-19:30 UTC) with pair critiques.',
    instructorId: 'mei',
    cycleOffset: 1,
  },
  {
    id: 'html-css',
    title: 'HTML and CSS from Scratch',
    subject: 'web',
    level: 'beginner',
    format: 'self-paced',
    weeks: 6,
    hoursPerWeek: '4-6 hours',
    price: 290,
    summary: 'Write semantic HTML and modern CSS layouts by building a responsive personal site, one section a week.',
    outcome: 'A responsive, accessible personal website you wrote by hand and can keep improving.',
    modules: [
      {title: 'How the web fits together', detail: 'Browsers, files and the developer tools.'},
      {title: 'Semantic HTML', detail: 'Headings, landmarks, lists, links and forms.'},
      {title: 'CSS fundamentals', detail: 'The cascade, the box model and custom properties.'},
      {title: 'Layout', detail: 'Flexbox and grid for real page layouts.'},
      {title: 'Responsive design', detail: 'Fluid type, media queries and testing at 320px.'},
      {title: 'Publishing', detail: 'Putting your site online with a free static host.'},
    ],
    prerequisites: ['No coding experience needed', 'A computer where you can install a code editor'],
    schedule: 'Start any time. New lessons unlock weekly, with recorded walkthroughs and written feedback on two checkpoints.',
    instructorId: 'tomas',
  },
  {
    id: 'javascript-essentials',
    title: 'JavaScript Essentials',
    subject: 'web',
    level: 'beginner',
    format: 'live',
    weeks: 8,
    hoursPerWeek: '6-8 hours',
    price: 920,
    summary: 'Learn to think in JavaScript by building three small interactive tools that run in the browser.',
    outcome: 'Three working browser tools in a public code repository, each with a short write-up.',
    modules: [
      {title: 'Values and variables', detail: 'Types, operators and reading error messages calmly.'},
      {title: 'Control flow', detail: 'Conditions, loops and breaking problems into steps.'},
      {title: 'Functions', detail: 'Parameters, return values and naming things well.'},
      {title: 'Arrays and objects', detail: 'Modelling data and transforming it.'},
      {title: 'The DOM', detail: 'Selecting, updating and listening to the page.'},
      {title: 'Forms and validation', detail: 'Accessible error messages and user-friendly input.'},
      {title: 'Fetching data', detail: 'Promises, async and working with JSON.'},
      {title: 'Project week', detail: 'Finishing, testing and presenting your third tool.'},
    ],
    prerequisites: ['HTML and CSS from Scratch or equivalent', 'Comfortable editing files in a code editor'],
    schedule: 'Two live sessions a week (Monday and Thursday, 18:30-20:00 UTC) plus optional open lab on Saturday.',
    instructorId: 'tomas',
    cycleOffset: 0,
  },
  {
    id: 'react-apps',
    title: 'Building Interfaces with React',
    subject: 'web',
    level: 'intermediate',
    format: 'live',
    weeks: 10,
    hoursPerWeek: '7-9 hours',
    price: 1180,
    summary: 'Build a multi-page React application with components, state, routing, testing and accessible forms.',
    outcome: 'A tested React application with a reusable component set and a deployment you can share.',
    modules: [
      {title: 'Thinking in components', detail: 'Props, composition and splitting a design into parts.'},
      {title: 'State and events', detail: 'Local state, lifting state and controlled inputs.'},
      {title: 'Effects with care', detail: 'When you need an effect and when you do not.'},
      {title: 'Routing', detail: 'Pages, links and loading states.'},
      {title: 'Forms that help', detail: 'Validation, error summaries and focus management.'},
      {title: 'Testing', detail: 'Writing tests that describe behaviour, not implementation.'},
      {title: 'Styling at scale', detail: 'CSS Modules, tokens and design system components.'},
      {title: 'Shipping', detail: 'Static builds, performance checks and a final demo.'},
    ],
    prerequisites: ['JavaScript Essentials or equivalent', 'Familiar with the command line basics'],
    schedule: 'Two live sessions a week (Tuesday and Thursday, 19:00-20:30 UTC) and a weekly code review.',
    instructorId: 'mei',
    cycleOffset: 3,
  },
  {
    id: 'web-accessibility',
    title: 'Accessible Web Interfaces',
    subject: 'web',
    level: 'advanced',
    format: 'self-paced',
    weeks: 4,
    hoursPerWeek: '4-5 hours',
    price: 340,
    summary: 'Audit and fix real interface patterns against WCAG 2.2 using a keyboard, a screen reader and automated checks.',
    outcome: 'An audit report and a set of fixed components with notes on what changed and why.',
    modules: [
      {title: 'Principles and law', detail: 'WCAG 2.2 in plain language and how audits work.'},
      {title: 'Keyboard and focus', detail: 'Focus order, visible focus and managing focus in dialogs.'},
      {title: 'Screen readers', detail: 'Names, roles, states and live regions.'},
      {title: 'Fixing patterns', detail: 'Menus, tabs, forms and error handling done well.'},
    ],
    prerequisites: ['Comfortable writing HTML, CSS and some JavaScript'],
    schedule: 'Start any time. Four modules with recorded demos and two written reviews of your audit.',
    instructorId: 'tomas',
  },
  {
    id: 'spreadsheets-to-insight',
    title: 'Spreadsheets to Insight',
    subject: 'data',
    level: 'beginner',
    format: 'self-paced',
    weeks: 4,
    hoursPerWeek: '3-5 hours',
    price: 240,
    summary: 'Clean, summarise and chart data in a spreadsheet, then write a short finding that answers a real question.',
    outcome: 'A cleaned dataset, a small dashboard and a one-page written finding.',
    modules: [
      {title: 'Asking a good question', detail: 'Turning curiosity into something data can answer.'},
      {title: 'Cleaning data', detail: 'Types, duplicates, gaps and keeping a change log.'},
      {title: 'Summarising', detail: 'Pivot tables, lookups and simple statistics.'},
      {title: 'Charting honestly', detail: 'Choosing the right chart and labelling it clearly.'},
    ],
    prerequisites: ['No data experience needed', 'Access to any free spreadsheet app'],
    schedule: 'Start any time. Weekly modules with practice datasets and one written review of your finding.',
    instructorId: 'priya',
  },
  {
    id: 'sql-analysis',
    title: 'SQL for Analysis',
    subject: 'data',
    level: 'intermediate',
    format: 'live',
    weeks: 6,
    hoursPerWeek: '5-7 hours',
    price: 780,
    summary: 'Query relational data with confidence: joins, aggregations, window functions and readable queries.',
    outcome: 'A query notebook answering ten business questions about a sample dataset.',
    modules: [
      {title: 'Selecting and filtering', detail: 'SELECT, WHERE and reading a schema.'},
      {title: 'Aggregations', detail: 'GROUP BY, HAVING and sanity-checking totals.'},
      {title: 'Joins', detail: 'Inner, left and the rows you might be losing.'},
      {title: 'Subqueries and CTEs', detail: 'Breaking big questions into readable steps.'},
      {title: 'Window functions', detail: 'Running totals, rankings and period comparisons.'},
      {title: 'From query to answer', detail: 'Writing up results others can trust.'},
    ],
    prerequisites: ['Spreadsheets to Insight or equivalent comfort with tabular data'],
    schedule: 'Two live sessions a week (Tuesday and Thursday, 17:30-19:00 UTC) with weekly query reviews.',
    instructorId: 'priya',
    cycleOffset: 1,
  },
  {
    id: 'data-storytelling',
    title: 'Data Storytelling and Visualisation',
    subject: 'data',
    level: 'advanced',
    format: 'live',
    weeks: 8,
    hoursPerWeek: '6-8 hours',
    price: 980,
    summary: 'Design charts and written narratives that make analysis understandable, honest and hard to misread.',
    outcome: 'A published data story with three charts, a methods note and a stakeholder summary.',
    modules: [
      {title: 'Who is reading?', detail: 'Audience, decision and the one thing they must remember.'},
      {title: 'Chart choice', detail: 'Matching form to comparison, trend or distribution.'},
      {title: 'Clarity and colour', detail: 'Annotation, hierarchy and accessible palettes.'},
      {title: 'Uncertainty', detail: 'Showing ranges and limits without losing the reader.'},
      {title: 'Narrative structure', detail: 'Setup, tension and a clear takeaway.'},
      {title: 'Critique studio', detail: 'Peer review rounds on drafts.'},
      {title: 'Methods notes', detail: 'Explaining sources and caveats in plain language.'},
      {title: 'Publishing', detail: 'Final story, summary and presentation.'},
    ],
    prerequisites: ['SQL for Analysis or equivalent analysis experience', 'Comfortable with at least one charting tool'],
    schedule: 'One live studio a week (Wednesday, 18:00-20:00 UTC) plus small-group critique on Fridays.',
    instructorId: 'rafa',
    cycleOffset: 2,
  },
  {
    id: 'clear-writing',
    title: 'Clear Writing for Work',
    subject: 'writing',
    level: 'beginner',
    format: 'self-paced',
    weeks: 3,
    hoursPerWeek: '3-4 hours',
    price: 190,
    summary: 'Write emails, updates and documents that get read: structure first, then plain, confident sentences.',
    outcome: 'A rewritten set of your own work documents with before-and-after notes.',
    modules: [
      {title: 'Start with the point', detail: 'Leading with the ask and structuring for skimmers.'},
      {title: 'Plain language', detail: 'Shorter sentences, active voice and fewer hedges.'},
      {title: 'Editing yourself', detail: 'A three-pass method for any document.'},
    ],
    prerequisites: ['None'],
    schedule: 'Start any time. Three modules with exercises and one written edit of your work.',
    instructorId: 'august',
  },
  {
    id: 'ux-writing',
    title: 'UX Writing and Content Design',
    subject: 'writing',
    level: 'intermediate',
    format: 'live',
    weeks: 6,
    hoursPerWeek: '5-6 hours',
    price: 720,
    summary: 'Write interface copy that guides people: labels, errors, empty states and voice guidelines.',
    outcome: 'A content audit, a rewritten flow and a short voice-and-tone guide.',
    modules: [
      {title: 'Words are interface', detail: 'How copy shapes usability and trust.'},
      {title: 'Labels and actions', detail: 'Buttons, links and navigation people understand.'},
      {title: 'Errors and empty states', detail: 'Helpful, specific and kind.'},
      {title: 'Accessibility in copy', detail: 'Link text, alt text and reading level.'},
      {title: 'Voice and tone', detail: 'Writing a guide a team can follow.'},
      {title: 'Testing content', detail: 'Highlighter tests, comprehension checks and iteration.'},
    ],
    prerequisites: ['Clear Writing for Work or equivalent', 'Some exposure to digital products'],
    schedule: 'Two live sessions a week (Monday and Wednesday, 17:00-18:30 UTC) with weekly copy critiques.',
    instructorId: 'august',
    cycleOffset: 3,
  },
];

export function courseById(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}

export type LearningPath = {
  id: string;
  title: string;
  summary: string;
  courseIds: string[];
  tone: 'orange' | 'teal' | 'saffron';
};

export const learningPaths: LearningPath[] = [
  {
    id: 'design-path',
    title: 'Curious to product designer',
    summary: 'From your first interview to a documented component library, with critique at every step.',
    courseIds: ['design-foundations', 'ux-research', 'design-systems'],
    tone: 'orange',
  },
  {
    id: 'web-path',
    title: 'Front-end, browser up',
    summary: 'Hand-written HTML and CSS, then JavaScript, then a tested React app built accessibly from the start.',
    courseIds: ['html-css', 'javascript-essentials', 'react-apps'],
    tone: 'teal',
  },
  {
    id: 'data-path',
    title: 'Numbers into narratives',
    summary: 'Spreadsheets, then SQL, then charts and writing that help people make better decisions.',
    courseIds: ['spreadsheets-to-insight', 'sql-analysis', 'data-storytelling'],
    tone: 'saffron',
  },
];

export const faqs: {q: string; a: string}[] = [
  {
    q: 'Is Quillmark Academy a real school?',
    a: 'No. Quillmark Academy is a fictional concept demo designed and built by CraftLayer Studio. The courses, instructors, dates and prices are sample content, and no enrolment is possible.',
  },
  {
    q: 'What is the difference between a live cohort and self-paced?',
    a: 'Live cohorts start on a set date and meet online each week with a small group and an instructor. Self-paced courses start whenever you like, with recorded lessons and written feedback on set checkpoints.',
  },
  {
    q: 'How much time should I plan for each week?',
    a: 'Each course lists a weekly range, usually between three and nine hours including live sessions, reading and project work. The detail view for every course shows the expected rhythm.',
  },
  {
    q: 'Do I need to buy any software?',
    a: 'In this sample curriculum every course is designed around free tools or free tiers, and the detail view lists any setup you would need before starting.',
  },
  {
    q: 'Can I pay in instalments?',
    a: 'The sample pricing shows how a split into three monthly payments could be presented. In this demo there is no checkout and nothing can be paid.',
  },
  {
    q: 'What happens if I fall behind?',
    a: 'In the sample policy, live cohort learners can move once to a later cohort of the same course, and recordings of every session stay available for the length of the course.',
  },
];

export const CONTACT_EMAIL = 'hello@example.com';
