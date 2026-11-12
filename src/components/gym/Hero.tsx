'use client';

import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {HeroArt} from './Art';
import {programmes, schedule, trainers} from './data';
import styles from './gym.module.css';

const ticker = ['Strength', 'Conditioning', 'Boxing', 'Mobility', 'Engine', 'Foundations'];

export function Hero() {
  // Facts are derived from the demo's own data, not invented metrics.
  const facts = [
    {value: String(schedule.length), label: 'Coached classes a week'},
    {value: String(programmes.length), label: 'Programmes'},
    {value: String(trainers.length), label: 'Coaches'},
    {value: '05:30', label: 'Doors open on weekdays'},
  ];
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HStack className={`${styles.wrap} ${styles.heroGrid}`}>
        <VStack gap={5} className={styles.heroCopy}>
          <Text type="code" className={styles.eyebrow}>
            Strength and conditioning club / Calder City
          </Text>
          <h1 id="hero-title" className={styles.heroTitle}>
            <span className={styles.heroLine}>Train</span>{' '}
            <span className={styles.heroLine}>like it</span>{' '}
            <span className={`${styles.heroLine} ${styles.heroAccent}`}>matters.</span>
          </h1>
          <Text as="p" type="large" color="secondary" className={styles.heroLede}>
            Coached strength, conditioning, boxing and mobility under one industrial roof. Your first class is on us,
            and a coach will meet you at the door.
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button href="#trial" variant="primary" size="lg" label="Book a free trial" />
            <Button href="#schedule" variant="secondary" size="lg" label="See the timetable" />
          </HStack>
        </VStack>
        <figure className={styles.heroFigure}>
          <HeroArt />
        </figure>
      </HStack>
      <VStack className={styles.wrap}>
        <dl className={styles.facts}>
          {facts.map(f => (
            <VStack key={f.label} gap={1} className={styles.fact}>
              <dt className={styles.factLabel}>{f.label}</dt>
              <dd className={styles.factValue}>{f.value}</dd>
            </VStack>
          ))}
        </dl>
      </VStack>
      <p className={styles.ticker} aria-hidden="true">
        <span className={styles.tickerTrack}>
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className={styles.tickerItem}>
              {t}
            </span>
          ))}
        </span>
      </p>
    </section>
  );
}
