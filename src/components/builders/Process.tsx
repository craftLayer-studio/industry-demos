import {Section} from './Section';
import styles from './keystone.module.css';

const STEPS = [
  {
    title: 'Site survey',
    when: 'Week 1',
    text: 'A site lead visits, measures up, checks access and structure, and listens to what you want the space to do.',
  },
  {
    title: 'Design and drawings',
    when: 'Weeks 2 to 5',
    text: 'Measured drawings, layout options and a first specification, revised with you until the plan is right.',
  },
  {
    title: 'Approvals',
    when: 'Weeks 4 to 12',
    text: 'Planning or permitted-development checks, building control, structural calculations and party-wall notices.',
  },
  {
    title: 'Fixed-scope quote',
    when: 'Before any work',
    text: 'A written, itemised quote with stage payments tied to finished work, and a priced list of any options.',
  },
  {
    title: 'Build',
    when: 'On site',
    text: 'One site lead runs the crew. You get a weekly update on progress, the next week and any decisions needed.',
  },
  {
    title: 'Snagging and handover',
    when: 'Final week',
    text: 'A walk-round together, a snag list closed out in writing, and the certificates and manuals handed over.',
  },
];

export function Process() {
  return (
    <Section
      id="process"
      number="03"
      kicker="How a job runs"
      title="Six stages, no surprises"
      lead="An example of how a typical extension could run from first visit to handover. Timings are illustrative and vary with approvals and scope.">
      <ol className={styles.timeline}>
        {STEPS.map((s, i) => (
          <li key={s.title} className={styles.timelineStep}>
            <span className={styles.timelineNum} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={styles.timelineWhen}>{s.when}</span>
            <h3 className={styles.timelineTitle}>
              <span className={styles.visuallyHidden}>Stage {i + 1}: </span>
              {s.title}
            </h3>
            <p className={styles.timelineText}>{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
