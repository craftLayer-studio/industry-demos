import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {courses, instructors, subjectLabel} from './lib/data';
import styles from './academy.module.css';

function initials(name: string): string {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0])
    .join('');
}

const tones = ['orange', 'teal', 'saffron'] as const;

export function Instructors() {
  return (
    <SectionShell
      id="instructors"
      variant="paper"
      eyebrow="Instructors"
      title="The people reading your work"
      lead="Every instructor here is a fictional character written for this demo. Their portraits are illustrated initials, not photos of real people.">
      <ul className={styles.instructorGrid}>
        {instructors.map((p, i) => {
          const taught = courses.filter(c => c.instructorId === p.id);
          return (
            <li key={p.id} className={styles.instructorCard}>
              <VStack gap={4}>
                <HStack gap={4} vAlign="center">
                  <span className={`${styles.portrait} ${styles[`portrait_${tones[i % 3]}`]}`} aria-hidden>
                    <svg viewBox="0 0 64 64" focusable="false">
                      <circle cx="32" cy="32" r="30" />
                      <path d="M10 50c6-8 13-12 22-12s16 4 22 12" />
                    </svg>
                    <span>{initials(p.name)}</span>
                  </span>
                  <VStack gap={0.5}>
                    <Heading level={3} className={styles.instructorName}>
                      {p.name}
                    </Heading>
                    <Text type="supporting" color="secondary">
                      {p.role}
                    </Text>
                  </VStack>
                </HStack>
                <Text as="p" color="secondary" textWrap="pretty">
                  {p.bio}
                </Text>
                <Text type="supporting" className={styles.instructorCourses}>
                  Teaches {taught.length > 0 ? taught.map(c => c.title).join(', ') : p.teaches.map(subjectLabel).join(', ')}
                </Text>
              </VStack>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
