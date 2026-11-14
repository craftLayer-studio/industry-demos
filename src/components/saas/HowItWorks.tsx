import {Heading} from '@astryxdesign/core/Heading';
import {Section} from './Section';
import {CodeIcon, InboxIcon, TargetIcon} from './icons';
import styles from './saas.module.css';

const steps = [
  {
    Icon: CodeIcon,
    title: 'Add one snippet',
    body: 'Drop the script into your app, or send events from your server. Page views and sessions are tracked automatically; you name the events that matter.',
    code: "pulsegrid.track('project.created', {plan: 'team'})",
  },
  {
    Icon: TargetIcon,
    title: 'Pick what success means',
    body: 'Choose an activation event and a few key actions. Pulsegrid builds the starter funnels, retention views and alert ranges around them.',
    code: "activation: 'invite.sent' within 7 days",
  },
  {
    Icon: InboxIcon,
    title: 'Read the Monday digest',
    body: 'Every week the team gets a short written summary: what moved, by how much, and which change most likely explains it.',
    code: 'digest: weekly · Monday 09:00 team time',
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="From first event to first insight in an afternoon"
      lead="The setup is deliberately short, so a two-person team can own analytics without a data engineer."
      tone="raised">
      <ol className={styles.steps}>
        {steps.map((s, i) => (
          <li key={s.title} className={styles.step}>
            <div className={styles.stepHead}>
              <span className={styles.stepIcon}>
                <s.Icon />
              </span>
              <span className={styles.stepNum} aria-hidden="true">
                0{i + 1}
              </span>
            </div>
            <Heading level={3} className={styles.stepTitle}>
              {s.title}
            </Heading>
            <p className={styles.bodyText}>{s.body}</p>
            <code className={styles.stepCode}>{s.code}</code>
          </li>
        ))}
      </ol>
    </Section>
  );
}
