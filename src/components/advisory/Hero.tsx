import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Tick} from './icons';
import styles from './advisory.module.css';

const promises = [
  {title: 'Fixed monthly fees', body: 'Agreed in writing before work begins.'},
  {title: 'A named partner', body: 'One person who knows your numbers.'},
  {title: 'A set close date', body: 'Books closed on the same day each month.'},
];

const ledger = [
  {label: 'Bank reconciliations', value: 'Complete', done: true},
  {label: 'Payroll journal', value: 'Complete', done: true},
  {label: 'Accruals reviewed', value: 'Complete', done: true},
  {label: 'Cash at month end', value: '$48,210', done: false},
  {label: 'Change on last month', value: '+$3,140', done: false},
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <VStack gap={8}>
          <VStack gap={5}>
            <Text as="p" className={styles.eyebrow}>
              Accounting and business advisory
            </Text>
            <Heading level={1} id="hero-heading" className={styles.heroTitle} textWrap="balance">
              Precise numbers, <em>calmly</em> kept.
            </Heading>
            <Text type="large" color="secondary" as="p" textWrap="pretty" className={styles.heroLead}>
              Halden &amp; Rowe looks after the books, year-end and finance planning for founders, small businesses and
              non-profits, so you can make decisions from numbers you trust.
            </Text>
          </VStack>
          <HStack gap={3} wrap="wrap">
            <Button href="#consult" label="Book a consultation" variant="primary" size="lg" />
            <Button href="#estimate" label="Estimate your fees" variant="secondary" size="lg" />
          </HStack>
          <ul className={styles.promises}>
            {promises.map(p => (
              <li key={p.title}>
                <span className={styles.promiseTitle}>{p.title}</span>
                <span className={styles.promiseBody}>{p.body}</span>
              </li>
            ))}
          </ul>
        </VStack>

        <figure className={styles.ledgerWrap} aria-labelledby="ledger-caption">
          <div className={styles.ledger}>
            <div className={styles.ledgerHead}>
              <span className={styles.ledgerTitle}>March close note</span>
              <span className={styles.sampleTag}>Illustrative sample</span>
            </div>
            <dl className={styles.ledgerRows}>
              {ledger.map(row => (
                <div key={row.label} className={styles.ledgerRow}>
                  <dt>
                    {row.done ? <Tick className={styles.tick} /> : null}
                    {row.label}
                  </dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.ledgerNote}>
              “Card spend rose this month because two annual software renewals fell due. Nothing else unusual.”
            </p>
          </div>
          <figcaption id="ledger-caption" className={styles.liveRegion}>
            Illustrative sample of a monthly close note for a fictional client. Figures are invented.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
