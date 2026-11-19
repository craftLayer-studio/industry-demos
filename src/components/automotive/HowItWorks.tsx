import {Section} from './Section';
import styles from './torque.module.css';

const STEPS = [
  {
    t: 'Request a slot',
    d: 'Pick a service and a drop-off day. In a real version, the workshop would confirm by email the same day.',
  },
  {
    t: 'Drop off and walk round',
    d: 'A technician walks round the car with you, notes any warning lights and agrees what is in scope.',
  },
  {
    t: 'Inspect, then call first',
    d: 'If we find anything outside the agreed job, you get photos and a price. Nothing extra is done without a yes.',
  },
  {
    t: 'Collect with a report',
    d: 'You get a plain-English report: what was done, measured readings, and what to watch before the next visit.',
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how"
      code="SEQ-03"
      kicker="How it works"
      tone="raised"
      title="Four steps, no surprises on the invoice"
      lead="How a visit would run at this fictional garage.">
      <ol className={styles.steps}>
        {STEPS.map((s, i) => (
          <li key={s.t} className={styles.step}>
            <span className={styles.stepNum} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.stepTitle}>{s.t}</h3>
            <p className={styles.bodyText}>{s.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
