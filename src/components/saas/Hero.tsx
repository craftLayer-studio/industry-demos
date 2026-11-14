import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {HeroMockup} from './HeroMockup';
import {CheckIcon} from './icons';
import styles from './saas.module.css';

const points = ['One snippet to install', 'Privacy-first defaults', 'Made for teams of 2 to 50'];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>
            <span className={styles.heroEyebrowDot} aria-hidden="true" />
            Product analytics for small teams
          </p>
          <Heading level={1} id="hero-title" className={styles.heroTitle} textWrap="balance">
            Know which features matter <span className={styles.gradientText}>before the next sprint.</span>
          </Heading>
          <p className={styles.heroLead}>
            Pulsegrid turns raw product events into funnels, retention curves and a weekly digest your whole team will
            actually read. No query language, no analyst on call.
          </p>
          <div className={styles.heroCtas}>
            <Button href="#waitlist" label="Join the waitlist" variant="primary" size="lg" />
            <Button href="#pricing" label="See pricing" variant="secondary" size="lg" />
          </div>
          <ul className={styles.heroPoints}>
            {points.map(p => (
              <li key={p}>
                <CheckIcon className={styles.heroPointIcon} />
                {p}
              </li>
            ))}
          </ul>
          <p className={styles.heroNote}>Pulsegrid is a fictional product. Every number on this page is sample data.</p>
        </div>
        <HeroMockup />
      </div>
    </section>
  );
}
