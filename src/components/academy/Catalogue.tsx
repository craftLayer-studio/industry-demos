'use client';

import {useMemo, useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Selector} from '@astryxdesign/core/Selector';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {SectionShell} from './SectionShell';
import {useAcademy} from './AcademyProvider';
import {courses, formatLabel, levelLabel, levels, subjectLabel, subjects, type Course} from './lib/data';
import {
  DEFAULT_FILTERS,
  activeFilterCount,
  durationBuckets,
  queryCatalogue,
  resultSummary,
  sortOptions,
  type CatalogueFilters,
  type SortKey,
} from './lib/catalogue';
import {formatPrice} from './lib/format';
import {SearchIcon} from './icons';
import styles from './academy.module.css';

const allOption = (label: string) => ({value: 'all', label});

export function Catalogue() {
  const [filters, setFilters] = useState<CatalogueFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortKey>('recommended');
  const results = useMemo(() => queryCatalogue(courses, filters, sort), [filters, sort]);
  const active = activeFilterCount(filters);

  function update<K extends keyof CatalogueFilters>(key: K, value: CatalogueFilters[K]) {
    setFilters(f => ({...f, [key]: value}));
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
    document.getElementById('catalogue-search')?.querySelector('input')?.focus();
  }

  return (
    <SectionShell
      id="courses"
      eyebrow="Course catalogue"
      title="Twelve courses, each built around one real project"
      lead="Search by topic, tool or instructor, then narrow by subject, level, format and length. Open any course to see its modules, schedule and prerequisites.">
      <VStack gap={6}>
        <Card padding={4} className={styles.filterCard}>
          <form role="search" aria-label="Course catalogue" onSubmit={e => e.preventDefault()}>
            <VStack gap={4}>
              <div id="catalogue-search">
                <TextInput
                  label="Search courses"
                  type="search"
                  placeholder="Try “SQL”, “accessibility” or “Priya”"
                  value={filters.query}
                  onChange={v => update('query', v)}
                  hasClear
                  startIcon={SearchIcon}
                  width="100%"
                />
              </div>
              <div className={styles.filterGrid}>
                <Selector
                  label="Subject"
                  options={[allOption('All subjects'), ...subjects.map(s => ({value: s.id, label: s.label}))]}
                  value={filters.subject}
                  onChange={v => update('subject', v as CatalogueFilters['subject'])}
                  width="100%"
                />
                <Selector
                  label="Level"
                  options={[allOption('All levels'), ...levels.map(l => ({value: l.id, label: l.label}))]}
                  value={filters.level}
                  onChange={v => update('level', v as CatalogueFilters['level'])}
                  width="100%"
                />
                <Selector
                  label="Duration"
                  options={[allOption('Any length'), ...durationBuckets.map(d => ({value: d.id, label: d.label}))]}
                  value={filters.duration}
                  onChange={v => update('duration', v as CatalogueFilters['duration'])}
                  width="100%"
                />
                <Selector
                  label="Sort by"
                  options={sortOptions.map(s => ({value: s.id, label: s.label}))}
                  value={sort}
                  onChange={v => setSort(v as SortKey)}
                  width="100%"
                />
              </div>
              <VStack gap={2}>
                <Text type="label" weight="semibold">
                  Format
                </Text>
                <div className={styles.segmentWrap}>
                  <SegmentedControl
                    label="Format"
                    size="sm"
                    value={filters.format}
                    onChange={v => update('format', v as CatalogueFilters['format'])}>
                    <SegmentedControlItem value="all" label="Any" />
                    <SegmentedControlItem value="live" label="Live" />
                    <SegmentedControlItem value="self-paced" label="Self-paced" />
                  </SegmentedControl>
                </div>
              </VStack>
            </VStack>
          </form>
        </Card>

        <HStack gap={3} vAlign="center" justify="between" wrap="wrap" className={styles.resultBar}>
          <p className={styles.resultCount} role="status" aria-live="polite" aria-atomic="true">
            {resultSummary(results.length, courses.length)}
            {active > 0 ? ` ${active} ${active === 1 ? 'filter' : 'filters'} applied.` : ''}
          </p>
          {active > 0 ? <Button label="Clear filters" variant="ghost" size="sm" onClick={clearFilters} /> : null}
        </HStack>

        {results.length === 0 ? (
          <Card padding={8} className={styles.emptyCard}>
            <EmptyState
              title="No courses match these filters"
              description="Try a shorter search, or widen the subject, level, format or length."
              icon={<SearchIcon className={styles.emptyIcon} />}
              actions={<Button label="Clear filters" variant="primary" onClick={clearFilters} />}
            />
          </Card>
        ) : (
          <ul className={styles.courseGrid} aria-label="Courses">
            {results.map(course => (
              <li key={course.id}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        )}
      </VStack>
    </SectionShell>
  );
}

function CourseCard({course}: {course: Course}) {
  const {openCourse, enquire} = useAcademy();
  return (
    <Card padding={0} className={`${styles.courseCard} ${styles[`tone_${course.subject}`]}`}>
      <VStack gap={4} className={styles.courseBody}>
        <HStack gap={2} vAlign="center" justify="between" wrap="wrap">
          <Text type="label" weight="semibold" className={styles.subjectTag}>
            {subjectLabel(course.subject)}
          </Text>
          <Text type="supporting" color="secondary">
            {formatLabel(course.format)}
          </Text>
        </HStack>
        <VStack gap={2}>
          <Heading level={3} className={styles.courseTitle}>
            {course.title}
          </Heading>
          <Text as="p" color="secondary" textWrap="pretty">
            {course.summary}
          </Text>
        </VStack>
        <dl className={styles.courseMeta}>
          <div>
            <dt>Level</dt>
            <dd>{levelLabel(course.level)}</dd>
          </div>
          <div>
            <dt>Length</dt>
            <dd>{course.weeks} weeks</dd>
          </div>
          <div>
            <dt>Sample price</dt>
            <dd>{formatPrice(course.price)}</dd>
          </div>
        </dl>
      </VStack>
      <HStack gap={2} wrap="wrap" className={styles.courseActions}>
        <Button label={`View details: ${course.title}`} variant="secondary" onClick={() => openCourse(course.id)}>
          View details
        </Button>
        <Button label={`Enquire about ${course.title}`} variant="ghost" onClick={() => enquire(course.id)}>
          Enquire
        </Button>
      </HStack>
    </Card>
  );
}
