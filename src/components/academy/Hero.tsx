import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {HeroArt} from './HeroArt';
import {ChatIcon, ClockIcon, UsersIcon, Squiggle} from './icons';
import styles from './academy.module.css';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <VStack gap={6} className={styles.heroCopy}>
          <Text type="label" weight="semibold" className={styles.eyebrow}>
            Cohort-based courses in practical digital skills
          </Text>
          <Heading level={1} id="hero-heading" className={styles.heroTitle} textWrap="balance">
            Learn by making, together with{' '}
            <span className={styles.underlined}>
              people
              <Squiggle className={styles.squiggle} />
            </span>{' '}
            who care about craft.
          </Heading>
          <Text type="large" as="p" color="secondary" textWrap="pretty" className={styles.heroLead}>
            Quillmark Academy teaches product design, web development, data analysis and writing through small live
            cohorts and self-paced courses. Every course is built around one real project, with an instructor reading
            your work each week.
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button href="#courses" label="Browse courses" variant="primary" size="lg" />
            <Button href="#enquire" label="Request enrolment info" variant="secondary" size="lg" />
          </HStack>
          <ul className={styles.factList} aria-label="At a glance">
            <li>
              <UsersIcon />
              Live cohorts of up to 18 learners
            </li>
            <li>
              <ChatIcon />
              Written feedback every week
            </li>
            <li>
              <ClockIcon />
              Courses from 3 to 10 weeks
            </li>
          </ul>
        </VStack>
        <div className={styles.heroArtWrap}>
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
