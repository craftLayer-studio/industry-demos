import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {ArbourIcon, LanternIcon, TableIcon} from './art';
import {spaces, type SpaceId} from './lib/data';
import styles from './hollin.module.css';

const icons: Record<SpaceId, typeof ArbourIcon> = {ceremony: ArbourIcon, dining: TableIcon, evening: LanternIcon};

export function Spaces() {
  return (
    <SectionShell
      id="spaces"
      eyebrow="The spaces"
      title="Three spaces for the three acts of the day"
      lead="Vows in the meadow, dinner under oak trusses, dancing in the loft. Each space is a short, level walk from the next.">
      <ol className={styles.spaceList}>
        {spaces.map((s, i) => {
          const Icon = icons[s.id];
          return (
            <li key={s.id}>
              <Card padding={6} className={styles.spaceCard}>
                <VStack gap={4}>
                  <div className={styles.spaceTop}>
                    <Icon className={styles.spaceIcon} />
                    <span className={styles.spaceNumber} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <VStack gap={1}>
                    <Text as="p" className={styles.spaceMoment}>
                      {s.moment}
                    </Text>
                    <Heading level={3} className={styles.cardHeading}>
                      {s.name}
                    </Heading>
                  </VStack>
                  <p className={styles.capacity}>
                    <span className={styles.capacityNumber}>{s.capacity}</span>
                    <span>{s.capacityLabel.replace(/^Up to \d+ /, 'guests ')}</span>
                  </p>
                  <Text as="p" color="secondary" textWrap="pretty">
                    {s.description}
                  </Text>
                  <ul className={styles.tickList}>
                    {s.details.map(d => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </VStack>
              </Card>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
