import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {HeroArt} from './art';
import styles from './salon.module.css';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <VStack gap={6} className={styles.heroCopy}>
          <Text type="label" className={styles.eyebrow}>
            Hair · Colour · Skin · Spa
          </Text>
          <Heading level={1} id="hero-heading" className={styles.heroTitle}>
            Slow beauty, <em>rooted</em> in calm.
          </Heading>
          <Text type="large" color="secondary" as="p" textWrap="pretty" className={styles.heroLead}>
            Fernlight is a fictional hair, skin and spa studio: unhurried appointments, quiet rooms and specialists
            who listen first. Explore the menu, meet the team, and try the appointment request.
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button href="#book" label="Request an appointment" variant="primary" size="lg" />
            <Button href="#services" label="View services" variant="secondary" size="lg" />
          </HStack>
          <ul className={styles.heroFacts} aria-label="Studio basics">
            <li>
              <span className={styles.heroFactLabel}>Open</span> Tuesday to Sunday
            </li>
            <li>
              <span className={styles.heroFactLabel}>Closed</span> Mondays
            </li>
            <li>
              <span className={styles.heroFactLabel}>Prices</span> Sample only
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
