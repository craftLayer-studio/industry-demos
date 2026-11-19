/**
 * General, simplified descriptions of the eight-stage (0 to 7) sequence that
 * many UK practices use to organise a project. Written for this demo; not the
 * official stage definitions.
 */
export type DesignStage = {
  n: number;
  short: string;
  title: string;
  summary: string;
  outputs: string[];
  decisions: string[];
};

export const DESIGN_STAGES: DesignStage[] = [
  {
    n: 0,
    short: 'Strategy',
    title: 'Strategic definition',
    summary: 'Before any drawing: is a building the right answer? We test the idea against the site, the budget and what you actually need.',
    outputs: ['A short written case for the project', 'Early risks and unknowns listed', 'A first view of budget and programme'],
    decisions: ['Whether to proceed at all', 'Which options are worth studying'],
  },
  {
    n: 1,
    short: 'Brief',
    title: 'Preparation and briefing',
    summary: 'We turn ambitions into a written brief, gather surveys and site information, and agree who else needs to be on the team.',
    outputs: ['Project brief and room list', 'Measured survey and site appraisal', 'Consultant team and fee proposals'],
    decisions: ['The brief you will sign off', 'Budget and target timeline'],
  },
  {
    n: 2,
    short: 'Concept',
    title: 'Concept design',
    summary: 'Massing models, sketch plans and a few clear options. The big moves are fixed here, while change is still cheap.',
    outputs: ['Two or three design options', 'Massing model and sketch plans', 'Outline cost check'],
    decisions: ['Which concept to develop', 'Any pre-application advice to seek'],
  },
  {
    n: 3,
    short: 'Coordination',
    title: 'Spatial coordination',
    summary: 'The chosen design is developed and checked with engineers so structure, services and space agree. Often the point to apply for planning.',
    outputs: ['Coordinated plans, sections and elevations', 'Planning application drawings', 'Updated cost plan'],
    decisions: ['Approval of the developed design', 'Whether to submit for planning'],
  },
  {
    n: 4,
    short: 'Technical',
    title: 'Technical design',
    summary: 'Every junction, specification and schedule is drawn so a builder can price it accurately and build it as intended.',
    outputs: ['Construction drawings and details', 'Specification and schedules', 'Tender package'],
    decisions: ['Final finishes and fittings', 'Which builder to appoint'],
  },
  {
    n: 5,
    short: 'Build',
    title: 'Manufacturing and construction',
    summary: 'On site. We answer questions, inspect the work, review samples and keep the design intact as it meets reality.',
    outputs: ['Site visit reports', 'Instructions and clarifications', 'Valuation and progress checks'],
    decisions: ['Responses to changes on site', 'Sign-off of samples'],
  },
  {
    n: 6,
    short: 'Handover',
    title: 'Handover',
    summary: 'The building is finished, snagged and handed over with the information you need to run it.',
    outputs: ['Snagging list and close-out', 'Operation and maintenance information', 'As-built record'],
    decisions: ['Acceptance of the completed work', 'What happens in the defects period'],
  },
  {
    n: 7,
    short: 'In use',
    title: 'Use',
    summary: 'A return visit once you have lived or worked in the building, to learn what works and fix what does not.',
    outputs: ['Post-occupancy review', 'Seasonal tuning of heating and daylight', 'Lessons recorded'],
    decisions: ['Any adjustments worth making', 'What to keep for next time'],
  },
];
