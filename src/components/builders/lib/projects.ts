/** Sample (fictional) project cards for the Keystone Build Co. demo. */

export type ServiceKey = 'extensions' | 'lofts' | 'kitchens' | 'renovations';
export type ProjectFilter = 'all' | ServiceKey;

export type SampleProject = {
  id: string;
  service: ServiceKey;
  title: string;
  property: string;
  scope: string;
  size: string;
  plannedWeeks: string;
  art: 'rear-extension' | 'loft' | 'kitchen' | 'wrap' | 'renovation' | 'dormer';
};

export const SERVICE_LABELS: Record<ServiceKey, string> = {
  extensions: 'Extension',
  lofts: 'Loft conversion',
  kitchens: 'Kitchen',
  renovations: 'Renovation',
};

export const PROJECT_FILTERS: {value: ProjectFilter; label: string}[] = [
  {value: 'all', label: 'All'},
  {value: 'extensions', label: 'Extensions'},
  {value: 'lofts', label: 'Lofts'},
  {value: 'kitchens', label: 'Kitchens'},
  {value: 'renovations', label: 'Renovations'},
];

export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    id: 'rear-terrace',
    service: 'extensions',
    title: 'Single-storey rear extension',
    property: 'Victorian mid-terrace (sample)',
    scope: 'Open the back wall, add a flat-roof extension with a roof lantern and bifold doors.',
    size: '22 m² footprint',
    plannedWeeks: '12 to 15 weeks planned',
    art: 'rear-extension',
  },
  {
    id: 'wrap-semi',
    service: 'extensions',
    title: 'Wrap-around extension',
    property: '1930s semi-detached (sample)',
    scope: 'Side return and rear infill combined into one L-shaped kitchen and dining space.',
    size: '34 m² footprint',
    plannedWeeks: '16 to 20 weeks planned',
    art: 'wrap',
  },
  {
    id: 'dormer-loft',
    service: 'lofts',
    title: 'Rear dormer loft conversion',
    property: 'End-of-terrace (sample)',
    scope: 'Full-width dormer with a double bedroom, shower room and a new staircase.',
    size: '28 m² new floor area',
    plannedWeeks: '8 to 11 weeks planned',
    art: 'dormer',
  },
  {
    id: 'velux-loft',
    service: 'lofts',
    title: 'Roof-light loft room',
    property: 'Detached bungalow (sample)',
    scope: 'Insulate and board the roof void, add four roof lights and a fixed stair.',
    size: '19 m² new floor area',
    plannedWeeks: '6 to 8 weeks planned',
    art: 'loft',
  },
  {
    id: 'kitchen-knock',
    service: 'kitchens',
    title: 'Knock-through kitchen',
    property: '1960s townhouse (sample)',
    scope: 'Remove a load-bearing wall with a steel beam and fit a new kitchen with an island.',
    size: '18 m² room',
    plannedWeeks: '5 to 7 weeks planned',
    art: 'kitchen',
  },
  {
    id: 'whole-house',
    service: 'renovations',
    title: 'Whole-house renovation',
    property: 'Edwardian semi (sample)',
    scope: 'Rewire, replumb, new heating, replastering and a reworked ground-floor layout.',
    size: '3 floors',
    plannedWeeks: '20 to 26 weeks planned',
    art: 'renovation',
  },
];

export function filterProjects(projects: SampleProject[], filter: ProjectFilter): SampleProject[] {
  return filter === 'all' ? projects : projects.filter(p => p.service === filter);
}

export function countByService(projects: SampleProject[]): Record<ProjectFilter, number> {
  const counts: Record<ProjectFilter, number> = {all: projects.length, extensions: 0, lofts: 0, kitchens: 0, renovations: 0};
  for (const p of projects) counts[p.service] += 1;
  return counts;
}
