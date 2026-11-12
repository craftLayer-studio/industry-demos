'use client';

import {Button} from '@astryxdesign/core/Button';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {Selector} from '@astryxdesign/core/Selector';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {days, intensities, programmes, schedule, type DayId, type Intensity, type ProgrammeId} from './data';
import {useGymState} from './GymState';
import {
  ALL,
  coachName,
  defaultFilters,
  endTime,
  filterClasses,
  groupByDay,
  isFiltered,
  programmeName,
  resultSummary,
} from './schedule';
import {SectionIntro} from './SectionIntro';
import styles from './gym.module.css';

const dayOptions = [{value: ALL, label: 'Any day'}, ...days.map(d => ({value: d.id, label: d.long}))];
const programmeOptions = [{value: ALL, label: 'All programmes'}, ...programmes.map(p => ({value: p.id, label: p.name}))];
const intensityOptions = [{value: ALL, label: 'Any intensity'}, ...intensities.map(i => ({value: i.id, label: i.label}))];

function IntensityMeter({intensity}: {intensity: Intensity}) {
  const meta = intensities.find(i => i.id === intensity)!;
  return (
    <span className={styles.meter}>
      <span className={styles.meterBars} aria-hidden="true">
        {[1, 2, 3].map(n => (
          <span key={n} className={n <= meta.level ? styles.meterOn : styles.meterOff} />
        ))}
      </span>
      <span>{meta.label} intensity</span>
    </span>
  );
}

export function Schedule() {
  const {filters, setFilters, requestClass} = useGymState();
  const results = filterClasses(schedule, filters);
  const groups = groupByDay(results);

  return (
    <section id="schedule" aria-labelledby="schedule-title" className={`${styles.section} ${styles.sectionAlt}`} tabIndex={-1}>
      <VStack gap={8} className={styles.wrap}>
        <SectionIntro index="04" eyebrow="Timetable" id="schedule-title" title="This week on the floor">
          Filter by day, programme or intensity, then book a free trial straight from any class.
        </SectionIntro>

        <VStack gap={4} className={styles.filterPanel}>
          <form
            className={styles.filters}
            aria-label="Filter the timetable"
            onSubmit={e => e.preventDefault()}
          >
            <Selector
              label="Day"
              options={dayOptions}
              value={filters.day}
              onChange={v => setFilters({...filters, day: (v ?? ALL) as DayId | typeof ALL})}
              width="100%"
            />
            <Selector
              label="Programme"
              options={programmeOptions}
              value={filters.programme}
              onChange={v => setFilters({...filters, programme: (v ?? ALL) as ProgrammeId | typeof ALL})}
              width="100%"
            />
            <Selector
              label="Intensity"
              options={intensityOptions}
              value={filters.intensity}
              onChange={v => setFilters({...filters, intensity: (v ?? ALL) as Intensity | typeof ALL})}
              width="100%"
            />
            <Button
              label="Reset filters"
              variant="ghost"
              isDisabled={!isFiltered(filters)}
              onClick={() => setFilters(defaultFilters)}
            />
          </form>
          <Text as="p" type="code" className={styles.resultCount} role="status" aria-live="polite">
            {resultSummary(results.length, filters)}
          </Text>
        </VStack>

        {groups.length === 0 ? (
          <section className={styles.emptyWrap} aria-label="No matching classes">
            <EmptyState
              title="Nothing on the floor for that combination"
              description="Try another day or intensity, or reset the filters to see the full week."
              actions={<Button label="Show the full week" variant="primary" onClick={() => setFilters(defaultFilters)} />}
            />
          </section>
        ) : (
          <VStack gap={6}>
            {groups.map(group => (
              <section key={group.day.id} aria-labelledby={`day-${group.day.id}`} className={styles.dayGroup}>
                <Heading level={3} id={`day-${group.day.id}`} className={styles.dayTitle}>
                  {group.day.long}
                </Heading>
                <ul className={styles.classList}>
                  {group.classes.map(c => (
                    <li key={c.id} className={styles.classRow}>
                      <p className={styles.classTime}>
                        <time>{c.start}</time>
                        <span className={styles.classEnd}>
                          to <time>{endTime(c.start, c.minutes)}</time>
                        </span>
                      </p>
                      <VStack gap={0.5} className={styles.classMain}>
                        <Text weight="semibold" className={styles.className}>
                          {c.name}
                        </Text>
                        <Text type="supporting">
                          {programmeName(c.programme)} with {coachName(c.coach)}, {c.minutes} min
                        </Text>
                      </VStack>
                      <Text type="supporting" className={styles.classIntensity}>
                        <IntensityMeter intensity={c.intensity} />
                      </Text>
                      <HStack className={styles.classAction}>
                        <Button
                          size="sm"
                          variant="secondary"
                          label={`Try this class: ${c.name}, ${group.day.long} ${c.start}`}
                          onClick={() => requestClass(c.id)}
                        >
                          Try this class
                        </Button>
                      </HStack>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </VStack>
        )}
      </VStack>
    </section>
  );
}
