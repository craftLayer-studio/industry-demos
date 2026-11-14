import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {ChatIcon, FolderIcon, PencilIcon, UsersIcon} from './icons';
import styles from './academy.module.css';

const steps = [
  {
    icon: UsersIcon,
    title: 'Join a small cohort',
    body: 'Live courses start on a set Monday with up to 18 learners and one instructor. You meet the same people every week, so questions get easier to ask.',
  },
  {
    icon: PencilIcon,
    title: 'Make one real project',
    body: 'Every module moves a single project forward: a redesigned flow, a working app, a published data story. No disconnected quizzes.',
  },
  {
    icon: ChatIcon,
    title: 'Get written feedback weekly',
    body: 'Instructors annotate your work every week, and peers trade structured critique in small groups using a shared rubric.',
  },
  {
    icon: FolderIcon,
    title: 'Keep what you made',
    body: 'You finish with the project, your notes and a short write-up of the decisions you made, ready to show or keep building.',
  },
];

export function HowItWorks() {
  return (
    <SectionShell
      id="how"
      eyebrow="How learning works"
      title="Cohorts, projects and feedback, in that order"
      lead="The format is simple on purpose. A steady weekly rhythm leaves room for the part that actually teaches you: making something and hearing how to make it better.">
      <ol className={styles.howGrid}>
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <li key={s.title} className={styles.howItem}>
              <VStack gap={3}>
                <span className={styles.howBadge} aria-hidden>
                  <Icon />
                </span>
                <Text type="supporting" weight="semibold" className={styles.howStep}>
                  Step {i + 1}
                </Text>
                <Heading level={3} className={styles.howTitle}>
                  {s.title}
                </Heading>
                <Text as="p" color="secondary" textWrap="pretty">
                  {s.body}
                </Text>
              </VStack>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
