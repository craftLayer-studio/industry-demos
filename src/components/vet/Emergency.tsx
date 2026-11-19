import {VStack} from '@astryxdesign/core/VStack';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {SectionShell} from './SectionShell';
import styles from './vet.module.css';

export function Emergency() {
  return (
    <SectionShell
      id="emergency"
      eyebrow="Emergencies"
      title="If your pet needs help urgently"
      lead="Meadowlark Vets is not a real practice and cannot help in an emergency. This section shows how a practice website could explain what to do."
      tone="cream">
      <Grid columns={{minWidth: 300, max: 2}} gap={6} align="start">
        <Card padding={6} className={styles.emergency} elevation="low">
          <VStack gap={3}>
            <Heading level={3}>Call your nearest out-of-hours vet</Heading>
            <Text as="p">
              If you are worried about your pet, phone your own vet or your nearest out-of-hours veterinary
              service straight away. They can tell you whether to come in and how to travel safely.
            </Text>
            <Text as="p" color="secondary">
              This demo does not list a phone number and does not give veterinary advice.
            </Text>
          </VStack>
        </Card>
        <Card padding={6}>
          <VStack gap={3}>
            <Heading level={3}>Be ready before you need it</Heading>
            <ol className={styles.stepsList}>
              <li>
                <Text>Save your own vet&rsquo;s and your local out-of-hours service&rsquo;s details in your phone.</Text>
              </li>
              <li>
                <Text>Phone ahead before travelling, so the team knows you are on the way.</Text>
              </li>
              <li>
                <Text>Keep a carrier, lead and any recent records somewhere easy to grab.</Text>
              </li>
            </ol>
          </VStack>
        </Card>
      </Grid>
    </SectionShell>
  );
}
