'use client';

import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {programmes, schedule} from './data';
import {goToSection, useGymState} from './GymState';
import {defaultFilters} from './schedule';
import {SectionIntro} from './SectionIntro';
import styles from './gym.module.css';

export function Programmes() {
  const {setFilters} = useGymState();
  return (
    <section id="programmes" aria-labelledby="programmes-title" className={styles.section} tabIndex={-1}>
      <VStack gap={8} className={styles.wrap}>
        <SectionIntro index="01" eyebrow="Programmes" id="programmes-title" title="Six ways to get stronger">
          Every class is coached, capped at 14 people and built to fit around the others, so you can mix programmes
          without overdoing it.
        </SectionIntro>
        <ol className={styles.programmeGrid}>
          {programmes.map((p, i) => {
            const count = schedule.filter(c => c.programme === p.id).length;
            return (
              <li key={p.id} className={styles.programme}>
                <VStack gap={3} className={styles.programmeInner}>
                  <Text type="code" className={styles.programmeIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </Text>
                  <Heading level={3} className={styles.programmeName}>
                    {p.name}
                  </Heading>
                  <Text as="p" weight="semibold" className={styles.programmeTagline}>
                    {p.tagline}
                  </Text>
                  <Text as="p" color="secondary">
                    {p.description}
                  </Text>
                  <ul className={styles.focusList} aria-label={`${p.name} focus areas`}>
                    {p.focus.map(f => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <HStack className={styles.programmeAction}>
                  <Button
                    variant="secondary"
                    label={`See ${count} ${p.name} ${count === 1 ? 'class' : 'classes'}`}
                    onClick={() => {
                      setFilters({...defaultFilters, programme: p.id});
                      goToSection('schedule');
                    }}
                  />
                  </HStack>
                </VStack>
              </li>
            );
          })}
        </ol>
      </VStack>
    </section>
  );
}
