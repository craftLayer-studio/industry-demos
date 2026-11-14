'use client';

import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Skeleton} from '@astryxdesign/core/Skeleton';
import {SectionShell} from './SectionShell';
import {useAcademy} from './AcademyProvider';
import {courseById, courses, instructorById, levelLabel, subjectLabel} from './lib/data';
import {cohortCalendar, formatDay, formatLongDate, formatMonth, groupByMonth} from './lib/cohorts';
import styles from './academy.module.css';

const WEEKS_AHEAD = 4;

export function CohortCalendar() {
  const {today, openCourse, enquire} = useAcademy();
  const groups = today ? groupByMonth(cohortCalendar(courses, today, WEEKS_AHEAD)) : null;

  return (
    <SectionShell
      id="cohorts"
      eyebrow="Upcoming cohorts"
      title="The next start for every live course"
      lead="Live cohorts start on Mondays and run on a fixed four-week cycle, so each course comes round once a month. These are sample dates, worked out in your browser from that cycle.">
      <div className={styles.calendar}>
        {groups === null ? (
          <VStack gap={3} aria-hidden>
            {[0, 1, 2, 3].map(i => (
              <Skeleton key={i} height={64} radius={3} index={i} />
            ))}
          </VStack>
        ) : (
          groups.map(group => (
            <section key={group.month} aria-labelledby={`month-${group.month}`} className={styles.calendarMonth}>
              <h3 id={`month-${group.month}`} className={styles.calendarMonthTitle}>
                {formatMonth(group.month)}
              </h3>
              <ul className={styles.calendarList}>
                {group.starts.map(s => {
                  const course = courseById(s.courseId)!;
                  const day = formatDay(s.date);
                  const instructor = instructorById(course.instructorId);
                  return (
                    <li key={`${s.courseId}-${s.date}`} className={styles.calendarRow}>
                      <time dateTime={s.date} className={styles.calendarDate} aria-label={formatLongDate(s.date)}>
                        <span className={styles.calendarDay}>{day.day}</span>
                        <span className={styles.calendarWeekday}>{day.weekday}</span>
                      </time>
                      <VStack gap={0.5} className={styles.calendarInfo}>
                        <Text weight="semibold" className={styles.calendarCourse}>
                          {course.title}
                        </Text>
                        <Text type="supporting" color="secondary">
                          {subjectLabel(course.subject)} · {levelLabel(course.level)} · {course.weeks} weeks
                          {instructor ? ` · with ${instructor.name}` : ''}
                        </Text>
                      </VStack>
                      <div className={styles.calendarActions}>
                        <Button
                          label={`Details: ${course.title}, starting ${formatLongDate(s.date)}`}
                          size="sm"
                          variant="ghost"
                          onClick={() => openCourse(course.id)}>
                          Details
                        </Button>
                        <Button
                          label={`Enquire about ${course.title}`}
                          size="sm"
                          variant="secondary"
                          onClick={() => enquire(course.id)}>
                          Enquire
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        )}
        <Text as="p" type="supporting" color="secondary" className={styles.calendarNote}>
          Self-paced courses are not listed here: you can start those on any day.
        </Text>
      </div>
    </SectionShell>
  );
}
