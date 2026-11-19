import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {HeroSection} from './art';
import styles from './keystone.module.css';

const strengths = ['Extensions', 'Loft conversions', 'Kitchens', 'Renovations'];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.heroTag}>
            <span className={styles.heroTagBox}>Builders</span>
            <span>&amp; home renovators</span>
          </p>
          <Heading level={1} id="hero-heading" className={styles.heroTitle}>
            Built square.
            <br />
            <span className={styles.heroTitleOutline}>Finished</span> properly.
          </Heading>
          <p className={styles.heroLead}>
            Keystone Build Co. is a fictional builder that plans, builds and finishes extensions, lofts, kitchens and
            whole-house renovations, with one site lead from first survey to final snag.
          </p>
          <div className={styles.heroActions}>
            <Button label="Estimate an extension" href="#estimate" variant="primary" size="lg" className={styles.btnSlab} />
            <Button label="Request a site survey" href="#survey" size="lg" className={styles.btnOutline} />
          </div>
          <ul className={styles.heroList} aria-label="Services">
            {strengths.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <figure className={styles.drawing}>
          <div className={styles.drawingSheet}>
            <HeroSection className={styles.heroArt} />
          </div>
          <figcaption className={styles.titleBlock}>
            <span>
              <strong>DWG 01</strong> Section A-A
            </span>
            <span>Rear extension + loft dormer</span>
            <Badge label="Illustrative" variant="neutral" />
          </figcaption>
        </figure>
      </div>
      <div className={styles.hazardBand} aria-hidden="true" />
    </section>
  );
}
