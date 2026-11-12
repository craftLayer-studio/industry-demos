'use client';

import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {Token} from '@astryxdesign/core/Token';
import {VStack} from '@astryxdesign/core/VStack';
import {Portrait} from './Art';
import {trainers} from './data';
import {programmeName} from './schedule';
import {SectionIntro} from './SectionIntro';
import styles from './gym.module.css';

export function Coaches() {
  return (
    <section id="coaches" aria-labelledby="coaches-title" className={`${styles.section} ${styles.sectionAlt}`} tabIndex={-1}>
      <VStack gap={8} className={styles.wrap}>
        <SectionIntro index="02" eyebrow="Coaches" id="coaches-title" title="Coaches who write it down">
          Every coach programmes on paper before they coach on the floor. Portraits are illustrations: these people are
          fictional, like the gym.
        </SectionIntro>
        <ul className={styles.coachGrid}>
          {trainers.map((t, i) => (
            <li key={t.id}>
              <article className={styles.coach} aria-labelledby={`coach-${t.id}`}>
                <figure className={styles.coachFigure}>
                  <Portrait initials={t.initials} name={t.name} tone={(i % 4) as 0 | 1 | 2 | 3} />
                </figure>
                <VStack gap={2} className={styles.coachBody}>
                  <Text type="code" className={styles.coachRole}>
                    {t.role}
                  </Text>
                  <Heading level={3} id={`coach-${t.id}`} className={styles.coachName}>
                    {t.name}
                  </Heading>
                  <Text as="p" color="secondary">
                    {t.bio}
                  </Text>
                  <HStack gap={1} wrap="wrap" className={styles.tokens}>
                    {t.specialties.map(s => (
                      <Token key={s} label={s} size="sm" />
                    ))}
                    {t.programmes.map(p => (
                      <Token key={p} label={programmeName(p)} size="sm" color="gray" />
                    ))}
                  </HStack>
                </VStack>
              </article>
            </li>
          ))}
        </ul>
      </VStack>
    </section>
  );
}
