import {Heading} from '@astryxdesign/core/Heading';
import {Section} from './Section';
import {EyeOffIcon, GlobeIcon, KeyIcon, LockIcon, ShieldIcon, TrashIcon} from './icons';
import styles from './saas.module.css';

const notes = [
  {Icon: EyeOffIcon, title: 'Collect less by default', body: 'IP addresses would be truncated before storage and user ids pseudonymised. Capturing personal fields is opt-in, per property.'},
  {Icon: LockIcon, title: 'Encrypted in transit and at rest', body: 'Every connection would use TLS, and stored event data would be encrypted at rest with regularly rotated keys.'},
  {Icon: GlobeIcon, title: 'Choose where data lives', body: 'Workspaces would pick a storage region at setup, so teams can keep event data close to their users.'},
  {Icon: KeyIcon, title: 'Least-privilege access', body: 'Roles would limit who can see raw events versus aggregate charts, with an audit trail of exports on larger plans.'},
  {Icon: TrashIcon, title: 'Deletion that actually deletes', body: 'One request would remove a person’s events everywhere, including exports Pulsegrid manages, with a confirmation log.'},
  {Icon: ShieldIcon, title: 'Your data is not the product', body: 'Event data would be used only to run your workspace. No resale, no ad targeting, no training on customer data.'},
];

export function Security() {
  return (
    <Section
      id="security"
      eyebrow="Security and privacy"
      title="Privacy designed in, not bolted on"
      lead="These are design intentions for a fictional product, written the way we would brief an engineering team. They are not audited controls or certifications.">
      <ul className={styles.securityGrid}>
        {notes.map(n => (
          <li key={n.title} className={styles.securityItem}>
            <span className={styles.securityIcon}>
              <n.Icon />
            </span>
            <div>
              <Heading level={3} className={styles.cardTitle}>
                {n.title}
              </Heading>
              <p className={styles.smallText}>{n.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
