'use client';

import {useState} from 'react';
import {Badge} from '@astryxdesign/core/Badge';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {ServiceArt, type ArtKind} from './art';
import {Section} from './Section';
import {PROJECT_FILTERS, SAMPLE_PROJECTS, SERVICE_LABELS, filterProjects, type ProjectFilter, type SampleProject} from './lib/projects';
import styles from './keystone.module.css';

const ART: Record<SampleProject['art'], ArtKind> = {
  'rear-extension': 'extension',
  wrap: 'wrap',
  dormer: 'dormer',
  loft: 'loft',
  kitchen: 'kitchen',
  renovation: 'renovation',
};

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const list = filterProjects(SAMPLE_PROJECTS, filter);
  return (
    <Section
      id="projects"
      number="04"
      kicker="Sample projects"
      title="The kind of work Keystone would take on"
      lead="These are fictional example briefs to show scope and scale. They are not real homes, clients or finished jobs, and no outcomes are claimed.">
      <div className={styles.filterBar}>
        <div className={styles.filterScroll}>
          <div className={styles.filterInner}>
            <SegmentedControl label="Filter sample projects" value={filter} onChange={v => setFilter(v as ProjectFilter)} size="sm">
          {PROJECT_FILTERS.map(f => (
            <SegmentedControlItem key={f.value} value={f.value} label={f.label} />
              ))}
            </SegmentedControl>
          </div>
        </div>
        <p className={styles.filterCount} aria-live="polite">
          Showing {list.length} sample {list.length === 1 ? 'project' : 'projects'}
        </p>
      </div>
      <ul className={styles.projectGrid}>
        {list.map(p => (
          <li key={p.id}>
            <Card padding={0} className={styles.projectCard}>
              <div className={styles.projectArt}>
                <ServiceArt kind={ART[p.art]} id={`proj-${p.id}`} className={styles.serviceArt} />
                <span className={styles.projectStamp}>Fictional</span>
              </div>
              <div className={styles.projectBody}>
                <div className={styles.projectMeta}>
                  <Badge label={SERVICE_LABELS[p.service]} variant="neutral" />
                  <Badge label="Sample brief" variant="warning" />
                </div>
                <Heading level={3} className={styles.projectTitle}>
                  {p.title}
                </Heading>
                <p className={styles.projectProperty}>{p.property}</p>
                <p className={styles.bodyText}>{p.scope}</p>
                <dl className={styles.projectSpecs}>
                  <div>
                    <dt>Size</dt>
                    <dd>{p.size}</dd>
                  </div>
                  <div>
                    <dt>Programme</dt>
                    <dd>{p.plannedWeeks}</dd>
                  </div>
                </dl>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
