'use client';

import {Dialog, DialogHeader} from '@astryxdesign/core/Dialog';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Avatar} from '@astryxdesign/core/Avatar';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {courseById, formatLabel, instructorById, levelLabel, subjectLabel} from './lib/data';
import {formatLongDate, upcomingStarts} from './lib/cohorts';
import {formatPrice, instalment} from './lib/format';
import {useAcademy} from './AcademyProvider';
import styles from './academy.module.css';

/** Course detail: curriculum, schedule, sample price and prerequisites. */
export function CourseDialog({courseId, onClose}: {courseId: string | null; onClose: () => void}) {
  const course = courseId ? courseById(courseId) : undefined;
  return (
    <Dialog
      isOpen={Boolean(course)}
      onOpenChange={open => {
        if (!open) onClose();
      }}
      width={760}
      maxHeight="88dvh"
      padding={0}>
      {course ? <CourseDialogBody courseId={course.id} onClose={onClose} /> : <span />}
    </Dialog>
  );
}

function CourseDialogBody({courseId, onClose}: {courseId: string; onClose: () => void}) {
  const {today, enquire} = useAcademy();
  const course = courseById(courseId)!;
  const instructor = instructorById(course.instructorId);
  const starts = today ? upcomingStarts(course, today, 3) : [];

  return (
    <>
      <DialogHeader
        className={styles.dialogHeader}
        title={course.title}
        subtitle={`${subjectLabel(course.subject)} · ${levelLabel(course.level)} · ${formatLabel(course.format)}`}
        onOpenChange={open => {
          if (!open) onClose();
        }}
      />
      <VStack gap={6} className={styles.dialogBody}>
        <Text as="p" type="large" textWrap="pretty">
          {course.summary}
        </Text>

        <MetadataList columns="multi">
          <MetadataListItem label="Length">{course.weeks} weeks</MetadataListItem>
          <MetadataListItem label="Weekly time">{course.hoursPerWeek}</MetadataListItem>
          <MetadataListItem label="Sample price">
            {formatPrice(course.price)} or 3 × {formatPrice(instalment(course.price))}
          </MetadataListItem>
          <MetadataListItem label="Format">{formatLabel(course.format)}</MetadataListItem>
        </MetadataList>

        <section aria-labelledby="dlg-schedule" className={styles.dialogBlock}>
          <Heading level={3} id="dlg-schedule" className={styles.dialogHeading}>
            Schedule
          </Heading>
          <Text as="p" color="secondary">
            {course.schedule}
          </Text>
          {course.format === 'live' ? (
            starts.length > 0 ? (
              <ul className={styles.startList} aria-label="Next sample cohort starts">
                {starts.map(d => (
                  <li key={d}>{formatLongDate(d)}</li>
                ))}
              </ul>
            ) : (
              <Text as="p" color="secondary">
                Loading sample cohort dates…
              </Text>
            )
          ) : null}
        </section>

        <section aria-labelledby="dlg-curriculum" className={styles.dialogBlock}>
          <Heading level={3} id="dlg-curriculum" className={styles.dialogHeading}>
            Curriculum: {course.modules.length} modules
          </Heading>
          <ol className={styles.moduleList}>
            {course.modules.map(m => (
              <li key={m.title}>
                <span className={styles.moduleTitle}>{m.title}</span>
                <span className={styles.moduleDetail}>{m.detail}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="dlg-outcome" className={styles.dialogBlock}>
          <Heading level={3} id="dlg-outcome" className={styles.dialogHeading}>
            What you make
          </Heading>
          <Text as="p" color="secondary">
            {course.outcome}
          </Text>
        </section>

        <section aria-labelledby="dlg-prereq" className={styles.dialogBlock}>
          <Heading level={3} id="dlg-prereq" className={styles.dialogHeading}>
            Prerequisites
          </Heading>
          <ul className={styles.bulletList}>
            {course.prerequisites.map(p => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        {instructor ? (
          <HStack gap={3} vAlign="center" className={styles.dialogInstructor}>
            <Avatar name={instructor.name} alt="" size={48} tooltip={false} />
            <VStack gap={0.5}>
              <Text weight="semibold">Led by {instructor.name}</Text>
              <Text type="supporting" color="secondary">
                Fictional instructor · {instructor.role}
              </Text>
            </VStack>
          </HStack>
        ) : null}
      </VStack>
      <HStack gap={3} justify="end" wrap="wrap" className={styles.dialogFooter}>
        <Button label="Close" variant="secondary" onClick={onClose} />
        <Button label="Enquire about this course" variant="primary" onClick={() => enquire(course.id)} />
      </HStack>
    </>
  );
}
