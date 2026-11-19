/** Pure filtering for the project archive. */
import {sectorLabel, typeLabel, type Project, type ProjectType, type Sector} from './projects';

export type ArchiveFilters = {type: ProjectType | 'all'; sector: Sector | 'all'};

export const DEFAULT_ARCHIVE_FILTERS: ArchiveFilters = {type: 'all', sector: 'all'};

export function matchesArchive(p: Project, f: ArchiveFilters): boolean {
  if (f.type !== 'all' && p.type !== f.type) return false;
  if (f.sector !== 'all' && p.sector !== f.sector) return false;
  return true;
}

export function filterProjects(list: readonly Project[], f: ArchiveFilters): Project[] {
  return list.filter(p => matchesArchive(p, f));
}

/**
 * How many projects each type would show with the current sector filter, so
 * the type control can show honest counts and never leads to a dead end
 * without saying so.
 */
export function countByType(list: readonly Project[], sector: ArchiveFilters['sector']): Record<ProjectType | 'all', number> {
  const counts: Record<ProjectType | 'all', number> = {all: 0, residential: 0, extension: 0, commercial: 0, interior: 0};
  for (const p of list) {
    if (sector !== 'all' && p.sector !== sector) continue;
    counts.all += 1;
    counts[p.type] += 1;
  }
  return counts;
}

export function isFiltered(f: ArchiveFilters): boolean {
  return f.type !== 'all' || f.sector !== 'all';
}

export function archiveSummary(count: number, f: ArchiveFilters): string {
  const kind = f.type !== 'all' ? `${typeLabel(f.type).toLowerCase()} ` : '';
  const where = f.sector !== 'all' ? ` in ${sectorLabel(f.sector).toLowerCase()}` : '';
  if (count === 0) return `No fictional ${kind}projects${where} match these filters.`;
  return `Showing ${count} fictional ${kind}${count === 1 ? 'project' : 'projects'}${where}.`;
}

/** Two-digit index numbers used as drawing references, e.g. "OS-04". */
export function drawingRef(list: readonly Project[], id: string): string {
  const i = list.findIndex(p => p.id === id);
  return `OS-${String(i + 1).padStart(2, '0')}`;
}
