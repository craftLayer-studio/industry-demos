'use client';

import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {HeroArt} from './art';
import {useShop} from './ShopContext';
import {RoastScale} from './RoastScale';
import {COFFEES, PROCESS_LABELS, ROAST_LABELS, formatMoney} from './lib/catalog';
import styles from './coffee.module.css';

const featured = COFFEES[0];
const second = COFFEES[2];

export function Hero() {
  const {openProduct} = useShop();
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Small-batch roastery · Concept shop</p>
          <Heading level={1} id="hero-title" className={styles.heroTitle} textWrap="balance">
            Coffee roasted slowly, <em>shipped while it still sings.</em>
          </Heading>
          <p className={styles.heroLead}>
            Brightwater is a fictional roaster with a small, seasonal list: eight coffees, each with its own label,
            tasting notes and a brew guide to match. Everything on this page is a working demo with sample prices.
          </p>
          <div className={styles.heroActions}>
            <Button href="#shop" label="Shop coffee" variant="primary" size="lg" />
            <Button href="#subscribe" label="Build a subscription" variant="secondary" size="lg" />
          </div>
        </div>

        <div className={styles.heroVisual}>
          <HeroArt featured={featured} second={second} />
          <div className={styles.featureCard}>
            <div className={styles.featureTop}>
              <Badge label="Featured" variant="orange" />
              <span className={styles.mono}>Sample price</span>
            </div>
            <Heading level={2} className={styles.featureName}>
              {featured.name}
            </Heading>
            <p className={styles.featureMeta}>
              {featured.origin}, {featured.region} · {PROCESS_LABELS[featured.process]}
            </p>
            <p className={styles.notesLine}>{featured.notes.join(' / ')}</p>
            <RoastScale value={featured.roastScale} label={ROAST_LABELS[featured.roast]} compact />
            <div className={styles.featureFoot}>
              <span className={styles.featurePrice}>
                {formatMoney(featured.price)} <span>/ 250 g</span>
              </span>
              <Button label={`View ${featured.name}`} size="sm" onClick={() => openProduct(featured.id)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
