import {Section} from './Section';
import styles from './keystone.module.css';

const ITEMS = [
  {
    title: 'A written, itemised quote',
    text: 'A builder like Keystone could commit to pricing the agreed scope in writing before work starts, with options priced separately.',
  },
  {
    title: 'Stage payments, never all upfront',
    text: 'Payments could be tied to finished stages such as footings, shell and first fix, so you only pay for work you can see.',
  },
  {
    title: 'One named site lead',
    text: 'The same person on site from start to handover, reachable during working hours and responsible for the whole crew.',
  },
  {
    title: 'Variations priced before they happen',
    text: 'Any change is written up and priced for you to approve first. Nothing extra appears on the final invoice.',
  },
  {
    title: 'A tidy, safe site every day',
    text: 'Dust sheets, a swept site, secured scaffold and a clear safe route past the work for anyone living at home.',
  },
  {
    title: 'A written workmanship guarantee',
    text: 'A promise to come back and put right defects in the work for an agreed period after handover, stated in the contract.',
  },
];

export function Guarantees() {
  return (
    <Section
      id="guarantees"
      number="05"
      kicker="Commitments"
      tone="black"
      title="What a builder like this might promise"
      lead="Examples of commitments a builder could offer its customers, written for a fictional company. They are not real accreditations, memberships or insurance-backed warranties.">
      <ul className={styles.guaranteeGrid}>
        {ITEMS.map((g, i) => (
          <li key={g.title} className={styles.guarantee}>
            <span className={styles.guaranteeNum} aria-hidden="true">
              {String.fromCharCode(65 + i)}
            </span>
            <h3 className={styles.guaranteeTitle}>{g.title}</h3>
            <p className={styles.guaranteeText}>{g.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
