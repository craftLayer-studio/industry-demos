import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {BarnScene} from './art';
import {spaces} from './lib/data';
import styles from './hollin.module.css';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <VStack gap={6} className={styles.heroCopy}>
          <Text as="p" className={styles.heroKicker}>
            Countryside weddings · A fictional venue
          </Text>
          <Heading level={1} id="hero-heading" className={styles.heroTitle}>
            Married in the meadow, <em>dancing in the hayloft</em>
          </Heading>
          <Text as="p" type="large" color="secondary" textWrap="pretty" className={styles.heroLead}>
            Hollin Barn is a fictional countryside venue: an oak-framed threshing barn, a wildflower meadow and an
            orchard terrace, yours alone for the day.
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button href="#packages" label="Build a sample package" variant="primary" size="lg" />
            <Button href="#dates" label="See sample dates" variant="secondary" size="lg" />
          </HStack>
          <dl className={styles.heroFacts}>
            {spaces.map(s => (
              <div key={s.id}>
                <dt>{s.moment}</dt>
                <dd>{s.capacityLabel}</dd>
              </div>
            ))}
          </dl>
        </VStack>
        <div className={styles.heroArtWrap}>
          <BarnScene className={styles.heroArt} />
          <p className={styles.heroCaption}>Illustration of the fictional Hollin Barn</p>
        </div>
      </div>
    </section>
  );
}
