import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {HeroArt} from './HeroArt';
import {HeroSearch} from './HeroSearch';
import styles from './ashgrove.module.css';

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <Text as="p" className={styles.eyebrow}>
            Independent estate agents · Wealdbury
          </Text>
          <Heading level={1} id="hero-heading" textWrap="balance" className={styles.heroTitle}>
            Homes with good bones, in a town worth <em>staying</em> for.
          </Heading>
          <Text as="p" type="large" color="secondary" textWrap="pretty" className={styles.heroLead}>
            Ashgrove sells and lets period houses, conversions and new homes across a fictional market town and its
            villages. Every listing comes with a measured drawing and a plain-spoken description.
          </Text>
        </div>
        <figure className={styles.heroFigure}>
          <div className={styles.heroArch}>
            <HeroArt />
          </div>
          <figcaption>Front elevation, 7 Ferry Row (fictional)</figcaption>
        </figure>
      </div>
      <div className={styles.container}>
        <HeroSearch />
      </div>
    </section>
  );
}
