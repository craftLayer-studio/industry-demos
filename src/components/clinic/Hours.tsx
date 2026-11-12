import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Table} from '@astryxdesign/core/Table';
import {SectionShell} from './SectionShell';
import {hours} from './lib/data';

type HoursRow = {day: string; hours: string};

export function Hours() {
  return (
    <SectionShell
      id="hours"
      eyebrow="Opening hours"
      title="When the front desk is open"
      lead="Fictional hours for a fictional clinic. Appointment times in the request flow fall within these hours.">
      <Grid columns={{minWidth: 300, max: 2}} gap={6} align="start">
        <Card padding={2}>
          <Table<HoursRow>
            data={hours}
            idKey="day"
            columns={[
              {key: 'day', header: 'Day'},
              {key: 'hours', header: 'Hours'},
            ]}
          />
        </Card>
        <VStack gap={4}>
          <Card padding={6} variant="muted">
            <VStack gap={2}>
              <Heading level={3}>Public holidays</Heading>
              <Text as="p" color="secondary">
                The clinic would be closed on public holidays, with updated hours posted here in advance.
              </Text>
            </VStack>
          </Card>
          <Card padding={6} variant="muted">
            <VStack gap={2}>
              <Heading level={3}>Outside opening hours</Heading>
              <Text as="p" color="secondary">
                This clinic is not real and cannot help with urgent care. In an emergency, contact your local
                emergency number.
              </Text>
            </VStack>
          </Card>
        </VStack>
      </Grid>
    </SectionShell>
  );
}
