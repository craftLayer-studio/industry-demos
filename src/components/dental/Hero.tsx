import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {HeroArt} from './art';
import styles from './dental.module.css';

const points = [
  'Sample price ranges shown up front',
  'Written plans before any treatment',
  'An illustrative monthly payment estimator',
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <VStack gap={6} className={styles.heroCopy}>
          <Text type="label" className={styles.eyebrow}>
            Private dentistry and facial aesthetics
          </Text>
          <Heading level={1} id="hero-heading" textWrap="balance" className={styles.heroTitle}>
            Calm, considered dentistry, <span className={styles.heroAccent}>explained before you decide.</span>
          </Heading>
          <Text type="large" as="p" color="secondary" textWrap="pretty" className={styles.heroLead}>
            Arbour Dental is a fictional private practice for check-ups, hygiene, whitening, clear aligners, implants
            and facial aesthetics. Every option comes with a plain-language plan and itemised fees, so you can take
            your time.
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button href="#consultation" label="Request a consultation" variant="primary" size="lg" />
            <Button href="#treatments" label="Explore treatments" variant="secondary" size="lg" />
          </HStack>
          <ul className={styles.heroPoints}>
            {points.map(p => (
              <li key={p}>
                <svg viewBox="0 0 20 20" width={20} height={20} aria-hidden="true" focusable="false">
                  <circle cx="10" cy="10" r="9" fill="var(--color-accent-muted)" />
                  <path
                    d="M6 10.2 8.7 13 14 7.5"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Text color="primary">{p}</Text>
              </li>
            ))}
          </ul>
        </VStack>
        <div className={styles.heroVisual}>
          <HeroArt />
          <div className={`${styles.floatCard} ${styles.floatCardTop}`} aria-hidden="true">
            <span className={styles.floatLabel}>Next step</span>
            <span className={styles.floatValue}>Consultation and written plan</span>
          </div>
          <div className={`${styles.floatCard} ${styles.floatCardBottom}`} aria-hidden="true">
            <span className={styles.floatLabel}>Sample hygienist visit</span>
            <span className={styles.floatValue}>£65 to £95</span>
          </div>
        </div>
      </div>
    </section>
  );
}
