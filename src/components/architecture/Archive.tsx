'use client';

import {useMemo, useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {Heading} from '@astryxdesign/core/Heading';
import {Selector} from '@astryxdesign/core/Selector';
import {ToggleButton, ToggleButtonGroup} from '@astryxdesign/core/ToggleButton';
import {SectionShell} from './SectionShell';
import {Axonometric} from './Axonometric';
import {ProjectDialog} from './ProjectDialog';
import {useStudio} from './StudioProvider';
import {projects, SECTORS, sectorLabel, TYPES, typeLabel, type Project, type ProjectType, type Sector} from './lib/projects';
import {
  archiveSummary,
  countByType,
  DEFAULT_ARCHIVE_FILTERS,
  drawingRef,
  filterProjects,
  isFiltered,
  type ArchiveFilters,
} from './lib/archive';
import styles from './ostrander.module.css';

const SECTOR_OPTIONS = [{value: 'all', label: 'All sectors'}, ...SECTORS];

export function Archive() {
  const {openProjectId, openProject, closeProject} = useStudio();
  const [filters, setFilters] = useState<ArchiveFilters>(DEFAULT_ARCHIVE_FILTERS);
  const results = useMemo(() => filterProjects(projects, filters), [filters]);
  const counts = useMemo(() => countByType(projects, filters.sector), [filters.sector]);

  const reset = () => setFilters(DEFAULT_ARCHIVE_FILTERS);

  return (
    <SectionShell
      id="work"
      index="01"
      eyebrow="Project archive"
      title="Twelve fictional studies, one grid."
      lead="Every project here is invented and drawn from a simple massing model, not photographed. Filter by type or sector, then open a sheet for the plan and the thinking behind it.">
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <p className={styles.filterLabel} id="type-filter-label">
            Type
          </p>
          <ToggleButtonGroup
            label="Filter by project type"
            type="single"
            value={filters.type}
            onChange={v => setFilters(f => ({...f, type: (typeof v === 'string' ? v : 'all') as ProjectType | 'all'}))}
            className={styles.typeToggles}>
            <ToggleButton value="all" label={`All, ${counts.all}`}>
              All <span className={styles.count}>{counts.all}</span>
            </ToggleButton>
            {TYPES.map(t => (
              <ToggleButton key={t.value} value={t.value} label={`${t.label}, ${counts[t.value]}`}>
                {t.label} <span className={styles.count}>{counts[t.value]}</span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <div className={styles.sectorField}>
          <Selector
            label="Sector"
            options={SECTOR_OPTIONS}
            value={filters.sector}
            onChange={v => setFilters(f => ({...f, sector: v as Sector | 'all'}))}
            width="100%"
          />
        </div>
      </div>

      <div className={styles.resultBar}>
        <p className={styles.resultCount} role="status" aria-live="polite" aria-atomic="true">
          {archiveSummary(results.length, filters)}
        </p>
        {isFiltered(filters) ? <Button label="Clear filters" variant="ghost" size="sm" onClick={reset} /> : null}
      </div>

      {results.length === 0 ? (
        <div className={styles.emptyBox}>
          <EmptyState
            title="Nothing on file for this combination"
            description="Try another type or sector. The archive is small because every study in it is invented for this demo."
            actions={<Button label="Clear filters" variant="primary" onClick={reset} />}
          />
        </div>
      ) : (
        <ul className={styles.projectGrid} aria-label="Fictional projects">
          {results.map(p => (
            <li key={p.id}>
              <ProjectCard project={p} onOpen={() => openProject(p.id)} />
            </li>
          ))}
        </ul>
      )}

      <ProjectDialog projectId={openProjectId} onClose={closeProject} />
    </SectionShell>
  );
}

function ProjectCard({project: p, onOpen}: {project: Project; onOpen: () => void}) {
  const ref = drawingRef(projects, p.id);
  return (
    <ClickableCard
      label={`${p.title}, ${typeLabel(p.type)}, ${sectorLabel(p.sector)}. Open drawing sheet`}
      onClick={onOpen}
      padding={0}
      className={styles.projectCard}>
      <div className={styles.projectArt}>
        <Axonometric volumes={p.massing} />
        <span className={styles.projectRef}>{ref}</span>
      </div>
      <div className={styles.projectBody}>
        <p className={styles.projectMeta}>
          {typeLabel(p.type)} / {sectorLabel(p.sector)}
        </p>
        <Heading level={3} className={styles.projectTitle}>
          {p.title}
        </Heading>
        <p className={styles.projectSummary}>{p.summary}</p>
      </div>
    </ClickableCard>
  );
}
