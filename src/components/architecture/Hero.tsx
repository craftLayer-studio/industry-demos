import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Axonometric} from './Axonometric';
import {projects, TYPES} from './lib/projects';
import type {Volume} from './lib/iso';
import styles from './ostrander.module.css';

/** The hero study: a pitched house, a flat living wing and a red garden pavilion. */
const HERO_MASSING: Volume[] = [
  {x: 0, y: 0, w: 6, d: 11, h: 5.6, roof: 'gable', rise: 3.2, ridge: 'y', glaze: ['y']},
  {x: 6, y: 3, w: 8, d: 8, h: 3.2, glaze: ['x', 'y']},
  {x: 14, y: 9.5, w: 3.5, d: 3.5, h: 2.6, roof: 'mono', rise: 1, accent: true, glaze: ['y']},
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <Text as="p" className={styles.eyebrow}>
            Architecture and interiors · Fictional practice
          </Text>
          <Heading level={1} id="hero-heading" className={styles.heroTitle}>
            Plain rooms<span className={styles.red}>.</span>
            <br />
            Precise light<span className={styles.red}>.</span>
          </Heading>
          <Text as="p" type="large" textWrap="pretty" className={styles.heroLead}>
            Ostrander Studio is an imagined practice that designs new homes, extensions, small commercial buildings and
            interiors on a strict grid: few materials, careful daylight and drawings you can build from.
          </Text>
          <div className={styles.heroActions}>
            <Button href="#brief" label="Build a project brief" variant="primary" size="lg" />
            <Button href="#work" label="Browse the archive" variant="secondary" size="lg" />
          </div>
        </div>

        <figure className={styles.heroSheet}>
          <div className={styles.heroSheetArt}>
            <Axonometric
              volumes={HERO_MASSING}
              hasGround
              label="Axonometric line drawing of a fictional house: a pitched two-storey volume, a flat-roofed living wing and a small red garden pavilion."
            />
            <span className={styles.heroMarker} aria-hidden="true">
              A
            </span>
          </div>
          <figcaption className={styles.titleBlock}>
            <span>
              <b>OS-00</b> Hero study
            </span>
            <span>Axonometric, not to scale</span>
            <span>Illustrative drawing</span>
          </figcaption>
        </figure>
      </div>

      <div className={styles.container}>
        <ol className={styles.heroIndex} aria-label="What the studio designs">
          {TYPES.map((t, i) => {
            const n = projects.filter(p => p.type === t.value).length;
            return (
              <li key={t.value}>
                <span className={styles.heroIndexNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.heroIndexLabel}>{t.plural}</span>
                <span className={styles.heroIndexCount}>
                  {n} fictional {n === 1 ? 'study' : 'studies'}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
