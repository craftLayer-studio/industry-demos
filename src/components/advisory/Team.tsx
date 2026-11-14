import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';
import {SectionShell} from './SectionShell';
import {partners} from './lib/data';
import styles from './advisory.module.css';

export function Team() {
  return (
    <SectionShell
      id="team"
      tone="paper"
      eyebrow="Partners"
      title="A small team that answers its own phone"
      lead="Every client works with a named partner. The people below are fictional characters created for this demo.">
      <ul className={styles.teamGrid} role="list">
        {partners.map(p => (
          <li key={p.name} className={styles.person}>
            <span className={styles.avatarRing}>
              <Avatar name={p.name} alt="" size={64} tooltip={false} />
            </span>
            <Heading level={3} className={styles.personName}>
              {p.name}
            </Heading>
            <Text as="p" className={styles.role}>
              {p.role}
            </Text>
            <Text as="p" weight="medium">
              {p.focus}
            </Text>
            <Text as="p" color="secondary">
              {p.bio}
            </Text>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
