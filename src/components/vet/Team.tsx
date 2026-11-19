import {VStack} from '@astryxdesign/core/VStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {PetPortrait} from './illustrations';
import {petLabel, team} from './lib/data';
import styles from './vet.module.css';

export function Team() {
  return (
    <SectionShell
      id="team"
      eyebrow="The team"
      title="Meet the (fictional) people behind the counter"
      lead="Invented characters for this concept. Each one is pictured with their own made-up pet.">
      <ul className={styles.teamList}>
        {team.map(m => (
          <li key={m.name}>
            <Card padding={5} className={styles.serviceCard}>
              <VStack gap={3}>
                <PetPortrait pet={m.pet} className={styles.teamPortrait} />
                <VStack gap={1}>
                  <Heading level={3}>{m.name}</Heading>
                  <Text weight="semibold" color="accent">
                    {m.role}
                  </Text>
                </VStack>
                <Text as="p" color="secondary">
                  {m.bio}
                </Text>
                <Text type="supporting" color="secondary">
                  Pictured with {m.petName}, a {petLabel(m.pet).toLowerCase()}.
                </Text>
              </VStack>
            </Card>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
