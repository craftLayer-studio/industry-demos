'use client';

import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {useAcademy} from './AcademyProvider';
import {courseById, learningPaths, levelLabel} from './lib/data';
import {formatPrice} from './lib/format';
import {ArrowIcon} from './icons';
import styles from './academy.module.css';

export function LearningPaths() {
  const {openCourse} = useAcademy();
  return (
    <SectionShell
      id="paths"
      variant="paper"
      eyebrow="Learning paths"
      title="Three curated sequences, if you would rather not choose alone"
      lead="Each path strings three courses together so every project builds on the last. Take them back to back or leave a gap between: the order is what matters.">
      <ol className={styles.pathGrid}>
        {learningPaths.map((path, index) => {
          const steps = path.courseIds.map(id => courseById(id)!);
          const weeks = steps.reduce((sum, c) => sum + c.weeks, 0);
          const total = steps.reduce((sum, c) => sum + c.price, 0);
          return (
            <li key={path.id} className={`${styles.pathCard} ${styles[`path_${path.tone}`]}`}>
              <VStack gap={4}>
                <Text type="label" weight="semibold" className={styles.pathNumber}>
                  Path {String(index + 1).padStart(2, '0')}
                </Text>
                <Heading level={3} className={styles.pathTitle}>
                  {path.title}
                </Heading>
                <Text as="p" color="secondary" textWrap="pretty">
                  {path.summary}
                </Text>
                <ol className={styles.pathSteps} aria-label={`Courses in ${path.title}`}>
                  {steps.map((c, i) => (
                    <li key={c.id}>
                      <span className={styles.pathStepIndex} aria-hidden>
                        {i + 1}
                      </span>
                      <button type="button" className={styles.pathStepButton} onClick={() => openCourse(c.id)}>
                        <span className={styles.pathStepTitle}>{c.title}</span>
                        <span className={styles.pathStepMeta}>
                          {levelLabel(c.level)} · {c.weeks} weeks
                        </span>
                        <ArrowIcon className={styles.pathStepArrow} />
                      </button>
                    </li>
                  ))}
                </ol>
                <Text type="supporting" color="secondary">
                  About {weeks} weeks in total · sample total {formatPrice(total)}
                </Text>
              </VStack>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
