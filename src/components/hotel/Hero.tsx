import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {HeroScene} from './art';
import {StaySearch} from './StaySearch';
import styles from './saltmarsh.module.css';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <Text as="p" className={styles.eyebrow}>
            Wrenmouth estuary · six rooms by the sea
          </Text>
          <Heading level={1} id="hero-heading" textWrap="balance" className={styles.heroTitle}>
            A quiet hotel where the marsh <em>meets the sea</em>.
          </Heading>
          <Text as="p" type="large" color="secondary" textWrap="pretty" className={styles.heroLead}>
            Limewashed rooms, a kitchen that cooks what the tide and the garden bring, and a seaweed spa in the old net
            store. Choose your dates to see sample availability.
          </Text>
        </div>
        <div className={styles.heroArtWrap}>
          <HeroScene />
        </div>
        <div className={styles.heroSearchWrap}>
          <StaySearch />
        </div>
      </div>
    </section>
  );
}
