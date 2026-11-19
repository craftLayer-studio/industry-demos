import {VStack} from '@astryxdesign/core/VStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';
import {SectionShell} from './SectionShell';
import {team} from './lib/data';
import styles from './dental.module.css';

export function Team() {
  return (
    <SectionShell
      id="team"
      tone="ice"
      eyebrow="The team"
      title="The people you would meet"
      lead="These team members are fictional characters written for this concept demo. They are not real people and hold no real registrations.">
      <ul className={styles.teamGrid}>
        {team.map(m => (
          <li key={m.name}>
            <Card padding={6} className={styles.teamCard}>
              <VStack gap={4}>
                <Avatar name={m.name} size={64} tooltip={false} className={styles.avatar} />
                <VStack gap={1}>
                  <Heading level={3} className={styles.cardTitle}>
                    {m.name}
                  </Heading>
                  <Text color="accent" weight="semibold">
                    {m.role}
                  </Text>
                  <Text type="supporting" color="secondary">
                    {m.focus}
                  </Text>
                </VStack>
                <Text as="p" color="secondary" textWrap="pretty">
                  {m.note}
                </Text>
              </VStack>
            </Card>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
