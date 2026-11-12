import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import {specialties} from './lib/data';
import {specialtyIcons} from './specialtyIcons';
import styles from './clinic.module.css';

export function Specialties() {
  return (
    <SectionShell
      id="specialties"
      eyebrow="Specialties"
      title="Six teams, one front desk"
      lead="Every specialty below is part of this fictional clinic. Descriptions explain what an appointment is for; they are not medical advice.">
      <Grid columns={{minWidth: 300, max: 3}} gap={4}>
        {specialties.map(s => {
          const Glyph = specialtyIcons[s.id];
          return (
            <Card key={s.id} className={styles.fullHeight} padding={6}>
              <VStack gap={4}>
                <HStack gap={3} vAlign="center">
                  <span className={styles.iconTile}>
                    <Glyph />
                  </span>
                  <Heading level={3}>{s.name}</Heading>
                </HStack>
                <Text as="p" color="secondary">
                  {s.summary}
                </Text>
                <Text type="supporting">Typical visit: {s.visitLength} minutes</Text>
              </VStack>
            </Card>
          );
        })}
      </Grid>
    </SectionShell>
  );
}
